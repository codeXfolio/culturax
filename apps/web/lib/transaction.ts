import {
  type SessionData,
  createSmartAccountClient,
  smartSessionUseActions,
  toSmartSessionsValidator,
  toStartaleSmartAccount,
} from "startale-aa-sdk";
import {
  http,
  createPublicClient,
  PublicClient,
  encodeFunctionData,
  type Chain,
} from "viem";
import { isSessionEnabled } from "@rhinestone/module-sdk";
import { AA_CONFIG } from "@/context/config";
import { soneiumMinato } from "viem/chains";
import {
  type GetPaymasterDataParameters,
  createBundlerClient,
  createPaymasterClient,
  type BundlerClient,
  type PaymasterClient,
} from "viem/account-abstraction";
import { privateKeyToAccount } from "viem/accounts";
import { StartaleAccountClient } from "startale-aa-sdk";

interface TransactionParams {
  to: `0x${string}`;
  data: `0x${string}`;
  value?: bigint;
}

export class TransactionService {
  private publicClient: PublicClient;
  private bundlerClient: BundlerClient;
  private paymasterClient: PaymasterClient;
  private nexusClient: StartaleAccountClient;
  private activeSession: SessionData | null;

  constructor(
    nexusClient: StartaleAccountClient,
    activeSession: SessionData | null
  ) {
    this.nexusClient = nexusClient;
    this.activeSession = activeSession;
    this.publicClient = createPublicClient({
      transport: http(AA_CONFIG.MINATO_RPC),
      chain: soneiumMinato,
    }) as PublicClient;

    this.bundlerClient = createBundlerClient({
      client: this.publicClient,
      transport: http(AA_CONFIG.BUNDLER_URL),
    });

    this.paymasterClient = createPaymasterClient({
      transport: http(AA_CONFIG.PAYMASTER_SERVICE_URL),
    });
  }

  private async createSmartSessionClient() {
    if (!this.activeSession) {
      throw new Error("No active session found");
    }

    const isEnabled = await isSessionEnabled({
      client: this.nexusClient.account.client as PublicClient,
      account: {
        type: "erc7579-implementation",
        address: this.nexusClient.account.address as `0x${string}`,
        deployedOnChains: [soneiumMinato.id],
      },
      permissionId: this.activeSession.moduleData.permissionIds[0],
    });

    if (!isEnabled) {
      throw new Error("Session is not enabled");
    }

    const ownerKey = localStorage.getItem("sessionOwnerKey") as `0x${string}`;
    const sessionOwner = privateKeyToAccount(ownerKey);

    const smartSessionNexusClient = createSmartAccountClient({
      account: await toStartaleSmartAccount({
        signer: sessionOwner,
        accountAddress: this.activeSession.granter,
        chain: soneiumMinato,
        transport: http(),
      }),
      transport: http(AA_CONFIG.BUNDLER_URL),
      client: this.publicClient,
      paymaster: {
        getPaymasterData: async (pmDataParams: GetPaymasterDataParameters) => {
          pmDataParams.paymasterPostOpGasLimit = BigInt(100000);
          pmDataParams.paymasterVerificationGasLimit = BigInt(200000);
          pmDataParams.verificationGasLimit = BigInt(500000);

          try {
            const response = await this.paymasterClient.getPaymasterData(
              pmDataParams
            );
            return response;
          } catch (error) {
            console.error("Paymaster data error:", error);
            throw error;
          }
        },
        getPaymasterStubData: async (
          pmStubDataParams: GetPaymasterDataParameters
        ) => {
          try {
            const paymasterStubResponse =
              await this.paymasterClient.getPaymasterStubData(pmStubDataParams);
            paymasterStubResponse.paymasterPostOpGasLimit = BigInt(100000);
            paymasterStubResponse.paymasterVerificationGasLimit =
              BigInt(200000);
            return paymasterStubResponse;
          } catch (error) {
            console.error("Paymaster stub data error:", error);
            throw error;
          }
        },
      },
      paymasterContext: {
        calculateGasLimits: true,
        paymasterId: "pm_test_self_funded",
      },
      userOperation: {
        estimateFeesPerGas: async () => {
          return {
            maxFeePerGas: BigInt(10000000),
            maxPriorityFeePerGas: BigInt(10000000),
          };
        },
      },
      mock: true,
    });

    const usePermissionsModule = toSmartSessionsValidator({
      account: smartSessionNexusClient.account,
      signer: sessionOwner,
      moduleData: this.activeSession.moduleData,
    });

    return smartSessionNexusClient.extend(
      smartSessionUseActions(usePermissionsModule)
    );
  }

  async executeTransaction(params: TransactionParams) {
    try {
      const useSmartSessionNexusClient = await this.createSmartSessionClient();

      let retries = 3;
      let lastError;

      while (retries > 0) {
        try {
          const userOpHash = await useSmartSessionNexusClient.usePermission({
            calls: [
              {
                to: params.to,
                data: params.data,
                value: params.value || BigInt(0),
              },
            ],
          });

          const result = await this.bundlerClient.waitForUserOperationReceipt({
            hash: userOpHash,
            timeout: 60000,
          });

          return result.receipt.transactionHash;
        } catch (error) {
          lastError = error;
          console.warn(`Transaction attempt ${4 - retries} failed:`, error);
          retries--;
          if (retries > 0) {
            await new Promise((resolve) => setTimeout(resolve, 2000));
          }
        }
      }

      throw (
        lastError ||
        new Error("Failed to execute transaction after multiple attempts")
      );
    } catch (error: any) {
      console.error("Error executing transaction:", error);
      throw error;
    }
  }

  async transferERC20(
    tokenAddress: `0x${string}`,
    to: `0x${string}`,
    amount: bigint
  ) {
    const erc20Abi = [
      {
        type: "function",
        name: "transfer",
        inputs: [
          {
            name: "to",
            type: "address",
          },
          {
            name: "amount",
            type: "uint256",
          },
        ],
        outputs: [
          {
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
      },
    ];

    const callData = encodeFunctionData({
      abi: erc20Abi,
      functionName: "transfer",
      args: [to, amount],
    });

    return this.executeTransaction({
      to: tokenAddress,
      data: callData,
    });
  }

  async subscribe(address: string) {
    const subscriptionAbi = [
      {
        type: "function",
        name: "subscribe",
        inputs: [
          {
            name: "to",
            type: "address",
          },
        ],
        outputs: [
          {
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "payable",
      },
    ];

    const callData = encodeFunctionData({
      abi: subscriptionAbi,
      functionName: "subscribe",
      args: [address],
    });

    return this.executeTransaction({
      to: AA_CONFIG.SUBSCRIPTION_MANAGER_ADDRESS,
      data: callData,
    });
  }
}
