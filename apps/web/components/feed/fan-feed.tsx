"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Wallet, Home, Compass, User, FolderPlus } from "lucide-react";
import Link from "next/link";
import { FeedCard } from "@/components/feed/feed-card";
import { useState, useEffect } from "react";
import { Header } from "../navigation/header";
import { Sidebar } from "../navigation/sidebar";
import { useInView } from "react-intersection-observer";
import { CreatePostCard } from "./create-post-card";
import { UploadCollectionCard } from "./upload-collection-card";
import { fetchProfile } from "@/lib/utils";

interface User {
   id: string;
   name: string;
   username: string;
   avatar: string;
}

export interface FeedItem {
   id: string;
   caption: string;
   image: string;
   isPremium: boolean;
   userId: string;
   user: User;
   createdAt: string;
   FeedPostLike: any[];
   FeedPostComment: any[];
}

export function FanFeed() {
   const [isLoading, setIsLoading] = useState(true);
   const [isLoadingMore, setIsLoadingMore] = useState(false);
   const [page, setPage] = useState(1);
   const [hasMore, setHasMore] = useState(true);
   const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
   const [profile, setProfile] = useState<{
      avatar: string;
      accountType: string;
   } | null>(null);
   const { ref, inView } = useInView({
      threshold: 0,
   });

   // Fetch initial feed posts
   useEffect(() => {
      const fetchFeedPosts = async () => {
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
               `${process.env.NEXT_PUBLIC_API_URL}/api/feed?page=1`,
               { headers }
            );
            const data = await response.json();

            if (data.success) {
               setFeedItems(data.data);
               setHasMore(data.pagination.page < data.pagination.totalPages);
            }
         } catch (error) {
            console.error("Error fetching feed posts:", error);
         } finally {
            setIsLoading(false);
         }
      };

      fetchProfile().then((profile) => {
         setProfile(profile);
      });

      fetchFeedPosts();
   }, []);

   // Load more posts when scrolling to the bottom
   useEffect(() => {
      if (inView && hasMore && !isLoadingMore) {
         loadMorePosts();
      }
   }, [inView, hasMore, isLoadingMore]);

   const loadMorePosts = async () => {
      try {
         setIsLoadingMore(true);
         const nextPage = page + 1;
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
            `${process.env.NEXT_PUBLIC_API_URL}/api/feed?page=${nextPage}`,
            { headers }
         );
         const data = await response.json();

         if (data.success) {
            // Use a Set to ensure unique items based on id
            const existingIds = new Set(feedItems.map((item) => item.id));
            const newItems = data.data.filter(
               (item: FeedItem) => !existingIds.has(item.id)
            );

            setFeedItems((prev) => [...prev, ...newItems]);
            setPage(nextPage);
            setHasMore(nextPage < data.pagination.totalPages);
         }
      } catch (error) {
         console.error("Error loading more posts:", error);
      } finally {
         setIsLoadingMore(false);
      }
   };

   const handleCreatePost = async (result: FeedItem) => {
      setFeedItems((prev) => [result, ...prev]);
   };

   const handleLikePost = async (postId: string) => {
      try {
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
            `${process.env.NEXT_PUBLIC_API_URL}/api/feed/like`,
            {
               method: "POST",
               headers,
               body: JSON.stringify({ feedPostId: postId }),
            }
         );
         const data = await response.json();

         if (data.success) {
            // Update the feed items with the new like
            setFeedItems((prev) =>
               prev.map((item) => {
                  if (item.id === postId) {
                     return {
                        ...item,
                        FeedPostLike: [...item.FeedPostLike, data.data],
                     };
                  }
                  return item;
               })
            );
         }
      } catch (error) {
         console.error("Error liking post:", error);
      }
   };

   const handleUnlikePost = async (postId: string) => {
      try {
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
            `${process.env.NEXT_PUBLIC_API_URL}/api/feed/unlike`,
            {
               method: "POST",
               headers,
               body: JSON.stringify({ feedPostId: postId }),
            }
         );
         const data = await response.json();

         if (data.success) {
            // Update the feed items by removing the like
            setFeedItems((prev) =>
               prev.map((item) => {
                  if (item.id === postId) {
                     return {
                        ...item,
                        FeedPostLike: item.FeedPostLike.filter(
                           (like) => like.id !== data.data.id
                        ),
                     };
                  }
                  return item;
               })
            );
         }
      } catch (error) {
         console.error("Error unliking post:", error);
      }
   };

   const handleAddComment = async (postId: string, comment: string) => {
      try {
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
            `${process.env.NEXT_PUBLIC_API_URL}/api/feed/comment`,
            {
               method: "POST",
               headers,
               body: JSON.stringify({ feedPostId: postId, comment }),
            }
         );
         const data = await response.json();

         if (data.success) {
            // Update the feed items with the new comment
            setFeedItems((prev) =>
               prev.map((item) => {
                  if (item.id === postId) {
                     return {
                        ...item,
                        FeedPostComment: [...item.FeedPostComment, data.data],
                     };
                  }
                  return item;
               })
            );
         }
      } catch (error) {
         console.error("Error adding comment:", error);
      }
   };

   const handleDeleteComment = async (commentId: string) => {
      try {
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
            `${process.env.NEXT_PUBLIC_API_URL}/api/feed/comment/${commentId}`,
            {
               method: "DELETE",
               headers,
            }
         );
         const data = await response.json();

         if (data.success) {
            // Update the feed items by removing the comment
            setFeedItems((prev) =>
               prev.map((item) => {
                  if (
                     item.FeedPostComment.some(
                        (comment) => comment.id === commentId
                     )
                  ) {
                     return {
                        ...item,
                        FeedPostComment: item.FeedPostComment.filter(
                           (comment) => comment.id !== commentId
                        ),
                     };
                  }
                  return item;
               })
            );
         }
      } catch (error) {
         console.error("Error deleting comment:", error);
      }
   };

   return (
      <div className="min-h-screen bg-background">
         {/* Header */}
         <Header />

         <div className="flex pt-16">
            {/* Sidebar Navigation */}
            <Sidebar profile={profile} />

            {/* Main Content */}
            <main className="flex-1 sm:ml-16 md:ml-64 p-4">
               <div className="max-w-3xl mx-auto">
                  {/* Feed */}
                  <div className="mt-14">
                     <CreatePostCard onCreatePost={handleCreatePost} />
                     {profile?.accountType === "CREATOR" && (
                        <UploadCollectionCard />
                     )}
                     {isLoading ? (
                        <div className="space-y-6">
                           {[...Array(4)].map((_, index) => (
                              <div key={index} className="animate-pulse">
                                 <div className="h-[400px] bg-muted rounded-lg" />
                              </div>
                           ))}
                        </div>
                     ) : (
                        <>
                           <div className="space-y-6">
                              {feedItems.map((item) => (
                                 <FeedCard
                                    key={item.id}
                                    item={item}
                                    onLike={() => handleLikePost(item.id)}
                                    onUnlike={() => handleUnlikePost(item.id)}
                                    onAddComment={(comment) =>
                                       handleAddComment(item.id, comment)
                                    }
                                    onDeleteComment={handleDeleteComment}
                                 />
                              ))}
                           </div>
                           {/* Infinite scroll trigger */}
                           <div ref={ref} className="flex justify-center py-4">
                              {isLoadingMore && (
                                 <div className="animate-pulse">
                                    <div className="h-[400px] bg-muted rounded-lg" />
                                 </div>
                              )}
                           </div>
                        </>
                     )}
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
