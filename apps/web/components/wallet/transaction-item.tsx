import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, Image, CreditCard } from "lucide-react"

interface TransactionItemProps {
  transaction: {
    id: number
    type: string
    amount: string
    to?: string
    from?: string
    title?: string
    date: string
    status: string
  }
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const getTransactionIcon = () => {
    switch (transaction.type) {
      case "sent":
        return <ArrowUpRight className="h-4 w-4 text-red-500" />
      case "received":
        return <ArrowDownRight className="h-4 w-4 text-green-500" />
      case "nft":
        return <Image className="h-4 w-4 text-purple-500" />
      case "subscription":
        return <CreditCard className="h-4 w-4 text-blue-500" />
      default:
        return <ArrowUpRight className="h-4 w-4" />
    }
  }

  const getStatusColor = () => {
    switch (transaction.status) {
      case "confirmed":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
      case "failed":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">{getTransactionIcon()}</div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <p className="font-medium text-sm truncate">
                {transaction.title || (transaction.type === "sent" ? "Sent ETH" : "Received ETH")}
              </p>
              <p className="font-medium text-sm">{transaction.amount}</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground truncate">
                {transaction.to && `To: ${transaction.to}`}
                {transaction.from && `From: ${transaction.from}`}
              </p>
              <p className="text-xs text-muted-foreground">{transaction.date}</p>
            </div>
          </div>

          <Badge variant="outline" className={`text-xs ${getStatusColor()}`}>
            {transaction.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
