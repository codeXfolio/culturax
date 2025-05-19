import { ethers } from "hardhat";

async function main() {
   const [deployer] = await ethers.getSigners();
   console.log("Setting creator settings with account:", deployer.address);

   // Get the contract instance
   const SubscriptionManager = await ethers.getContractFactory(
      "SubscriptionManager"
   );
   const subscriptionManager = await ethers.getContractAt(
      "SubscriptionManager",
      // Replace this with your deployed contract address
      "0xbF6cae4bF4917b18ba6231D7E21Da5a4EEA20216"
   );

   // Set creator settings
   const price = BigInt(1000000); // 0.1 ETH or equivalent in USDC
   const payoutSchedule = 0; // MONTHLY
   const paymentToken = 1; // USDC

   try {
      const tx = await subscriptionManager.setCreatorSettings(
         price,
         payoutSchedule,
         paymentToken
      );
      await tx.wait();

      console.log("Creator settings updated successfully!");
      console.log("Transaction hash:", tx.hash);

      // Verify the settings were set correctly
      const settings = await subscriptionManager.getCreatorSettings(
         deployer.address
      );
      console.log("\nCurrent settings:");
      console.log("Price:", settings.price);
      console.log(
         "Payout Schedule:",
         ["MONTHLY", "WEEKLY", "BIWEEKLY"][Number(settings.payoutSchedule)]
      );
      console.log(
         "Payment Token:",
         ["ETH", "USDC"][Number(settings.paymentToken)]
      );
      console.log("Is Active:", settings.isActive);
   } catch (error) {
      console.error("Error setting creator settings:", error);
      process.exit(1);
   }
}

main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
