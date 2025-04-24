import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HighlightedCreatorProps {
  name: string
  username: string
  category: string
  followers: string
  bio: string
  avatarUrl: string
  coverUrl: string
  verified: boolean
}

export function HighlightedCreator({
  name,
  username,
  category,
  followers,
  bio,
  avatarUrl,
  coverUrl,
  verified,
}: HighlightedCreatorProps) {
  return (
    <Card className="overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl group">
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-30 blur-sm transition-opacity"></div>
        <div className="relative">
          {/* Cover Image */}
          <div className="h-32 overflow-hidden">
            <img
              src={coverUrl || "/placeholder.svg"}
              alt={`${name}'s cover`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Avatar */}
          <div className="absolute -bottom-10 left-4">
            <Avatar className="h-20 w-20 border-4 border-background">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>

          {/* Category Badge */}
          <Badge className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm">{category}</Badge>
        </div>
      </div>

      <CardContent className="pt-12 pb-4">
        <div className="mb-3">
          <div className="flex items-center gap-1">
            <h3 className="font-bold text-lg">{name}</h3>
            {verified && (
              <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <p className="text-sm text-muted-foreground">@{username}</p>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{bio}</p>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="font-medium">{followers}</span>
            <span className="text-muted-foreground ml-1">followers</span>
          </div>
          <Button size="sm" asChild>
            <Link href={`/subscription/${username}`}>View Profile</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
