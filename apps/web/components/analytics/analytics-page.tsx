"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModeToggle } from "@/components/mode-toggle"
import { ArrowLeft, Download, Calendar, TrendingUp, Users, DollarSign } from "lucide-react"
import Link from "next/link"
import { SubscriberChart } from "@/components/analytics/subscriber-chart"
import { RevenueChart } from "@/components/analytics/revenue-chart"
import { EngagementChart } from "@/components/analytics/engagement-chart"
import { TopPostsTable } from "@/components/analytics/top-posts-table"
import { TopFansTable } from "@/components/analytics/top-fans-table"
import { AiInsights } from "@/components/analytics/ai-insights"

export function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 backdrop-blur-sm fixed top-0 w-full z-50 bg-background/80">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/creator-profile">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <span className="font-bold text-xl">Analytics</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="container pt-24 pb-16 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Creator Analytics</h1>
          <p className="text-muted-foreground">Track your performance, engagement, and revenue metrics.</p>
        </div>

        <div className="space-y-6">
          {/* Time Period Selector */}
          <div className="flex items-center justify-between">
            <Tabs defaultValue="monthly" className="w-full max-w-md">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="h-4 w-4" />
              Custom Range
            </Button>
          </div>

          {/* Overview Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+12</span> from last month
                </p>
                <div className="h-[80px] mt-4">
                  <SubscriberChart />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,856.45</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+15.3%</span> from last month
                </p>
                <div className="h-[80px] mt-4">
                  <RevenueChart />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Engagement</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,428</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+24.3%</span> from last month
                </p>
                <div className="h-[80px] mt-4">
                  <EngagementChart />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Tables */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Subscriber Growth</CardTitle>
                <CardDescription>Track your subscriber growth over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <SubscriberChart fullSize />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
                <CardDescription>Monthly revenue from subscriptions and NFT sales</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <RevenueChart fullSize />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement</CardTitle>
                <CardDescription>Views, likes, and comments on your content</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <EngagementChart fullSize />
              </CardContent>
            </Card>
          </div>

          {/* Tables and AI Insights */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <Tabs defaultValue="posts">
                <CardHeader className="pb-0">
                  <div className="flex items-center justify-between">
                    <CardTitle>Performance</CardTitle>
                    <TabsList>
                      <TabsTrigger value="posts">Top Posts</TabsTrigger>
                      <TabsTrigger value="fans">Top Fans</TabsTrigger>
                    </TabsList>
                  </div>
                </CardHeader>
                <CardContent>
                  <TabsContent value="posts" className="mt-4">
                    <TopPostsTable />
                  </TabsContent>
                  <TabsContent value="fans" className="mt-4">
                    <TopFansTable />
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-purple-500"
                  >
                    <path d="M12 2v1" />
                    <path d="M12 21v1" />
                    <path d="M4.93 4.93l.7.7" />
                    <path d="M18.36 18.36l.7.7" />
                    <path d="M2 12h1" />
                    <path d="M21 12h1" />
                    <path d="M4.93 19.07l.7-.7" />
                    <path d="M18.36 5.64l.7-.7" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                  AI Insights
                </CardTitle>
                <CardDescription>AI-powered analysis of your creator performance</CardDescription>
              </CardHeader>
              <CardContent>
                <AiInsights />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
