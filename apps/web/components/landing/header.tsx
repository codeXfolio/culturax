"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useAccount } from "wagmi";
import { useLogin, useLogout, usePrivy } from "@privy-io/react-auth";
import { SmartWallet } from "../SmartWallet";

function Header() {
   return (
      <header className="border-b border-border/40 backdrop-blur-sm fixed top-0 w-full z-50">
         <div className="container flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
               <Image src="/logo.png" alt="Logo" width={32} height={32} />
               <span className="font-bold text-xl">CulturaX</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
               <Link
                  href="#features"
                  className="text-sm font-medium hover:text-primary transition-colors"
               >
                  Features
               </Link>
               <Link
                  href="/explore"
                  className="text-sm font-medium hover:text-primary transition-colors"
               >
                  Explore
               </Link>
               <Link
                  href="#creators"
                  className="text-sm font-medium hover:text-primary transition-colors"
               >
                  Creators
               </Link>
               <Link
                  href="/login"
                  className="text-sm font-medium hover:text-primary transition-colors"
               >
                  Login
               </Link>
            </nav>
            <div className="flex items-center gap-4">
               <ModeToggle />
               <SmartWallet />
            </div>
         </div>
      </header>
   );
}

export default Header;
