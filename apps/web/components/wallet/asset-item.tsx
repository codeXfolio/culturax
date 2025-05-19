import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AssetItemProps {
  asset: {
    id: number
    type: string
    name: string
    symbol?: string
    balance?: string
    usdValue?: string
    icon?: string
    collection?: string
    image?: string
  }
}

export function AssetItem({ asset }: AssetItemProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center overflow-hidden">
            {asset.type === "token" ? (
              <img src={asset.icon || "/placeholder.svg"} alt={asset.name} className="h-6 w-6" />
            ) : (
              <img src={asset.image || "/placeholder.svg"} alt={asset.name} className="h-full w-full object-cover" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div>
                <p className="font-medium text-sm truncate">{asset.name}</p>
                {asset.collection && <p className="text-xs text-muted-foreground">{asset.collection}</p>}
              </div>

              {asset.type === "token" && (
                <div className="text-right">
                  <p className="font-medium text-sm">
                    {asset.balance} {asset.symbol}
                  </p>
                  {asset.usdValue && <p className="text-xs text-muted-foreground">${asset.usdValue}</p>}
                </div>
              )}
            </div>
          </div>

          <Badge variant="outline" className="text-xs">
            {asset.type === "token" ? "Token" : "NFT"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
