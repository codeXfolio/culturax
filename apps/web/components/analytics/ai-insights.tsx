"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, TrendingUp, Users, DollarSign, RefreshCw } from "lucide-react"
import { useState } from "react"

export function AiInsights() {
  const [refreshing, setRefreshing] = useState(false)

  // Sample insights
  const insights = [
    {
      id: 1,
      type: "growth",
      title: "Subscriber Growth",
      description: "Your subscriber count has increased by 15% this month, outperforming your 6-month average of 8%.",
      icon: Users,
    },
    {
      id: 2,
      type: "content",
      title: "Content Performance",
      description:
        "Tutorial content receives 2.3x more engagement than your other content types. Consider creating more tutorials.",
      icon: TrendingUp,
    },
    {
      id: 3,
      type: "revenue",
      title: "Revenue Opportunity",
      description:
        "Based on engagement patterns, increasing your Premium tier price by $5 could increase revenue without affecting subscriber count.",
      icon: DollarSign,
    },
  ]

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 2000)
  }

  return (
    <div className="space-y-4">
      {insights.map((insight) => (
        <Card key={insight.id} className="border border-purple-500/20 bg-purple-500/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                <insight.icon className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <h4 className="font-medium text-sm">{insight.title}</h4>
                <p className="text-xs text-muted-foreground">{insight.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button variant="outline" className="w-full gap-2 mt-4" onClick={handleRefresh} disabled={refreshing}>
        {refreshing ? (
          <>
            <RefreshCw className="h-4 w-4 animate-spin" />
            Generating insights...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            Generate New Insights
          </>
        )}
      </Button>
    </div>
  )
}
