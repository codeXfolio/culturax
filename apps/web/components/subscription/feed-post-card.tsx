import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageSquare, Share2, Lock } from "lucide-react"

interface FeedPostCardProps {
  post: {
    id: number
    title: string
    content: string
    image?: string
    date: string
    likes: number
    comments: number
    isSubscriberOnly: boolean
  }
}

export function FeedPostCard({ post }: FeedPostCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Creator" />
              <AvatarFallback>CR</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-medium text-sm">Alex Rivera</span>
                <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xs text-muted-foreground">{post.date}</span>
            </div>
          </div>

          {post.isSubscriberOnly && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Lock className="h-3 w-3" />
              <span>Subscribers Only</span>
            </Badge>
          )}
        </div>

        <div className="mb-3">
          <h3 className="font-medium mb-2">{post.title}</h3>
          <p className="text-sm text-muted-foreground">{post.content}</p>
        </div>

        {post.image && !post.isSubscriberOnly && (
          <div className="relative mb-3 rounded-md overflow-hidden">
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
        )}

        {post.image && post.isSubscriberOnly && (
          <div className="relative mb-3 rounded-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent flex flex-col items-center justify-center z-10">
              <Lock className="h-8 w-8 mb-2 text-primary" />
              <p className="font-medium mb-1">Exclusive Content</p>
              <p className="text-sm text-muted-foreground mb-3">Subscribe to unlock</p>
              <Button size="sm">Subscribe</Button>
            </div>
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-auto object-cover rounded-md blur-sm"
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between p-4 pt-0 border-t border-border/40">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="gap-1 px-2">
            <Heart className="h-4 w-4" />
            <span>{post.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1 px-2">
            <MessageSquare className="h-4 w-4" />
            <span>{post.comments}</span>
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
