"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   MoreHorizontal,
   Download,
   ExternalLink,
   X,
   Trash2,
   Share,
} from "lucide-react";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

interface ImageItemProps {
   image: {
      id: string;
      title: string;
      description: string;
      src: string;
      type: string;
      createdAt: string;
      tags: string[];
      isFavorite: boolean;
   };
   viewMode: "grid" | "list";
}

export function ImageItem({ image, viewMode }: ImageItemProps) {
   const [isLightboxOpen, setIsLightboxOpen] = useState(false);
   const { toast } = useToast();

   const handleImageClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsLightboxOpen(true);
   };

   const handleCloseLightbox = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsLightboxOpen(false);
   };

   const handleDownload = async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      try {
         const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}${image.src}`
         );
         const blob = await response.blob();
         const url = window.URL.createObjectURL(blob);
         const link = document.createElement("a");
         link.href = url;
         link.download = image.title;
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
         window.URL.revokeObjectURL(url);

         toast({
            title: "Success",
            description: "Image downloaded successfully",
         });
      } catch (err) {
         toast({
            title: "Error",
            description:
               err instanceof Error ? err.message : "Failed to download image",
            variant: "destructive",
         });
      }
   };

   if (viewMode === "grid") {
      return (
         <>
            <div className="group relative aspect-square overflow-hidden rounded-lg border border-border/40 bg-background">
               <img
                  src={
                     process.env.NEXT_PUBLIC_API_URL + image.src ||
                     "/placeholder.svg"
                  }
                  alt={image.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105 cursor-pointer"
                  onClick={handleImageClick}
               />

               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                     <h3 className="text-sm font-medium text-white truncate">
                        {image.title}
                     </h3>
                     <p className="text-xs text-white/80 truncate">
                        {image.description}
                     </p>
                  </div>
               </div>

               <div className="absolute top-2 right-2 z-10">
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button
                           variant="ghost"
                           size="icon"
                           className="h-8 w-8 bg-black/50 text-white hover:bg-black/70 hover:text-white"
                           onClick={(e) => e.stopPropagation()}
                        >
                           <MoreHorizontal className="h-4 w-4" />
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align="end">
                        <DropdownMenuItem
                           className="gap-2"
                           onClick={handleDownload}
                        >
                           <Download className="h-4 w-4" />
                           Download
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>
            </div>

            {/* Lightbox */}
            {isLightboxOpen && (
               <div
                  className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                  onClick={handleCloseLightbox}
               >
                  <div
                     className="relative max-w-7xl max-h-[90vh]"
                     onClick={(e) => e.stopPropagation()}
                  >
                     <img
                        src={process.env.NEXT_PUBLIC_API_URL + image.src}
                        alt={image.title}
                        className="max-w-full max-h-[90vh] object-contain"
                     />
                     <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 h-8 w-8 bg-background/80 backdrop-blur-sm rounded-full"
                        onClick={handleCloseLightbox}
                     >
                        <X className="h-4 w-4" />
                     </Button>
                  </div>
               </div>
            )}
         </>
      );
   }

   // List view
   return (
      <>
         <Card className="overflow-hidden hover:shadow-md transition-all">
            <CardContent className="p-0">
               <div className="flex items-center gap-4 p-4">
                  <img
                     src={
                        process.env.NEXT_PUBLIC_API_URL + image.src ||
                        "/placeholder.svg"
                     }
                     alt={image.title}
                     className="h-16 w-16 md:h-20 md:w-20 bg-muted rounded-md overflow-hidden flex-shrink-0 object-cover cursor-pointer"
                     onClick={handleImageClick}
                  />
                  <div className="flex-1 min-w-0">
                     <div className="flex items-center justify-between">
                        <h3 className="font-medium">{image.title}</h3>
                     </div>
                     {image.description && (
                        <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                           {image.description}
                        </p>
                     )}
                     <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">
                           {image.createdAt}
                        </span>
                     </div>
                  </div>
                  <div className="flex items-center gap-1">
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                           >
                              <MoreHorizontal className="h-4 w-4" />
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                           <DropdownMenuItem
                              className="gap-2"
                              onClick={handleDownload}
                           >
                              <Download className="h-4 w-4" />
                              Download
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Lightbox */}
         {isLightboxOpen && (
            <div
               className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
               onClick={handleCloseLightbox}
            >
               <div
                  className="relative max-w-7xl max-h-[90vh]"
                  onClick={(e) => e.stopPropagation()}
               >
                  <img
                     src={process.env.NEXT_PUBLIC_API_URL + image.src}
                     alt={image.title}
                     className="max-w-full max-h-[90vh] object-contain"
                  />
                  <Button
                     variant="ghost"
                     size="icon"
                     className="absolute top-4 right-4 h-8 w-8 bg-background/80 backdrop-blur-sm rounded-full"
                     onClick={handleCloseLightbox}
                  >
                     <X className="h-4 w-4" />
                  </Button>
               </div>
            </div>
         )}
      </>
   );
}
