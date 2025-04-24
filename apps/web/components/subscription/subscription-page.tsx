"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"
import { ArrowLeft, Check, Wallet, ImageIcon, FileText, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { ContentPreview } from "@/components/subscription/content-preview"
import { FeedPostCard } from "@/components/feed/feed-post-card"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface SubscriptionPageProps {
  username: string
}

export function SubscriptionPage({ username }: SubscriptionPageProps) {
  const [showSubscription, setShowSubscription] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  // Mock creator data
  const creator = {
    name: "Alex Rivera",
    username: username,
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Digital artist and NFT creator. Exploring the intersection of art and technology.",
    followers: "24.5K",
    verified: true,
  }

  // Mock subscription info
  const subscription = {
    price: "$9.99",
    period: "month",
    description: "Get exclusive access to all my content and behind-the-scenes material.",
    features: [
      "Exclusive posts and updates",
      "Behind-the-scenes content",
      "Early access to NFT drops",
      "Direct messaging",
      "Monthly Q&A sessions",
      "Community access",
    ],
  }

  // Mock content previews
  const contentPreviews = [
    {
      id: 1,
      title: "Digital Art Collection #1",
      type: "image",
      thumbnail: "/placeholder.svg?height=300&width=400",
      locked: false,
    },
    {
      id: 2,
      title: "Behind the Scenes: Creative Process",
      type: "video",
      thumbnail: "/placeholder.svg?height=300&width=400",
      locked: true,
    },
    {
      id: 3,
      title: "Exclusive Tutorial: Digital Painting",
      type: "tutorial",
      thumbnail: "/placeholder.svg?height=300&width=400",
      locked: true,
    },
    {
      id: 4,
      title: "New NFT Collection Preview",
      type: "image",
      thumbnail: "/placeholder.svg?height=300&width=400",
      locked: true,
    },
    {
      id: 5,
      title: "Artist Statement: My Creative Journey",
      type: "text",
      thumbnail: "/placeholder.svg?height=300&width=400",
      locked: false,
    },
    {
      id: 6,
      title: "Ambient Music for Creativity",
      type: "audio",
      thumbnail: "/placeholder.svg?height=300&width=400",
      locked: true,
    },
  ]

  // Mock feed items
  const feedItems = [
    {
      id: 1,
      title: "Just finished my latest digital artwork",
      content: "Really happy with how this turned out! Let me know what you think in the comments.",
      image: "/placeholder.svg?height=400&width=600",
      date: "2 hours ago",
      likes: 42,
      comments: 8,
      isSubscriberOnly: false,
    },
    {
      id: 2,
      title: "Behind the scenes of my creative process",
      content:
        "Here's a look at how I created my latest NFT collection. I start with sketches and then move to digital...",
      image: "/placeholder.svg?height=400&width=600",
      date: "Yesterday",
      likes: 87,
      comments: 14,
      isSubscriberOnly: true,
    },
    {
      id: 3,
      title: "New tutorial dropping tomorrow!",
      content: "I'll be sharing my techniques for creating realistic lighting effects in digital art. Stay tuned!",
      date: "2 days ago",
      likes: 35,
      comments: 5,
      isSubscriberOnly: false,
    },
    {
      id: 4,
      title: "Exclusive NFT preview for my subscribers",
      content:
        "Here's an early look at my upcoming NFT collection. Subscribers will get early access and special pricing.",
      image: "/placeholder.svg?height=400&width=600",
      date: "3 days ago",
      likes: 124,
      comments: 27,
      isSubscriberOnly: true,
    },
    {
      id: 5,
      title: "Thoughts on the future of digital art",
      content:
        "I've been thinking a lot about where digital art is headed, especially with AI and blockchain technologies becoming more mainstream...",
      date: "5 days ago",
      likes: 56,
      comments: 12,
      isSubscriberOnly: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Subscription Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Subscription</DialogTitle>
            <DialogDescription>
              You are about to subscribe to {creator.name} for {subscription.price}/{subscription.period}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">This will give you access to:</p>
            <ul className="space-y-2">
              {subscription.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
              {subscription.features.length > 3 && (
                <li className="text-sm text-muted-foreground">
                  And {subscription.features.length - 3} more benefits...
                </li>
              )}
            </ul>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowConfirmDialog(false)
                setShowSubscription(true)
              }}
            >
              Confirm Subscription
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <header className="border-b border-border/40 backdrop-blur-sm fixed top-0 w-full z-50 bg-background/80">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/feed">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <span className="font-medium">Creator Profile</span>
          </div>
          <ModeToggle />
        </div>
      </header>

      <main className="container pt-24 pb-16 max-w-5xl">
        {/* Creator Profile */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="flex-shrink-0">
            <Avatar className="h-24 w-24 md:h-32 md:w-32">
              <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
              <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold">{creator.name}</h1>
              {creator.verified && (
                <svg className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-muted-foreground">@{creator.username}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{creator.followers} followers</span>
            </div>
            <p className="text-muted-foreground mb-4">{creator.bio}</p>
            <div className="flex flex-wrap gap-2">
              {/* Desktop: Collapsible for subscription */}
              <div className="hidden md:block">
                <Collapsible open={showSubscription} onOpenChange={setShowSubscription} className="w-full">
                  <CollapsibleTrigger asChild>
                    <Button
                      className="gap-2"
                      onClick={(e) => {
                        e.preventDefault()
                        setShowConfirmDialog(true)
                      }}
                    >
                      <Wallet className="h-4 w-4" />
                      Subscribe
                      {showSubscription ? (
                        <ChevronUp className="h-4 w-4 ml-1" />
                      ) : (
                        <ChevronDown className="h-4 w-4 ml-1" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-6">
                    <Card className="border border-border/50 relative max-w-md">
                      <CardHeader>
                        <CardTitle>Subscription</CardTitle>
                        <CardDescription>
                          <span className="text-xl font-bold">{subscription.price}</span>
                          <span className="text-muted-foreground">/{subscription.period}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{subscription.description}</p>
                        <ul className="space-y-2">
                          {subscription.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <Check className="h-4 w-4 text-green-500 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full gap-2">
                          <Wallet className="h-4 w-4" />
                          Subscribe Now
                        </Button>
                      </CardFooter>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>
              </div>

              {/* Mobile: Dialog for subscription */}
              <div className="md:hidden">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="gap-2" onClick={() => setShowConfirmDialog(true)}>
                      <Wallet className="h-4 w-4" />
                      Subscribe
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Subscribe to {creator.name}</DialogTitle>
                      <DialogDescription>
                        Get exclusive access to {creator.name}'s content for {subscription.price}/{subscription.period}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <Card className="border border-border/50 relative">
                        <CardHeader className="pb-2">
                          <CardTitle>Subscription</CardTitle>
                          <CardDescription>
                            <span className="text-xl font-bold">{subscription.price}</span>
                            <span className="text-muted-foreground">/{subscription.period}</span>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-sm text-muted-foreground mb-2">{subscription.description}</p>
                          <ul className="space-y-1">
                            {subscription.features.map((feature, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <Check className="h-4 w-4 text-green-500 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <DialogClose asChild>
                            <Button className="w-full gap-2">
                              <Wallet className="h-4 w-4" />
                              Subscribe Now
                            </Button>
                          </DialogClose>
                        </CardFooter>
                      </Card>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Button variant="outline">Follow</Button>
            </div>
          </div>
        </div>

        {/* Content Previews */}
        <div>
          <h2 className="text-xl font-bold mb-6">Content</h2>
          <Tabs defaultValue="feed" className="space-y-6">
            <TabsList>
              <TabsTrigger value="feed" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>Feed</span>
              </TabsTrigger>
              <TabsTrigger value="images" className="flex items-center gap-1">
                <ImageIcon className="h-4 w-4" />
                <span>Images</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="feed">
              <div className="space-y-6">
                {feedItems.map((item) => (
                  <FeedPostCard key={item.id} post={item} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="images">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {contentPreviews
                  .filter((content) => content.type === "image")
                  .map((content) => (
                    <ContentPreview key={content.id} content={content} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
