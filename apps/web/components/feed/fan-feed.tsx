"use client";

import { DialogTrigger } from "@/components/ui/dialog";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import {
   Search,
   Bell,
   Wallet,
   Home,
   Compass,
   Sparkles,
   MessageSquare,
   User,
   DollarSign,
   X,
   Coins,
} from "lucide-react";
import Link from "next/link";
import { FeedCard } from "@/components/feed/feed-card";
import { TrendingCreator } from "@/components/feed/trending-creator";

import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { ImagePlus, FolderPlus, VideoIcon, Smile } from "lucide-react";

import { useState, useRef, useEffect } from "react";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

function CreatePostCard() {
   const [imagePreview, setImagePreview] = useState<string | null>(null);
   const [showFeelingModal, setShowFeelingModal] = useState(false);
   const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
   const fileInputRef = useRef<HTMLInputElement>(null);

   const handleImageClick = () => {
      fileInputRef.current?.click();
   };

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
         const file = e.target.files[0];
         const reader = new FileReader();
         reader.onload = (event) => {
            setImagePreview(event.target?.result as string);
         };
         reader.readAsDataURL(file);
      }
   };

   const removeImage = () => {
      setImagePreview(null);
      if (fileInputRef.current) {
         fileInputRef.current.value = "";
      }
   };

   const feelings = [
      { emoji: "😊", name: "Happy" },
      { emoji: "😢", name: "Sad" },
      { emoji: "😍", name: "Excited" },
      { emoji: "😎", name: "Cool" },
      { emoji: "🤔", name: "Thoughtful" },
      { emoji: "😴", name: "Tired" },
      { emoji: "🥳", name: "Celebrating" },
      { emoji: "😡", name: "Angry" },
      { emoji: "🤒", name: "Sick" },
      { emoji: "🥰", name: "Loved" },
      { emoji: "🤩", name: "Amazed" },
      { emoji: "😌", name: "Relaxed" },
   ];

   const selectFeeling = (feeling: { emoji: string; name: string }) => {
      setSelectedFeeling(`${feeling.emoji} ${feeling.name}`);
      setShowFeelingModal(false);
   };

   return (
      <Card className="mb-6">
         <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-4">
               <Avatar>
                  <AvatarImage
                     src="/placeholder.svg?height=40&width=40"
                     alt="Your profile"
                  />
                  <AvatarFallback>YP</AvatarFallback>
               </Avatar>
               <Textarea
                  placeholder={
                     selectedFeeling
                        ? `Feeling ${selectedFeeling}... What's on your mind?`
                        : "What's on your mind?"
                  }
                  className="resize-none min-h-[60px]"
               />
            </div>

            {imagePreview && (
               <div className="relative mb-4 rounded-md overflow-hidden">
                  <img
                     src={imagePreview || "/placeholder.svg"}
                     alt="Preview"
                     className="w-full max-h-[300px] object-contain"
                  />
                  <Button
                     variant="destructive"
                     size="icon"
                     className="absolute top-2 right-2 h-8 w-8 rounded-full"
                     onClick={removeImage}
                  >
                     <X className="h-4 w-4" />
                  </Button>
               </div>
            )}

            <Separator className="my-4" />

            <div className="flex flex-wrap items-center justify-between gap-2">
               <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
               />
               <Button
                  variant="ghost"
                  className="flex-1 gap-2"
                  onClick={handleImageClick}
               >
                  <ImagePlus className="h-4 w-4" />
                  <span>Image</span>
               </Button>
               <Button variant="ghost" className="flex-1 gap-2">
                  <VideoIcon className="h-4 w-4" />
                  <span>Video</span>
               </Button>
               <Button variant="ghost" className="flex-1 gap-2" asChild>
                  <Link href="/upload-collection">
                     <FolderPlus className="h-4 w-4" />
                     <span>Collection</span>
                  </Link>
               </Button>
               <Dialog
                  open={showFeelingModal}
                  onOpenChange={setShowFeelingModal}
               >
                  <DialogTrigger asChild>
                     <Button variant="ghost" className="flex-1 gap-2">
                        <Smile className="h-4 w-4" />
                        <span>Feeling</span>
                     </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                     <DialogHeader>
                        <DialogTitle>How are you feeling?</DialogTitle>
                        <DialogDescription>
                           Select a feeling or activity to share with your post.
                        </DialogDescription>
                     </DialogHeader>
                     <div className="grid grid-cols-4 gap-4 py-4">
                        {feelings.map((feeling) => (
                           <Button
                              key={feeling.name}
                              variant="outline"
                              className="flex flex-col h-auto py-3"
                              onClick={() => selectFeeling(feeling)}
                           >
                              <span className="text-2xl mb-1">
                                 {feeling.emoji}
                              </span>
                              <span className="text-xs">{feeling.name}</span>
                           </Button>
                        ))}
                     </div>
                     <DialogFooter>
                        <Button
                           variant="outline"
                           onClick={() => setShowFeelingModal(false)}
                        >
                           Cancel
                        </Button>
                     </DialogFooter>
                  </DialogContent>
               </Dialog>
            </div>
         </CardContent>
      </Card>
   );
}

function UploadCollectionCard() {
   return (
      <Card className="mb-6 border-dashed border-2 hover:border-primary/50 transition-colors">
         <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
               <FolderPlus className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Create New Collection</h3>
            <p className="text-sm text-muted-foreground mb-4">
               Organize your images into a new collection
            </p>
            <Button className="gap-2" asChild>
               <Link href="/upload-collection">
                  <FolderPlus className="h-4 w-4" />
                  Create Collection
               </Link>
            </Button>
         </CardContent>
      </Card>
   );
}

export function FanFeed() {
   const [searchQuery, setSearchQuery] = useState("");
   const [isSearchFocused, setIsSearchFocused] = useState(false);
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
   // Sample feed data
   const feedItems = [
      {
         id: 1,
         creator: {
            name: "Alex Rivera",
            username: "alexrivera",
            avatar: "/placeholder.svg?height=40&width=40",
            verified: true,
         },
         content: {
            title: "New Digital Art Collection",
            description:
               "Just dropped my latest collection of digital art NFTs. Limited edition of 50 pieces.",
            image: "/placeholder.svg?height=400&width=600",
            isPaywalled: true,
            price: "$25",
            type: "nft",
         },
         stats: {
            likes: 124,
            comments: 32,
            timestamp: "2 hours ago",
         },
      },
      {
         id: 2,
         creator: {
            name: "Sarah Johnson",
            username: "sarahjcreates",
            avatar: "/placeholder.svg?height=40&width=40",
            verified: true,
         },
         content: {
            title: "Behind the Scenes",
            description:
               "A look at my creative process for my latest music video. What do you think?",
            image: "/placeholder.svg?height=400&width=600",
            isPaywalled: false,
            type: "video",
         },
         stats: {
            likes: 89,
            comments: 14,
            timestamp: "5 hours ago",
         },
      },
      {
         id: 3,
         creator: {
            name: "Michael Chen",
            username: "michaelchenmusic",
            avatar: "/placeholder.svg?height=40&width=40",
            verified: false,
         },
         content: {
            title: "New Track Preview",
            description:
               "Dropping my new track next week. Here's a 30-second preview for my fans!",
            image: "/placeholder.svg?height=400&width=600",
            isPaywalled: false,
            type: "audio",
         },
         stats: {
            likes: 56,
            comments: 8,
            timestamp: "1 day ago",
         },
      },
      {
         id: 4,
         creator: {
            name: "Emma Wilson",
            username: "emmawilsonart",
            avatar: "/placeholder.svg?height=40&width=40",
            verified: true,
         },
         content: {
            title: "Exclusive Tutorial",
            description:
               "Learn how to create stunning digital portraits in this step-by-step tutorial.",
            image: "/placeholder.svg?height=400&width=600",
            isPaywalled: true,
            price: "$15",
            type: "tutorial",
         },
         stats: {
            likes: 210,
            comments: 45,
            timestamp: "2 days ago",
         },
      },
   ];

   // Sample trending creators
   const trendingCreators = [
      {
         name: "Alex Rivera",
         username: "alexrivera",
         avatar: "/placeholder.svg?height=40&width=40",
         category: "Digital Art",
         followers: "24.5K",
      },
      {
         name: "Sarah Johnson",
         username: "sarahjcreates",
         avatar: "/placeholder.svg?height=40&width=40",
         category: "Photography",
         followers: "18.2K",
      },
      {
         name: "Michael Chen",
         username: "michaelchenmusic",
         avatar: "/placeholder.svg?height=40&width=40",
         category: "Music",
         followers: "32.1K",
      },
      {
         name: "Emma Wilson",
         username: "emmawilsonart",
         avatar: "/placeholder.svg?height=40&width=40",
         category: "Tutorials",
         followers: "15.8K",
      },
      {
         name: "David Kim",
         username: "davidkimdesign",
         avatar: "/placeholder.svg?height=40&width=40",
         category: "UI Design",
         followers: "12.3K",
      },
   ];

   return (
      <div className="min-h-screen bg-background">
         {/* Header */}
         <header className="border-b border-border/40 backdrop-blur-sm fixed top-0 w-full z-50 bg-background/80">
            <div className="container flex items-center justify-between h-16">
               <div className="flex items-center gap-2">
                  <Image src={"/logo.png"} alt="Logo" width={36} height={36} />
                  <span className="font-bold text-xl">CulturaX</span>
               </div>

               <div
                  className="hidden md:flex items-center relative max-w-md w-full mx-4"
                  ref={searchRef}
               >
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
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
                                    {searchResults.creators.map(
                                       (creator, idx) => (
                                          <Link
                                             href={`/subscription/${creator.username}`}
                                             key={idx}
                                             className="flex items-center gap-3 w-full px-3 py-2 hover:bg-muted rounded-md"
                                          >
                                             <Avatar className="h-8 w-8">
                                                <AvatarImage
                                                   src={creator.avatar}
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
                                       )
                                    )}
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
                                                   item.image ||
                                                   "/placeholder.svg"
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
                                                   nft.image ||
                                                   "/placeholder.svg"
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
                                 <span>
                                    See all results for "{searchQuery}"
                                 </span>
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
                  <Button
                     variant="outline"
                     size="sm"
                     className="gap-2 hidden md:flex"
                  >
                     <Wallet className="h-4 w-4" /> Connect Wallet
                  </Button>
                  <ModeToggle />
               </div>
            </div>
         </header>

         <div className="flex pt-16">
            {/* Sidebar Navigation */}
            <aside className="w-16 md:w-64 fixed left-0 top-16 h-[calc(100vh-4rem)] border-r border-border/40 p-2 md:p-4 hidden sm:block">
               <nav className="space-y-2">
                  <Button
                     variant="ghost"
                     className="w-full justify-start gap-3"
                     asChild
                  >
                     <Link href="/feed">
                        <Home className="h-5 w-5" />
                        <span className="hidden md:inline">Home</span>
                     </Link>
                  </Button>
                  <Button
                     variant="ghost"
                     className="w-full justify-start gap-3"
                     asChild
                  >
                     <Link href="/explore">
                        <Compass className="h-5 w-5" />
                        <span className="hidden md:inline">Explore</span>
                     </Link>
                  </Button>
                  <Button
                     variant="ghost"
                     className="w-full justify-start gap-3"
                     asChild
                  >
                     <Link href="/ai-tools">
                        <Sparkles className="h-5 w-5" />
                        <span className="hidden md:inline">AI Tools</span>
                     </Link>
                  </Button>
                  <Button
                     variant="ghost"
                     className="w-full justify-start gap-3"
                     asChild
                  >
                     <Link href="/messages">
                        <MessageSquare className="h-5 w-5" />
                        <span className="hidden md:inline">Messages</span>
                     </Link>
                  </Button>
                  <Button
                     variant="ghost"
                     className="w-full justify-start gap-3"
                     asChild
                  >
                     <Link href="/wallet-manager">
                        <Wallet className="h-5 w-5" />
                        <span className="hidden md:inline">Wallet</span>
                     </Link>
                  </Button>
                  <Button
                     variant="ghost"
                     className="w-full justify-start gap-3"
                     asChild
                  >
                     <Link href="/staking">
                        <Coins className="h-5 w-5" />
                        <span className="hidden md:inline">Staking</span>
                     </Link>
                  </Button>
                  <Button
                     variant="ghost"
                     className="w-full justify-start gap-3"
                     asChild
                  >
                     <Link href="/profile">
                        <User className="h-5 w-5" />
                        <span className="hidden md:inline">Profile</span>
                     </Link>
                  </Button>
                  <Button
                     variant="ghost"
                     className="w-full justify-start gap-3"
                     asChild
                  >
                     <Link href="/earnings">
                        <DollarSign className="h-5 w-5" />
                        <span className="hidden md:inline">Earnings</span>
                     </Link>
                  </Button>
                  <Button
                     variant="ghost"
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
               </nav>

               <div className="mt-8 hidden md:block">
                  <h3 className="text-sm font-medium mb-4">
                     Trending Creators
                  </h3>
                  <div className="space-y-4">
                     {trendingCreators.map((creator) => (
                        <TrendingCreator
                           key={creator.username}
                           creator={creator}
                        />
                     ))}
                  </div>
               </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 sm:ml-16 md:ml-64 p-4">
               <div className="max-w-3xl mx-auto">
                  {/* Filters */}
                  <div className="mb-6 flex items-center justify-between">
                     <div className="flex items-center gap-2 overflow-x-auto pb-2">
                        <Button
                           variant="secondary"
                           size="sm"
                           className="rounded-full"
                        >
                           All
                        </Button>
                        <Button
                           variant="outline"
                           size="sm"
                           className="rounded-full"
                        >
                           NFTs
                        </Button>
                        <Button
                           variant="outline"
                           size="sm"
                           className="rounded-full"
                        >
                           Videos
                        </Button>
                        <Button
                           variant="outline"
                           size="sm"
                           className="rounded-full"
                        >
                           Music
                        </Button>
                        <Button
                           variant="outline"
                           size="sm"
                           className="rounded-full"
                        >
                           Tutorials
                        </Button>
                     </div>
                     <div className="flex md:hidden">
                        <Button variant="outline" size="icon">
                           <Search className="h-4 w-4" />
                        </Button>
                     </div>
                  </div>

                  {/* Feed */}
                  <div>
                     <CreatePostCard />
                     <UploadCollectionCard />
                     <div className="space-y-6">
                        {feedItems.map((item) => (
                           <FeedCard key={item.id} item={item} />
                        ))}
                     </div>
                  </div>
               </div>
            </main>
         </div>

         {/* Mobile Navigation */}
         <div className="sm:hidden fixed bottom-0 left-0 right-0 border-t border-border/40 bg-background z-50">
            <div className="flex justify-around p-2">
               <Button variant="ghost" size="icon" asChild>
                  <Link href="/feed">
                     <Home className="h-5 w-5" />
                  </Link>
               </Button>
               <Button variant="ghost" size="icon" asChild>
                  <Link href="/explore">
                     <Compass className="h-5 w-5" />
                  </Link>
               </Button>
               <Button variant="ghost" size="icon" asChild>
                  <Link href="/upload-collection">
                     <FolderPlus className="h-5 w-5" />
                  </Link>
               </Button>
               <Button variant="ghost" size="icon" asChild>
                  <Link href="/wallet-manager">
                     <Wallet className="h-5 w-5" />
                  </Link>
               </Button>
               <Button variant="ghost" size="icon" asChild>
                  <Link href="/profile">
                     <User className="h-5 w-5" />
                  </Link>
               </Button>
            </div>
         </div>
      </div>
   );
}
