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
import { SetStateAction, Dispatch } from "react";
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

        // Add retry logic for module installation
        let retries = 3;
        let lastError;

        while (retries > 0) {
          try {
            // Only pass the module parameter as that's what InstallModuleParameters expects
            const opHash = await this.nexusClient.installModule({
              module: sessionsModule,
            });

            const result = await this.nexusClient.waitForUserOperationReceipt({
              hash: opHash,
              timeout: 120000, // 2 minute timeout for module installation
            });

            console.log("Smart Sessions module installed successfully");
            return result.receipt.transactionHash;
          } catch (error) {
            lastError = error;
            console.warn(
              `Module installation attempt ${4 - retries} failed:`,
              error
            );
            retries--;
            if (retries > 0) {
              // Wait before retrying with exponential backoff
              await new Promise((resolve) =>
                setTimeout(resolve, 2000 * (4 - retries))
              );
            }
          }
        }

        throw (
          lastError ||
          new Error("Failed to install module after multiple attempts")
        );
      }

      return null; // Module already installed
    } catch (error) {
      console.error("Error installing session module:", error);
      throw error;
    }
  };

  createSession = async (actions: ActionPolicyInfo[]) => {
    try {
      if (!this.nexusClient) {
        throw new Error("Nexus client not initialized");
      }

      // First ensure the session module is installed
      await this.installSmartSessionModule();

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

      // Ensure all actions have proper gas limits and sudo permissions
      const sessionRequestedInfo: CreateSessionDataParams[] = [
        {
          sessionPublicKey: sessionOwner.address,
          actionPoliciesInfo: actions.map((action) => ({
            ...action,
            sudo: true,
            gasLimit: BigInt(10000000), // Increased gas limit
          })),
        },
      ];

      // Add retry logic for session creation
      let retries = 3;
      let lastError;

      while (retries > 0) {
        try {
          const createSessionsResponse =
            await nexusSessionClient.grantPermission({
              sessionRequestedInfo,
            });

          const sessionData: SessionData = {
            granter: this.nexusClient.account.address,
            description: `Session for ${actions
              .map((a) => a.contractAddress)
              .join(", ")}`,
            sessionPublicKey: sessionOwner.address,
            moduleData: {
              permissionIds: createSessionsResponse.permissionIds,
              action: createSessionsResponse.action,
              mode: SmartSessionMode.USE,
              sessions: createSessionsResponse.sessions,
            },
          };

          // Wait for transaction with increased timeout
          const result = await this.nexusClient.waitForUserOperationReceipt({
            hash: createSessionsResponse.userOpHash,
            timeout: 120000, // 2 minute timeout
          });

          console.log("Session created successfully");
          return sessionData;
        } catch (error) {
          lastError = error;
          console.warn(
            `Session creation attempt ${4 - retries} failed:`,
            error
          );
          retries--;
          if (retries > 0) {
            // Wait before retrying with exponential backoff
            await new Promise((resolve) =>
              setTimeout(resolve, 2000 * (4 - retries))
            );
          }
        }
      }

      throw (
        lastError ||
        new Error("Failed to create session after multiple attempts")
      );
    } catch (error) {
      console.error("Error creating session:", error);
      throw error;
    }
  };

  isSessionValid = async (sessionData: SessionData) => {
    try {
      if (!this.nexusClient) {
        throw new Error("Nexus client not initialized");
      }

      const isValid = await isSessionEnabled({
        client: this.nexusClient.account.client as PublicClient,
        account: {
          type: "erc7579-implementation",
          address: this.nexusClient.account.address as `0x${string}`,
          deployedOnChains: [this.chain.id],
        },
        permissionId: sessionData.moduleData.permissionIds[0],
      });

      if (!isValid) {
        console.warn("Session validation failed");
      }

      return isValid;
    } catch (error) {
      console.error("Error checking session validity:", error);
      return false;
    }
  };
}
