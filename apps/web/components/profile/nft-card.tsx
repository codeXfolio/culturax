import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface NftCardProps {
  nft: {
    id: number
    name: string
    creator: string
    creatorUsername: string
    image: string
    acquired: string
  }
}

export function NftCard({ nft }: NftCardProps) {
  return (
    <Card className="overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-square bg-muted/50">
        <img src={nft.image || "/placeholder.svg"} alt={nft.name} className="w-full h-full object-cover" />
        <Badge className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm">NFT</Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium mb-1">{nft.name}</h3>
        <div className="flex items-center justify-between">
          <Link
            href={`/subscription/${nft.creatorUsername}`}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            By {nft.creator}
          </Link>
          <span className="text-xs text-muted-foreground">{nft.acquired}</span>
        </div>
      </CardContent>
    </Card>
  )
}
