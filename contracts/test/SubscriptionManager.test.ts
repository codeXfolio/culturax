import { expect } from "chai";
import { ethers } from "hardhat";
import { SubscriptionManager } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("SubscriptionManager", function () {
   let subscriptionManager: SubscriptionManager;
   let owner: SignerWithAddress;
   let creator: SignerWithAddress;
   let subscriber: SignerWithAddress;
   let otherUser: SignerWithAddress;

   const MONTHLY_PRICE = ethers.parseEther("0.1"); // 0.1 ETH
   const WEEKLY_PRICE = ethers.parseEther("0.025"); // 0.025 ETH
   const BIWEEKLY_PRICE = ethers.parseEther("0.05"); // 0.05 ETH
   const MIN_WITHDRAWAL = ethers.parseEther("0.01"); // 0.01 ETH

   beforeEach(async function () {
      [owner, creator, subscriber, otherUser] = await ethers.getSigners();
      const SubscriptionManager = await ethers.getContractFactory(
         "SubscriptionManager"
      );
      subscriptionManager = await SubscriptionManager.deploy();
   });

   describe("Creator Settings", function () {
      it("should allow creator to set their settings", async function () {
         await subscriptionManager.connect(creator).setCreatorSettings(
            MONTHLY_PRICE,
            "Monthly subscription",
            "Exclusive content, Early access",
            0 // MONTHLY
         );

         const settings = await subscriptionManager.getCreatorSettings(
            creator.address
         );
         expect(settings.price).to.equal(MONTHLY_PRICE);
         expect(settings.description).to.equal("Monthly subscription");
         expect(settings.perks).to.equal("Exclusive content, Early access");
         expect(settings.payoutSchedule).to.equal(0); // MONTHLY
         expect(settings.isActive).to.be.true;
      });

      it("should not allow zero price", async function () {
         await expect(
            subscriptionManager.connect(creator).setCreatorSettings(
               0,
               "Monthly subscription",
               "Exclusive content",
               0 // MONTHLY
            )
         ).to.be.revertedWith("Price must be greater than 0");
      });
   });

   describe("Subscription", function () {
      beforeEach(async function () {
         // Set up creator settings
         await subscriptionManager.connect(creator).setCreatorSettings(
            MONTHLY_PRICE,
            "Monthly subscription",
            "Exclusive content",
            0 // MONTHLY
         );
      });

      it("should allow user to subscribe with correct payment", async function () {
         await subscriptionManager
            .connect(subscriber)
            .subscribe(creator.address, {
               value: MONTHLY_PRICE,
            });

         const subscriptionId = 0;
         const subscription = await subscriptionManager.getSubscription(
            subscriptionId
         );
         expect(subscription.subscriber).to.equal(subscriber.address);
         expect(subscription.creator).to.equal(creator.address);
         expect(subscription.amount).to.equal(MONTHLY_PRICE);
         expect(subscription.status).to.equal(0); // ACTIVE
      });

      it("should not allow subscription with insufficient payment", async function () {
         const insufficientPayment = MONTHLY_PRICE - BigInt(1);
         await expect(
            subscriptionManager.connect(subscriber).subscribe(creator.address, {
               value: insufficientPayment,
            })
         ).to.be.revertedWith("Insufficient payment");
      });

      it("should allow subscriber to cancel subscription", async function () {
         await subscriptionManager
            .connect(subscriber)
            .subscribe(creator.address, {
               value: MONTHLY_PRICE,
            });

         await subscriptionManager.connect(subscriber).cancelSubscription(0);
         const subscription = await subscriptionManager.getSubscription(0);
         expect(subscription.status).to.equal(1); // CANCELLED
      });

      it("should not allow non-subscriber to cancel subscription", async function () {
         await subscriptionManager
            .connect(subscriber)
            .subscribe(creator.address, {
               value: MONTHLY_PRICE,
            });

         await expect(
            subscriptionManager.connect(otherUser).cancelSubscription(0)
         ).to.be.revertedWith("Only subscriber can cancel");
      });
   });

   describe("Subscription Validation", function () {
      beforeEach(async function () {
         // Set up creator settings
         await subscriptionManager.connect(creator).setCreatorSettings(
            MONTHLY_PRICE,
            "Monthly subscription",
            "Exclusive content",
            0 // MONTHLY
         );

         // Create subscription
         await subscriptionManager
            .connect(subscriber)
            .subscribe(creator.address, {
               value: MONTHLY_PRICE,
            });
      });

      it("should validate active subscription", async function () {
         const isValid = await subscriptionManager.isValidSubscription(
            subscriber.address,
            creator.address
         );
         expect(isValid).to.be.true;
      });

      it("should not validate cancelled subscription", async function () {
         await subscriptionManager.connect(subscriber).cancelSubscription(0);
         const isValid = await subscriptionManager.isValidSubscription(
            subscriber.address,
            creator.address
         );
         expect(isValid).to.be.false;
      });

      it("should not validate non-existent subscription", async function () {
         const isValid = await subscriptionManager.isValidSubscription(
            otherUser.address,
            creator.address
         );
         expect(isValid).to.be.false;
      });
   });

   describe("Different Payout Schedules", function () {
      it("should handle weekly subscriptions", async function () {
         await subscriptionManager.connect(creator).setCreatorSettings(
            WEEKLY_PRICE,
            "Weekly subscription",
            "Weekly content",
            1 // WEEKLY
         );

         await subscriptionManager
            .connect(subscriber)
            .subscribe(creator.address, {
               value: WEEKLY_PRICE,
            });

         const subscription = await subscriptionManager.getSubscription(0);
         const expectedEndDate =
            subscription.startDate + BigInt(7 * 24 * 60 * 60); // 7 days
         expect(subscription.endDate).to.equal(expectedEndDate);
      });

      it("should handle biweekly subscriptions", async function () {
         await subscriptionManager.connect(creator).setCreatorSettings(
            BIWEEKLY_PRICE,
            "Biweekly subscription",
            "Biweekly content",
            2 // BIWEEKLY
         );

         await subscriptionManager
            .connect(subscriber)
            .subscribe(creator.address, {
               value: BIWEEKLY_PRICE,
            });

         const subscription = await subscriptionManager.getSubscription(0);
         const expectedEndDate =
            subscription.startDate + BigInt(14 * 24 * 60 * 60); // 14 days
         expect(subscription.endDate).to.equal(expectedEndDate);
      });
   });

   describe("Withdrawal", function () {
      beforeEach(async function () {
         // Set up creator settings
         await subscriptionManager.connect(creator).setCreatorSettings(
            MONTHLY_PRICE,
            "Monthly subscription",
            "Exclusive content",
            0 // MONTHLY
         );
      });

      it("should allow creator to withdraw earnings", async function () {
         // Create multiple subscriptions
         await subscriptionManager
            .connect(subscriber)
            .subscribe(creator.address, {
               value: MONTHLY_PRICE,
            });
         await subscriptionManager
            .connect(otherUser)
            .subscribe(creator.address, {
               value: MONTHLY_PRICE,
            });

         // Check earnings
         const earnings = await subscriptionManager.getCreatorEarnings(
            creator.address
         );
         expect(earnings).to.equal(MONTHLY_PRICE * BigInt(2));

         // Withdraw
         const initialBalance = await ethers.provider.getBalance(
            creator.address
         );
         const tx = await subscriptionManager.connect(creator).withdraw();
         const receipt = await tx.wait();
         const gasUsed = receipt!.gasUsed * receipt!.gasPrice;
         const finalBalance = await ethers.provider.getBalance(creator.address);

         // Check balance change
         expect(finalBalance).to.equal(initialBalance + earnings - gasUsed);

         // Check earnings reset
         const newEarnings = await subscriptionManager.getCreatorEarnings(
            creator.address
         );
         expect(newEarnings).to.equal(0);
      });

      it("should not allow withdrawal with insufficient earnings", async function () {
         // Create subscription with amount less than minimum withdrawal
         const smallAmount = MIN_WITHDRAWAL - BigInt(1);
         await subscriptionManager.connect(creator).setCreatorSettings(
            smallAmount,
            "Small subscription",
            "Small content",
            0 // MONTHLY
         );

         await subscriptionManager
            .connect(subscriber)
            .subscribe(creator.address, {
               value: smallAmount,
            });

         // Try to withdraw
         await expect(
            subscriptionManager.connect(creator).withdraw()
         ).to.be.revertedWith("Insufficient earnings for withdrawal");
      });

      it("should not allow non-creator to withdraw", async function () {
         // Create subscription
         await subscriptionManager
            .connect(subscriber)
            .subscribe(creator.address, {
               value: MONTHLY_PRICE,
            });

         // Try to withdraw with different address
         await expect(
            subscriptionManager.connect(otherUser).withdraw()
         ).to.be.revertedWith("Insufficient earnings for withdrawal");
      });
   });
});
