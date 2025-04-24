import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, MessageSquare } from "lucide-react"

export function TopFansTable() {
  // Sample data
  const topFans = [
    {
      id: 1,
      name: "Sarah Johnson",
      username: "sarahjcreates",
      avatar: "/placeholder.svg?height=40&width=40",
      subscriptionTier: "Premium",
      spent: "$145.50",
      interactions: 32,
    },
    {
      id: 2,
      name: "Michael Chen",
      username: "michaelchenmusic",
      avatar: "/placeholder.svg?height=40&width=40",
      subscriptionTier: "Collector",
      spent: "$120.25",
      interactions: 28,
    },
    {
      id: 3,
      name: "Emma Wilson",
      username: "emmawilsonart",
      avatar: "/placeholder.svg?height=40&width=40",
      subscriptionTier: "Basic",
      spent: "$85.00",
      interactions: 24,
    },
    {
      id: 4,
      name: "David Kim",
      username: "davidkimdesign",
      avatar: "/placeholder.svg?height=40&width=40",
      subscriptionTier: "Premium",
      spent: "$75.50",
      interactions: 19,
    },
    {
      id: 5,
      name: "Lisa Rodriguez",
      username: "lisarodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      subscriptionTier: "Basic",
      spent: "$45.00",
      interactions: 15,
    },
  ]

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Basic":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "Premium":
        return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
      case "Collector":
        return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left font-medium py-2 px-4">Fan</th>
            <th className="text-left font-medium py-2 px-4">Tier</th>
            <th className="text-right font-medium py-2 px-4">Spent</th>
            <th className="text-right font-medium py-2 px-4">Interactions</th>
            <th className="text-right font-medium py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {topFans.map((fan) => (
            <tr key={fan.id} className="border-b border-border/50 hover:bg-muted/30">
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={fan.avatar} alt={fan.name} />
                    <AvatarFallback>{fan.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{fan.name}</p>
                    <p className="text-xs text-muted-foreground">@{fan.username}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <Badge variant="outline" className={`font-normal ${getTierColor(fan.subscriptionTier)}`}>
                  {fan.subscriptionTier}
                </Badge>
              </td>
              <td className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <DollarSign className="h-3 w-3 text-muted-foreground" />
                  <span>{fan.spent}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <MessageSquare className="h-3 w-3 text-muted-foreground" />
                  <span>{fan.interactions}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-right">
                <Button variant="ghost" size="sm">
                  Message
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
