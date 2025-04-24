import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Lock, Sparkles } from "lucide-react"

interface NftPreviewProps {
  nftData: {
    title: string
    description: string
    image: string | null
    price: string
    royalty: string
    supply: string
    standard: string
    hasUnlockable: boolean
  }
}

export function NftPreview({ nftData }: NftPreviewProps) {
  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <div className="relative aspect-square bg-muted/50 flex items-center justify-center">
        {nftData.image ? (
          <img
            src={nftData.image || "/placeholder.svg"}
            alt={nftData.title || "NFT Preview"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <Sparkles className="h-12 w-12 mb-2" />
            <p className="text-sm font-medium">NFT Preview</p>
          </div>
        )}

        <Badge variant="secondary" className="absolute top-3 right-3">
          {nftData.standard}
        </Badge>

        {nftData.hasUnlockable && (
          <Badge className="absolute bottom-3 right-3 bg-primary/90 hover:bg-primary flex items-center gap-1">
            <Lock className="h-3 w-3" />
            <span>Unlockable</span>
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-1">{nftData.title || "Untitled NFT"}</h3>
        <div className="flex items-center gap-2 mb-3">
          <Avatar className="h-6 w-6">
            <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Creator" />
            <AvatarFallback>CR</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">Your Name</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
          {nftData.description || "No description provided."}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Price</p>
            <p className="font-medium">{nftData.price ? `${nftData.price} ETH` : "Not set"}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Supply</p>
            <p className="font-medium">{nftData.standard === "ERC-721" ? "1 of 1" : `${nftData.supply || "1"}`}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full w-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
        </div>
      </CardFooter>
    </Card>
  )
}
