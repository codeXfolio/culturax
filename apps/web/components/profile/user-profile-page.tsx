"use client"

import { useState } from "react"
import { ProfileLayout } from "@/components/profile/profile-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, Grid, Heart, Settings, ImageIcon, FolderOpen } from "lucide-react"
import Link from "next/link"
import { NftCard } from "@/components/profile/nft-card"
import { SubscriptionCard } from "@/components/profile/subscription-card"
import { UserSettings } from "@/components/settings/user-settings"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function UserProfilePage() {
  // State to track active tab
  const [activeTab, setActiveTab] = useState("collection")

  // Mock user profile data
  const profileData = {
    name: "John Doe",
    username: "johndoe",
    bio: "Digital art enthusiast and NFT collector. Supporting creators in the Web3 space.",
    avatarUrl: "/placeholder.svg?height=200&width=200",
    coverUrl: "/placeholder.svg?height=400&width=1200",
    isVerified: false,
    stats: [
      { label: "Following", value: "42" },
      { label: "NFTs", value: "12" },
      { label: "Joined", value: "Mar 2025" },
    ],
  }

  // Profile tabs
  const tabs = [
    { id: "collection", label: "Collection", icon: <Grid className="h-4 w-4" /> },
    { id: "images", label: "Images", icon: <ImageIcon className="h-4 w-4" /> },
    { id: "subscriptions", label: "Subscriptions", icon: <Wallet className="h-4 w-4" /> },
    { id: "followed", label: "Followed", icon: <Heart className="h-4 w-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
  ]

  // Mock NFT collection data
  const nftCollection = [
    {
      id: 1,
      name: "Digital Dreamscape #42",
      creator: "Alex Rivera",
      creatorUsername: "alexrivera",
      image: "/placeholder.svg?height=300&width=300",
      acquired: "Apr 5, 2025",
    },
    {
      id: 2,
      name: "Abstract Emotions #7",
      creator: "Sarah Johnson",
      creatorUsername: "sarahjcreates",
      image: "/placeholder.svg?height=300&width=300",
      acquired: "Mar 22, 2025",
    },
    {
      id: 3,
      name: "Neon Future #15",
      creator: "Michael Chen",
      creatorUsername: "michaelchenmusic",
      image: "/placeholder.svg?height=300&width=300",
      acquired: "Mar 10, 2025",
    },
    {
      id: 4,
      name: "Cosmic Journey #3",
      creator: "Emma Wilson",
      creatorUsername: "emmawilsonart",
      image: "/placeholder.svg?height=300&width=300",
      acquired: "Feb 28, 2025",
    },
  ]

  // Mock image collections data
  const imageCollections = [
    {
      id: "1",
      name: "Digital Art Collection",
      description: "My personal digital art creations and experiments",
      coverImage: "/placeholder.svg?height=300&width=500",
      itemCount: 24,
      lastUpdated: "2 days ago",
    },
    {
      id: "2",
      name: "NFT Purchases",
      description: "NFTs I've collected from various creators",
      coverImage: "/placeholder.svg?height=300&width=500",
      itemCount: 12,
      lastUpdated: "1 week ago",
    },
    {
      id: "3",
      name: "Photography",
      description: "My photography work and experiments",
      coverImage: "/placeholder.svg?height=300&width=500",
      itemCount: 36,
      lastUpdated: "3 days ago",
    },
  ]

  // Mock subscriptions data
  const subscriptions = [
    {
      id: 1,
      creator: "Alex Rivera",
      username: "alexrivera",
      avatar: "/placeholder.svg?height=100&width=100",
      tier: "Premium",
      price: "$15/month",
      renewsOn: "May 5, 2025",
      isVerified: true,
    },
    {
      id: 2,
      creator: "Sarah Johnson",
      username: "sarahjcreates",
      avatar: "/placeholder.svg?height=100&width=100",
      tier: "Basic",
      price: "$5/month",
      renewsOn: "May 12, 2025",
      isVerified: true,
    },
    {
      id: 3,
      creator: "Michael Chen",
      username: "michaelchenmusic",
      avatar: "/placeholder.svg?height=100&width=100",
      tier: "Collector",
      price: "$50/month",
      renewsOn: "Apr 30, 2025",
      isVerified: false,
    },
  ]

  // Mock followed creators
  const followedCreators = [
    {
      id: 1,
      name: "Alex Rivera",
      username: "alexrivera",
      avatar: "/placeholder.svg?height=100&width=100",
      coverImage: "/placeholder.svg?height=200&width=400",
      category: "Digital Art",
      followers: "24.5K",
      isVerified: true,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      username: "sarahjcreates",
      avatar: "/placeholder.svg?height=100&width=100",
      coverImage: "/placeholder.svg?height=200&width=400",
      category: "Photography",
      followers: "18.2K",
      isVerified: true,
    },
    {
      id: 3,
      name: "Michael Chen",
      username: "michaelchenmusic",
      avatar: "/placeholder.svg?height=100&width=100",
      coverImage: "/placeholder.svg?height=200&width=400",
      category: "Music",
      followers: "32.1K",
      isVerified: false,
    },
  ]

  // Action buttons specific to user profile
  const actionButtons = (
    <Button variant="outline" className="gap-2">
      <Link href="/settings">
        <Settings className="h-4 w-4" />
        Settings
      </Link>
    </Button>
  )

  // Custom tab navigation component
  const TabNavigation = () => (
    <div className="border-b mb-6">
      <div className="flex space-x-2 overflow-x-auto">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            className={`gap-2 hover:rounded-b-none hover:border-b ${activeTab === tab.id ? "rounded-b-none border-b-0" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </Button>
        ))}
      </div>
    </div>
  )

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "collection":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">NFT Collection</h2>
              <Button variant="outline" size="sm" className="gap-2">
                <ImageIcon className="h-4 w-4" />
                View All
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
              {nftCollection.map((nft) => (
                <NftCard key={nft.id} nft={nft} />
              ))}
            </div>
          </div>
        )

      case "images":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Image Collections</h2>
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <Link href="/collections">
                  <FolderOpen className="h-4 w-4" />
                  View All Collections
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {imageCollections.map((collection) => (
                <Card key={collection.id} className="overflow-hidden hover:shadow-md transition-all">
                  <Link href={`/collections/${collection.id}`}>
                    <div className="h-40 bg-muted overflow-hidden">
                      <img
                        src={collection.coverImage || "/placeholder.svg"}
                        alt={collection.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-lg mb-1 truncate">{collection.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{collection.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{collection.itemCount} items</span>
                        <span>Updated {collection.lastUpdated}</span>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}

              <Card className="overflow-hidden border-dashed hover:border-primary/50 transition-colors cursor-pointer flex items-center justify-center h-[250px]">
                <Link href="/collections" className="p-6 flex flex-col items-center justify-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <FolderOpen className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">View All Collections</h3>
                  <p className="text-sm text-muted-foreground">Browse and manage all your image collections</p>
                </Link>
              </Card>
            </div>
          </div>
        )

      case "subscriptions":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Active Subscriptions</h2>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>

            <div className="space-y-4">
              {subscriptions.map((subscription) => (
                <SubscriptionCard key={subscription.id} subscription={subscription} />
              ))}
            </div>
          </div>
        )

      case "followed":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Followed Creators</h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {followedCreators.map((creator) => (
                <Card
                  key={creator.id}
                  className="overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  <div className="relative h-32 bg-muted/50">
                    <img
                      src={creator.coverImage || "/placeholder.svg"}
                      alt={creator.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4 relative">
                    <Avatar className="h-16 w-16 absolute -top-8 left-4 border-4 border-background">
                      <AvatarImage src={creator.avatar} alt={creator.name} />
                      <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="mt-8">
                      <div className="flex items-center gap-1">
                        <h3 className="font-medium">{creator.name}</h3>
                        {creator.isVerified && (
                          <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">@{creator.username}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">{creator.category}</span>
                        <span className="text-xs text-muted-foreground">{creator.followers} followers</span>
                      </div>
                      <Button size="sm" className="w-full mt-3" asChild>
                        <Link href={`/subscription/${creator.username}`}>View Profile</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "settings":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Account Settings</h2>
            </div>

            <UserSettings />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <ProfileLayout profileData={profileData} tabs={tabs} defaultTab="collection" actionButtons={actionButtons}>
      <div className="w-full">
        <TabNavigation />
        {renderTabContent()}
      </div>
    </ProfileLayout>
  )
}
