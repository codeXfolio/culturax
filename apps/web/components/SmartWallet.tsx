"use client";

import { useRouter } from "next/navigation";
import {
  createSmartAccountClient,
  StartaleAccountClient,
  StartaleSmartAccount,
  toStartaleSmartAccount,
} from "startale-aa-sdk";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useLogin } from "@privy-io/react-auth";
import { http, useAccount } from "wagmi";
import { Button } from "./ui/button";
import { useLogout } from "@privy-io/react-auth";
import { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { AA_CONFIG } from "../context/config";
import { soneiumMinato } from "viem/chains";
import { createPublicClient, createWalletClient, custom } from "viem";
import {
  createPaymasterClient,
  GetPaymasterDataParameters,
} from "viem/account-abstraction";
import { LogIn, LogOut, Wallet } from "lucide-react";
import StartaleContext from "../context/nexus-context";
const { MINATO_RPC, BUNDLER_URL, PAYMASTER_SERVICE_URL } = AA_CONFIG;

const scsContext = {
  calculateGasLimits: true,
  paymasterId: "pm_test_self_funded",
};

const chain = soneiumMinato;

const publicClient = createPublicClient({
  transport: http(MINATO_RPC),
  chain,
});

const paymasterClient = createPaymasterClient({
  transport: http(PAYMASTER_SERVICE_URL),
});

export function SmartWallet() {
  const router = useRouter();
  const { authenticated, ready } = usePrivy();
  const { wallets } = useWallets();
  const { logout } = useLogout();
  const { login } = useLogin();

  const [startaleAccount, setStartaleAccount] =
    useState<StartaleSmartAccount>();
  const { startaleClient, setStartaleClient } = useContext(StartaleContext);

  const didLogout = useRef(false);

  useEffect(() => {
    if (!authenticated && didLogout.current === false) {
      didLogout.current = true;
    }

    if (authenticated && didLogout.current) {
      didLogout.current = false;
    }
  }, [authenticated]);

  useEffect(() => {
    if (!authenticated || !wallets[0]?.address) {
      setStartaleAccount(undefined);
      setStartaleClient(undefined);
      return;
    }

    getSmartAccountInstance();
  }, [wallets[0]?.address, authenticated]);

  useEffect(() => {
    if (wallets.length > 0) {
      console.log("wallets", wallets);
    }
  }, [wallets]);

  useEffect(() => {
    if (startaleAccount) {
      initClient(startaleAccount);
    }
  }, [startaleAccount]);

  useEffect(() => {
    if (startaleClient) {
      console.log("Startale client instance:", startaleClient);
    }
  }, [startaleClient]);

  const handleLogout = async () => {
    localStorage.removeItem("authSignature");
    localStorage.removeItem("authAddress");
    localStorage.removeItem("userId");
    localStorage.removeItem("sessionOwnerKey");
    localStorage.removeItem("walletSessionData");
    await logout();
    router.push("/");
  };

  const getSmartAccountInstance = async () => {
    try {
      const provider = await wallets[0].getEthereumProvider();

      const walletClient = createWalletClient({
        account: wallets[0].address as `0x${string}`,
        chain: soneiumMinato,
        transport: custom(provider),
      });

      const startaleAccountInstance = await toStartaleSmartAccount({
        signer: walletClient,
        chain: chain,
        transport: http(),
        index: BigInt(8890910),
      });

      setStartaleAccount(startaleAccountInstance as any);
      await initClient(startaleAccountInstance);
    } catch (error) {
      console.error("Error initializing smart account:", error);
    }
  };

  const initClient = async (account: StartaleSmartAccount) => {
    try {
      const startaleClientInstance = createSmartAccountClient({
        account: account,
        transport: http(BUNDLER_URL),
        client: publicClient,
        paymaster: {
          async getPaymasterData(pmDataParams: GetPaymasterDataParameters) {
            pmDataParams.paymasterPostOpGasLimit = BigInt(100000);
            pmDataParams.paymasterVerificationGasLimit = BigInt(200000);
            pmDataParams.verificationGasLimit = BigInt(500000);
            const paymasterResponse = await paymasterClient.getPaymasterData(
              pmDataParams
            );
            return paymasterResponse;
          },
          async getPaymasterStubData(
            pmStubDataParams: GetPaymasterDataParameters
          ) {
            const paymasterStubResponse =
              await paymasterClient.getPaymasterStubData(pmStubDataParams);
            paymasterStubResponse.paymasterPostOpGasLimit = BigInt(100000);
            paymasterStubResponse.paymasterVerificationGasLimit =
              BigInt(200000);
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

      setStartaleClient(startaleClientInstance);
      await handleAuthentication(startaleClientInstance);
    } catch (error) {
      console.error("Error initializing kernel client:", error);
    }
  };

  const handleAuthentication = async (client: StartaleAccountClient) => {
    if (
      !localStorage.getItem("authSignature") ||
      !localStorage.getItem("authAddress")
    ) {
      const provider = await wallets[0].getEthereumProvider();
      const address = wallets[0].address as `0x${string}`;
      const walletClient = createWalletClient({
        account: address,
        chain: soneiumMinato,
        transport: custom(provider),
      });

      const signature = await walletClient.signMessage({
        message: "Welcome to CulturaX",
      });

      localStorage.setItem("authSignature", signature);
      localStorage.setItem("authAddress", address);

      const user = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/validation/${address}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-eth-signature": signature,
            "x-eth-address": address,
          },
        }
      );

      const userData: { success: boolean; data: { id: string } } =
        await user.json();

      if (!userData.success) {
        router.push("/register");
        return;
      }

      localStorage.setItem("userId", userData.data.id);
      router.push("/feed");
    }
  };

  return (
    <>
      {authenticated && ready ? (
        <Button
          variant="outline"
          className="bg-primary text-white"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" /> Logout
        </Button>
      ) : (
        <Button
          variant="outline"
          className="gap-2 md:flex w-full bg-primary text-white"
          onClick={login}
        >
          <LogIn className="h-4 w-4" /> Connect Account
        </Button>
      )}
    </>
  );
}
