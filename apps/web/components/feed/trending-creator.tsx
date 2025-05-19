import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface TrendingCreatorProps {
  creator: {
    name: string
    username: string
    avatar: string
    category: string
    followers: string
  }
}

export function TrendingCreator({ creator }: TrendingCreatorProps) {
  return (
    <div className="flex items-center justify-between">
      <Link href={`/creator/${creator.username}`} className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={creator.avatar} alt={creator.name} />
          <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{creator.name}</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>{creator.category}</span>
            <span>•</span>
            <span>{creator.followers} followers</span>
          </div>
        </div>
      </Link>
      <Button variant="ghost" size="sm" className="h-7 text-xs">
        Follow
      </Button>
    </div>
  )
}
