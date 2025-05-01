import { ethers } from "hardhat";
import { run } from "hardhat";

interface Deployment {
   network: string;
   chainId: string;
   CulturaXToken: string;
   NFTGenerator: string;
   SubscriptionManager: string;
   deployer: string;
   timestamp: string;
}

interface DeploymentHistory {
   deployments: Deployment[];
}

async function verifyContract(
   name: string,
   address: string,
   constructorArguments: any[] = []
) {
   console.log(`\nVerifying ${name}...`);
   try {
      await run("verify:verify", {
         address,
         constructorArguments,
      });
      console.log(`${name} verified successfully!`);
   } catch (error) {
      if (error instanceof Error) {
         if (error.message.includes("Already Verified")) {
            console.log(`${name} is already verified`);
         } else {
            console.error(`Error verifying ${name}:`, error.message);
         }
      } else {
         console.error(`Unknown error verifying ${name}`);
      }
   }
}

async function main() {
   // Read deployment addresses
   const fs = require("fs");
   const path = require("path");
   const deploymentPath = path.join(
      __dirname,
      "../deployments/deployment.json"
   );

   if (!fs.existsSync(deploymentPath)) {
      console.error(
         "Deployment file not found. Please deploy contracts first."
      );
      process.exit(1);
   }

   const deploymentHistory: DeploymentHistory = JSON.parse(
      fs.readFileSync(deploymentPath, "utf8")
   );

   // Get the network from command line arguments
   const network = process.env.HARDHAT_NETWORK || "hardhat";
   const deployment = deploymentHistory.deployments.find(
      (d) => d.network === network
   );

   if (!deployment) {
      console.error(`No deployment found for network: ${network}`);
      process.exit(1);
   }

   console.log("Verifying contracts on network:", deployment.network);

   // Verify CulturaXToken
   await verifyContract("CulturaXToken", deployment.CulturaXToken, [
      "CulturaX Token",
      "CX",
      ethers.parseEther("1000000").toString(),
      ethers.parseEther("1000").toString(),
      ethers.parseEther("10000").toString(),
      "60",
   ]);

   // Verify NFTGenerator
   await verifyContract("NFTGenerator", deployment.NFTGenerator);

   // Verify SubscriptionManager
   await verifyContract("SubscriptionManager", deployment.SubscriptionManager);

   console.log("\nVerification process completed!");
}

main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error("Verification failed:", error);
      process.exit(1);
   });
