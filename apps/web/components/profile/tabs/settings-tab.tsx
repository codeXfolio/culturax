"use client"

import { CreatorSettings } from "@/components/settings/creator-settings"
import { ProfileFormData } from "@/components/settings/types"

interface SettingsTabProps {
  profileData?: {
    name: string;
    username: string;
    bio: string;
    avatarUrl: string;
    coverUrl: string;
    website: string;
    email?: string;
    isVerified: boolean;
  };
}

export function SettingsTab({ profileData }: SettingsTabProps) {
  // Convert from FormattedProfileData to ProfileFormData format
  const formattedProfileData: ProfileFormData | undefined = profileData ? {
    profileImage: profileData.avatarUrl || "/placeholder.svg?height=200&width=200",
    coverImage: profileData.coverUrl || "/placeholder.svg?height=400&width=1200",
    displayName: profileData.name,
    username: profileData.username,
    bio: profileData.bio || "",
    email: profileData.email || "",
    website: profileData.website || "",
    socialLinks: {
      twitter: "",
      instagram: "",
    },
  } : undefined;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Creator Settings</h2>
      </div>

      <CreatorSettings initialProfileData={formattedProfileData} />
    </div>
  )
}
