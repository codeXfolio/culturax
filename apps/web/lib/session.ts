import {
   type CreateSessionDataParams,
   type StartaleAccountClient,
   type SessionData,
   smartSessionCreateActions,
   toSmartSessionsValidator,
   ActionPolicyInfo,
} from "startale-aa-sdk";
import {
   SmartSessionMode,
   getSmartSessionsValidator,
   isSessionEnabled,
} from "@rhinestone/module-sdk";
import { SetStateAction, Dispatch, useEffect, useState } from "react";
import {
   type PublicClient,
   createPublicClient,
   encodeFunctionData,
   stringify,
   toFunctionSelector,
} from "viem";
import {
   type GetPaymasterDataParameters,
   createBundlerClient,
   createPaymasterClient,
} from "viem/account-abstraction";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { soneiumMinato } from "viem/chains";
import { http } from "wagmi";
import { AA_CONFIG } from "@/context/config";

interface SessionModuleInstall {
   isSessionModuleInstalled: boolean;
   setIsSessionModuleInstalled: Dispatch<SetStateAction<boolean>>;
}

interface Session {
   activeSession: SessionData | null;
   setActiveSession: Dispatch<SetStateAction<SessionData | null>>;
}

export class SmartSession {
   public chain;
   public publicClient;
   public bundlerClient;
   public paymasterClient;
   public nexusClient;

   constructor(nexusClient: StartaleAccountClient) {
      this.chain = soneiumMinato;
      this.publicClient = createPublicClient({
         transport: http(AA_CONFIG.MINATO_RPC),
         chain: this.chain,
      });
      this.bundlerClient = createBundlerClient({
         client: this.publicClient,
         transport: http(AA_CONFIG.BUNDLER_URL),
      });
      this.paymasterClient = createPaymasterClient({
         transport: http(AA_CONFIG.PAYMASTER_SERVICE_URL),
      });
      this.nexusClient = nexusClient;
   }

   installSmartSessionModule = async () => {
      try {
         if (!this.nexusClient) {
            throw new Error("Nexus client not initialized");
         }
         const sessionsModule = getSmartSessionsValidator({});

         const isSmartSessionsModuleInstalled =
            await this.nexusClient.isModuleInstalled({
               module: sessionsModule,
            });

         if (!isSmartSessionsModuleInstalled) {
            console.log("Installing Smart Sessions module");
            const opHash = await this.nexusClient.installModule({
               module: sessionsModule,
            });

            console.log("Operation hash: ", opHash);

            const result = await this.nexusClient.waitForUserOperationReceipt({
               hash: opHash,
            });
            console.log("Operation result: ", result.receipt.transactionHash);
            console.log("Smart Sessions module installed successfully");
         }
      } catch (error) {
         console.error("Error creating session", error);
      }
   };

   createSession = async (actions: ActionPolicyInfo[]) => {
      try {
         if (!this.nexusClient) {
            return;
         }

         console.log("Creating session");
         let ownerKey = localStorage.getItem("sessionOwnerKey");
         if (!ownerKey) {
            ownerKey = generatePrivateKey();
            localStorage.setItem("sessionOwnerKey", ownerKey);
         }
         const sessionOwner = privateKeyToAccount(ownerKey as `0x${string}`);
         const sessionsModule = toSmartSessionsValidator({
            account: this.nexusClient.account,
            signer: sessionOwner,
         });

         const nexusSessionClient = this.nexusClient.extend(
            smartSessionCreateActions(sessionsModule)
         );

         const sessionRequestedInfo: CreateSessionDataParams[] = [
            {
               sessionPublicKey: sessionOwner.address, // session key signer
               actionPoliciesInfo: actions,
            },
         ];

         const createSessionsResponse =
            await nexusSessionClient.grantPermission({
               sessionRequestedInfo,
            });

         const sessionData: SessionData = {
            granter: this.nexusClient.account.address,
            description: `Grant permission to ${AA_CONFIG.USDC_ADDRESS}, ${AA_CONFIG.CULTURA_X_ADDRESS}, and ${AA_CONFIG.SUBSCRIPTION_MANAGER_ADDRESS}`,
            sessionPublicKey: sessionOwner.address,
            moduleData: {
               permissionIds: createSessionsResponse.permissionIds,
               action: createSessionsResponse.action,
               mode: SmartSessionMode.USE,
               sessions: createSessionsResponse.sessions,
            },
         };

         const result = await this.nexusClient.waitForUserOperationReceipt({
            hash: createSessionsResponse.userOpHash,
         });

         console.log("Operation result: ", result.receipt.transactionHash);
         console.log("Session created successfully");

         return sessionData;
      } catch (error) {
         console.error("Error creating session", error);
      }
   };
}
