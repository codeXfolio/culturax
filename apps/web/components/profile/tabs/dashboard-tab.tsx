"use client";

import { Button } from "@/components/ui/button";
import { ContentCard } from "@/components/dashboard/content-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { SparklineChart } from "@/components/dashboard/sparkline-chart";
import { AiSuggestionBox } from "@/components/dashboard/ai-suggestion-box";
import {
   TrendingUp,
   Upload,
   Sparkles,
   BarChart3,
   DollarSign,
   Users,
} from "lucide-react";
import Link from "next/link";
import { ContentItem } from "@/types/profile";

interface DashboardTabProps {
   recentContent: ContentItem[];
   chartData: {
      earningsData: number[];
      subscribersData: number[];
      engagementData: number[];
   };
}

export function DashboardTab({ recentContent, chartData }: DashboardTabProps) {
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
               <SparklineChart data={chartData.earningsData} color="#8b5cf6" />
            </StatCard>

            <StatCard
               title="Subscribers"
               value="245"
               description="Total subscribers"
               trend="+8.2%"
               trendUp={true}
               icon={<Users className="h-4 w-4" />}
            >
               <SparklineChart
                  data={chartData.subscribersData}
                  color="#3b82f6"
               />
            </StatCard>

            <StatCard
               title="Engagement"
               value="3,428"
               description="Views this week"
               trend="+24.3%"
               trendUp={true}
               icon={<TrendingUp className="h-4 w-4" />}
            >
               <SparklineChart
                  data={chartData.engagementData}
                  color="#10b981"
               />
            </StatCard>
         </div>

         {/* Recent Content & AI Suggestions */}
         <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2 space-y-4">
               <div className="flex items-center justify-between">
                  <h3 className="font-medium">Recent Content</h3>
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
         </div>
      </div>
   );
}
