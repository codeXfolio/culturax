import { expect } from "chai";
import { ethers } from "hardhat";
import { SubscriptionManager } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import { IERC20 } from "../typechain-types";

describe("SubscriptionManager", function () {
   let subscriptionManager: SubscriptionManager;
   let usdcToken: IERC20;
   let mockUsdc: any; // Using any type since we'll get the contract instance from factory
   let owner: SignerWithAddress;
   let creator: SignerWithAddress;
   let subscriber: SignerWithAddress;
   let otherUser: SignerWithAddress;

   const MONTHLY_PRICE = ethers.parseEther("0.1"); // 0.1 ETH
   const WEEKLY_PRICE = ethers.parseEther("0.025"); // 0.025 ETH
   const BIWEEKLY_PRICE = ethers.parseEther("0.05"); // 0.05 ETH
   const MIN_WITHDRAWAL = ethers.parseEther("0.01"); // 0.01 ETH
   const USDC_MONTHLY_PRICE = BigInt(1000000); // 1 USDC
   const MIN_USDC_WITHDRAWAL = BigInt(1000000); // 1 USDC

   beforeEach(async function () {
      [owner, creator, subscriber, otherUser] = await ethers.getSigners();

      // Deploy mock USDC token
      const MockToken = await ethers.getContractFactory("MockERC20");
      mockUsdc = await MockToken.deploy("Mock USDC", "mUSDC", 6);
      usdcToken = await ethers.getContractAt("IERC20", await mockUsdc.getAddress());

      // Deploy SubscriptionManager with mock USDC address
      const SubscriptionManager = await ethers.getContractFactory("SubscriptionManager");
      subscriptionManager = await SubscriptionManager.deploy(await mockUsdc.getAddress());

      // Mint some USDC to test accounts
      await mockUsdc.mint(subscriber.address, BigInt(10000000)); // 10 USDC
      await mockUsdc.mint(otherUser.address, BigInt(10000000)); // 10 USDC
   });

   describe("Creator Settings", function () {
      it("should allow creator to set their settings with ETH", async function () {
         await subscriptionManager.connect(creator).setCreatorSettings(
            MONTHLY_PRICE,
            0, // MONTHLY
            0 // ETH
         );

         const settings = await subscriptionManager.getCreatorSettings(
            creator.address
         );
         expect(settings.price).to.equal(MONTHLY_PRICE);
         expect(settings.payoutSchedule).to.equal(0); // MONTHLY
         expect(settings.paymentToken).to.equal(0); // ETH
         expect(settings.isActive).to.be.true;
      });

      it("should allow creator to set their settings with USDC", async function () {
         await subscriptionManager.connect(creator).setCreatorSettings(
            USDC_MONTHLY_PRICE,
            0, // MONTHLY
            1 // USDC
         );

         const settings = await subscriptionManager.getCreatorSettings(
            creator.address
         );
         expect(settings.price).to.equal(USDC_MONTHLY_PRICE);
         expect(settings.payoutSchedule).to.equal(0); // MONTHLY
         expect(settings.paymentToken).to.equal(1); // USDC
         expect(settings.isActive).to.be.true;
      });

      it("should not allow zero price", async function () {
         await expect(
            subscriptionManager.connect(creator).setCreatorSettings(
               0,
               0, // MONTHLY
               0 // ETH
            )
         ).to.be.revertedWith("Price must be greater than 0");
      });

      it("should not allow price above maximum", async function () {
         const maxPrice = ethers.parseEther("1001"); // Above MAX_PRICE
         await expect(
            subscriptionManager.connect(creator).setCreatorSettings(
               maxPrice,
               0, // MONTHLY
               0 // ETH
            )
         ).to.be.revertedWith("Price exceeds maximum limit");
      });
   });

   describe("Subscription", function () {
      describe("ETH Subscriptions", function () {
         beforeEach(async function () {
            await subscriptionManager.connect(creator).setCreatorSettings(
               MONTHLY_PRICE,
               0, // MONTHLY
               0 // ETH
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
            expect(subscription.paymentToken).to.equal(0); // ETH
         });

         it("should not allow subscription with insufficient payment", async function () {
            const insufficientPayment = MONTHLY_PRICE - BigInt(1);
            await expect(
               subscriptionManager
                  .connect(subscriber)
                  .subscribe(creator.address, {
                     value: insufficientPayment,
                  })
            ).to.be.revertedWith("Insufficient payment");
         });

         it("should not allow self-subscription", async function () {
            await expect(
               subscriptionManager.connect(creator).subscribe(creator.address, {
                  value: MONTHLY_PRICE,
               })
            ).to.be.revertedWith("Cannot subscribe to self");
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

      describe("USDC Subscriptions", function () {
         beforeEach(async function () {
            await subscriptionManager.connect(creator).setCreatorSettings(
               USDC_MONTHLY_PRICE,
               0, // MONTHLY
               1 // USDC
            );

            // Approve USDC spending
            await usdcToken
               .connect(subscriber)
               .approve(
                  await subscriptionManager.getAddress(),
                  USDC_MONTHLY_PRICE
               );
         });

         it("should allow user to subscribe with USDC", async function () {
            await subscriptionManager
               .connect(subscriber)
               .subscribe(creator.address);

            const subscriptionId = 0;
            const subscription = await subscriptionManager.getSubscription(
               subscriptionId
            );
            expect(subscription.subscriber).to.equal(subscriber.address);
            expect(subscription.creator).to.equal(creator.address);
            expect(subscription.amount).to.equal(USDC_MONTHLY_PRICE);
            expect(subscription.status).to.equal(0); // ACTIVE
            expect(subscription.paymentToken).to.equal(1); // USDC
         });

         it("should not allow subscription with ETH when USDC is required", async function () {
            await expect(
               subscriptionManager
                  .connect(subscriber)
                  .subscribe(creator.address, {
                     value: MONTHLY_PRICE,
                  })
            ).to.be.revertedWith("ETH payment not accepted");
         });
      });
   });

   describe("Subscription Validation", function () {
      beforeEach(async function () {
         // Set up creator settings
         await subscriptionManager.connect(creator).setCreatorSettings(
            MONTHLY_PRICE,
            0, // MONTHLY
            0 // ETH
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
            1, // WEEKLY
            0 // ETH
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
            2, // BIWEEKLY
            0 // ETH
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
      describe("ETH Withdrawal", function () {
         beforeEach(async function () {
            await subscriptionManager.connect(creator).setCreatorSettings(
               MONTHLY_PRICE,
               0, // MONTHLY
               0 // ETH
            );
         });

         it("should allow creator to withdraw earnings to specified address", async function () {
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

            // Withdraw to a different address
            const initialBalance = await ethers.provider.getBalance(
               otherUser.address
            );
            const tx = await subscriptionManager
               .connect(creator)
               .withdraw(otherUser.address);
            const receipt = await tx.wait();
            const gasUsed = receipt!.gasUsed * receipt!.gasPrice;
            const finalBalance = await ethers.provider.getBalance(
               otherUser.address
            );

            // Check balance change
            const expectedBalance = initialBalance + earnings;
            expect(finalBalance).to.be.closeTo(
               expectedBalance,
               ethers.parseEther("0.01")
            );

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
               0, // MONTHLY
               0 // ETH
            );

            await subscriptionManager
               .connect(subscriber)
               .subscribe(creator.address, {
                  value: smallAmount,
               });

            // Try to withdraw
            await expect(
               subscriptionManager.connect(creator).withdraw(creator.address)
            ).to.be.revertedWith("Insufficient earnings for withdrawal");
         });

         it("should not allow withdrawal to zero address", async function () {
            // Create subscription
            await subscriptionManager
               .connect(subscriber)
               .subscribe(creator.address, {
                  value: MONTHLY_PRICE,
               });

            // Try to withdraw to zero address
            await expect(
               subscriptionManager.connect(creator).withdraw(ethers.ZeroAddress)
            ).to.be.revertedWith("Invalid destination address");
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
               subscriptionManager
                  .connect(otherUser)
                  .withdraw(otherUser.address)
            ).to.be.revertedWith("Insufficient earnings for withdrawal");
         });
      });

      describe("USDC Withdrawal", function () {
         beforeEach(async function () {
            await subscriptionManager.connect(creator).setCreatorSettings(
               USDC_MONTHLY_PRICE,
               0, // MONTHLY
               1 // USDC
            );

            // Approve and create USDC subscription
            await usdcToken
               .connect(subscriber)
               .approve(
                  await subscriptionManager.getAddress(),
                  USDC_MONTHLY_PRICE
               );
            await subscriptionManager
               .connect(subscriber)
               .subscribe(creator.address);
         });

         it("should allow creator to withdraw USDC earnings", async function () {
            const initialBalance = await usdcToken.balanceOf(otherUser.address);

            await subscriptionManager
               .connect(creator)
               .withdraw(otherUser.address);

            const finalBalance = await usdcToken.balanceOf(otherUser.address);
            expect(finalBalance - initialBalance).to.equal(USDC_MONTHLY_PRICE);

            // Check earnings reset
            const usdcEarnings =
               await subscriptionManager.getCreatorUSDCearnings(
                  creator.address
               );
            expect(usdcEarnings).to.equal(0);
         });

         it("should not allow withdrawal with insufficient USDC earnings", async function () {
            const smallAmount = MIN_USDC_WITHDRAWAL - BigInt(1);
            await subscriptionManager.connect(creator).setCreatorSettings(
               smallAmount,
               0, // MONTHLY
               1 // USDC
            );

            await usdcToken
               .connect(subscriber)
               .approve(await subscriptionManager.getAddress(), smallAmount);
            await subscriptionManager
               .connect(subscriber)
               .subscribe(creator.address);

            // Reset earnings to simulate insufficient amount
            await subscriptionManager.connect(creator).withdraw(creator.address);

            await expect(
               subscriptionManager.connect(creator).withdraw(creator.address)
            ).to.be.revertedWith("Insufficient earnings for withdrawal");
         });
      });

      describe("Mixed Withdrawals", function () {
         beforeEach(async function () {
            // Set up ETH subscription
            await subscriptionManager.connect(creator).setCreatorSettings(
               MONTHLY_PRICE,
               0, // MONTHLY
               0 // ETH
            );
            await subscriptionManager
               .connect(subscriber)
               .subscribe(creator.address, {
                  value: MONTHLY_PRICE,
               });

            // Set up USDC subscription
            await subscriptionManager.connect(creator).setCreatorSettings(
               USDC_MONTHLY_PRICE,
               0, // MONTHLY
               1 // USDC
            );
            await usdcToken
               .connect(otherUser)
               .approve(
                  await subscriptionManager.getAddress(),
                  USDC_MONTHLY_PRICE
               );
            await subscriptionManager
               .connect(otherUser)
               .subscribe(creator.address);
         });

         it("should allow withdrawal of both ETH and USDC in one transaction", async function () {
            const initialEthBalance = await ethers.provider.getBalance(
               otherUser.address
            );
            const initialUsdcBalance = await usdcToken.balanceOf(
               otherUser.address
            );

            await subscriptionManager
               .connect(creator)
               .withdraw(otherUser.address);

            const finalEthBalance = await ethers.provider.getBalance(
               otherUser.address
            );
            const finalUsdcBalance = await usdcToken.balanceOf(
               otherUser.address
            );

            expect(finalEthBalance - initialEthBalance).to.equal(MONTHLY_PRICE);
            expect(finalUsdcBalance - initialUsdcBalance).to.equal(
               USDC_MONTHLY_PRICE
            );

            // Check earnings reset
            const ethEarnings = await subscriptionManager.getCreatorEarnings(
               creator.address
            );
            const usdcEarnings =
               await subscriptionManager.getCreatorUSDCearnings(
                  creator.address
               );
            expect(ethEarnings).to.equal(0);
            expect(usdcEarnings).to.equal(0);
         });
      });
   });

   describe("Pausable", function () {
      it("should allow owner to pause and unpause", async function () {
         await subscriptionManager.connect(owner).pause();
         expect(await subscriptionManager.paused()).to.be.true;

         await subscriptionManager.connect(owner).unpause();
         expect(await subscriptionManager.paused()).to.be.false;
      });

      it("should not allow non-owner to pause", async function () {
         await expect(
            subscriptionManager.connect(creator).pause()
         ).to.be.revertedWithCustomError(
            subscriptionManager,
            "OwnableUnauthorizedAccount"
         );
      });

      it("should not allow operations when paused", async function () {
         await subscriptionManager.connect(owner).pause();

         await expect(
            subscriptionManager.connect(creator).setCreatorSettings(
               MONTHLY_PRICE,
               0, // MONTHLY
               0 // ETH
            )
         ).to.be.revertedWithCustomError(subscriptionManager, "EnforcedPause");
      });
   });

   describe("Multiple Withdrawals and Events", function () {
      beforeEach(async function () {
         await subscriptionManager.connect(creator).setCreatorSettings(
            MONTHLY_PRICE,
            0, // MONTHLY
            0 // ETH
         );
      });

      it("should allow multiple withdrawals to different addresses", async function () {
         // Create multiple subscriptions
         await subscriptionManager
            .connect(subscriber)
            .subscribe(creator.address, { value: MONTHLY_PRICE });
         await subscriptionManager
            .connect(otherUser)
            .subscribe(creator.address, { value: MONTHLY_PRICE });

         const totalEarnings = MONTHLY_PRICE * BigInt(2);
         const halfEarnings = totalEarnings / BigInt(2);

         // First withdrawal
         await expect(
            subscriptionManager
               .connect(creator)
               .withdraw(subscriber.address)
         )
            .to.emit(subscriptionManager, "Withdrawal")
            .withArgs(
               creator.address,
               subscriber.address,
               totalEarnings,
               0, // USDC amount
               await time.latest()
            );

         // Try second withdrawal - should fail due to no earnings
         await expect(
            subscriptionManager
               .connect(creator)
               .withdraw(otherUser.address)
         ).to.be.revertedWith("Insufficient earnings for withdrawal");
      });

      it("should handle subscription expiration correctly", async function () {
         await subscriptionManager
            .connect(subscriber)
            .subscribe(creator.address, { value: MONTHLY_PRICE });
         const subscriptionId = 0;

         // Fast forward 31 days
         await time.increase(time.duration.days(31));

         const subscription = await subscriptionManager.getSubscription(
            subscriptionId
         );
         expect(subscription.status).to.equal(0); // Still ACTIVE

         // Validate subscription should return false
         const isValid = await subscriptionManager.isValidSubscription(
            subscriber.address,
            creator.address
         );
         expect(isValid).to.be.false;
      });

      it("should handle different payout schedule durations correctly", async function () {
         // Test weekly duration
         await subscriptionManager
            .connect(creator)
            .setCreatorSettings(WEEKLY_PRICE, 1, 0); // WEEKLY, ETH
         await subscriptionManager
            .connect(subscriber)
            .subscribe(creator.address, { value: WEEKLY_PRICE });
         const weeklySubId =
            (await subscriptionManager.totalSubscriptions()) - BigInt(1);
         const weeklySubscription = await subscriptionManager.getSubscription(
            weeklySubId
         );

         // Test biweekly duration
         await subscriptionManager
            .connect(creator)
            .setCreatorSettings(BIWEEKLY_PRICE, 2, 0); // BIWEEKLY, ETH
         await subscriptionManager
            .connect(otherUser)
            .subscribe(creator.address, { value: BIWEEKLY_PRICE });
         const biweeklySubId =
            (await subscriptionManager.totalSubscriptions()) - BigInt(1);
         const biweeklySubscription = await subscriptionManager.getSubscription(
            biweeklySubId
         );

         // Verify durations
         expect(
            biweeklySubscription.endDate - biweeklySubscription.startDate
         ).to.equal(BigInt(14 * 24 * 60 * 60));
         expect(
            weeklySubscription.endDate - weeklySubscription.startDate
         ).to.equal(BigInt(7 * 24 * 60 * 60));
      });
   });
});
