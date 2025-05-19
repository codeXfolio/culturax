"use client";

import { useEffect, useState } from "react";
import { ProfileLayout } from "@/components/profile/profile-layout";
import { Button } from "@/components/ui/button";
import {
   TrendingUp,
   DollarSign,
   ImageIcon,
   FileText,
   Users,
   Settings,
} from "lucide-react";
import Link from "next/link";

// Import tab components
import { TabNavigation } from "./tabs/tab-navigation";
import { DashboardTab } from "./tabs/dashboard-tab";
import { ContentTab } from "./tabs/content-tab";
import { SubscribersTab } from "./tabs/subscribers-tab";
import { SettingsTab } from "./tabs/settings-tab";
import { ProfileTab, ProfileTabData } from "@/types/profile";

// Import mock data
import {
   mockProfileData,
   profileTabsData,
   chartData,
   recentContent,
   subscribers,
} from "@/data/mock-profile";
import { apiRequest } from "@/lib/api/api";
import { fetchProfile } from "@/lib/utils";

interface ProfileData {
   id: string;
   address: string;
   avatar: string;
   bio: string;
   username: string;
   accountType: string;
   coverImage: string;
   website: string;
   email?: string;
   totalFollowers: number;
   totalSubscriptions: number;
   featured: boolean;
   isFollowed: boolean;
}

// Define the structure for the formatted profile data displayed in the UI
interface FormattedProfileData {
   name: string;
   username: string;
   bio: string;
   avatarUrl: string;
   coverUrl: string;
   website: string;
   email?: string;
   isVerified: boolean;
   stats: Array<{ label: string; value: string }>;
}

export function CreatorProfilePage() {
   // State to track active tab
   const [activeTab, setActiveTab] = useState("dashboard");
   const [profileData, setProfileData] = useState<ProfileData | null>(null);
   // Ensure mockProfileData conforms to FormattedProfileData interface
   const [formattedProfileData, setFormattedProfileData] =
      useState<FormattedProfileData>(mockProfileData as FormattedProfileData);

   useEffect(() => {
      const fetchProfileData = async () => {
         const profile = await fetchProfile();
         const result = await apiRequest<ProfileData>(
            `/api/user/${profile?.username}`
         );
         if (result.success) {
            setProfileData(result.data);

            // Transform the API data into the format expected by ProfileLayout
            const data = result.data;
            if (data) {
               setFormattedProfileData({
                  name: data.username, // Using username as name if real name is not available
                  username: data.username,
                  bio: data.bio || "",
                  avatarUrl: data.avatar || "",
                  coverUrl: data.coverImage || "", // No cover URL in the API data
                  website: data.website || "",
                  email: data.email || "",
                  isVerified: data.featured,
                  stats: [
                     {
                        label: "Followers",
                        value: data.totalFollowers.toString(),
                     },
                     {
                        label: "Subscriptions",
                        value: data.totalSubscriptions.toString(),
                     },
                  ],
               });
            }
         }
      };
      fetchProfileData();
   }, []);

   // Map the tab data to include JSX icons
   const getIconComponent = (iconName: string): React.ReactNode => {
      switch (iconName) {
         case "TrendingUp":
            return <TrendingUp className="h-4 w-4" />;
         case "FileText":
            return <FileText className="h-4 w-4" />;
         case "Users":
            return <Users className="h-4 w-4" />;
         case "Settings":
            return <Settings className="h-4 w-4" />;
         default:
            return null;
      }
   };

   // Convert string icon names to React components
   const profileTabs: ProfileTab[] = profileTabsData.map((tab) => ({
      ...tab,
      icon: getIconComponent(tab.icon),
   }));

   // Action buttons specific to creator profile
   const actionButtons = (
      <>
         <Button variant="outline" className="gap-2" asChild>
            <Link href="/earnings">
               <DollarSign className="h-4 w-4" />
               Earnings
            </Link>
         </Button>
         <Button variant="outline" className="gap-2" asChild>
            <Link href="/nft-mint">
               <ImageIcon className="h-4 w-4" />
               Mint NFT
            </Link>
         </Button>
      </>
   );

   // Render content based on active tab
   const renderTabContent = () => {
      switch (activeTab) {
         case "dashboard":
            return (
               <DashboardTab
                  recentContent={recentContent}
                  chartData={chartData}
               />
            );
         case "content":
            return <ContentTab contentItems={recentContent} />;
         case "subscribers":
            return <SubscribersTab subscribers={subscribers} />;
         case "settings":
            return <SettingsTab profileData={formattedProfileData} />;
         default:
            return null;
      }
   };

   return (
      <ProfileLayout
         profileData={formattedProfileData}
         tabs={profileTabs}
         defaultTab="dashboard"
         actionButtons={actionButtons}
      >
         <div className="w-full">
            <TabNavigation
               tabs={profileTabs}
               activeTab={activeTab}
               onTabChange={setActiveTab}
            />
            {renderTabContent()}
         </div>
      </ProfileLayout>
   );
}
