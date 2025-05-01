import { ethers } from "hardhat";

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
   const [deployer] = await ethers.getSigners();
   console.log("Deploying contracts with the account:", deployer.address);

   // CulturaXToken deployment
   console.log("\nDeploying CulturaXToken...");
   const CulturaXToken = await ethers.getContractFactory("CulturaXToken");
   const token = await CulturaXToken.deploy(
      "CulturaX Token", // name
      "CX", // symbol
      ethers.parseEther("1000000"), // initial supply: 1,000,000 tokens
      ethers.parseEther("1000"), // max transaction amount: 1,000 tokens
      ethers.parseEther("10000"), // max wallet balance: 10,000 tokens
      60 // cooldown period: 60 seconds
   );
   await token.waitForDeployment();
   console.log("CulturaXToken deployed to:", await token.getAddress());

   // NFTGenerator deployment
   console.log("\nDeploying NFTGenerator...");
   const NFTGenerator = await ethers.getContractFactory("NFTGenerator");
   const nftGenerator = await NFTGenerator.deploy();
   await nftGenerator.waitForDeployment();
   console.log("NFTGenerator deployed to:", await nftGenerator.getAddress());

   // Save deployment addresses to a file
   const fs = require("fs");
   const path = require("path");
   const deploymentsDir = path.join(__dirname, "../deployments");

   if (!fs.existsSync(deploymentsDir)) {
      fs.mkdirSync(deploymentsDir);
   }

   const deploymentPath = path.join(deploymentsDir, "deployment.json");
   let deploymentHistory: DeploymentHistory = { deployments: [] };

   // Load existing deployment history if it exists
   if (fs.existsSync(deploymentPath)) {
      deploymentHistory = JSON.parse(fs.readFileSync(deploymentPath, "utf8"));
   }

   const network = await ethers.provider.getNetwork();
   const newDeployment: Deployment = {
      network: network.name,
      chainId: network.chainId.toString(),
      CulturaXToken: await token.getAddress(),
      NFTGenerator: await nftGenerator.getAddress(),
      deployer: deployer.address,
      timestamp: new Date().toISOString(),
   };

   // Check if deployment for this network and chainId already exists
   const existingDeploymentIndex = deploymentHistory.deployments.findIndex(
      (d) =>
         d.network === network.name && d.chainId === network.chainId.toString()
   );

   if (existingDeploymentIndex !== -1) {
      // Update existing deployment
      deploymentHistory.deployments[existingDeploymentIndex] = newDeployment;
      console.log(
         `Updated deployment for network ${network.name} (chainId: ${network.chainId})`
      );
   } else {
      // Add new deployment
      deploymentHistory.deployments.push(newDeployment);
      console.log(
         `Added new deployment for network ${network.name} (chainId: ${network.chainId})`
      );
   }

   // Sort deployments by timestamp (newest first)
   deploymentHistory.deployments.sort(
      (a, b) =>
         new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
   );

   fs.writeFileSync(deploymentPath, JSON.stringify(deploymentHistory, null, 2));

   console.log("\nDeployment information saved to deployments/deployment.json");
   console.log("Network:", network.name);
   console.log("Chain ID:", network.chainId);
   console.log("CulturaXToken:", await token.getAddress());
   console.log("NFTGenerator:", await nftGenerator.getAddress());
}

main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
