"use client";

import {
   type NexusAccount,
   type NexusClient,
   createSmartAccountClient,
   toNexusAccount,
} from "@biconomy/abstractjs";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useLogin } from "@privy-io/react-auth";
import { http, useAccount } from "wagmi";
import { Button } from "./ui/button";
import { useLogout } from "@privy-io/react-auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { AA_CONFIG } from "../context/config";
import { soneiumMinato } from "viem/chains";
import { createPublicClient, createWalletClient, custom } from "viem";
import {
   createPaymasterClient,
   GetPaymasterDataParameters,
} from "viem/account-abstraction";
import { Wallet } from "lucide-react";

const {
   MOCK_ATTESTER_ADDRESS,
   NEXUS_K1_VALIDATOR_FACTORY_ADDRESS,
   NEXUS_K1_VALIDATOR_ADDRESS,
   MINATO_RPC,
   BUNDLER_URL,
   PAYMASTER_SERVICE_URL,
} = AA_CONFIG;

const scsContext = { calculateGasLimits: true, policyId: "sudo" };

const chain = soneiumMinato;

const publicClient = createPublicClient({
   transport: http(MINATO_RPC),
   chain,
});

const paymasterClient = createPaymasterClient({
   transport: http(PAYMASTER_SERVICE_URL),
});

export function SmartWallet() {
   const { isConnected, address } = useAccount();
   const { login } = useLogin();
   const { ready, authenticated, user } = usePrivy();
   const { logout } = useLogout();

   const isLoginDisabled = !ready;
   const isLoggedIn = authenticated && ready;

   const { wallets } = useWallets();
   const [nexusAccount, setNexusAccount] = useState<NexusAccount>();
   const [nexusClient, setNexusClient] = useState<NexusClient>();

   const didLogout = useRef(false);

   useEffect(() => {
      if (!authenticated && didLogout.current === false) {
         didLogout.current = true;
      }

      if (authenticated && didLogout.current) {
         // Reset on login
         didLogout.current = false;
      }
   }, [authenticated]);

   useEffect(() => {
      if (!authenticated) {
         return;
      }
      if (!wallets[0]?.address) {
         setNexusAccount(undefined);
         setNexusClient(undefined);
         return;
      }

      getSmartAccountInstance();
   }, [wallets[0]?.address]);

   useEffect(() => {
      if (wallets.length > 0) {
         console.log("wallets", wallets);
      }
   }, [wallets]);

   useEffect(() => {
      if (nexusAccount) {
         initClient();
      }
   }, [nexusAccount]);

   useEffect(() => {
      if (nexusClient) {
         console.log("Nexus client instance:", nexusClient);
      }
   }, [nexusClient]);

   const getSmartAccountInstance = async () => {
      const provider = await wallets[0].getEthereumProvider();

      const walletClient = createWalletClient({
         account: wallets[0].address as `0x${string}`,
         chain: soneiumMinato, // or use `chain` if it's your custom viem chain
         transport: custom(provider),
      });
      const nexusAccountInstance = await toNexusAccount({
         signer: walletClient,
         chain,
         transport: http(),
         attesters: [MOCK_ATTESTER_ADDRESS],
         factoryAddress: NEXUS_K1_VALIDATOR_FACTORY_ADDRESS,
         validatorAddress: NEXUS_K1_VALIDATOR_ADDRESS,
         index: BigInt(1000029),
      });

      console.log("Nexus Address:", nexusAccountInstance.address);
      setNexusAccount(nexusAccountInstance);
   };

   const initClient = async () => {
      try {
         const nexusClientInstance = createSmartAccountClient({
            account: nexusAccount,
            transport: http(BUNDLER_URL),
            client: publicClient,
            paymaster: {
               async getPaymasterData(
                  pmDataParams: GetPaymasterDataParameters
               ) {
                  pmDataParams.paymasterPostOpGasLimit = BigInt(100000);
                  pmDataParams.paymasterVerificationGasLimit = BigInt(200000);
                  pmDataParams.verificationGasLimit = BigInt(500000);
                  const paymasterResponse =
                     await paymasterClient.getPaymasterData(pmDataParams);
                  return paymasterResponse;
               },
               async getPaymasterStubData(
                  pmStubDataParams: GetPaymasterDataParameters
               ) {
                  const paymasterStubResponse =
                     await paymasterClient.getPaymasterStubData(
                        pmStubDataParams
                     );
                  return paymasterStubResponse;
               },
            },
            paymasterContext: scsContext,
            userOperation: {
               estimateFeesPerGas: async () => {
                  return {
                     maxFeePerGas: BigInt(10000000),
                     maxPriorityFeePerGas: BigInt(10000000),
                  };
               },
            },
         });

         setNexusClient(nexusClientInstance);

         if (!localStorage.getItem("authSignature")) {
            const provider = await wallets[0].getEthereumProvider();
            const walletClient = createWalletClient({
               account: wallets[0].address as `0x${string}`,
               chain: soneiumMinato,
               transport: custom(provider),
            });
            const signature = await walletClient.signMessage({
               message: "Welcome to CulturaX",
            });
            localStorage.setItem("authSignature", signature);
         }
      } catch (error) {
         console.error("Error initializing kernel client", error);
      }
   };

   return (
      <>
         {isLoggedIn ? (
            <Button onClick={logout}>Logout</Button>
         ) : (
            <Button
               variant="outline"
               size="sm"
               className="gap-2 hidden md:flex"
               onClick={login}
            >
               <Wallet className="h-4 w-4" /> Connect Wallet
            </Button>
         )}
      </>
   );
}
