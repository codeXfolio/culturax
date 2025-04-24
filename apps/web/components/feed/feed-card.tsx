import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageSquare, Share2, Lock } from "lucide-react"

interface FeedCardProps {
  item: {
    id: number
    creator: {
      name: string
      username: string
      avatar: string
      verified: boolean
    }
    content: {
      title: string
      description: string
      image: string
      isPaywalled: boolean
      price?: string
      type: string
    }
    stats: {
      likes: number
      comments: number
      timestamp: string
    }
  }
}

export function FeedCard({ item }: FeedCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={item.creator.avatar} alt={item.creator.name} />
                <AvatarFallback>{item.creator.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-medium text-sm">{item.creator.name}</span>
                  {item.creator.verified && (
                    <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">@{item.creator.username}</span>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              {item.content.type}
            </Badge>
          </div>

          <h3 className="font-medium mb-1">{item.content.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{item.content.description}</p>
        </div>

        <div className="relative">
          <img
            src={item.content.image || "/placeholder.svg"}
            alt={item.content.title}
            className="w-full h-auto object-cover"
          />

          {item.content.isPaywalled && (
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent flex flex-col items-center justify-center">
              <Lock className="h-8 w-8 mb-2 text-primary" />
              <p className="font-medium mb-1">Exclusive Content</p>
              <p className="text-sm text-muted-foreground mb-3">Subscribe to unlock</p>
              {item.content.price && (
                <Badge variant="secondary" className="mb-3">
                  {item.content.price}
                </Badge>
              )}
              <Button size="sm">Subscribe</Button>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between p-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="gap-1 px-2">
            <Heart className="h-4 w-4" />
            <span>{item.stats.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1 px-2">
            <MessageSquare className="h-4 w-4" />
            <span>{item.stats.comments}</span>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{item.stats.timestamp}</span>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
