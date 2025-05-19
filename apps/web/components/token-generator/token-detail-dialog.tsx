import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, ExternalLink, Edit, BarChart3, Settings } from "lucide-react"

interface TokenDetailDialogProps {
  token: {
    id: string
    name: string
    symbol: string
    description: string
    supply: number
    price: number
    category: string
    transferable: boolean
    accessLevel: number
    created: string
    holders: number
    image: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TokenDetailDialog({ token, open, onOpenChange }: TokenDetailDialogProps) {
  const getAccessLevelLabel = (level: number) => {
    switch (level) {
      case 1:
        return "Basic Access"
      case 2:
        return "Standard Access"
      case 3:
        return "Enhanced Access"
      case 4:
        return "Premium Access"
      case 5:
        return "VIP Access"
      default:
        return "Basic Access"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {token.name}
            <Badge variant="outline">{token.symbol}</Badge>
          </DialogTitle>
          <DialogDescription>{token.description}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Total Supply</p>
                <p className="font-medium">{token.supply.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Price</p>
                <p className="font-medium">{token.price} ETH</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Category</p>
                <p className="font-medium">{token.category.charAt(0).toUpperCase() + token.category.slice(1)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Transferable</p>
                <p className="font-medium">{token.transferable ? "Yes" : "No"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Access Level</p>
                <p className="font-medium">{getAccessLevelLabel(token.accessLevel)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Created</p>
                <p className="font-medium">{new Date(token.created).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm">Holders</p>
                <p className="text-sm font-medium">
                  {token.holders.toLocaleString()} / {token.supply.toLocaleString()}
                </p>
              </div>
              <Progress value={(token.holders / token.supply) * 100} className="h-2" />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Explorer
              </Button>
              <Button size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Token
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Distribution Stats</h3>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </div>

            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm">Top Holders</p>
                  <Badge variant="outline" className="text-xs">
                    Top 5
                  </Badge>
                </div>
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-3 w-3 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="text-xs">User{i + 1}</p>
                          <p className="text-xs font-medium">{Math.floor(Math.random() * 500) + 100} tokens</p>
                        </div>
                        <Progress value={Math.random() * 30 + 10} className="h-1 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-xs text-muted-foreground">Circulating Supply</p>
                  <p className="text-lg font-medium">{token.holders.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    {((token.holders / token.supply) * 100).toFixed(1)}% of total
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-xs text-muted-foreground">Reserved</p>
                  <p className="text-lg font-medium">{(token.supply - token.holders).toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    {(((token.supply - token.holders) / token.supply) * 100).toFixed(1)}% of total
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Token Settings</h3>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Advanced Settings
              </Button>
            </div>

            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Access Control</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Configure what content and features this token grants access to.
                </p>
                <Button variant="outline" className="w-full">
                  Manage Access Settings
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Distribution Settings</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Configure how tokens are distributed and sold to fans.
                </p>
                <Button variant="outline" className="w-full">
                  Manage Distribution
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Token Metadata</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Update token metadata including name, symbol, and description.
                </p>
                <Button variant="outline" className="w-full">
                  Edit Metadata
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
