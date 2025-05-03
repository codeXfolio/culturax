"use client";
import React from "react";
import { soneiumMinato } from "viem/chains";
import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider } from "wagmi";
import { config } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function Privy({ children }: { children: React.ReactNode }) {
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
            },
            supportedChains: [soneiumMinato],
            defaultChain: soneiumMinato,
         }}
      >
         <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
               {children}
            </QueryClientProvider>
         </WagmiProvider>
      </PrivyProvider>
   );
}

export default Privy;
