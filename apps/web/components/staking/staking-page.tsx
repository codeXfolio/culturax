"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ModeToggle } from "@/components/mode-toggle"
import { ArrowLeft, RefreshCw, Star, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock creator data
const creators = [
  {
    id: 1,
    name: "Alex Rivera",
    handle: "@alexcreates",
    avatar: "/placeholder.svg?height=100&width=100",
    category: "Digital Art",
    stakers: 1245,
    apy: "8.5%",
    stakedAmount: 0.75,
  },
  {
    id: 2,
    name: "Maya Johnson",
    handle: "@maya_designs",
    avatar: "/placeholder.svg?height=100&width=100",
    category: "3D Modeling",
    stakers: 892,
    apy: "7.2%",
    stakedAmount: 0.5,
  },
  {
    id: 3,
    name: "Jamal Wilson",
    handle: "@jamalcreative",
    avatar: "/placeholder.svg?height=100&width=100",
    category: "Music Production",
    stakers: 1567,
    apy: "9.1%",
    stakedAmount: 1.25,
  },
]

export function StakingPage() {
  const [refreshing, setRefreshing] = useState(false)
  const [selectedCreator, setSelectedCreator] = useState<number | null>(null)
  const [stakeAmount, setStakeAmount] = useState("")
  const [unstakeCreatorId, setUnstakeCreatorId] = useState<number | null>(null)
  const [unstakeAmount, setUnstakeAmount] = useState("")
  const [showStakeDialog, setShowStakeDialog] = useState(false)
  const [showUnstakeDialog, setShowUnstakeDialog] = useState(false)

  // Mock staking data
  const stakingData = {
    totalStaked: "5.25 ETH",
    rewardsEarned: "0.42 ETH",
    totalCreatorsStaked: 3,
    averageAPY: "8.2%",
  }

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1500)
  }

  const handleStakeSubmit = () => {
    console.log(`Staking ${stakeAmount} ETH to creator ID: ${selectedCreator}`)
    setStakeAmount("")
    setShowStakeDialog(false)
  }

  const handleUnstakeSubmit = () => {
    console.log(`Unstaking ${unstakeAmount} ETH from creator ID: ${unstakeCreatorId}`)
    setUnstakeAmount("")
    setShowUnstakeDialog(false)
  }

  const openStakeDialog = (creatorId: number) => {
    setSelectedCreator(creatorId)
    setShowStakeDialog(true)
  }

  const openUnstakeDialog = (creatorId: number) => {
    setUnstakeCreatorId(creatorId)
    setShowUnstakeDialog(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 backdrop-blur-sm fixed top-0 w-full z-50 bg-background/80">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/profile">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <span className="font-bold text-xl">Creator Staking</span>
          </div>
          <ModeToggle />
        </div>
      </header>

      <main className="container pt-24 pb-16 max-w-5xl">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="creators">Creators</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Staking Overview */}
              <Card className="md:col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle>Staking Overview</CardTitle>
                  <CardDescription>Your staking activity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Total Staked</p>
                    <p className="text-2xl font-bold">{stakingData.totalStaked}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Rewards Earned</p>
                    <p className="text-2xl font-bold">{stakingData.rewardsEarned}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Creators Staked</p>
                    <p className="text-2xl font-bold">{stakingData.totalCreatorsStaked}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Average APY</p>
                    <p className="text-2xl font-bold">{stakingData.averageAPY}</p>
                  </div>

                  <Button variant="outline" className="w-full gap-2" onClick={handleRefresh} disabled={refreshing}>
                    <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
                    Refresh Balances
                  </Button>
                </CardContent>
              </Card>

              {/* Staking Benefits */}
              <Card className="md:col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle>Staking Benefits</CardTitle>
                  <CardDescription>Why stake to creators?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Support Creators</h3>
                      <p className="text-sm text-muted-foreground">
                        Help your favorite creators continue making content you love
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Earn Rewards</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive staking rewards based on creator performance
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Exclusive Access</h3>
                      <p className="text-sm text-muted-foreground">
                        Get access to exclusive content and community features
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Progress value={75} className="mt-4" />
                    <p className="text-xs text-muted-foreground mt-2">
                      75% of users who stake report higher engagement with creators
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Your Staked Creators */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Your Staked Creators</CardTitle>
                <CardDescription>Creators you're currently staking to</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {creators.map((creator) => (
                    <div key={creator.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={creator.avatar} alt={creator.name} />
                          <AvatarFallback>{creator.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{creator.name}</p>
                          <p className="text-sm text-muted-foreground">{creator.handle}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{creator.stakedAmount} ETH</p>
                        <p className="text-sm text-muted-foreground">APY: {creator.apy}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Dialog
                          open={showStakeDialog && selectedCreator === creator.id}
                          onOpenChange={(open) => !open && setShowStakeDialog(false)}
                        >
                          <DialogTrigger asChild>
                            <Button size="sm" onClick={() => openStakeDialog(creator.id)}>
                              Add Stake
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Stake to {creator.name}</DialogTitle>
                              <DialogDescription>
                                Add more stake to support this creator and earn rewards.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="stake-amount">Amount (ETH)</Label>
                                <Input
                                  id="stake-amount"
                                  type="number"
                                  placeholder="0.00"
                                  value={stakeAmount}
                                  onChange={(e) => setStakeAmount(e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm font-medium">Estimated Rewards</p>
                                <p className="text-sm">
                                  {stakeAmount ? (Number.parseFloat(stakeAmount) * 0.085).toFixed(4) : "0.0000"} ETH per
                                  year
                                </p>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setShowStakeDialog(false)}>
                                Cancel
                              </Button>
                              <Button onClick={handleStakeSubmit} disabled={!stakeAmount}>
                                Confirm Stake
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <Dialog
                          open={showUnstakeDialog && unstakeCreatorId === creator.id}
                          onOpenChange={(open) => !open && setShowUnstakeDialog(false)}
                        >
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => openUnstakeDialog(creator.id)}>
                              Unstake
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Unstake from {creator.name}</DialogTitle>
                              <DialogDescription>Withdraw your staked funds from this creator.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="unstake-amount">Amount (ETH)</Label>
                                <Input
                                  id="unstake-amount"
                                  type="number"
                                  placeholder="0.00"
                                  max={creator.stakedAmount}
                                  value={unstakeAmount}
                                  onChange={(e) => setUnstakeAmount(e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm font-medium">Release Date</p>
                                <p className="text-sm">Funds will be available in 7 days</p>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setShowUnstakeDialog(false)}>
                                Cancel
                              </Button>
                              <Button onClick={handleUnstakeSubmit} disabled={!unstakeAmount}>
                                Confirm Unstake
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="creators" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Discover Creators</CardTitle>
                <CardDescription>Find new creators to stake to</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    ...creators,
                    {
                      id: 4,
                      name: "Sarah Chen",
                      handle: "@sarahcreates",
                      avatar: "/placeholder.svg?height=100&width=100",
                      category: "Photography",
                      stakers: 723,
                      apy: "6.8%",
                      stakedAmount: 0,
                    },
                    {
                      id: 5,
                      name: "David Kim",
                      handle: "@davidmusic",
                      avatar: "/placeholder.svg?height=100&width=100",
                      category: "Music",
                      stakers: 1102,
                      apy: "8.9%",
                      stakedAmount: 0,
                    },
                  ].map((creator) => (
                    <Card key={creator.id} className="overflow-hidden">
                      <div className="p-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={creator.avatar} alt={creator.name} />
                            <AvatarFallback>{creator.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{creator.name}</p>
                            <p className="text-sm text-muted-foreground">{creator.handle}</p>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Category</span>
                            <span className="text-sm font-medium">{creator.category}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Stakers</span>
                            <span className="text-sm font-medium">{creator.stakers}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">APY</span>
                            <span className="text-sm font-medium">{creator.apy}</span>
                          </div>
                          {creator.stakedAmount > 0 && (
                            <div className="flex justify-between">
                              <span className="text-sm">Your Stake</span>
                              <span className="text-sm font-medium">{creator.stakedAmount} ETH</span>
                            </div>
                          )}
                        </div>
                        <div className="mt-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="w-full">Stake Now</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Stake to {creator.name}</DialogTitle>
                                <DialogDescription>
                                  Support this creator by staking ETH and earn rewards.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor={`stake-amount-${creator.id}`}>Amount (ETH)</Label>
                                  <Input id={`stake-amount-${creator.id}`} type="number" placeholder="0.00" />
                                </div>
                                <div className="space-y-2">
                                  <p className="text-sm font-medium">Creator Info</p>
                                  <p className="text-sm">
                                    {creator.category} • {creator.stakers} stakers
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <p className="text-sm font-medium">Estimated APY</p>
                                  <p className="text-sm">{creator.apy}</p>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button>Confirm Stake</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
