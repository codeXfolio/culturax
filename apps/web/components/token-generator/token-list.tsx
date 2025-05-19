"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { TokenDetailDialog } from "@/components/token-generator/token-detail-dialog"
import { Search, Filter, Sparkles, Users, Lock, Calendar, ShoppingBag, Zap } from "lucide-react"

// Sample token data
const sampleTokens = [
  {
    id: "1",
    name: "Premium Content Pass",
    symbol: "PCP",
    description: "Access to exclusive premium content including tutorials, behind-the-scenes, and early releases.",
    supply: 5000,
    price: 0.05,
    category: "content",
    transferable: true,
    accessLevel: 3,
    created: "2023-09-15",
    holders: 1243,
    image: "/digital-token.png",
  },
  {
    id: "2",
    name: "VIP Community Token",
    symbol: "VCT",
    description: "Membership to the VIP community with direct access to the creator and exclusive community events.",
    supply: 1000,
    price: 0.1,
    category: "community",
    transferable: true,
    accessLevel: 4,
    created: "2023-10-22",
    holders: 876,
    image: "/diverse-community-gathering.png",
  },
  {
    id: "3",
    name: "Event Access Token",
    symbol: "EAT",
    description: "Access to exclusive online and in-person events, meetups, and workshops.",
    supply: 2500,
    price: 0.08,
    category: "events",
    transferable: false,
    accessLevel: 3,
    created: "2023-11-05",
    holders: 1567,
    image: "/community-event.png",
  },
  {
    id: "4",
    name: "Merch Discount Token",
    symbol: "MDT",
    description: "Special discounts and early access to limited edition merchandise and collectibles.",
    supply: 3000,
    price: 0.03,
    category: "merchandise",
    transferable: true,
    accessLevel: 2,
    created: "2023-12-18",
    holders: 2134,
    image: "/generic-merchandise.png",
  },
  {
    id: "5",
    name: "Creator Utility Token",
    symbol: "CUT",
    description: "Multi-purpose utility token for the creator ecosystem with various benefits and uses.",
    supply: 10000,
    price: 0.02,
    category: "utility",
    transferable: true,
    accessLevel: 1,
    created: "2024-01-10",
    holders: 4532,
    image: "/utility-tools.png",
  },
]

export function TokenList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedToken, setSelectedToken] = useState<(typeof sampleTokens)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "content":
        return <Lock className="h-4 w-4" />
      case "community":
        return <Users className="h-4 w-4" />
      case "events":
        return <Calendar className="h-4 w-4" />
      case "merchandise":
        return <ShoppingBag className="h-4 w-4" />
      case "utility":
        return <Zap className="h-4 w-4" />
      default:
        return <Sparkles className="h-4 w-4" />
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "content":
        return "Content Access"
      case "community":
        return "Community"
      case "events":
        return "Events"
      case "merchandise":
        return "Merchandise"
      case "utility":
        return "Utility"
      default:
        return "General"
    }
  }

  const filteredTokens = sampleTokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleTokenClick = (token: (typeof sampleTokens)[0]) => {
    setSelectedToken(token)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tokens..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {filteredTokens.length > 0 ? (
          filteredTokens.map((token) => (
            <div
              key={token.id}
              className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => handleTokenClick(token)}
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium truncate">{token.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {token.symbol}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground truncate">{token.description}</p>
              </div>

              <div className="hidden sm:flex flex-col items-end gap-1">
                <Badge variant="secondary" className="flex items-center gap-1">
                  {getCategoryIcon(token.category)}
                  {getCategoryLabel(token.category)}
                </Badge>
                <span className="text-xs text-muted-foreground">{token.holders.toLocaleString()} holders</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No tokens found matching your search.</p>
          </div>
        )}
      </div>

      {selectedToken && <TokenDetailDialog token={selectedToken} open={isDialogOpen} onOpenChange={setIsDialogOpen} />}
    </div>
  )
}
