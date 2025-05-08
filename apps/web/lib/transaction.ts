import {
  type CreateSessionDataParams,
  type NexusClient,
  type SessionData,
  createSmartAccountClient,
  smartSessionUseActions,
  toNexusAccount,
  toSmartSessionsValidator,
} from "@biconomy/abstractjs";
import {
  http,
  createPublicClient,
  PublicClient,
  parseUnits,
  encodeFunctionData,
  type Chain,
} from "viem";
import {
  SmartSessionMode,
  getSmartSessionsValidator,
  isSessionEnabled,
} from "@rhinestone/module-sdk";
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

interface TransactionParams {
  to: `0x${string}`;
  data: `0x${string}`;
  value?: bigint;
}

export class TransactionService {
  private publicClient: PublicClient;
  private bundlerClient: BundlerClient;
  private paymasterClient: PaymasterClient;
  private nexusClient: NexusClient;
  private activeSession: SessionData | null;

  constructor(nexusClient: NexusClient, activeSession: SessionData | null) {
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
        type: "nexus",
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
      account: await toNexusAccount({
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
          return this.paymasterClient.getPaymasterData(pmDataParams);
        },
        getPaymasterStubData: async (
          pmStubDataParams: GetPaymasterDataParameters
        ) => {
          return this.paymasterClient.getPaymasterStubData(pmStubDataParams);
        },
      },
      paymasterContext: { calculateGasLimits: true, policyId: "sudo" },
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
      });

      return result.receipt.transactionHash;
    } catch (error: any) {
      console.error("Error executing transaction:", error);
      throw error;
    }
  }

  // Helper function for ERC20 token transfers
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

  // Helper function for native token transfers
  async transferNative(to: `0x${string}`, amount: bigint) {
    return this.executeTransaction({
      to,
      data: "0x",
      value: amount,
    });
  }
}
