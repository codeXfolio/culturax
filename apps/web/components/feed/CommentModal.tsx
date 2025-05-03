import React from "react";
import {
   Dialog,
   DialogContent,
   DialogClose,
   DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, Heart } from "lucide-react";

interface CommentModalProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   post: {
      image?: string;
      user: { name: string; avatar: string };
      caption: string;
      isPremium?: boolean;
   };
   comments?: {
      id: number;
      user: { name: string; avatar: string; isVerified?: boolean };
      content: string;
      date: string;
      likes: number;
   }[];
}

export function CommentModal({
   open,
   onOpenChange,
   post,
   comments = [],
}: CommentModalProps) {
   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent className="max-w-7xl w-full p-0 flex flex-col sm:flex-row overflow-hidden border-none">
            <DialogTitle className="sr-only">
               Comments for {post.user.name}'s post
            </DialogTitle>
            {/* Left: Image */}
            <div className="sm:w-1/2 w-full bg-black flex items-center justify-center relative">
               {post.image ? (
                  <>
                     <img
                        src={post.image}
                        alt="Post"
                        className={`object-contain max-h-[80vh] w-full ${
                           post.isPremium ? "blur-sm" : ""
                        }`}
                     />
                     {post.isPremium && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                           <div className="bg-black/60 absolute inset-0" />
                           <div className="relative z-20 flex flex-col items-center">
                              <svg
                                 className="h-8 w-8 mb-2 text-primary"
                                 fill="none"
                                 stroke="currentColor"
                                 strokeWidth="2"
                                 viewBox="0 0 24 24"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 17v1m0-8a4 4 0 00-4 4v1a4 4 0 008 0v-1a4 4 0 00-4-4zm0 0V7a2 2 0 114 0v2"
                                 />
                              </svg>
                              <p className="font-medium mb-1 text-white">
                                 Premium Content
                              </p>
                              <p className="text-sm text-muted-foreground mb-3">
                                 Subscribe to unlock
                              </p>
                              <Button size="sm">Subscribe</Button>
                           </div>
                        </div>
                     )}
                  </>
               ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                     No Image
                  </div>
               )}
            </div>
            {/* Right: Comments */}
            <div className="sm:w-1/2 w-full flex flex-col max-h-[80vh]">
               {/* Header */}
               <div className="flex items-center justify-between p-4 border-b border-border/40">
                  <div className="flex items-center gap-2">
                     <Avatar className="h-8 w-8">
                        <AvatarImage
                           src={post.user.avatar}
                           alt={post.user.name}
                        />
                        <AvatarFallback>
                           {post.user.name.charAt(0)}
                        </AvatarFallback>
                     </Avatar>
                     <span className="font-medium text-sm">
                        {post.user.name}
                     </span>
                  </div>
               </div>
               {/* Caption */}
               <div className="p-4 border-b border-border/40">
                  <span className="font-medium text-sm mr-2">
                     {post.user.name}
                  </span>
                  <span className="text-sm">{post.caption}</span>
               </div>
               {/* Comments */}
               <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {comments.length === 0 && (
                     <div className="text-muted-foreground text-sm">
                        No comments yet.
                     </div>
                  )}
                  {comments.map((comment) => (
                     <div key={comment.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                           <AvatarImage
                              src={comment.user.avatar}
                              alt={comment.user.name}
                           />
                           <AvatarFallback>
                              {comment.user.name.substring(0, 2)}
                           </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                           <div className="flex items-center gap-1 mb-1">
                              <span className="text-sm font-medium">
                                 {comment.user.name}
                              </span>
                              {comment.user.isVerified && (
                                 <svg
                                    className="h-3.5 w-3.5 text-blue-500"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                 >
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                 </svg>
                              )}
                              <span className="text-xs text-muted-foreground ml-1">
                                 {comment.date}
                              </span>
                           </div>
                           <p className="text-sm">{comment.content}</p>
                        </div>
                     </div>
                  ))}
               </div>
               {/* Input */}
               <form className="p-4 border-t border-border/40 flex gap-2">
                  <input
                     type="text"
                     placeholder="Add a comment..."
                     className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <Button type="submit" size="sm">
                     Post
                  </Button>
               </form>
            </div>
         </DialogContent>
      </Dialog>
   );
}
