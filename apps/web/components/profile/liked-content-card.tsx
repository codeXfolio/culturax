import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface LikedContentCardProps {
  content: {
    id: number
    title: string
    creator: string
    username: string
    avatar: string
    image: string
    type: string
    likedOn: string
  }
}

export function LikedContentCard({ content }: LikedContentCardProps) {
  return (
    <Card className="overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="relative h-40 bg-muted/50">
        <img src={content.image || "/placeholder.svg"} alt={content.title} className="w-full h-full object-cover" />
        <Badge className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm">{content.type}</Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium mb-2 line-clamp-1">{content.title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={content.avatar} alt={content.creator} />
              <AvatarFallback>{content.creator.charAt(0)}</AvatarFallback>
            </Avatar>
            <Link
              href={`/subscription/${content.username}`}
              className="text-sm text-muted-foreground hover:text-primary truncate max-w-[100px]"
            >
              {content.creator}
            </Link>
          </div>
          <span className="text-xs text-muted-foreground">{content.likedOn}</span>
        </div>
      </CardContent>
    </Card>
  )
}
