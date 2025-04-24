"use client"

import { useState } from "react"
import { ProfileLayout } from "@/components/profile/profile-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Users, FileText, Settings, ImageIcon, Upload, Sparkles, BarChart3 } from "lucide-react"
import Link from "next/link"
import { ContentCard } from "@/components/dashboard/content-card"
import { StatCard } from "@/components/dashboard/stat-card"
import { SparklineChart } from "@/components/dashboard/sparkline-chart"
import { AiSuggestionBox } from "@/components/dashboard/ai-suggestion-box"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CreatorSettings } from "@/components/settings/creator-settings"

export function CreatorProfilePage() {
  // State to track active tab
  const [activeTab, setActiveTab] = useState("dashboard")

  // Mock creator profile data
  const profileData = {
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
  }

  // Profile tabs
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: <TrendingUp className="h-4 w-4" /> },
    { id: "content", label: "Content", icon: <FileText className="h-4 w-4" /> },
    { id: "subscribers", label: "Subscribers", icon: <Users className="h-4 w-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
  ]

  // Sample data for charts
  const earningsData = [4, 8, 12, 9, 15, 18, 16, 20, 25, 22, 30, 28]
  const subscribersData = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65]
  const engagementData = [120, 150, 180, 210, 190, 220, 240, 260, 280, 300, 320, 340]

  // Sample content data
  const recentContent = [
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
      title: "Behind the Scenes: Creative Process",
      type: "Video",
      thumbnail: "/placeholder.svg?height=200&width=300",
      views: 856,
      likes: 64,
      date: "5 days ago",
    },
    {
      id: 3,
      title: "Exclusive Tutorial for Subscribers",
      type: "Tutorial",
      thumbnail: "/placeholder.svg?height=200&width=300",
      views: 432,
      likes: 37,
      date: "1 week ago",
    },
    {
      id: 4,
      title: "New NFT Collection Preview",
      type: "NFT",
      thumbnail: "/placeholder.svg?height=200&width=300",
      views: 645,
      likes: 48,
      date: "2 weeks ago",
    },
  ]

  // Sample subscriber data
  const subscribers = [
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
  ]

  // Action buttons specific to creator profile
  const actionButtons = (
    <>
      <Button className="gap-2" asChild>
        <Link href="/dashboard">
          <TrendingUp className="h-4 w-4" />
          Dashboard
        </Link>
      </Button>
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
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Creator Dashboard</h2>
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <Link href="/analytics">
                  <BarChart3 className="h-4 w-4" />
                  Full Analytics
                </Link>
              </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-3">
              <StatCard
                title="Total Earnings"
                value="$2,856.45"
                description="This month"
                trend="+12.5%"
                trendUp={true}
                icon={<DollarSign className="h-4 w-4" />}
              >
                <SparklineChart data={earningsData} color="#8b5cf6" />
              </StatCard>

              <StatCard
                title="Subscribers"
                value="245"
                description="Total subscribers"
                trend="+8.2%"
                trendUp={true}
                icon={<Users className="h-4 w-4" />}
              >
                <SparklineChart data={subscribersData} color="#3b82f6" />
              </StatCard>

              <StatCard
                title="Engagement"
                value="3,428"
                description="Views this week"
                trend="+24.3%"
                trendUp={true}
                icon={<TrendingUp className="h-4 w-4" />}
              >
                <SparklineChart data={engagementData} color="#10b981" />
              </StatCard>
            </div>

            {/* Recent Content & AI Suggestions */}
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Recent Content</h3>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard/content">View All</Link>
                  </Button>
                </div>

                <div className="space-y-4">
                  {recentContent.slice(0, 3).map((content) => (
                    <ContentCard key={content.id} content={content} />
                  ))}
                </div>

                <div className="flex justify-center">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Upload New Content
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  AI Suggestions
                </h3>

                <div className="space-y-3">
                  <AiSuggestionBox
                    title="Content Idea"
                    suggestion="Share a time-lapse video of your creative process for your latest digital artwork."
                  />
                  <AiSuggestionBox
                    title="Engagement Tip"
                    suggestion="Your tutorial posts get 2x more engagement. Consider creating a weekly tutorial series."
                  />
                </div>

                <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                  <Link href="/ai-tools">
                    <Sparkles className="h-4 w-4" />
                    AI Tools
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )

      case "content":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">My Content</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload
                </Button>
                <Button size="sm" className="gap-2" asChild>
                  <Link href="/nft-mint">
                    <ImageIcon className="h-4 w-4" />
                    Mint NFT
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {recentContent.map((content) => (
                <ContentCard key={content.id} content={content} />
              ))}
            </div>
          </div>
        )

      case "subscribers":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Subscribers</h2>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left font-medium py-3 px-4">Subscriber</th>
                        <th className="text-left font-medium py-3 px-4">Tier</th>
                        <th className="text-left font-medium py-3 px-4">Since</th>
                        <th className="text-right font-medium py-3 px-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map((subscriber) => (
                        <tr key={subscriber.id} className="border-b border-border/50 hover:bg-muted/30">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={subscriber.avatar} alt={subscriber.name} />
                                <AvatarFallback>{subscriber.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{subscriber.name}</p>
                                <p className="text-xs text-muted-foreground">@{subscriber.username}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              variant="outline"
                              className={
                                subscriber.tier === "Basic"
                                  ? "bg-blue-500/10 text-blue-500"
                                  : subscriber.tier === "Premium"
                                    ? "bg-purple-500/10 text-purple-500"
                                    : "bg-amber-500/10 text-amber-500"
                              }
                            >
                              {subscriber.tier}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">{subscriber.since}</td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm">
                              Message
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "settings":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Creator Settings</h2>
            </div>

            <CreatorSettings />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <ProfileLayout profileData={profileData} tabs={tabs} defaultTab="dashboard" actionButtons={actionButtons}>
      <div className="w-full">
        <TabNavigation />
        {renderTabContent()}
      </div>
    </ProfileLayout>
  )
}
