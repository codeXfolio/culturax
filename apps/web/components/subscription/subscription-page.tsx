"use client";

import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";
import {
   ArrowLeft,
   Check,
   Wallet,
   ImageIcon,
   FileText,
   ChevronDown,
   ChevronUp,
} from "lucide-react";
import Link from "next/link";
import { ContentPreview } from "@/components/subscription/content-preview";
import { FeedPostCard } from "@/components/feed/feed-post-card";
import { useEffect, useState } from "react";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
   DialogClose,
   DialogFooter,
} from "@/components/ui/dialog";
import {
   Collapsible,
   CollapsibleContent,
   CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FeedCard } from "../feed/feed-card";
import { FeedItem } from "../feed/fan-feed";
import {
   followUser,
   getCreatorFeed,
   getCreatorProfile,
   unfollowUser,
} from "@/lib/api/subscription";

interface SubscriptionPageProps {
   username: string;
}

interface Profile {
   id: string;
   name: string;
   username: string;
   avatar: string;
   coverImage: string;
   bio: string;
   totalFollowers: number;
   featured: boolean;
   address: string;
   isFollowed: boolean;
}

export function SubscriptionPage({ username }: SubscriptionPageProps) {
   const [showSubscription, setShowSubscription] = useState(false);
   const [showConfirmDialog, setShowConfirmDialog] = useState(false);
   const [profile, setProfile] = useState<Profile | null>(null);
   const [feed, setFeed] = useState<FeedItem[]>([]);
   const [isFollowed, setIsFollowed] = useState(false);

   useEffect(() => {
      const fetchProfile = async () => {
         if (!username) return;

         const response = await getCreatorProfile(username);
         setProfile(response);
         setIsFollowed(response.isFollowed);
      };

      const fetchFeed = async () => {
         if (!username) return;

         const response = await getCreatorFeed(username);
         setFeed(response);
      };

      fetchProfile();
      // fetchFeed();
   }, [username]);

   const handleFollow = async () => {
      if (!username) return;

      if (isFollowed) {
         const myAddress = localStorage.getItem("authAddress");
         const targetAddress = profile?.address;
         if (!myAddress || !targetAddress) return;
         const response = await unfollowUser(myAddress, targetAddress);
         if (typeof response === "object") {
            setIsFollowed(!isFollowed);
            setProfile({
               ...profile,
               totalFollowers: profile?.totalFollowers - 1,
            });
         }
      } else {
         const myAddress = localStorage.getItem("authAddress");
         const targetAddress = profile?.address;
         if (!myAddress || !targetAddress) return;
         const response = await followUser(myAddress, targetAddress);

         if (typeof response === "object") {
            setIsFollowed(!isFollowed);
            setProfile({
               ...profile,
               totalFollowers: profile?.totalFollowers + 1,
            });
         }
      }
   };

   // Mock creator data
   const creator = {
      name: "Alex Rivera",
      username: username,
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "Digital artist and NFT creator. Exploring the intersection of art and technology.",
      followers: "24.5K",
      verified: true,
   };

   // Mock subscription info
   const subscription = {
      price: "$9.99",
      period: "month",
      description:
         "Get exclusive access to all my content and behind-the-scenes material.",
      features: [
         "Exclusive posts and updates",
         "Behind-the-scenes content",
         "Early access to NFT drops",
         "Direct messaging",
         "Monthly Q&A sessions",
         "Community access",
      ],
   };

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
   ];

   // Mock feed items
   const feedItems: FeedItem[] = [
      {
         id: "1",
         caption:
            "Really happy with how this turned out! Let me know what you think in the comments.",
         image: "/placeholder.svg?height=400&width=600",
         createdAt: "2024-01-20T10:00:00Z",
         isPremium: false,
         userId: "1",
         FeedPostLike: [],
         FeedPostComment: [],
         user: {
            id: "1",
            name: "Alex Rivera",
            username: "alexrivera",
            avatar: "/placeholder.svg?height=40&width=40",
         },
      },
      {
         id: "2",
         caption:
            "Here's a look at how I created my latest NFT collection. I start with sketches and then move to digital...",
         image: "/placeholder.svg?height=400&width=600",
         createdAt: "2024-01-19T15:30:00Z",
         isPremium: true,
         userId: "1",
         FeedPostLike: [],
         FeedPostComment: [],
         user: {
            id: "1",
            name: "Alex Rivera",
            username: "alexrivera",
            avatar: "/placeholder.svg?height=40&width=40",
         },
      },
      {
         id: "3",
         caption:
            "I'll be sharing my techniques for creating realistic lighting effects in digital art. Stay tuned!",
         image: "/placeholder.svg?height=400&width=600",
         createdAt: "2024-01-18T09:15:00Z",
         isPremium: false,
         userId: "1",
         FeedPostLike: [],
         FeedPostComment: [],
         user: {
            id: "1",
            name: "Alex Rivera",
            username: "alexrivera",
            avatar: "/placeholder.svg?height=40&width=40",
         },
      },
      {
         id: "4",
         caption:
            "Here's an early look at my upcoming NFT collection. Subscribers will get early access and special pricing.",
         image: "/placeholder.svg?height=400&width=600",
         createdAt: "2024-01-17T14:20:00Z",
         isPremium: true,
         userId: "1",
         FeedPostLike: [],
         FeedPostComment: [],
         user: {
            id: "1",
            name: "Alex Rivera",
            username: "alexrivera",
            avatar: "/placeholder.svg?height=40&width=40",
         },
      },
      {
         id: "5",
         caption:
            "I've been thinking a lot about where digital art is headed, especially with AI and blockchain technologies becoming more mainstream...",
         image: "/placeholder.svg?height=400&width=600",
         createdAt: "2024-01-15T11:45:00Z",
         isPremium: false,
         userId: "1",
         FeedPostLike: [],
         FeedPostComment: [],
         user: {
            id: "1",
            name: "Alex Rivera",
            username: "alexrivera",
            avatar: "/placeholder.svg?height=40&width=40",
         },
      },
   ];

   return (
      <div className="min-h-screen bg-background">
         {/* Subscription Confirmation Dialog */}
         <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
            <DialogContent className="sm:max-w-[425px]">
               <DialogHeader>
                  <DialogTitle>Confirm Subscription</DialogTitle>
                  <DialogDescription>
                     You are about to subscribe to {creator.name} for{" "}
                     {subscription.price}/{subscription.period}.
                  </DialogDescription>
               </DialogHeader>
               <div className="py-4">
                  <p className="mb-4">This will give you access to:</p>
                  <ul className="space-y-2">
                     {subscription.features
                        .slice(0, 3)
                        .map((feature, index) => (
                           <li
                              key={index}
                              className="flex items-start gap-2 text-sm"
                           >
                              <Check className="h-4 w-4 text-green-500 mt-0.5" />
                              <span>{feature}</span>
                           </li>
                        ))}
                     {subscription.features.length > 3 && (
                        <li className="text-sm text-muted-foreground">
                           And {subscription.features.length - 3} more
                           benefits...
                        </li>
                     )}
                  </ul>
               </div>
               <DialogFooter>
                  <Button
                     variant="outline"
                     onClick={() => setShowConfirmDialog(false)}
                  >
                     Cancel
                  </Button>
                  <Button
                     onClick={() => {
                        setShowConfirmDialog(false);
                        setShowSubscription(true);
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
                     <Link href="#" onClick={() => window.history.back()}>
                        <ArrowLeft className="h-5 w-5" />
                     </Link>
                  </Button>
                  <span className="font-medium">Creator Profile</span>
               </div>
               <ModeToggle />
            </div>
         </header>

         <main className="container pt-24 pb-16 max-w-5xl">
            {/* Cover Image */}
            <div className="relative w-full h-[200px] md:h-[300px] mb-4 rounded-lg overflow-hidden">
               <img
                  src={
                     profile?.coverImage ||
                     "/placeholder.svg?height=200&width=1200"
                  }
                  alt="Cover"
                  className="w-full h-full object-cover"
               />
            </div>

            {/* Creator Profile */}
            <div className="flex flex-col md:flex-row gap-6 mb-10">
               <div className="flex-shrink-0 -mt-16 md:-mt-20">
                  <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background">
                     <AvatarImage
                        src={profile?.avatar || "/placeholder.svg"}
                        alt={profile?.name}
                     />
                     <AvatarFallback>{profile?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
               </div>

               <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                     <h1 className="text-2xl font-bold">{profile?.name}</h1>
                     {profile?.featured && (
                        <svg
                           className="h-5 w-5 text-blue-500"
                           viewBox="0 0 24 24"
                           fill="currentColor"
                        >
                           <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                     )}
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                     <span className="text-muted-foreground">
                        @{profile?.username}
                     </span>
                     <span className="text-muted-foreground">•</span>
                     <span className="text-muted-foreground">
                        {profile?.totalFollowers} followers
                     </span>
                  </div>
                  <p className="text-muted-foreground mb-4">{profile?.bio}</p>
                  <div className="flex flex-wrap gap-2">
                     {/* Desktop: Collapsible for subscription */}
                     <div className="hidden md:block">
                        <Collapsible
                           open={showSubscription}
                           onOpenChange={setShowSubscription}
                           className="w-full"
                        >
                           <CollapsibleTrigger asChild>
                              <Button
                                 className="gap-2"
                                 onClick={(e) => {
                                    e.preventDefault();
                                    setShowConfirmDialog(true);
                                 }}
                              >
                                 <Wallet className="h-4 w-4" />
                                 Subscribe
                              </Button>
                           </CollapsibleTrigger>
                           <CollapsibleContent className="mt-6">
                              <Card className="border border-border/50 relative max-w-md">
                                 <CardHeader>
                                    <CardTitle>Subscription</CardTitle>
                                    <CardDescription>
                                       <span className="text-xl font-bold">
                                          {subscription.price}
                                       </span>
                                       <span className="text-muted-foreground">
                                          /{subscription.period}
                                       </span>
                                    </CardDescription>
                                 </CardHeader>
                                 <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4">
                                       {subscription.description}
                                    </p>
                                    <ul className="space-y-2">
                                       {subscription.features.map(
                                          (feature, index) => (
                                             <li
                                                key={index}
                                                className="flex items-start gap-2 text-sm"
                                             >
                                                <Check className="h-4 w-4 text-green-500 mt-0.5" />
                                                <span>{feature}</span>
                                             </li>
                                          )
                                       )}
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
                              <Button
                                 className="gap-2"
                                 onClick={() => setShowConfirmDialog(true)}
                              >
                                 <Wallet className="h-4 w-4" />
                                 Subscribe
                              </Button>
                           </DialogTrigger>
                           <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                 <DialogTitle>
                                    Subscribe to {creator.name}
                                 </DialogTitle>
                                 <DialogDescription>
                                    Get exclusive access to {creator.name}'s
                                    content for {subscription.price}/
                                    {subscription.period}
                                 </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 mt-4">
                                 <Card className="border border-border/50 relative">
                                    <CardHeader className="pb-2">
                                       <CardTitle>Subscription</CardTitle>
                                       <CardDescription>
                                          <span className="text-xl font-bold">
                                             {subscription.price}
                                          </span>
                                          <span className="text-muted-foreground">
                                             /{subscription.period}
                                          </span>
                                       </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pb-2">
                                       <p className="text-sm text-muted-foreground mb-2">
                                          {subscription.description}
                                       </p>
                                       <ul className="space-y-1">
                                          {subscription.features.map(
                                             (feature, index) => (
                                                <li
                                                   key={index}
                                                   className="flex items-start gap-2 text-sm"
                                                >
                                                   <Check className="h-4 w-4 text-green-500 mt-0.5" />
                                                   <span>{feature}</span>
                                                </li>
                                             )
                                          )}
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

                     <Button onClick={handleFollow} variant="outline">
                        {isFollowed ? "Unfollow" : "Follow"}
                     </Button>
                  </div>
               </div>
            </div>

            {/* Content Previews */}
            <div>
               <h2 className="text-xl font-bold mb-6">Content</h2>
               <Tabs defaultValue="feed" className="space-y-6">
                  <TabsList>
                     <TabsTrigger
                        value="feed"
                        className="flex items-center gap-1"
                     >
                        <FileText className="h-4 w-4" />
                        <span>Feed</span>
                     </TabsTrigger>
                     <TabsTrigger
                        value="images"
                        className="flex items-center gap-1"
                     >
                        <ImageIcon className="h-4 w-4" />
                        <span>Images</span>
                     </TabsTrigger>
                  </TabsList>

                  <TabsContent value="feed">
                     <div className="space-y-6">
                        {feedItems.map((item) => (
                           <FeedCard
                              key={item.id}
                              item={item}
                              onLike={() => {}}
                              onUnlike={() => {}}
                              onAddComment={() => {}}
                              onDeleteComment={() => {}}
                           />
                        ))}
                     </div>
                  </TabsContent>

                  <TabsContent value="images">
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {contentPreviews
                           .filter((content) => content.type === "image")
                           .map((content) => (
                              <ContentPreview
                                 key={content.id}
                                 content={content}
                              />
                           ))}
                     </div>
                  </TabsContent>
               </Tabs>
            </div>
         </main>
      </div>
   );
}
