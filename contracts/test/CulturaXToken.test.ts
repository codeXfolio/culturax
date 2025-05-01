import { expect } from "chai";
import { ethers } from "hardhat";
import { CulturaXToken } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("CulturaXToken", function () {
   let token: CulturaXToken;
   let owner: SignerWithAddress;
   let user1: SignerWithAddress;
   let user2: SignerWithAddress;

   const NAME = "CulturaX Token";
   const SYMBOL = "CX";
   const INITIAL_SUPPLY = ethers.parseEther("100000000");
   const MAX_TRANSACTION = ethers.parseEther("1000000");
   const MAX_WALLET = ethers.parseEther("10000000");
   const COOLDOWN_PERIOD = 10; // 10 seconds

   beforeEach(async function () {
      [owner, user1, user2] = await ethers.getSigners();

      const Token = await ethers.getContractFactory("CulturaXToken");
      token = await Token.deploy(
         NAME,
         SYMBOL,
         INITIAL_SUPPLY,
         MAX_TRANSACTION,
         MAX_WALLET,
         COOLDOWN_PERIOD
      );
   });

   describe("Initial State", function () {
      it("should have correct name and symbol", async function () {
         expect(await token.name()).to.equal(NAME);
         expect(await token.symbol()).to.equal(SYMBOL);
      });

      it("should have correct initial supply", async function () {
         expect(await token.totalSupply()).to.equal(INITIAL_SUPPLY);
         expect(await token.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY);
      });

      it("should have correct anti-whale parameters", async function () {
         expect(await token.maxTransactionAmount()).to.equal(MAX_TRANSACTION);
         expect(await token.maxWalletBalance()).to.equal(MAX_WALLET);
         expect(await token.cooldownPeriod()).to.equal(COOLDOWN_PERIOD);
      });
   });

   describe("Transfer Restrictions", function () {
      beforeEach(async function () {
         // Transfer some tokens to user1 for testing
         await token.transfer(user1.address, ethers.parseEther("2000"));
      });

      it("should allow transfer within limits", async function () {
         const transferAmount = ethers.parseEther("100");
         await token.connect(user1).transfer(user2.address, transferAmount);
         expect(await token.balanceOf(user2.address)).to.equal(transferAmount);
      });

      it("should prevent transfer exceeding max transaction amount", async function () {
         const transferAmount = MAX_TRANSACTION + ethers.parseEther("1");
         await expect(
            token.connect(user1).transfer(user2.address, transferAmount)
         ).to.be.revertedWith("Transfer amount exceeds max transaction amount");
      });

      it("should prevent transfer exceeding max wallet balance", async function () {
         // First transfer max wallet balance
         await token.transfer(user2.address, MAX_WALLET);

         // Try to transfer more
         await expect(
            token.connect(user1).transfer(user2.address, ethers.parseEther("1"))
         ).to.be.revertedWith("Transfer would exceed max wallet balance");
      });

      it("should enforce cooldown period", async function () {
         const transferAmount = ethers.parseEther("100");
         await token.connect(user1).transfer(user2.address, transferAmount);

         // Try to transfer again immediately
         await expect(
            token.connect(user1).transfer(user2.address, transferAmount)
         ).to.be.revertedWith("Must wait for cooldown period");
      });
   });

   describe("Owner Functions", function () {
      it("should allow owner to update max transaction amount", async function () {
         const newAmount = ethers.parseEther("2000");
         await token.setMaxTransactionAmount(newAmount);
         expect(await token.maxTransactionAmount()).to.equal(newAmount);
      });

      it("should allow owner to update max wallet balance", async function () {
         const newAmount = ethers.parseEther("20000");
         await token.setMaxWalletBalance(newAmount);
         expect(await token.maxWalletBalance()).to.equal(newAmount);
      });

      it("should allow owner to update cooldown period", async function () {
         const newPeriod = 120;
         await token.setCooldownPeriod(newPeriod);
         expect(await token.cooldownPeriod()).to.equal(newPeriod);
      });

      it("should allow owner to exclude addresses from limits", async function () {
         await token.excludeFromLimits(user1.address, true);
         expect(await token.isExcludedFromLimits(user1.address)).to.be.true;

         // Should be able to transfer without restrictions
         const transferAmount = MAX_TRANSACTION + ethers.parseEther("1");
         await token.transfer(user1.address, transferAmount);
         await token.connect(user1).transfer(user2.address, transferAmount);
         expect(await token.balanceOf(user2.address)).to.equal(transferAmount);
      });
   });
});
