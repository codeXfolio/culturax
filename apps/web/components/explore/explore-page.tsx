"use client";

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
   Filter,
} from "lucide-react";
import Link from "next/link";
import { CreatorCard } from "@/components/explore/creator-card";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Header } from "@/components/navigation/header";

export function ExplorePage() {
   const [category, setCategory] = useState("all");

   // Sample creators data
   const creators = [
      {
         id: 1,
         name: "Alex Rivera",
         username: "alexrivera",
         avatar: "/placeholder.svg?height=200&width=200",
         coverImage: "/placeholder.svg?height=400&width=800",
         category: "Digital Art",
         bio: "Digital artist specializing in futuristic landscapes and NFT collections.",
         followers: "24.5K",
         verified: true,
         featured: true,
      },
      {
         id: 2,
         name: "Sarah Johnson",
         username: "sarahjcreates",
         avatar: "/placeholder.svg?height=200&width=200",
         coverImage: "/placeholder.svg?height=400&width=800",
         category: "Photography",
         bio: "Capturing moments and emotions through the lens. NFT photographer and visual storyteller.",
         followers: "18.2K",
         verified: true,
         featured: false,
      },
      {
         id: 3,
         name: "Michael Chen",
         username: "michaelchenmusic",
         avatar: "/placeholder.svg?height=200&width=200",
         coverImage: "/placeholder.svg?height=400&width=800",
         category: "Music",
         bio: "Electronic music producer and sound designer. Creating audio NFTs and immersive experiences.",
         followers: "32.1K",
         verified: false,
         featured: true,
      },
      {
         id: 4,
         name: "Emma Wilson",
         username: "emmawilsonart",
         avatar: "/placeholder.svg?height=200&width=200",
         coverImage: "/placeholder.svg?height=400&width=800",
         category: "Tutorials",
         bio: "Digital art educator sharing techniques and tutorials for aspiring creators.",
         followers: "15.8K",
         verified: true,
         featured: false,
      },
      {
         id: 5,
         name: "David Kim",
         username: "davidkimdesign",
         avatar: "/placeholder.svg?height=200&width=200",
         coverImage: "/placeholder.svg?height=400&width=800",
         category: "UI Design",
         bio: "UI/UX designer creating interfaces for Web3 applications and digital experiences.",
         followers: "12.3K",
         verified: false,
         featured: false,
      },
      {
         id: 6,
         name: "Sophia Martinez",
         username: "sophiam",
         avatar: "/placeholder.svg?height=200&width=200",
         coverImage: "/placeholder.svg?height=400&width=800",
         category: "3D Art",
         bio: "3D artist and animator creating immersive digital sculptures and environments.",
         followers: "9.7K",
         verified: true,
         featured: true,
      },
      {
         id: 7,
         name: "James Wilson",
         username: "jameswilson",
         avatar: "/placeholder.svg?height=200&width=200",
         coverImage: "/placeholder.svg?height=400&width=800",
         category: "Writing",
         bio: "Author and storyteller exploring the intersection of narrative and blockchain technology.",
         followers: "7.5K",
         verified: false,
         featured: false,
      },
      {
         id: 8,
         name: "Olivia Taylor",
         username: "oliviataylor",
         avatar: "/placeholder.svg?height=200&width=200",
         coverImage: "/placeholder.svg?height=400&width=800",
         category: "Fashion",
         bio: "Digital fashion designer creating wearable NFTs and virtual clothing collections.",
         followers: "14.2K",
         verified: true,
         featured: false,
      },
   ];

   // Filter creators based on selected category
   const filteredCreators =
      category === "all"
         ? creators
         : creators.filter(
              (creator) =>
                 creator.category.toLowerCase() === category.toLowerCase()
           );

   // Get featured creators
   const featuredCreators = creators.filter((creator) => creator.featured);

   return (
      <div className="min-h-screen bg-background">
         {/* Header */}
         <Header />

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
                     variant="secondary"
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
                     <Link href="/profile">
                        <User className="h-5 w-5" />
                        <span className="hidden md:inline">Profile</span>
                     </Link>
                  </Button>
               </nav>

               <div className="mt-8 hidden md:block">
                  <h3 className="text-sm font-medium mb-4">Categories</h3>
                  <div className="space-y-2">
                     <Button
                        variant={category === "all" ? "secondary" : "ghost"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setCategory("all")}
                     >
                        All Categories
                     </Button>
                     <Button
                        variant={
                           category === "digital art" ? "secondary" : "ghost"
                        }
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setCategory("digital art")}
                     >
                        Digital Art
                     </Button>
                     <Button
                        variant={
                           category === "photography" ? "secondary" : "ghost"
                        }
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setCategory("photography")}
                     >
                        Photography
                     </Button>
                     <Button
                        variant={category === "music" ? "secondary" : "ghost"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setCategory("music")}
                     >
                        Music
                     </Button>
                     <Button
                        variant={
                           category === "tutorials" ? "secondary" : "ghost"
                        }
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setCategory("tutorials")}
                     >
                        Tutorials
                     </Button>
                     <Button
                        variant={category === "3d art" ? "secondary" : "ghost"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setCategory("3d art")}
                     >
                        3D Art
                     </Button>
                  </div>
               </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 sm:ml-16 md:ml-64 p-4">
               <div className="max-w-6xl mx-auto">
                  {/* Filters */}
                  <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                     <div>
                        <h1 className="text-2xl font-bold mb-1">
                           Explore Creators
                        </h1>
                        <p className="text-muted-foreground">
                           Discover talented creators in the CreatorX ecosystem
                        </p>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="flex md:hidden">
                           <Select value={category} onValueChange={setCategory}>
                              <SelectTrigger className="w-[180px]">
                                 <SelectValue placeholder="Category" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="all">
                                    All Categories
                                 </SelectItem>
                                 <SelectItem value="digital art">
                                    Digital Art
                                 </SelectItem>
                                 <SelectItem value="photography">
                                    Photography
                                 </SelectItem>
                                 <SelectItem value="music">Music</SelectItem>
                                 <SelectItem value="tutorials">
                                    Tutorials
                                 </SelectItem>
                                 <SelectItem value="3d art">3D Art</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                        <Select defaultValue="trending">
                           <SelectTrigger className="w-[130px]">
                              <SelectValue placeholder="Sort by" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="trending">Trending</SelectItem>
                              <SelectItem value="newest">Newest</SelectItem>
                              <SelectItem value="followers">
                                 Most Followers
                              </SelectItem>
                           </SelectContent>
                        </Select>
                        <Button variant="outline" size="icon">
                           <Filter className="h-4 w-4" />
                        </Button>
                     </div>
                  </div>

                  {/* Featured Creators */}
                  {category === "all" && (
                     <div className="mb-8">
                        <h2 className="text-lg font-medium mb-4">
                           Featured Creators
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                           {featuredCreators.map((creator) => (
                              <CreatorCard
                                 key={creator.id}
                                 creator={creator}
                                 featured
                              />
                           ))}
                        </div>
                     </div>
                  )}

                  {/* All Creators */}
                  <div>
                     <h2 className="text-lg font-medium mb-4">
                        {category === "all"
                           ? "All Creators"
                           : `${
                                category.charAt(0).toUpperCase() +
                                category.slice(1)
                             } Creators`}
                     </h2>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCreators.map((creator) => (
                           <CreatorCard key={creator.id} creator={creator} />
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
                  <Link href="/ai-tools">
                     <Sparkles className="h-5 w-5" />
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
