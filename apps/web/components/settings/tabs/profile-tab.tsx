"use client";

import { useRef } from "react";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Image as ImageIcon } from "lucide-react";
import { ProfileFormData } from "@/components/settings/types";

interface ProfileTabProps {
   profileData: ProfileFormData;
   onProfileImageChange: (image: string) => void;
   onCoverImageChange?: (image: string) => void;
}

export function ProfileTab({
   profileData,
   onProfileImageChange,
   onCoverImageChange,
}: ProfileTabProps) {
   // Create refs for file inputs
   const coverImageInputRef = useRef<HTMLInputElement>(null);
   const profileImageInputRef = useRef<HTMLInputElement>(null);
   
   // Handle file selection for cover image
   const handleCoverImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         const imageUrl = URL.createObjectURL(file);
         onCoverImageChange?.(imageUrl);
      }
   };
   
   // Handle file selection for profile image
   const handleProfileImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         const imageUrl = URL.createObjectURL(file);
         onProfileImageChange(imageUrl);
      }
   };
   return (
      <Card>
         <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
               Update your personal information and public profile
            </CardDescription>
         </CardHeader>
         <CardContent className="space-y-6">
            <div className="space-y-4">
               {/* Cover Image Section */}
               <div className="space-y-3">
                  <div className="flex justify-between items-center">
                     <h3 className="text-lg font-medium">Cover Image</h3>
                     <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => coverImageInputRef.current?.click()}
                     >
                        <ImageIcon className="h-3 w-3" />
                        Change Cover
                     </Button>
                  </div>
                  <div className="relative w-full h-32 bg-muted rounded-lg overflow-hidden">
                     <img 
                        src={profileData.coverImage} 
                        alt="Cover Image" 
                        className="w-full h-full object-cover"
                     />
                  </div>
                  {/* Hidden file input for cover image */}
                  <input
                     type="file"
                     ref={coverImageInputRef}
                     onChange={handleCoverImageFileChange}
                     accept="image/*"
                     className="hidden"
                  />
               </div>

               <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center gap-2">
                     <Avatar className="h-24 w-24">
                        <AvatarImage
                           src={profileData.profileImage || "/placeholder.svg"}
                           alt="Profile"
                        />
                        <AvatarFallback>
                           {profileData.displayName?.charAt(0) || "A"}
                        </AvatarFallback>
                     </Avatar>
                     <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => profileImageInputRef.current?.click()}
                     >
                        <Upload className="h-3 w-3" />
                        Change
                     </Button>
                     {/* Hidden file input for profile image */}
                     <input
                        type="file"
                        ref={profileImageInputRef}
                        onChange={handleProfileImageFileChange}
                        accept="image/*"
                        className="hidden"
                     />
                  </div>

                  <div className="flex-1 space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label htmlFor="display-name">Display Name</Label>
                           <Input
                              id="display-name"
                              defaultValue={profileData.displayName}
                           />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="username">Username</Label>
                           <Input
                              id="username"
                              defaultValue={profileData.username}
                           />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                           id="bio"
                           defaultValue={profileData.bio}
                           className="min-h-[100px]"
                        />
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <h3 className="text-lg font-medium">Contact Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                           id="email"
                           type="email"
                           defaultValue={profileData.email}
                        />
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                           id="website"
                           defaultValue={profileData.website}
                        />
                     </div>
                  </div>
               </div>

               <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
