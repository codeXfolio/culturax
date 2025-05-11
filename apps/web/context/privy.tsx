"use client";
import React, { useState, useEffect, useContext } from "react";
import { soneiumMinato } from "viem/chains";
import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider } from "wagmi";
import { config } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StartaleContext from "./nexus-context";
import { StartaleAccountClient } from "startale-aa-sdk";
const queryClient = new QueryClient();
import { SmartSession } from "@/lib/session";

function Privy({ children }: { children: React.ReactNode }) {
   const [startaleClient, setStartaleClient] = useState<
      StartaleAccountClient | undefined
   >(undefined);

   return (
      <PrivyProvider
         appId="cma6diu3t026eky0mugki537p"
         config={{
            // Display email and wallet as login methods
            loginMethods: ["email", "google", "wallet", "twitter", "farcaster"],
            appearance: {
               theme: "light",
               accentColor: "#8b5cf6",
            },
            // Create embedded wallets for users who don't have a wallet
            embeddedWallets: {
               createOnLogin: "all-users",
               showWalletUIs: false,
            },
            supportedChains: [soneiumMinato],
            defaultChain: soneiumMinato,
         }}
      >
         <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
               <StartaleContext.Provider
                  value={{
                     startaleClient,
                     setStartaleClient,
                  }}
               >
                  {children}
               </StartaleContext.Provider>
            </QueryClientProvider>
         </WagmiProvider>
      </PrivyProvider>
   );
}

export default Privy;
