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
   Vote,
   CoinsIcon,
   HandCoins,
   Image,
} from "lucide-react";
import { usePathname } from "next/navigation";

export function Sidebar({
   profile,
}: {
   profile: {
      avatar: string;
      accountType: string;
   } | null;
}) {
   const pathname = usePathname();

   return (
      <aside className="w-16 md:w-64 fixed left-0 top-16 h-[calc(100vh-4rem)] border-r border-border p-2 md:p-4 hidden sm:block overflow-y-auto">
         <nav className="space-y-2 h-full">
            {/* Main Navigation */}
            <div className="space-y-2">
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
            </div>

            {/* Creator Tools */}
            {profile?.accountType === "CREATOR" && (
               <>
                  <div className="px-2 py-1.5">
                     <span className="text-xs font-semibold text-muted-foreground hidden md:inline">
                        Creator Tools
                     </span>
                  </div>
                  <div className="space-y-2">
                     <Button
                        variant={
                           pathname === "/upload-collection"
                              ? "secondary"
                              : "ghost"
                        }
                        className="w-full justify-start gap-3"
                        asChild
                     >
                        <Link href="/upload-collection">
                           <FolderPlus className="h-5 w-5" />
                           <span className="hidden md:inline">
                              Upload Collection
                           </span>
                        </Link>
                     </Button>
                     <Button
                        variant={
                           pathname === "/ai-tools" ? "secondary" : "ghost"
                        }
                        className="w-full justify-start gap-3"
                        asChild
                     >
                        <Link href="/ai-tools">
                           <Sparkles className="h-5 w-5" />
                           <span className="hidden md:inline">AI Tools</span>
                        </Link>
                     </Button>
                     <Button
                        variant={
                           pathname === "/nft-mint" ? "secondary" : "ghost"
                        }
                        className="w-full justify-start gap-3"
                        asChild
                     >
                        <Link href="/nft-mint">
                           <Image className="h-5 w-5" />
                           <span className="hidden md:inline">NFT Mint</span>
                        </Link>
                     </Button>
                  </div>
               </>
            )}

            {/* Platform Features */}
            <div className="px-2 py-1.5">
               <span className="text-xs font-semibold text-muted-foreground hidden md:inline">
                  Platform Features
               </span>
            </div>
            <div className="space-y-2">
               <Button
                  variant={pathname === "/governance" ? "secondary" : "ghost"}
                  className="w-full justify-start gap-3"
                  asChild
               >
                  <Link href="/governance">
                     <Vote className="h-5 w-5" />
                     <span className="hidden md:inline">Governance</span>
                  </Link>
               </Button>
               <Button
                  variant={
                     pathname === "/token-generator" ? "secondary" : "ghost"
                  }
                  className="w-full justify-start gap-3"
                  asChild
               >
                  <Link href="/token-generator">
                     <HandCoins className="h-5 w-5" />
                     <span className="hidden md:inline">Fan Token</span>
                  </Link>
               </Button>
            </div>

            {/* Financial */}
            <div className="px-2 py-1.5">
               <span className="text-xs font-semibold text-muted-foreground hidden md:inline">
                  Financial
               </span>
            </div>
            <div className="space-y-2">
               <Button
                  variant={
                     pathname === "/wallet-manager" ? "secondary" : "ghost"
                  }
                  className="w-full justify-start gap-3"
                  asChild
               >
                  <Link href="/wallet-manager">
                     <Wallet className="h-5 w-5" />
                     <span className="hidden md:inline">Wallet</span>
                  </Link>
               </Button>

               {profile?.accountType === "CREATOR" && (
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
               )}
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
            </div>

            {/* User */}
            <div className="px-2 py-1.5">
               <span className="text-xs font-semibold text-muted-foreground hidden md:inline">
                  User
               </span>
            </div>
            <div className="space-y-2">
               <Button
                  variant={
                     pathname === "/profile" || pathname === "/creator-profile"
                        ? "secondary"
                        : "ghost"
                  }
                  className="w-full justify-start gap-3"
                  asChild
               >
                  <Link
                     href={
                        profile?.accountType === "CREATOR"
                           ? "/creator-profile"
                           : "/profile"
                     }
                  >
                     <User className="h-5 w-5" />
                     <span className="hidden md:inline">Profile</span>
                  </Link>
               </Button>
            </div>
         </nav>
      </aside>
   );
}
