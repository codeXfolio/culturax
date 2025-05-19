"use client";

import {
   useEffect,
   useState,
   useContext,
   Dispatch,
   SetStateAction,
} from "react";
import { Sidebar } from "../navigation/sidebar";
import MobileNavigation from "../navigation/mobile-navigation";
import { fetchProfile } from "@/lib/utils";
import NexusContext from "@/context/nexus-context";
import { WalletInfoCard } from "./wallet-info-card";
import { WalletOverviewCard } from "./wallet-overview-card";
import { type SessionData, type NexusClient } from "@biconomy/abstractjs";
import { SmartSession } from "@/lib/session";
import { apiRequest } from "@/lib/api/api";
import StartaleContext from "@/context/nexus-context";
import { StartaleAccountClient } from "startale-aa-sdk";
import { AA_CONFIG } from "@/context/config";
import { toFunctionSelector } from "viem";

interface Profile {
   avatar: string;
   accountType: string;
}

export function WalletManagerPage() {
   const [refreshing, setRefreshing] = useState(false);
   const [profile, setProfile] = useState<Profile | null>(null);
   const { startaleClient } = useContext(StartaleContext);
   const [balances, setBalances] = useState<
      {
         id: number;
         name: string;
         symbol: string;
         balance: string;
         usdValue: string;
         icon: string;
         change: string;
         positive: boolean;
      }[]
   >([]);

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

   useEffect(() => {
      const userId = localStorage.getItem("userId");

      async function loadProfile() {
         if (userId) {
            const profile = await fetchProfile();
            setProfile(profile);
         }
      }

      loadProfile();
   }, []);

   useEffect(() => {
      loadBalances();
   }, [startaleClient]);

   async function loadBalances() {
      if (!startaleClient?.account.address) {
         return;
      }
      const data = await apiRequest<{
         eth: string;
         usdc: string;
         cx: string;
      }>("/api/blockchain/balances", {
         method: "POST",
         body: JSON.stringify({
            address: startaleClient?.account.address,
         }),
      });
      setBalances([
         {
            id: 1,
            name: "Ethereum",
            symbol: "ETH",
            balance: data.data.eth,
            usdValue: (parseFloat(data.data.eth) * 2300).toFixed(2),
            icon: "/icons/eth.png",
            change: "+5.2%",
            positive: true,
         },
         {
            id: 2,
            name: "USD Coin",
            symbol: "USDC",
            balance: data.data.usdc,
            usdValue: (parseFloat(data.data.usdc) * 1).toFixed(2),
            icon: "/icons/usdc.png",
            change: "+0.1%",
            positive: true,
         },
         {
            id: 3,
            name: "CulturaX Token",
            symbol: "CX",
            balance: data.data.cx,
            usdValue: (parseFloat(data.data.cx) * 1).toFixed(2),
            icon: "/logo.png",
            change: "1%",
            positive: true,
         },
      ]);
   }

   const handleRefresh = async () => {
      try {
         setRefreshing(true);
         await loadBalances();
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
                        address: startaleClient?.account.address || "-",
                        ensName: "",
                     }}
                     onRefresh={handleRefresh}
                     refreshing={refreshing}
                     startaleClient={startaleClient as StartaleAccountClient}
                  />
                  <WalletOverviewCard
                     tokenBalances={balances}
                     transactions={transactions}
                  />
               </div>
            </main>
         </div>
         <MobileNavigation />
      </div>
   );
}
