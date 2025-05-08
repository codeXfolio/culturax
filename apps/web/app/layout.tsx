import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Privy from "@/context/privy";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CulturaX - Monetize your creativity. Decentralized.",
  description:
    "CulturaX empowers creators with AI tools, NFT monetization, and direct fan connection on Soneium.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Privy>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </Privy>
      </body>
    </html>
  );
}

import "./globals.css";
