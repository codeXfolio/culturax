import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History, Wallet } from "lucide-react";
import { TransactionItem } from "@/components/wallet/transaction-item";
import { useState } from "react";

interface TokenBalance {
  id: number;
  name: string;
  symbol: string;
  balance: string;
  usdValue: string;
  icon: string;
  change: string;
  positive: boolean;
}

interface Transaction {
  id: number;
  type: string;
  amount: string;
  to?: string;
  from?: string;
  date: string;
  status: string;
}

interface WalletOverviewCardProps {
  tokenBalances: TokenBalance[];
  transactions: Transaction[];
}

export function WalletOverviewCard({
  tokenBalances,
  transactions,
}: WalletOverviewCardProps) {
  const [activeTab, setActiveTab] = useState("assets");

  return (
    <Card className="md:col-span-2">
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Wallet Overview</CardTitle>
          <div className="flex space-x-1 rounded-md bg-muted p-1">
            <Button
              variant={activeTab === "assets" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("assets")}
              className="flex items-center gap-1"
            >
              <Wallet className="h-4 w-4" />
              <span>Assets</span>
            </Button>
            <Button
              variant={activeTab === "transactions" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("transactions")}
              className="flex items-center gap-1"
            >
              <History className="h-4 w-4" />
              <span>Transactions</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {activeTab === "assets" && (
          <div className="space-y-4 mt-2">
            {tokenBalances.map((token) => (
              <Card key={token.id} className="overflow-hidden">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="h-10 w-10 rounded-md flex items-center justify-center overflow-hidden mx-auto sm:mx-0">
                      <img
                        src={token.icon || "/placeholder.svg"}
                        alt={token.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 gap-1">
                        <p className="font-medium text-sm sm:text-base">
                          {token.name}
                        </p>
                        <p className="font-medium text-base sm:text-lg">
                          {token.balance} {token.symbol}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <div className="flex items-center gap-2 justify-center sm:justify-start">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              token.positive ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {token.change}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            24h
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                          ${token.usdValue} USD
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "transactions" && (
          <div className="space-y-4 mt-2">
            {transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}

            <Button variant="ghost" className="w-full text-muted-foreground">
              View All Transactions
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
