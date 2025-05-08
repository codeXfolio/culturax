"use client";

import { useEffect, useState, useContext } from "react";
import { Sidebar } from "../navigation/sidebar";
import MobileNavigation from "../navigation/mobile-navigation";
import { fetchProfile } from "@/lib/utils";
import NexusContext from "@/context/nexus-context";
import { WalletInfoCard } from "./wallet-info-card";
import { WalletOverviewCard } from "./wallet-overview-card";
import { SmartSession } from "@/lib/session";
import { TransactionService } from "@/lib/transaction";
import { http, createPublicClient, PublicClient, parseUnits } from "viem";
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
} from "viem/account-abstraction";
import { privateKeyToAccount } from "viem/accounts";
import { type SessionData, type NexusClient } from "@biconomy/abstractjs";

interface Profile {
  avatar: string;
  accountType: string;
}

export function WalletManagerPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const { nexusClient } = useContext(NexusContext);
  const [isSessionModuleInstalled, setIsSessionModuleInstalled] =
    useState(false);
  const [activeSession, setActiveSession] = useState<SessionData | null>(null);

  const publicClient = createPublicClient({
    transport: http(AA_CONFIG.MINATO_RPC),
    chain: soneiumMinato,
  });

  const bundlerClient = createBundlerClient({
    client: publicClient,
    transport: http(AA_CONFIG.BUNDLER_URL),
  });

  const paymasterClient = createPaymasterClient({
    transport: http(AA_CONFIG.PAYMASTER_SERVICE_URL),
  });

  // Mock wallet data
  const walletData = {
    address: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
    ensName: "creator.eth",
  };

  // Mock token balances
  const tokenBalances = [
    {
      id: 1,
      name: "Ethereum",
      symbol: "ETH",
      balance: "1.245",
      usdValue: "2,856.45",
      icon: "/icons/eth.png",
      change: "+5.2%",
      positive: true,
    },
    {
      id: 2,
      name: "USD Coin",
      symbol: "USDC",
      balance: "150.00",
      usdValue: "150.00",
      icon: "/icons/usdc.png",
      change: "+0.1%",
      positive: true,
    },
    {
      id: 3,
      name: "CulturaX Token",
      symbol: "CX",
      balance: "500.00",
      usdValue: "750.00",
      icon: "/logo.png",
      change: "-2.5%",
      positive: false,
    },
  ];

  // Mock transaction data
  const transactions = [
    {
      id: 1,
      type: "sent",
      amount: "0.125 ETH",
      to: "0x3a2...8f9d",
      date: "Today, 2:45 PM",
      status: "confirmed",
    },
    {
      id: 2,
      type: "received",
      amount: "0.5 ETH",
      from: "0x7b4...2e1c",
      date: "Yesterday, 10:30 AM",
      status: "confirmed",
    },
    {
      id: 3,
      type: "sent",
      amount: "50 CX",
      to: "0x9c8...4f2d",
      date: "Apr 2, 2025",
      status: "confirmed",
    },
    {
      id: 4,
      type: "received",
      amount: "100 USDC",
      from: "0x5d6...7e8f",
      date: "Apr 1, 2025",
      status: "confirmed",
    },
    {
      id: 5,
      type: "sent",
      amount: "25 CX",
      to: "0x2f4...9e3a",
      date: "Mar 28, 2025",
      status: "confirmed",
    },
  ];

  const session = new SmartSession(
    { isSessionModuleInstalled, setIsSessionModuleInstalled },
    { activeSession, setActiveSession },
    nexusClient as NexusClient
  );

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchProfile().then((profile) => {
        setProfile(profile);
      });

      session.createSession();
    }
  }, []);

  useEffect(() => {
    if (nexusClient) {
      session.checkIsSessionModuleInstalled();
    }
  }, [nexusClient?.account?.address]);

  useEffect(() => {
    if (!isSessionModuleInstalled) {
      return;
    }
    const cachedSessionData = localStorage.getItem("smartSessionData");
    if (cachedSessionData) {
      setActiveSession(JSON.parse(cachedSessionData));
    }
  }, [isSessionModuleInstalled]);

  useEffect(() => {
    if (activeSession) {
      console.log("Active session found");
      console.log(`Session owner: ${activeSession.granter}`);
      console.log(`Session public key: ${activeSession.sessionPublicKey}`);
    }
  }, [activeSession]);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
    } catch (error) {
      console.error("Error in handleRefresh:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex pt-16">
        {/* Sidebar Navigation */}
        <div className="hidden md:block">
          <Sidebar profile={profile} />
        </div>

        <main className="container pt-8 md:pt-24 pb-16 w-full md:max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <WalletInfoCard
              walletData={{
                address: nexusClient?.account.address || "-",
                ensName: "",
              }}
              onRefresh={handleRefresh}
              refreshing={refreshing}
              nexusClient={nexusClient as NexusClient}
              activeSession={activeSession as SessionData}
            />
            <WalletOverviewCard
              tokenBalances={tokenBalances}
              transactions={transactions}
            />
          </div>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
}
