import React from 'react';

// Types for creator profile data
export interface ProfileData {
  name: string;
  username: string;
  bio: string;
  avatarUrl: string;
  coverUrl: string;
  isVerified: boolean;
  stats: ProfileStat[];
}

export interface ProfileStat {
  label: string;
  value: string;
}

export interface ContentItem {
  id: number;
  title: string;
  type: string;
  thumbnail: string;
  views: number;
  likes: number;
  date: string;
}

export interface Subscriber {
  id: number;
  name: string;
  username: string;
  avatar: string;
  tier: "Basic" | "Premium" | "Collector";
  since: string;
}

export interface ProfileTab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface ProfileTabData {
  id: string;
  label: string;
  icon: string;
}
