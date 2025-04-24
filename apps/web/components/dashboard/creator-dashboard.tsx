"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, DollarSign, Users, TrendingUp, Upload, Sparkles, ImageIcon } from "lucide-react"
import { StatCard } from "@/components/dashboard/stat-card"
import { SparklineChart } from "@/components/dashboard/sparkline-chart"
import { ContentCard } from "@/components/dashboard/content-card"
import { AiSuggestionBox } from "@/components/dashboard/ai-suggestion-box"

export function CreatorDashboard() {
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
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Creator Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your creator activity.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" /> Upload
          </Button>
          <Button className="gap-2">
            <ImageIcon className="h-4 w-4" /> Mint NFT
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-6">
        {/* Recent Content */}
        <Card className="md:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Content</CardTitle>
              <CardDescription>Your latest uploads and creations</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-1">
              View All <ArrowUpRight className="h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="nfts">NFTs</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="posts">Posts</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4">
                {recentContent.map((content) => (
                  <ContentCard key={content.id} content={content} />
                ))}
              </TabsContent>
              <TabsContent value="nfts">
                <ContentCard content={recentContent[0]} />
              </TabsContent>
              <TabsContent value="videos">
                <ContentCard content={recentContent[1]} />
              </TabsContent>
              <TabsContent value="posts">
                <ContentCard content={recentContent[2]} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* AI Suggestions */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              AI Suggestions
            </CardTitle>
            <CardDescription>Personalized content ideas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AiSuggestionBox
              title="Post Idea of the Day"
              suggestion="Share a time-lapse video of your creative process for your latest digital artwork."
            />
            <AiSuggestionBox
              title="Trending Topic"
              suggestion="NFT collections with interactive elements are gaining traction. Consider adding interactive features to your next drop."
            />
            <AiSuggestionBox
              title="Engagement Tip"
              suggestion="Your tutorial posts get 2x more engagement. Consider creating a weekly tutorial series."
            />
            <Button variant="outline" size="sm" className="w-full">
              Generate More Ideas
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
