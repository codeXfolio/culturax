"use client";

import { type ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
   ArrowLeft,
   Edit,
   Share2,
   Bell,
   BellOff,
   MessageSquare,
   Gift,
   Bookmark,
} from "lucide-react";
import Link from "next/link";

interface ProfileLayoutProps {
   profileData: {
      name: string;
      username: string;
      bio: string;
      avatarUrl: string;
      coverUrl: string;
      isVerified?: boolean;
      stats: {
         label: string;
         value: string;
      }[];
   };
   tabs: {
      id: string;
      label: string;
      icon: ReactNode;
   }[];
   defaultTab: string;
   actionButtons: ReactNode;
   children: ReactNode;
}

export function ProfileLayout({
   profileData,
   tabs,
   defaultTab,
   actionButtons,
   children,
}: ProfileLayoutProps) {
   const [isFollowing, setIsFollowing] = useState(false);

   return (
      <div className="min-h-screen bg-background">
         <header className="border-b border-border/40 backdrop-blur-sm fixed top-0 w-full z-50 bg-background/80">
            <div className="container flex items-center justify-between h-16">
               <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" asChild>
                     <Link href="/feed">
                        <ArrowLeft className="h-5 w-5" />
                     </Link>
                  </Button>
                  <span className="font-medium">Profile</span>
               </div>
               <ModeToggle />
            </div>
         </header>

         <main className="container pt-16 pb-16 max-w-5xl">
            <div className="relative mb-28">
               {/* Cover Image */}
               <div className="h-48 md:h-64 -mx-4 sm:mx-0 sm:rounded-lg overflow-hidden">
                  <img
                     src={
                        profileData.coverUrl ||
                        "/placeholder.svg?height=400&width=1200"
                     }
                     alt="Cover"
                     className="w-full h-full object-cover"
                  />
               </div>

               {/* Profile Avatar */}
               <div className="absolute -bottom-16 left-6 z-50">
                  <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background shadow-xl">
                     <AvatarImage
                        src={profileData.avatarUrl}
                        alt={profileData.name}
                     />
                     <AvatarFallback>
                        {profileData.name.charAt(0)}
                     </AvatarFallback>
                  </Avatar>
               </div>
            </div>

            {/* Profile Info */}
            <div className="flex flex-col md:flex-row gap-8">
               {/* Left Column - Profile Details */}
               <div className="md:w-1/3">
                  <Card className="p-6">
                     <div className="mb-4">
                        <div className="flex items-center gap-2 mb-1">
                           <Link
                              href={`/creator-profile?username=${profileData.username}`}
                              className="hover:underline"
                           >
                              <h1 className="text-2xl font-bold">
                                 {profileData.name}
                              </h1>
                           </Link>
                           {profileData.isVerified && (
                              <svg
                                 className="h-5 w-5 text-blue-500"
                                 viewBox="0 0 24 24"
                                 fill="currentColor"
                              >
                                 <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                           )}
                        </div>
                        <p className="text-muted-foreground">
                           @{profileData.username}
                        </p>
                     </div>

                     <div className="mb-6">
                        <p className="text-sm">{profileData.bio}</p>
                     </div>

                     <div className="flex flex-wrap gap-6 mb-6">
                        {profileData.stats.map((stat, index) => (
                           <div key={index}>
                              <p className="font-bold">{stat.value}</p>
                              <p className="text-xs text-muted-foreground">
                                 {stat.label}
                              </p>
                           </div>
                        ))}
                     </div>

                     <div className="flex flex-col gap-2">{actionButtons}</div>
                  </Card>
               </div>

               {/* Right Column - Content */}
               <div className="md:w-2/3">{children}</div>
            </div>
         </main>
      </div>
   );
}
