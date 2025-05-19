"use client";

import type React from "react";

import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { ProfileButton } from "@/components/navigation/profile-button";
import { Button } from "@/components/ui/button";
import {
   Home,
   Search,
   Bell,
   Menu,
   X,
   Clock,
   ImageIcon,
   Sparkles,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface NavbarProps {
   isCreator?: boolean;
   showSidebar?: boolean;
}

export function Navbar({
   isCreator = false,
   showSidebar = false,
}: NavbarProps) {
   const [isSearchOpen, setIsSearchOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState("");
   const [isSearchFocused, setIsSearchFocused] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const searchRef = useRef<HTMLDivElement>(null);
   const inputRef = useRef<HTMLInputElement>(null);

   // Sample data for search results
   const recentSearches = [
      "NFT collections",
      "Top creators",
      "Digital art",
      "Web3 tutorials",
   ];

   const creators = [
      {
         id: 1,
         name: "Alex Johnson",
         username: "alexcreates",
         verified: true,
         avatar: "/placeholder.svg?height=40&width=40",
      },
      {
         id: 2,
         name: "Maya Patel",
         username: "mayaart",
         verified: true,
         avatar: "/placeholder.svg?height=40&width=40",
      },
      {
         id: 3,
         name: "Sam Wilson",
         username: "samwilson",
         verified: false,
         avatar: "/placeholder.svg?height=40&width=40",
      },
   ];

   const content = [
      {
         id: 1,
         title: "Creating NFT Collections",
         creator: "alexcreates",
         thumbnail: "/placeholder.svg?height=60&width=100",
         views: "12K",
      },
      {
         id: 2,
         title: "Web3 for Beginners",
         creator: "mayaart",
         thumbnail: "/placeholder.svg?height=60&width=100",
         views: "8.5K",
      },
   ];

   const nfts = [
      {
         id: 1,
         title: "Cosmic Dreams #342",
         creator: "alexcreates",
         image: "/placeholder.svg?height=60&width=60",
         price: "0.5 ETH",
      },
      {
         id: 2,
         title: "Digital Landscape",
         creator: "samwilson",
         image: "/placeholder.svg?height=60&width=60",
         price: "0.8 ETH",
      },
   ];

   // Handle click outside to close search results
   useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
         if (
            searchRef.current &&
            !searchRef.current.contains(event.target as Node)
         ) {
            setIsSearchFocused(false);
         }
      }

      function handleEscKey(event: KeyboardEvent) {
         if (event.key === "Escape") {
            setIsSearchFocused(false);
         }
      }

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscKey);

      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
         document.removeEventListener("keydown", handleEscKey);
      };
   }, []);

   // Simulate search loading
   useEffect(() => {
      if (searchQuery) {
         setIsLoading(true);
         const timer = setTimeout(() => {
            setIsLoading(false);
         }, 500);
         return () => clearTimeout(timer);
      }
   }, [searchQuery]);

   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
   };

   const handleSearchFocus = () => {
      setIsSearchFocused(true);
   };

   return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
         <div className="container flex h-14 items-center">
            <div className="mr-4 flex items-center gap-2 md:mr-6">
               {showSidebar && (
                  <Sheet>
                     <SheetTrigger asChild>
                        <Button
                           variant="ghost"
                           size="icon"
                           className="md:hidden"
                        >
                           <Menu className="h-5 w-5" />
                           <span className="sr-only">Toggle menu</span>
                        </Button>
                     </SheetTrigger>
                     <SheetContent side="left" className="p-0">
                        <DashboardSidebar />
                     </SheetContent>
                  </Sheet>
               )}
               <Link href="/" className="flex items-center gap-2">
                  <Image src={"/logo.png"} alt="Logo" width={40} height={40} />
                  <span className="hidden font-bold text-xl md:inline-block">
                     CulturaX
                  </span>
               </Link>
            </div>

            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
               {/* Desktop Search */}
               <div
                  ref={searchRef}
                  className="relative hidden md:block max-w-md w-full mx-4"
               >
                  <div className="relative">
                     <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                     <Input
                        ref={inputRef}
                        type="search"
                        placeholder="Search creators, NFTs, content..."
                        className="pl-9 pr-4 bg-muted/40 w-full"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={handleSearchFocus}
                     />
                     {searchQuery && (
                        <Button
                           variant="ghost"
                           size="icon"
                           className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground"
                           onClick={() => setSearchQuery("")}
                        >
                           <X className="h-4 w-4" />
                           <span className="sr-only">Clear search</span>
                        </Button>
                     )}
                  </div>

                  {/* YouTube-style search results dropdown */}
                  {isSearchFocused && (
                     <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg overflow-hidden z-50">
                        {isLoading ? (
                           <div className="p-4 text-center text-muted-foreground">
                              <div className="animate-pulse">
                                 Loading results...
                              </div>
                           </div>
                        ) : searchQuery ? (
                           <div className="max-h-[70vh] overflow-y-auto">
                              {/* Creators section */}
                              <div className="p-2">
                                 <h3 className="text-xs font-medium text-muted-foreground px-2 py-1">
                                    Creators
                                 </h3>
                                 {creators.map((creator) => (
                                    <Link
                                       href={`/subscription/${creator.username}`}
                                       key={creator.id}
                                       className="flex items-center gap-3 p-2 hover:bg-muted rounded-md"
                                    >
                                       <img
                                          src={
                                             creator.avatar ||
                                             "/placeholder.svg"
                                          }
                                          alt={creator.name}
                                          className="w-8 h-8 rounded-full"
                                       />
                                       <div>
                                          <div className="flex items-center gap-1">
                                             <span className="font-medium">
                                                {creator.name}
                                             </span>
                                             {creator.verified && (
                                                <span className="text-blue-500">
                                                   <Sparkles className="h-3 w-3" />
                                                </span>
                                             )}
                                          </div>
                                          <span className="text-xs text-muted-foreground">
                                             @{creator.username}
                                          </span>
                                       </div>
                                    </Link>
                                 ))}
                              </div>

                              {/* Content section */}
                              <div className="p-2 border-t">
                                 <h3 className="text-xs font-medium text-muted-foreground px-2 py-1">
                                    Content
                                 </h3>
                                 {content.map((item) => (
                                    <Link
                                       href={`/subscription/${item.creator}?content=${item.id}`}
                                       key={item.id}
                                       className="flex items-center gap-3 p-2 hover:bg-muted rounded-md"
                                    >
                                       <img
                                          src={
                                             item.thumbnail ||
                                             "/placeholder.svg"
                                          }
                                          alt={item.title}
                                          className="w-[60px] h-[40px] object-cover rounded"
                                       />
                                       <div>
                                          <div className="font-medium">
                                             {item.title}
                                          </div>
                                          <div className="text-xs text-muted-foreground">
                                             @{item.creator} • {item.views}{" "}
                                             views
                                          </div>
                                       </div>
                                    </Link>
                                 ))}
                              </div>

                              {/* NFTs section */}
                              <div className="p-2 border-t">
                                 <h3 className="text-xs font-medium text-muted-foreground px-2 py-1">
                                    NFTs
                                 </h3>
                                 {nfts.map((nft) => (
                                    <Link
                                       href={`/nft-mint?id=${nft.id}`}
                                       key={nft.id}
                                       className="flex items-center gap-3 p-2 hover:bg-muted rounded-md"
                                    >
                                       <img
                                          src={nft.image || "/placeholder.svg"}
                                          alt={nft.title}
                                          className="w-10 h-10 object-cover rounded"
                                       />
                                       <div>
                                          <div className="font-medium">
                                             {nft.title}
                                          </div>
                                          <div className="text-xs text-muted-foreground">
                                             @{nft.creator} • {nft.price}
                                          </div>
                                       </div>
                                    </Link>
                                 ))}
                              </div>

                              {/* See all results */}
                              <div className="p-2 border-t">
                                 <Link
                                    href={`/explore?search=${encodeURIComponent(
                                       searchQuery
                                    )}`}
                                    className="block w-full text-center p-2 text-primary hover:bg-muted rounded-md"
                                 >
                                    See all results for "{searchQuery}"
                                 </Link>
                              </div>
                           </div>
                        ) : (
                           <div>
                              <div className="p-2">
                                 <h3 className="text-xs font-medium text-muted-foreground px-2 py-1">
                                    Recent searches
                                 </h3>
                                 {recentSearches.map((search, index) => (
                                    <button
                                       key={index}
                                       className="flex items-center gap-2 w-full p-2 hover:bg-muted rounded-md text-left"
                                       onClick={() => setSearchQuery(search)}
                                    >
                                       <Clock className="h-4 w-4 text-muted-foreground" />
                                       <span>{search}</span>
                                    </button>
                                 ))}
                              </div>
                           </div>
                        )}
                     </div>
                  )}
               </div>

               <nav className="flex items-center space-x-1">
                  <Button variant="ghost" size="icon" asChild>
                     <Link href="/">
                        <Home className="h-5 w-5" />
                        <span className="sr-only">Home</span>
                     </Link>
                  </Button>
                  <Button
                     variant="ghost"
                     size="icon"
                     onClick={() => setIsSearchOpen(!isSearchOpen)}
                     className="md:hidden"
                  >
                     <Search className="h-5 w-5" />
                     <span className="sr-only">Search</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                     <Bell className="h-5 w-5" />
                     <span className="sr-only">Notifications</span>
                  </Button>
               </nav>

               <div className="flex items-center gap-2">
                  <ModeToggle />
                  <ProfileButton isCreator={isCreator} />
               </div>
            </div>
         </div>

         {/* Mobile search input */}
         {isSearchOpen && (
            <div className="container py-2 pb-3 md:hidden">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                     type="search"
                     placeholder="Search creators, content, and collections..."
                     className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                     value={searchQuery}
                     onChange={handleSearchChange}
                     onFocus={handleSearchFocus}
                  />
                  {searchQuery && (
                     <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground"
                        onClick={() => setSearchQuery("")}
                     >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Clear search</span>
                     </Button>
                  )}
               </div>
            </div>
         )}
      </header>
   );
}
