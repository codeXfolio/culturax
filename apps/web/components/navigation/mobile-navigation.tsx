import {
   Compass,
   Wallet,
   Sparkles,
   Home,
   User,
   FolderPlus,
} from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

function MobileNavigation() {
   const pathname = usePathname();

   return (
      <div className="sm:hidden fixed bottom-0 left-0 right-0 border-t border-border/40 bg-background z-50">
         <div className="flex justify-around p-2">
            <Button
               variant={pathname === "/feed" ? "default" : "ghost"}
               size="icon"
               asChild
            >
               <Link href="/feed">
                  <Home className="h-5 w-5" />
               </Link>
            </Button>
            <Button
               variant={pathname === "/explore" ? "default" : "ghost"}
               size="icon"
               asChild
            >
               <Link href="/explore">
                  <Compass className="h-5 w-5" />
               </Link>
            </Button>
            <Button
               variant={pathname === "/upload-collection" ? "default" : "ghost"}
               size="icon"
               asChild
            >
               <Link href="/upload-collection">
                  <FolderPlus className="h-5 w-5" />
               </Link>
            </Button>
            <Button
               variant={pathname === "/wallet-manager" ? "default" : "ghost"}
               size="icon"
               asChild
            >
               <Link href="/wallet-manager">
                  <Wallet className="h-5 w-5" />
               </Link>
            </Button>
            <Button
               variant={pathname === "/profile" ? "default" : "ghost"}
               size="icon"
               asChild
            >
               <Link href="/profile">
                  <User className="h-5 w-5" />
               </Link>
            </Button>
         </div>
      </div>
   );
}

export default MobileNavigation;
