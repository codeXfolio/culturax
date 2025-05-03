import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
   Home,
   Compass,
   Sparkles,
   MessageSquare,
   Wallet,
   Coins,
   User,
   DollarSign,
   FolderPlus,
} from "lucide-react";
import { usePathname } from "next/navigation";

export function Sidebar() {
   const pathname = usePathname();

   return (
      <aside className="w-16 md:w-64 fixed left-0 top-16 h-[calc(100vh-4rem)] border-r border-border/40 p-2 md:p-4 hidden sm:block">
         <nav className="space-y-2">
            <Button
               variant={pathname === "/feed" ? "secondary" : "ghost"}
               className="w-full justify-start gap-3"
               asChild
            >
               <Link href="/feed">
                  <Home className="h-5 w-5" />
                  <span className="hidden md:inline">Home</span>
               </Link>
            </Button>
            <Button
               variant={pathname === "/explore" ? "secondary" : "ghost"}
               className="w-full justify-start gap-3"
               asChild
            >
               <Link href="/explore">
                  <Compass className="h-5 w-5" />
                  <span className="hidden md:inline">Explore</span>
               </Link>
            </Button>
            <Button
               variant={pathname === "/ai-tools" ? "secondary" : "ghost"}
               className="w-full justify-start gap-3"
               asChild
            >
               <Link href="/ai-tools">
                  <Sparkles className="h-5 w-5" />
                  <span className="hidden md:inline">AI Tools</span>
               </Link>
            </Button>
            <Button
               variant={pathname === "/messages" ? "secondary" : "ghost"}
               className="w-full justify-start gap-3"
               asChild
            >
               <Link href="/messages">
                  <MessageSquare className="h-5 w-5" />
                  <span className="hidden md:inline">Messages</span>
               </Link>
            </Button>
            <Button
               variant={pathname === "/wallet-manager" ? "secondary" : "ghost"}
               className="w-full justify-start gap-3"
               asChild
            >
               <Link href="/wallet-manager">
                  <Wallet className="h-5 w-5" />
                  <span className="hidden md:inline">Wallet</span>
               </Link>
            </Button>
            <Button
               variant={pathname === "/staking" ? "secondary" : "ghost"}
               className="w-full justify-start gap-3"
               asChild
            >
               <Link href="/staking">
                  <Coins className="h-5 w-5" />
                  <span className="hidden md:inline">Staking</span>
               </Link>
            </Button>
            <Button
               variant={pathname === "/profile" ? "secondary" : "ghost"}
               className="w-full justify-start gap-3"
               asChild
            >
               <Link href="/profile">
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline">Profile</span>
               </Link>
            </Button>
            <Button
               variant={pathname === "/earnings" ? "secondary" : "ghost"}
               className="w-full justify-start gap-3"
               asChild
            >
               <Link href="/earnings">
                  <DollarSign className="h-5 w-5" />
                  <span className="hidden md:inline">Earnings</span>
               </Link>
            </Button>
            <Button
               variant={
                  pathname === "/upload-collection" ? "secondary" : "ghost"
               }
               className="w-full justify-start gap-3"
               asChild
            >
               <Link href="/upload-collection">
                  <FolderPlus className="h-5 w-5" />
                  <span className="hidden md:inline">Upload Collection</span>
               </Link>
            </Button>
         </nav>
      </aside>
   );
}
