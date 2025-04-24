import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface CreatorCardProps {
  creator: {
    id: number
    name: string
    username: string
    avatar: string
    coverImage: string
    category: string
    bio: string
    followers: string
    verified: boolean
    featured?: boolean
  }
  featured?: boolean
}

export function CreatorCard({ creator, featured = false }: CreatorCardProps) {
  return (
    <Card
      className={`overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-lg ${
        featured ? "ring-1 ring-primary/50" : ""
      } dark:border dark:border-white/10 dark:bg-black/20 dark:backdrop-blur-sm dark:shadow-[0_0_10px_rgba(255,255,255,0.05)]`}
    >
      <div className="relative">
        <img
          src={creator.coverImage || "/placeholder.svg"}
          alt={`${creator.name}'s cover`}
          className="w-full h-32 object-cover"
        />
        {featured && <Badge className="absolute top-2 right-2 bg-primary">Featured</Badge>}
        <div className="absolute -bottom-10 left-4">
          <Avatar className="h-20 w-20 border-4 border-background">
            <AvatarImage src={creator.avatar} alt={creator.name} />
            <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <CardContent className="pt-12 pb-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="flex items-center gap-1">
              <Link href={`/subscription/${creator.username}`} className="hover:underline">
                <h3 className="font-bold">{creator.name}</h3>
              </Link>
              {creator.verified && (
                <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <p className="text-sm text-muted-foreground">@{creator.username}</p>
          </div>
          <Badge variant="outline" className="text-xs">
            {creator.category}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{creator.bio}</p>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="font-medium">{creator.followers}</span>
            <span className="text-muted-foreground ml-1">followers</span>
          </div>
          <div>
            <Button size="sm">Follow</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
