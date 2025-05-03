"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Info, TrendingUp } from "lucide-react"
import type { Creator } from "./types"

interface CreatorCardProps {
  creator: Creator
  openStakeDialog: (creator: Creator) => void
  openUnstakeDialog: (creator: Creator) => void
}

export function CreatorCard({ creator, openStakeDialog, openUnstakeDialog }: CreatorCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
              <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1">
                <CardTitle className="text-base">{creator.name}</CardTitle>
                {creator.verified && (
                  <svg className="h-4 w-4 text-blue-500 fill-current" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                )}
              </div>
              <div className="text-xs text-muted-foreground">@{creator.username}</div>
            </div>
          </div>
          {creator.trending && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> Trending
            </Badge>
          )}
        </div>
        <CardDescription className="mt-2">{creator.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center">
            <div className="text-xs text-muted-foreground">APY</div>
            <HoverCard>
              <HoverCardTrigger>
                <div className="font-semibold text-green-500 flex items-center justify-center">
                  {creator.apy}% <Info className="h-3 w-3 ml-1 text-muted-foreground" />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-medium">Annual Percentage Yield</h4>
                  <p className="text-sm text-muted-foreground">
                    This is the estimated annual return on your staked ETH. The actual APY may vary based on creator
                    performance and platform activity.
                  </p>
                  <div className="text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Daily rewards:</span>
                      <span>{(creator.apy / 365).toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly rewards:</span>
                      <span>{(creator.apy / 12).toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Total Staked</div>
            <div className="font-semibold">{creator.totalStaked.toFixed(1)} ETH</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Stakers</div>
            <div className="font-semibold">{creator.stakers}</div>
          </div>
        </div>

        {creator.myStake > 0 && (
          <div className="mb-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Your stake:</span>
              <span>
                {creator.myStake.toFixed(2)} ETH (${(creator.myStake * 3500).toLocaleString()})
              </span>
            </div>
            <Progress value={(creator.myStake / (creator.totalStaked * 0.2)) * 100} className="h-1" />
            <div className="mt-1 text-xs text-muted-foreground flex justify-between">
              <span>Daily CRX rewards: ~{Math.round(creator.myStake * creator.apy * 0.1)} CRX</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        {creator.myStake > 0 ? (
          <>
            <Button variant="outline" className="flex-1" onClick={() => openStakeDialog(creator)}>
              Add Stake
            </Button>
            <Button variant="destructive" className="flex-1" onClick={() => openUnstakeDialog(creator)}>
              Unstake
            </Button>
          </>
        ) : (
          <Button className="w-full" onClick={() => openStakeDialog(creator)}>
            Stake Now
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
