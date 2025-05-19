import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageSquare, Share2, Lock, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { CommentModal } from "@/components/feed/CommentModal";
import Link from "next/link";

interface FeedCardProps {
   item: {
      id: string;
      caption: string;
      image?: string;
      isPremium: boolean;
      userId: string;
      user: {
         id: string;
         name: string;
         username: string;
         avatar: string;
      };
      createdAt: string;
      FeedPostLike: {
         id: string;
      }[];
      FeedPostComment: {
         id: string;
         comment: string;
         user: {
            id: string;
            name: string;
            username: string;
            avatar: string;
         };
         createdAt: string;
      }[];
   };
   onLike: () => void;
   onUnlike: () => void;
   onAddComment: (comment: string) => void;
   onDeleteComment: (commentId: string) => void;
}

export function FeedCard({
   item,
   onLike,
   onUnlike,
   onAddComment,
   onDeleteComment,
}: FeedCardProps) {
   const [showComments, setShowComments] = useState(false);
   const [newComment, setNewComment] = useState("");
   const [isLiked, setIsLiked] = useState(false);
   const [showCommentModal, setShowCommentModal] = useState(false);

   const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const now = new Date();
      const diffInHours = Math.abs(now.getTime() - date.getTime()) / 36e5;

      if (diffInHours < 24) {
         return `${Math.round(diffInHours)} hours ago`;
      } else if (diffInHours < 48) {
         return "Yesterday";
      } else {
         return date.toLocaleDateString();
      }
   };

   const handleLike = () => {
      if (isLiked) {
         onUnlike();
      } else {
         onLike();
      }
      setIsLiked(!isLiked);
   };

   const handleAddComment = (e: React.FormEvent) => {
      e.preventDefault();
      if (newComment.trim()) {
         onAddComment(newComment);
         setNewComment("");
      }
   };

   return (
      <Card className="overflow-hidden">
         <CardContent className="p-0">
            <div className="p-4">
               <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                     <Avatar>
                        <AvatarImage
                           src={item.user.avatar}
                           alt={item.user.name}
                        />
                        <AvatarFallback>
                           {item.user.name.charAt(0)}
                        </AvatarFallback>
                     </Avatar>
                     <div>
                        <div className="flex items-center gap-1">
                           <Link href={`/subscription/${item.user.username}`}>
                              <span className="font-medium text-sm hover:underline">
                                 {item.user.name}
                              </span>
                           </Link>
                        </div>
                        <Link href={`/subscription/${item.user.username}`}>
                           <span className="text-xs text-muted-foreground hover:underline">
                              @{item.user.username}
                           </span>
                        </Link>
                     </div>
                  </div>
               </div>
               <p className="text-sm text-muted-foreground mb-3">
                  {item.caption}
               </p>
            </div>

            {item.image && (
               <div className="relative">
                  <img
                     src={`${process.env.NEXT_PUBLIC_API_URL + item.image}`}
                     alt={item.caption}
                     className="w-full h-auto object-cover"
                  />

                  {item.isPremium && (
                     <div className="absolute inset-0 backdrop-blur-md flex flex-col items-center justify-center">
                        <Lock className="h-8 w-8 mb-2 text-primary" />
                        <p className="font-medium mb-1">Premium Content</p>
                        <p className="text-sm text-muted-foreground mb-3">
                           Subscribe to unlock
                        </p>
                        <Button size="sm">Subscribe</Button>
                     </div>
                  )}
               </div>
            )}
         </CardContent>

         <CardFooter className="flex flex-col p-4">
            <div className="flex items-center justify-between w-full">
               <div className="flex items-center gap-4">
                  <Button
                     variant="ghost"
                     size="sm"
                     className="gap-1 px-2"
                     onClick={handleLike}
                  >
                     <Heart
                        className={`h-4 w-4 ${
                           isLiked ? "fill-red-500 text-red-500" : ""
                        }`}
                     />
                     <span>{item.FeedPostLike.length}</span>
                  </Button>
                  <Button
                     variant="ghost"
                     size="sm"
                     className="gap-1 px-2"
                     onClick={() => setShowCommentModal(true)}
                  >
                     <MessageSquare className="h-4 w-4" />
                     <span>{item.FeedPostComment.length}</span>
                  </Button>
               </div>
               <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                     {formatDate(item.createdAt)}
                  </span>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                     <Share2 className="h-4 w-4" />
                  </Button>
               </div>
            </div>

            {showComments && (
               <div className="px-4 py-3 border-t border-border/40">
                  <h4 className="font-medium text-sm mb-3">
                     Comments ({item.FeedPostComment.length})
                  </h4>
                  <div className="space-y-4 mb-4">
                     {item.FeedPostComment.map((comment) => (
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
                                    {formatDate(comment.createdAt)}
                                 </span>
                              </div>
                              <p className="text-sm">{comment.comment}</p>
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
                     onSubmit={handleAddComment}
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
               image: item.image,
               user: item.user,
               caption: item.caption,
            }}
            comments={item.FeedPostComment.map((comment) => ({
               id: comment.id,
               user: {
                  name: comment.user.name,
                  avatar: comment.user.avatar,
               },
               content: comment.comment,
               date: formatDate(comment.createdAt),
               likes: 0,
            }))}
         />
      </Card>
   );
}
