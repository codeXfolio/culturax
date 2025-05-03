"use client";
import { Bell, Wallet } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import Link from "next/link";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import React, { useRef, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SmartWallet } from "../SmartWallet";
import Image from "next/image";

export function Header() {
   const searchRef = useRef<HTMLDivElement>(null);

   // Close search results when clicking outside
   useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
         if (
            searchRef.current &&
            !searchRef.current.contains(event.target as Node)
         ) {
            setIsSearchFocused(false);
         }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
         document.removeEventListener("mousedown", handleClickOutside);
   }, []);
   const [searchQuery, setSearchQuery] = useState("");
   const [isSearchFocused, setIsSearchFocused] = useState(false);

   // Sample search results
   const searchResults = {
      creators: [
         {
            name: "Alex Rivera",
            username: "alexrivera",
            avatar: "/placeholder.svg?height=40&width=40",
            verified: true,
         },
         {
            name: "Sarah Johnson",
            username: "sarahjcreates",
            avatar: "/placeholder.svg?height=40&width=40",
            verified: true,
         },
      ],
      content: [
         {
            title: "Digital Art Collection",
            type: "NFT",
            creator: "Alex Rivera",
            image: "/placeholder.svg?height=40&width=40",
         },
         {
            title: "Behind the Scenes",
            type: "Video",
            creator: "Sarah Johnson",
            image: "/placeholder.svg?height=40&width=40",
         },
      ],
      nfts: [
         {
            title: "Cosmic Dreams #42",
            creator: "Alex Rivera",
            price: "0.5 ETH",
            image: "/placeholder.svg?height=40&width=40",
         },
         {
            title: "Nature Series #8",
            creator: "Emma Wilson",
            price: "0.3 ETH",
            image: "/placeholder.svg?height=40&width=40",
         },
      ],
   };

   return (
      <header className="border-b border-border/40 backdrop-blur-sm fixed top-0 w-full z-50 bg-background/80">
         <div className="container flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
               <Link
                  href="/"
                  className="font-bold text-xl flex items-center gap-2"
               >
                  <Image
                     src="/logo.png"
                     alt="CulturaX"
                     width={32}
                     height={32}
                  />
                  <span>CulturaX</span>
               </Link>
            </div>

            <div
               className="hidden md:flex items-center relative max-w-md w-full mx-4"
               ref={searchRef}
            >
               <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
               <Input
                  placeholder="Search creators, NFTs, content..."
                  className="pl-9 bg-muted/40"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onKeyDown={(e) => {
                     if (e.key === "Escape") setIsSearchFocused(false);
                  }}
               />

               {/* YouTube-style search results dropdown */}
               {isSearchFocused && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50 max-h-[70vh] overflow-y-auto">
                     {/* Recent searches - shown when input is empty */}
                     {!searchQuery && (
                        <div className="p-2">
                           <div className="flex items-center justify-between px-3 py-2">
                              <span className="text-sm font-medium">
                                 Recent searches
                              </span>
                              <Button
                                 variant="ghost"
                                 size="sm"
                                 className="text-xs h-7"
                              >
                                 Clear all
                              </Button>
                           </div>
                           <div className="space-y-1">
                              <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-muted rounded-md text-sm">
                                 <Search className="h-4 w-4 text-muted-foreground" />
                                 <span>digital art nft</span>
                              </button>
                              <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-muted rounded-md text-sm">
                                 <Search className="h-4 w-4 text-muted-foreground" />
                                 <span>music creators</span>
                              </button>
                           </div>
                        </div>
                     )}

                     {/* Search results - shown when typing */}
                     {searchQuery && (
                        <div className="p-2">
                           {/* Creators section */}
                           {searchResults.creators.length > 0 && (
                              <div className="mb-2">
                                 <div className="px-3 py-1 text-xs font-medium text-muted-foreground">
                                    Creators
                                 </div>
                                 {searchResults.creators.map((creator, idx) => (
                                    <Link
                                       href={`/subscription/${creator.username}`}
                                       key={idx}
                                       className="flex items-center gap-3 w-full px-3 py-2 hover:bg-muted rounded-md"
                                    >
                                       <Avatar className="h-8 w-8">
                                          <AvatarImage
                                             src={
                                                creator.avatar ||
                                                "/placeholder.svg"
                                             }
                                             alt={creator.name}
                                          />
                                          <AvatarFallback>
                                             {creator.name.charAt(0)}
                                          </AvatarFallback>
                                       </Avatar>
                                       <div className="flex items-center">
                                          <span className="text-sm font-medium">
                                             {creator.name}
                                          </span>
                                          {creator.verified && (
                                             <svg
                                                className="h-4 w-4 ml-1 text-blue-500 fill-current"
                                                viewBox="0 0 24 24"
                                             >
                                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                             </svg>
                                          )}
                                       </div>
                                    </Link>
                                 ))}
                              </div>
                           )}

                           {/* Content section */}
                           {searchResults.content.length > 0 && (
                              <div className="mb-2">
                                 <div className="px-3 py-1 text-xs font-medium text-muted-foreground">
                                    Content
                                 </div>
                                 {searchResults.content.map((item, idx) => (
                                    <Link
                                       href="#"
                                       key={idx}
                                       className="flex items-center gap-3 w-full px-3 py-2 hover:bg-muted rounded-md"
                                    >
                                       <div className="h-8 w-8 rounded bg-muted flex-shrink-0 overflow-hidden">
                                          <img
                                             src={
                                                item.image || "/placeholder.svg"
                                             }
                                             alt={item.title}
                                             className="h-full w-full object-cover"
                                          />
                                       </div>
                                       <div>
                                          <div className="text-sm font-medium">
                                             {item.title}
                                          </div>
                                          <div className="text-xs text-muted-foreground">
                                             {item.type} • {item.creator}
                                          </div>
                                       </div>
                                    </Link>
                                 ))}
                              </div>
                           )}

                           {/* NFTs section */}
                           {searchResults.nfts.length > 0 && (
                              <div className="mb-2">
                                 <div className="px-3 py-1 text-xs font-medium text-muted-foreground">
                                    NFTs
                                 </div>
                                 {searchResults.nfts.map((nft, idx) => (
                                    <Link
                                       href="#"
                                       key={idx}
                                       className="flex items-center gap-3 w-full px-3 py-2 hover:bg-muted rounded-md"
                                    >
                                       <div className="h-8 w-8 rounded bg-muted flex-shrink-0 overflow-hidden">
                                          <img
                                             src={
                                                nft.image || "/placeholder.svg"
                                             }
                                             alt={nft.title}
                                             className="h-full w-full object-cover"
                                          />
                                       </div>
                                       <div>
                                          <div className="text-sm font-medium">
                                             {nft.title}
                                          </div>
                                          <div className="text-xs text-muted-foreground">
                                             {nft.creator} • {nft.price}
                                          </div>
                                       </div>
                                    </Link>
                                 ))}
                              </div>
                           )}

                           {/* See all results */}
                           <Link
                              href={`/search?q=${encodeURIComponent(
                                 searchQuery
                              )}`}
                              className="flex items-center justify-between w-full px-3 py-2 hover:bg-muted rounded-md text-primary text-sm"
                           >
                              <span>See all results for "{searchQuery}"</span>
                              <svg
                                 className="h-4 w-4"
                                 viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor"
                                 strokeWidth="2"
                              >
                                 <path d="M9 5l7 7-7 7" />
                              </svg>
                           </Link>
                        </div>
                     )}
                  </div>
               )}
            </div>

            <div className="flex items-center gap-4">
               <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
               </Button>
               <SmartWallet />
               <ModeToggle />
            </div>
         </div>
      </header>
   );
}

export default Header;
