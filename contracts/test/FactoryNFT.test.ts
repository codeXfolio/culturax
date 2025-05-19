import { expect } from "chai";
import { ethers } from "hardhat";
import { NFTGenerator } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("NFTGenerator", function () {
   let nftGenerator: NFTGenerator;
   let owner: SignerWithAddress;
   let user1: SignerWithAddress;
   let user2: SignerWithAddress;
   const TEST_URI = "ipfs://test-uri";

   beforeEach(async function () {
      [owner, user1, user2] = await ethers.getSigners();
      const NFTGenerator = await ethers.getContractFactory("NFTGenerator");
      nftGenerator = await NFTGenerator.deploy();
   });

   describe("Initial State", function () {
      it("should have correct name and symbol", async function () {
         expect(await nftGenerator.name()).to.equal("MyNFT");
         expect(await nftGenerator.symbol()).to.equal("MNFT");
      });

      it("should have initial currentId of 0", async function () {
         expect(await nftGenerator.getCurrentId()).to.equal(0);
      });
   });

   describe("NFT Generation", function () {
      it("should generate NFT and assign to correct owner", async function () {
         await nftGenerator.connect(user1).generateNFT(TEST_URI);

         expect(await nftGenerator.getCurrentId()).to.equal(1);
         expect(await nftGenerator.ownerOf(1)).to.equal(user1.address);
         expect(await nftGenerator.tokenURI(1)).to.equal(TEST_URI);
      });

      it("should generate multiple NFTs with correct IDs", async function () {
         await nftGenerator.connect(user1).generateNFT(TEST_URI);
         await nftGenerator.connect(user1).generateNFT(TEST_URI);

         expect(await nftGenerator.getCurrentId()).to.equal(2);
         expect(await nftGenerator.ownerOf(1)).to.equal(user1.address);
         expect(await nftGenerator.ownerOf(2)).to.equal(user1.address);
      });

      it("should allow different users to generate NFTs", async function () {
         await nftGenerator.connect(user1).generateNFT(TEST_URI);
         await nftGenerator.connect(user2).generateNFT(TEST_URI);

         expect(await nftGenerator.ownerOf(1)).to.equal(user1.address);
         expect(await nftGenerator.ownerOf(2)).to.equal(user2.address);
      });
   });
});
