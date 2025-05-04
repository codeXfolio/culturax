"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ImagePlus, FolderPlus, VideoIcon, Smile, X } from "lucide-react";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FeedItem } from "./fan-feed";

interface CreatePostCardProps {
   onCreatePost: (result: FeedItem) => void;
}

export function CreatePostCard({ onCreatePost }: CreatePostCardProps) {
   const [imagePreview, setImagePreview] = useState<string | null>(null);
   const [showFeelingModal, setShowFeelingModal] = useState(false);
   const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
   const [caption, setCaption] = useState("");
   const [isPremium, setIsPremium] = useState(false);
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [isLoading, setIsLoading] = useState(false);

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

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("isPremium", isPremium.toString());
      formData.append("userId", localStorage.getItem("userId") || "");

      if (fileInputRef.current?.files?.[0]) {
         formData.append("image", fileInputRef.current.files[0]);
      }

      setIsLoading(true);

      const authSignature = localStorage.getItem("authSignature");
      const authAddress = localStorage.getItem("authAddress");

      const response = await fetch(
         `${process.env.NEXT_PUBLIC_API_URL}/api/feed/create`,
         {
            method: "POST",
            body: formData,
            headers: {
               "x-eth-signature": authSignature || "",
               "x-eth-address": authAddress || "",
            },
         }
      );

      const data = await response.json();

      if (data.success) {
         // Reset form
         setCaption("");
         setImagePreview(null);
         setIsPremium(false);
         if (fileInputRef.current) {
            fileInputRef.current.value = "";
         }
         onCreatePost({ ...data.data, FeedPostLike: [], FeedPostComment: [] });
      } else {
         console.error("Error creating post:", data.error);
      }

      setIsLoading(false);
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
         <form onSubmit={handleSubmit}>
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
                     value={caption}
                     onChange={(e) => setCaption(e.target.value)}
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
                     type="button"
                  >
                     <ImagePlus className="h-4 w-4" />
                     <span>Image</span>
                  </Button>
                  <Button
                     variant="ghost"
                     className="flex-1 gap-2"
                     type="button"
                  >
                     <VideoIcon className="h-4 w-4" />
                     <span>Video</span>
                  </Button>
                  <Dialog
                     open={showFeelingModal}
                     onOpenChange={setShowFeelingModal}
                  >
                     <DialogTrigger asChild>
                        <Button
                           variant="ghost"
                           className="flex-1 gap-2"
                           type="button"
                        >
                           <Smile className="h-4 w-4" />
                           <span>Feeling</span>
                        </Button>
                     </DialogTrigger>
                     <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                           <DialogTitle>How are you feeling?</DialogTitle>
                           <DialogDescription>
                              Select a feeling or activity to share with your
                              post.
                           </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-4 gap-4 py-4">
                           {feelings.map((feeling) => (
                              <Button
                                 key={feeling.name}
                                 variant="outline"
                                 className="flex flex-col h-auto py-3"
                                 onClick={() => selectFeeling(feeling)}
                                 type="button"
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
                              type="button"
                           >
                              Cancel
                           </Button>
                        </DialogFooter>
                     </DialogContent>
                  </Dialog>
               </div>

               <div className="mt-4 flex items-center gap-2">
                  <Switch
                     id="premium"
                     checked={isPremium}
                     onCheckedChange={setIsPremium}
                  />
                  <Label htmlFor="premium">Premium Content</Label>
               </div>
            </CardContent>
            <CardFooter className="flex justify-end p-4 pt-0">
               <Button
                  type="submit"
                  disabled={(!caption.trim() && !imagePreview) || isLoading}
               >
                  {isLoading ? "Posting..." : "Post"}
               </Button>
            </CardFooter>
         </form>
      </Card>
   );
}
