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
   Heart,
   MessageCircle,
   Lock,
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
import { FeedItem } from "@/components/feed/fan-feed";
import {
   followUser,
   getCreatorFeed,
   getCreatorProfile,
   unfollowUser,
   getCreatorCollectionsByUsername,
} from "@/lib/api/subscription";
import { useInView } from "react-intersection-observer";
import { CommentModal } from "@/components/feed/CommentModal";

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

interface Collection {
   id: string;
   title: string;
   description: string;
   tags: string[];
   userId: string;
   coverImage: string;
   createdAt: string;
   updatedAt: string;
   user: {
      id: string;
      name: string;
      username: string;
      avatar: string;
   };
}

interface ContentPreview {
   id: string;
   title: string;
   type: string;
   coverImage: string;
   locked: boolean;
}

export function SubscriptionPage({ username }: SubscriptionPageProps) {
   const [showSubscription, setShowSubscription] = useState(false);
   const [showConfirmDialog, setShowConfirmDialog] = useState(false);
   const [profile, setProfile] = useState<Profile | null>(null);
   const [feed, setFeed] = useState<FeedItem[]>([]);
   const [isFollowed, setIsFollowed] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const [isLoadingMore, setIsLoadingMore] = useState(false);
   const [page, setPage] = useState(1);
   const [hasMore, setHasMore] = useState(true);
   const [collections, setCollections] = useState<ContentPreview[]>([]);
   const [selectedPost, setSelectedPost] = useState<FeedItem | null>(null);
   const [showComments, setShowComments] = useState(false);

   const { ref, inView } = useInView({
      threshold: 0,
   });

   useEffect(() => {
      const fetchProfile = async () => {
         if (!username) return;

         try {
            const response = await getCreatorProfile(username);
            setProfile(response);
            setIsFollowed(response.isFollowed);
         } catch (error) {
            console.error("Error fetching profile:", error);
         }
      };

      const fetchFeed = async () => {
         if (!username) return;

         try {
            setIsLoading(true);
            const response = await getCreatorFeed(username);
            setFeed(response.data);
            setHasMore(
               response.pagination.page < response.pagination.totalPages
            );
         } catch (error) {
            console.error("Error fetching feed:", error);
         } finally {
            setIsLoading(false);
         }
      };

      const fetchCollections = async () => {
         if (!username) return;

         try {
            const response = await getCreatorCollectionsByUsername(username);
            setCollections(response);
         } catch (error) {
            console.error("Error fetching collections:", error);
         }
      };

      fetchProfile();
      fetchFeed();
      fetchCollections();
   }, [username]);

   // Load more posts when scrolling to the bottom
   useEffect(() => {
      if (inView && hasMore && !isLoadingMore) {
         loadMorePosts();
      }
   }, [inView, hasMore, isLoadingMore]);

   const loadMorePosts = async () => {
      if (!username) return;

      try {
         setIsLoadingMore(true);
         const nextPage = page + 1;
         const response = await getCreatorFeed(username, nextPage);

         if (response.success) {
            // Use a Set to ensure unique items based on id
            const existingIds = new Set(feed.map((item) => item.id));
            const newItems = response.data.filter(
               (item: FeedItem) => !existingIds.has(item.id)
            );

            setFeed((prev) => [...prev, ...newItems]);
            setPage(nextPage);
            setHasMore(nextPage < response.pagination.totalPages);
         }
      } catch (error) {
         console.error("Error loading more posts:", error);
      } finally {
         setIsLoadingMore(false);
      }
   };

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
            <div className="relative w-full h-[200px] md:h-[300px] mb-4 rounded-t-lg overflow-hidden">
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
                                    Subscribe to {profile?.name}
                                 </DialogTitle>
                                 <DialogDescription>
                                    Get exclusive access to {profile?.name}'s
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

                     {/* Desktop: Button for subscription */}
                     <div className="hidden md:block">
                        <Button
                           className="gap-2"
                           onClick={() => setShowConfirmDialog(true)}
                        >
                           <Wallet className="h-4 w-4" />
                           Subscribe
                        </Button>
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
                        {isLoading ? (
                           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                              {[...Array(6)].map((_, index) => (
                                 <div key={index} className="animate-pulse">
                                    <div className="aspect-square bg-muted rounded-lg" />
                                 </div>
                              ))}
                           </div>
                        ) : feed.length > 0 ? (
                           <>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                 {feed.map((item) => (
                                    <div
                                       key={item.id}
                                       className="relative aspect-square cursor-pointer group"
                                       onClick={() => {
                                          setSelectedPost(item);
                                          setShowComments(true);
                                       }}
                                    >
                                       <img
                                          src={`${process.env.NEXT_PUBLIC_API_URL + item.image}` || "/placeholder.svg"}
                                          alt={item.caption}
                                          className={`w-full h-full object-cover rounded-lg ${
                                             item.isPremium ? "blur-sm" : ""
                                          }`}
                                       />
                                       {item.isPremium && (
                                          <div className="absolute inset-0 backdrop-blur-md flex flex-col items-center justify-center">
                                             <Lock className="h-8 w-8 mb-2 text-primary" />
                                             <p className="font-medium mb-1">
                                                Premium Content
                                             </p>
                                             <p className="text-sm text-muted-foreground mb-3">
                                                Subscribe to unlock
                                             </p>
                                             <Button size="sm">
                                                Subscribe
                                             </Button>
                                          </div>
                                       )}
                                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                          <div className="flex items-center gap-4 text-white">
                                             <div className="flex items-center gap-1">
                                                <Heart className="h-5 w-5" />
                                                <span>
                                                   {item.FeedPostLike?.length ||
                                                      0}
                                                </span>
                                             </div>
                                             <div className="flex items-center gap-1">
                                                <MessageCircle className="h-5 w-5" />
                                                <span>
                                                   {item.FeedPostComment
                                                      ?.length || 0}
                                                </span>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                              {/* Loading indicator for infinite scroll */}
                              <div ref={ref} className="py-4">
                                 {isLoadingMore && (
                                    <div className="flex justify-center">
                                       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                    </div>
                                 )}
                              </div>
                           </>
                        ) : (
                           <div className="text-center py-8 text-muted-foreground">
                              No posts yet
                           </div>
                        )}
                     </div>
                  </TabsContent>

                  <TabsContent value="images">
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {collections.map((collection) => (
                           <ContentPreview
                              key={collection.id}
                              content={{
                                 id: collection.id,
                                 title: collection.title,
                                 type: "image",
                                 thumbnail:
                                    collection.coverImage ||
                                    "/placeholder.svg?height=300&width=400",
                                 locked: false,
                              }}
                           />
                        ))}
                     </div>
                  </TabsContent>
               </Tabs>
            </div>
         </main>

         {/* Comments Modal */}
         <CommentModal
            open={showComments}
            onOpenChange={setShowComments}
            post={{
               image: selectedPost?.image,
               user: {
                  name: selectedPost?.user?.name ?? "Anonymous",
                  avatar: selectedPost?.user?.avatar ?? "/placeholder.svg",
               },
               caption: selectedPost?.caption || "",
               isPremium: selectedPost?.isPremium ?? false,
            }}
            comments={
               selectedPost?.FeedPostComment?.map((comment) => ({
                  id: comment.id,
                  user: {
                     name: comment.user?.name ?? "Anonymous",
                     avatar: comment.user?.avatar ?? "/placeholder.svg",
                     isVerified: comment.user?.isVerified ?? false,
                  },
                  content: comment.comment,
                  date: comment.createdAt
                     ? new Date(comment.createdAt).toLocaleDateString(
                          undefined,
                          {
                             year: "numeric",
                             month: "short",
                             day: "numeric",
                          }
                       )
                     : "",
                  likes: 0,
               })) || []
            }
         />
      </div>
   );
}
