"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, FileText, Banknote, Bell, Settings } from "lucide-react";

// Import tab components
import { ProfileTab } from "./tabs/profile-tab";
import { CreatorTab } from "./tabs/creator-tab";
import { MonetizationTab } from "./tabs/monetization-tab";
import { NotificationsTab } from "./tabs/notifications-tab";
import { AdvancedTab } from "./tabs/advanced-tab";

// Import types
import {
   ProfileFormData,
   CreatorFormData,
   MonetizationFormData,
   NotificationFormData,
   AdvancedFormData,
} from "./types";

interface CreatorSettingsProps {
   initialProfileData?: ProfileFormData;
}

export function CreatorSettings({ initialProfileData }: CreatorSettingsProps) {
   // Initialize state for each form section with initialProfileData or default values
   const [profileData, setProfileData] = useState<ProfileFormData>(initialProfileData || {
      profileImage: "/placeholder.svg?height=200&width=200",
      coverImage: "/placeholder.svg?height=400&width=1200",
      displayName: "Alex Rivera",
      username: "alexrivera",
      bio: "Digital artist specializing in futuristic landscapes and NFT collections. Creating at the intersection of art and technology.",
      email: "alex.rivera@example.com",
      website: "https://alexrivera.art",
      socialLinks: {
         twitter: "@alexrivera_art",
         instagram: "@alexrivera.art",
      },
   });

   const [creatorData, setCreatorData] = useState<CreatorFormData>({
      category: "digital-art",
      tags: "digital art, futuristic, landscapes, nft, cyberpunk",
      story: "I've been creating digital art for over 10 years, specializing in futuristic landscapes and cyberpunk aesthetics.",
      contentSettings: {
         watermarking: true,
         downloads: "subscribers-only",
         license: "personal",
      },
      verified: true,
   });

   const [monetizationData, setMonetizationData] =
      useState<MonetizationFormData>({
         subscription: {
            isActive: true,
            price: "9.99",
            description:
               "Get exclusive access to all my content and behind-the-scenes material.",
            perks: "Exclusive posts and updates, Behind-the-scenes content, Early access to NFT drops, Direct messaging, Monthly Q&A sessions, Community access",
         },
         nftSettings: {
            royalty: 10,
            standard: "erc721",
         },
         payoutSettings: {
            wallet: "0x1a2b...8f9d",
            minimumPayout: 50,
            schedule: "monthly",
         },
      });

   const [notificationData, setNotificationData] =
      useState<NotificationFormData>({
         creator: {
            newSubscribers: true,
            nftSales: true,
            contentEngagement: "all",
            earningsReports: "weekly",
            directMessages: true,
         },
         platform: {
            updates: true,
            tips: true,
            marketing: false,
         },
      });

   const [advancedData, setAdvancedData] = useState<AdvancedFormData>({
      apiAccess: false,
      backups: {
         automatic: true,
      },
      account: {
         status: "active",
      },
   });

   // Handle profile image change
   const handleProfileImageChange = (image: string) => {
      setProfileData((prev) => ({ ...prev, profileImage: image }));
   };

   // Handle cover image change
   const handleCoverImageChange = (image: string) => {
      setProfileData((prev) => ({ ...prev, coverImage: image }));
   };

   return (
      <Tabs defaultValue="profile" className="space-y-6">
         <TabsList className="grid grid-cols-5 w-full max-w-3xl">
            <TabsTrigger value="profile" className="flex items-center gap-2">
               <User className="h-4 w-4" />
               <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger
               value="monetization"
               className="flex items-center gap-2"
            >
               <span className="flex items-center justify-center h-4 w-4 font-bold">
                  $
               </span>
               <span>Monetization</span>
            </TabsTrigger>
         </TabsList>

         <TabsContent value="profile">
            <ProfileTab
               profileData={profileData}
               onProfileImageChange={handleProfileImageChange}
               onCoverImageChange={handleCoverImageChange}
            />
         </TabsContent>

         <TabsContent value="monetization">
            <MonetizationTab
               formData={monetizationData}
               onFormChange={(field, value) => {
                  // Handle form changes by updating the state
                  setMonetizationData((prev) => {
                     // Create a deep copy and update the specific field
                     const updated = JSON.parse(JSON.stringify(prev));
                     // This is a simplified approach - you would need to handle nested paths
                     const parts = field.split(".");
                     let current = updated;
                     for (let i = 0; i < parts.length - 1; i++) {
                        current = current[parts[i]];
                     }
                     current[parts[parts.length - 1]] = value;
                     return updated;
                  });
               }}
            />
         </TabsContent>
         {/* Add other tab contents similarly */}
      </Tabs>
   );
}
