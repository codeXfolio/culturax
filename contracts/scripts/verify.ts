import { ethers } from "hardhat";
import { run } from "hardhat";

interface Deployment {
   network: string;
   chainId: string;
   CulturaXToken: string;
   NFTGenerator: string;
   deployer: string;
   timestamp: string;
}

interface DeploymentHistory {
   deployments: Deployment[];
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
   console.log("\nVerifying CulturaXToken...");
   await run("verify:verify", {
      address: deployment.CulturaXToken,
      constructorArguments: [
         "CulturaX Token",
         "CX",
         ethers.parseEther("1000000").toString(),
         ethers.parseEther("1000").toString(),
         ethers.parseEther("10000").toString(),
         "60",
      ],
   });

   // Verify NFTGenerator
   console.log("\nVerifying NFTGenerator...");
   await run("verify:verify", {
      address: deployment.NFTGenerator,
      constructorArguments: [],
   });

   console.log("\nVerification completed successfully!");
}

main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
