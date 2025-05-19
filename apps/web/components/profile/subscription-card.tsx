import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface SubscriptionCardProps {
  subscription: {
    id: number
    creator: string
    username: string
    avatar: string
    price: string
    renewsOn: string
    isVerified: boolean
  }
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={subscription.avatar || "/placeholder.svg"} alt={subscription.creator} />
              <AvatarFallback>{subscription.creator.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-medium">{subscription.creator}</span>
                {subscription.isVerified && (
                  <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <p className="text-xs text-muted-foreground">@{subscription.username}</p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
              Subscriber
            </Badge>
            <div className="mt-1 text-xs text-muted-foreground">
              <span>{subscription.price}</span>
              <span className="mx-1">•</span>
              <span>Renews {subscription.renewsOn}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/subscription/${subscription.username}`}>View Content</Link>
          </Button>
          <Button variant="outline" size="sm">
            Manage
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
