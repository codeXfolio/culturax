import {
   ProfileData,
   ContentItem,
   Subscriber,
   ProfileTabData,
} from "../types/profile";

// Mock creator profile data
export const mockProfileData: ProfileData = {
   name: "Alex Rivera",
   username: "alexrivera",
   bio: "Digital artist specializing in futuristic landscapes and NFT collections. Creating at the intersection of art and technology.",
   avatarUrl: "/placeholder.svg?height=200&width=200",
   coverUrl: "/placeholder.svg?height=400&width=1200",
   isVerified: true,
   stats: [
      { label: "Subscribers", value: "245" },
      { label: "NFTs", value: "32" },
      { label: "Followers", value: "24.5K" },
   ],
};

// Profile tab definitions (without JSX)
export const profileTabsData: ProfileTabData[] = [
   { id: "dashboard", label: "Dashboard", icon: "TrendingUp" },
   { id: "content", label: "Content", icon: "FileText" },
   { id: "subscribers", label: "Subscribers", icon: "Users" },
   { id: "settings", label: "Settings", icon: "Settings" },
];

// Sample data for charts
export const chartData = {
   earningsData: [4, 8, 12, 9, 15, 18, 16, 20, 25, 22, 30, 28],
   subscribersData: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65],
   engagementData: [120, 150, 180, 210, 190, 220, 240, 260, 280, 300, 320, 340],
};

// Sample content data
export const recentContent: ContentItem[] = [
   {
      id: 1,
      title: "Digital Art Collection #1",
      type: "NFT",
      thumbnail: "/placeholder.svg?height=200&width=300",
      views: 1240,
      likes: 89,
      date: "2 days ago",
   },
   {
      id: 2,
      title: "Digital Art Collection #2",
      type: "Image",
      thumbnail: "/placeholder.svg?height=200&width=300",
      views: 1240,
      likes: 89,
      date: "2 days ago",
   },
];

// Sample subscriber data
export const subscribers: Subscriber[] = [
   {
      id: 1,
      name: "Sarah Johnson",
      username: "sarahjcreates",
      avatar: "/placeholder.svg?height=40&width=40",
      tier: "Premium",
      since: "Mar 15, 2025",
   },
   {
      id: 2,
      name: "Michael Chen",
      username: "michaelchenmusic",
      avatar: "/placeholder.svg?height=40&width=40",
      tier: "Collector",
      since: "Feb 28, 2025",
   },
   {
      id: 3,
      name: "Emma Wilson",
      username: "emmawilsonart",
      avatar: "/placeholder.svg?height=40&width=40",
      tier: "Basic",
      since: "Apr 5, 2025",
   },
];
