"use client";

import { Button } from "@/components/ui/button";
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
import { Header } from "@/components/navigation/header";
import { Sidebar } from "@/components/navigation/sidebar";
import MobileNavigation from "../navigation/mobile-navigation";

interface Creator {
   id: number;
   name: string;
   username: string;
   avatar: string;
   coverImage: string;
   category: string;
   bio: string;
   followers: string;
   verified: boolean;
   featured?: boolean;
}

interface CreatorsData {
   featured: Creator[];
   regular: Creator[];
   pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
   };
}

export function ExplorePage() {
   const [category, setCategory] = useState("all");
   const [currentPage, setCurrentPage] = useState(1);
   const [isLoading, setIsLoading] = useState(true);
   const [creators, setCreators] = useState<CreatorsData>({
      featured: [],
      regular: [],
      pagination: {
         currentPage: 1,
         totalPages: 1,
         totalItems: 0,
         itemsPerPage: 9,
      },
   });

   useEffect(() => {
      const fetchCreators = async () => {
         try {
            setIsLoading(true);
            const authSignature = localStorage.getItem("authSignature");
            const authAddress = localStorage.getItem("authAddress");

            const headers: HeadersInit = {
               "Content-Type": "application/json",
            };

            if (authSignature && authAddress) {
               headers["x-eth-signature"] = authSignature;
               headers["x-eth-address"] = authAddress;
            }

            const response = await fetch(
               `${process.env.NEXT_PUBLIC_API_URL}/api/creator?page=${currentPage}`,
               {
                  headers,
               }
            );
            const data = await response.json();
            console.log(data);
            if (data.success) {
               // Transform the API response to match the expected format
               const transformedData = {
                  featured: data.data.featured.map((creator: any) => ({
                     id: parseInt(creator.id),
                     name: creator.name,
                     username: creator.username,
                     avatar: creator.avatar,
                     coverImage: creator.coverImage,
                     category: creator.category || "Uncategorized",
                     bio: creator.bio || "",
                     followers: creator.totalFollowers.toString(),
                     verified: creator.featured,
                     featured: creator.featured,
                  })),
                  regular: data.data.regular.map((creator: any) => ({
                     id: parseInt(creator.id),
                     name: creator.name,
                     username: creator.username,
                     avatar: creator.avatar,
                     coverImage: creator.coverImage,
                     category: creator.category || "Uncategorized",
                     bio: creator.bio || "",
                     followers: creator.totalFollowers.toString(),
                     verified: creator.featured,
                     featured: creator.featured,
                  })),
                  pagination: data.data.pagination,
               };
               setCreators(transformedData);
            }
         } catch (error) {
            console.error("Error fetching creators:", error);
         } finally {
            setIsLoading(false);
         }
      };

      fetchCreators();
   }, [currentPage]);

   // Filter creators based on selected category
   const filteredCreators =
      category === "all"
         ? creators.regular
         : creators.regular.filter(
              (creator) =>
                 creator.category?.toLowerCase() === category.toLowerCase()
           );

   return (
      <div className="min-h-screen bg-background">
         {/* Header */}
         <Header />

         <div className="flex pt-16">
            {/* Sidebar Navigation */}
            <Sidebar />

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
                     </div>
                  </div>

                  {/* Featured Creators */}
                  {category === "all" &&
                     !isLoading &&
                     creators.featured.length > 0 && (
                        <div className="mb-8">
                           <h2 className="text-lg font-medium mb-4">
                              Featured Creators
                           </h2>
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {creators.featured.map((creator, index) => (
                                 <CreatorCard
                                    key={index}
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
                     {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                           {[...Array(6)].map((_, index) => (
                              <div key={index} className="animate-pulse">
                                 <div className="h-[300px] bg-muted rounded-lg" />
                              </div>
                           ))}
                        </div>
                     ) : (
                        <>
                           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                              {filteredCreators.map((creator, index) => (
                                 <CreatorCard key={index} creator={creator} />
                              ))}
                           </div>
                           {/* Pagination */}
                           {creators.pagination.totalPages > 1 && (
                              <div className="flex justify-center mt-8 gap-2">
                                 <Button
                                    variant="outline"
                                    onClick={() =>
                                       setCurrentPage((prev) =>
                                          Math.max(prev - 1, 1)
                                       )
                                    }
                                    disabled={currentPage === 1}
                                 >
                                    Previous
                                 </Button>
                                 <div className="flex items-center gap-2">
                                    {Array.from(
                                       {
                                          length:
                                             creators.pagination.totalPages,
                                       },
                                       (_, i) => i + 1
                                    ).map((page) => (
                                       <Button
                                          key={page}
                                          variant={
                                             currentPage === page
                                                ? "default"
                                                : "outline"
                                          }
                                          onClick={() => setCurrentPage(page)}
                                          className="w-10 h-10 p-0"
                                       >
                                          {page}
                                       </Button>
                                    ))}
                                 </div>
                                 <Button
                                    variant="outline"
                                    onClick={() =>
                                       setCurrentPage((prev) =>
                                          Math.min(
                                             prev + 1,
                                             creators.pagination.totalPages
                                          )
                                       )
                                    }
                                    disabled={
                                       currentPage ===
                                       creators.pagination.totalPages
                                    }
                                 >
                                    Next
                                 </Button>
                              </div>
                           )}
                        </>
                     )}
                  </div>
               </div>
            </main>
         </div>

         {/* Mobile Navigation */}
         <MobileNavigation />
      </div>
   );
}
