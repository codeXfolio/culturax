"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageSquare, Share2, Lock, X } from "lucide-react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { CommentModal } from "@/components/feed/CommentModal";

interface FeedPostCardProps {
   post: {
      id: number;
      title: string;
      content: string;
      image?: string;
      date: string;
      likes: number;
      comments: number;
      isSubscriberOnly: boolean;
      commentsList?: {
         id: number;
         user: {
            name: string;
            avatar: string;
            isVerified?: boolean;
         };
         content: string;
         date: string;
         likes: number;
      }[];
   };
}

export function FeedPostCard({ post }: FeedPostCardProps) {
   const [showComments, setShowComments] = useState(false);
   const [newComment, setNewComment] = useState("");
   const [showCommentModal, setShowCommentModal] = useState(false);

   // Default comments if none provided
   const commentsList = post.commentsList || [
      {
         id: 1,
         user: {
            name: "Sarah Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
            isVerified: true,
         },
         content: "This is amazing content! Thanks for sharing your insights.",
         date: "2 hours ago",
         likes: 12,
      },
      {
         id: 2,
         user: {
            name: "Michael Chen",
            avatar: "/placeholder.svg?height=40&width=40",
         },
         content:
            "I've been following your work for a while now. Always top quality!",
         date: "5 hours ago",
         likes: 8,
      },
   ];

   const handleSubmitComment = (e: React.FormEvent) => {
      e.preventDefault();
      if (newComment.trim()) {
         // In a real app, you would send this to an API
         console.log("New comment:", newComment);
         setNewComment("");
         // For demo purposes, we're not actually adding the comment to the list
      }
   };

   return (
      <Card className="overflow-hidden">
         <CardContent className="p-0">
            <div className="flex items-center justify-between mb-3">
               <div className="flex items-center gap-2">
                  <Avatar>
                     <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="Creator"
                     />
                     <AvatarFallback>CR</AvatarFallback>
                  </Avatar>
                  <div>
                     <div className="flex items-center gap-1">
                        <span className="font-medium text-sm">Alex Rivera</span>
                        <svg
                           className="h-4 w-4 text-blue-500"
                           viewBox="0 0 24 24"
                           fill="currentColor"
                        >
                           <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                     </div>
                     <span className="text-xs text-muted-foreground">
                        {post.date}
                     </span>
                  </div>
               </div>

               {post.isSubscriberOnly && (
                  <Badge
                     variant="secondary"
                     className="flex items-center gap-1"
                  >
                     <Lock className="h-3 w-3" />
                     <span>Subscribers Only</span>
                  </Badge>
               )}
            </div>

            <div className="mb-3">
               <h3 className="font-medium mb-2">{post.title}</h3>
               <p className="text-sm text-muted-foreground">{post.content}</p>
            </div>

            {post.image && !post.isSubscriberOnly && (
               <div className="relative mb-3 -mx-4">
                  <img
                     src={post.image || "/placeholder.svg"}
                     alt={post.title}
                     className="w-full h-auto object-cover"
                  />
               </div>
            )}

            {post.image && post.isSubscriberOnly && (
               <div className="relative mb-3 rounded-md overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent flex flex-col items-center justify-center z-10">
                     <Lock className="h-8 w-8 mb-2 text-primary" />
                     <p className="font-medium mb-1">Exclusive Content</p>
                     <p className="text-sm text-muted-foreground mb-3">
                        Subscribe to unlock
                     </p>
                     <Button size="sm">Subscribe</Button>
                  </div>
                  <img
                     src={post.image || "/placeholder.svg"}
                     alt={post.title}
                     className="w-full h-auto object-cover rounded-md blur-sm"
                  />
               </div>
            )}
         </CardContent>

         <CardFooter className="flex flex-col">
            <div className="flex items-center justify-between w-full">
               <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="gap-1 px-2">
                     <Heart
                        className={`h-4 w-4 ${
                           post.likes > 0 ? "fill-red-500 text-red-500" : ""
                        }`}
                     />
                     <span>{post.likes}</span>
                  </Button>
                  <Button
                     variant="ghost"
                     size="sm"
                     className="gap-1 px-2"
                     onClick={() => setShowCommentModal(true)}
                  >
                     <MessageSquare className="h-4 w-4" />
                     <span>{commentsList.length}</span>
                  </Button>
               </div>
               <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                     {post.date}
                  </span>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                     <Share2 className="h-4 w-4" />
                  </Button>
               </div>
            </div>

            {showComments && (
               <div className="px-4 py-3 border-t border-border/40">
                  <h4 className="font-medium text-sm mb-3">
                     Comments ({commentsList.length})
                  </h4>
                  <div className="space-y-4 mb-4">
                     {commentsList.map((comment) => (
                        <div
                           key={comment.id}
                           className="flex items-start gap-2"
                        >
                           <Avatar className="h-8 w-8">
                              <AvatarImage
                                 src={comment.user.avatar}
                                 alt={comment.user.name}
                              />
                              <AvatarFallback>
                                 {comment.user.name.charAt(0)}
                              </AvatarFallback>
                           </Avatar>
                           <div className="flex-1">
                              <div className="flex items-center gap-2">
                                 <span className="font-medium text-sm">
                                    {comment.user.name}
                                 </span>
                                 <span className="text-xs text-muted-foreground">
                                    {comment.date}
                                 </span>
                              </div>
                              <p className="text-sm">{comment.content}</p>
                           </div>
                           <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              // onClick={() => onDeleteComment(comment.id)}
                           >
                              <X className="h-4 w-4" />
                           </Button>
                        </div>
                     ))}
                  </div>
                  <form
                     onSubmit={handleSubmitComment}
                     className="flex flex-col gap-2"
                  >
                     <textarea
                        placeholder="Add a comment..."
                        className="min-h-[80px] text-sm rounded-md border border-input bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                     />
                     <div className="flex justify-end">
                        <Button
                           type="submit"
                           size="sm"
                           disabled={!newComment.trim()}
                        >
                           Post
                        </Button>
                     </div>
                  </form>
               </div>
            )}
         </CardFooter>

         <CommentModal
            open={showCommentModal}
            onOpenChange={setShowCommentModal}
            post={{
               image: post.image,
               user: {
                  name: "Alex Rivera",
                  avatar: "/placeholder.svg?height=40&width=40",
               },
               caption: post.content,
            }}
            comments={commentsList}
         />
      </Card>
   );
}
