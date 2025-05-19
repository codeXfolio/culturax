// Types for creator settings forms

export interface ProfileFormData {
  profileImage: string;
  coverImage: string;
  displayName: string;
  username: string;
  bio: string;
  email: string;
  website: string;
  socialLinks: {
    twitter: string;
    instagram: string;
  };
}

export interface CreatorFormData {
  category: string;
  tags: string;
  story: string;
  contentSettings: {
    watermarking: boolean;
    downloads: string;
    license: string;
  };
  verified: boolean;
}

export interface MonetizationFormData {
  subscription: {
    price: string;
    description: string;
    perks: string;
    isActive: boolean;
  };
  nftSettings: {
    royalty: number;
    standard: string;
  };
  payoutSettings: {
    wallet: string;
    minimumPayout: number;
    schedule: string;
  };
}

export interface NotificationFormData {
  creator: {
    newSubscribers: boolean;
    nftSales: boolean;
    contentEngagement: string;
    earningsReports: string;
    directMessages: boolean;
  };
  platform: {
    updates: boolean;
    tips: boolean;
    marketing: boolean;
  };
}

export interface AdvancedFormData {
  apiAccess: boolean;
  backups: {
    automatic: boolean;
  };
  account: {
    status: string;
  };
}
