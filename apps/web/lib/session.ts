import {
  type CreateSessionDataParams,
  type NexusClient,
  type SessionData,
  createSmartAccountClient,
  smartSessionCreateActions,
  smartSessionUseActions,
  toNexusAccount,
  toSmartSessionsValidator,
} from "@biconomy/abstractjs";
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
  public moduleInstall;
  public session;
  public nexusClient;

  constructor(
    moduleInstall: SessionModuleInstall,
    session: Session,
    nexusClient: NexusClient
  ) {
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
    this.moduleInstall = moduleInstall;
    this.session = session;
    this.nexusClient = nexusClient;
  }

  checkIsSessionModuleInstalled = async () => {
    const sessionsModule = getSmartSessionsValidator({});
    const isSmartSessionsModuleInstalled =
      await this.nexusClient.isModuleInstalled({
        module: sessionsModule,
      });
    if (isSmartSessionsModuleInstalled) {
      console.log("Smart Sessions module already installed");
    } else {
      console.log("Smart Sessions module not installed");
    }
    this.moduleInstall.setIsSessionModuleInstalled(
      isSmartSessionsModuleInstalled
    );
  };

  installSmartSessionModule = async () => {
    try {
      if (!this.nexusClient) {
        throw new Error("Nexus client not initialized");
      }
      const sessionsModule = getSmartSessionsValidator({});

      if (!this.moduleInstall.isSessionModuleInstalled) {
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
        this.moduleInstall.setIsSessionModuleInstalled(true);
      }
    } catch (error) {
      console.error("Error creating session", error);
    }
  };

  createSession = async () => {
    try {
      if (!this.nexusClient) {
        return;
      }

      if (!this.moduleInstall.isSessionModuleInstalled) {
        await this.installSmartSessionModule();
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
          actionPoliciesInfo: [
            {
              contractAddress: AA_CONFIG.USDC_ADDRESS,
              functionSelector: toFunctionSelector("transfer(address,uint256)"),
              sudo: true,
            },
            {
              contractAddress: AA_CONFIG.CULTURA_X_ADDRESS,
              functionSelector: toFunctionSelector("transfer(address,uint256)"),
              sudo: true,
            },
            {
              contractAddress: AA_CONFIG.SUBSCRIPTION_MANAGER_ADDRESS,
              functionSelector: toFunctionSelector("subscribe(address)"),
              sudo: true,
            },
          ],
        },
      ];

      const createSessionsResponse = await nexusSessionClient.grantPermission({
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

      this.session.setActiveSession(sessionData);
      const cachedSessionData = stringify(sessionData);
      localStorage.setItem("smartSessionData", cachedSessionData);
      console.log("Operation result: ", result.receipt.transactionHash);
      console.log("Session created successfully", createSessionsResponse);
      console.log("Session created successfully");
    } catch (error) {
      console.error("Error creating session", error);
    }
  };
}
