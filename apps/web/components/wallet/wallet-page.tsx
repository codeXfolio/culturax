"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"
import { ArrowLeft, Copy, ExternalLink, RefreshCw, Wallet, LogOut, ArrowUpRight, ArrowDownRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { TransactionItem } from "@/components/wallet/transaction-item"
import { AssetItem } from "@/components/wallet/asset-item"

export function WalletPage() {
  const [copied, setCopied] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  // Mock wallet data
  const walletData = {
    address: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
    ensName: "creator.eth",
    avatar: "/placeholder.svg?height=100&width=100",
    balance: "1.245",
    usdValue: "2,856.45",
  }

  // Mock transaction data
  const transactions = [
    {
      id: 1,
      type: "sent",
      amount: "0.125 ETH",
      to: "0x3a2...8f9d",
      date: "Today, 2:45 PM",
      status: "confirmed",
    },
    {
      id: 2,
      type: "received",
      amount: "0.5 ETH",
      from: "0x7b4...2e1c",
      date: "Yesterday, 10:30 AM",
      status: "confirmed",
    },
    {
      id: 3,
      type: "nft",
      title: "Digital Art #123",
      amount: "0.25 ETH",
      to: "0x9c8...4f2d",
      date: "Apr 2, 2025",
      status: "confirmed",
    },
    {
      id: 4,
      type: "subscription",
      title: "Monthly Creator Subscription",
      amount: "0.05 ETH",
      to: "0x5d6...7e8f",
      date: "Apr 1, 2025",
      status: "confirmed",
    },
  ]

  // Mock assets data
  const assets = [
    {
      id: 1,
      type: "token",
      name: "Ethereum",
      symbol: "ETH",
      balance: "1.245",
      usdValue: "2,856.45",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      type: "token",
      name: "USD Coin",
      symbol: "USDC",
      balance: "150.00",
      usdValue: "150.00",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      type: "nft",
      name: "Digital Art Collection #1",
      collection: "CreatorX Originals",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      type: "nft",
      name: "Exclusive Music NFT",
      collection: "Audio Collectibles",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletData.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 backdrop-blur-sm fixed top-0 w-full z-50 bg-background/80">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/profile">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <span className="font-bold text-xl">Wallet</span>
          </div>
          <ModeToggle />
        </div>
      </header>

      <main className="container pt-24 pb-16 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Wallet Info */}
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>Wallet</CardTitle>
              <CardDescription>Manage your Web3 wallet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-16 w-16 mb-2">
                  <AvatarImage src={walletData.avatar} alt="ENS Avatar" />
                  <AvatarFallback>
                    <Wallet className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-medium">{walletData.ensName}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                    {walletData.address.substring(0, 6)}...{walletData.address.substring(walletData.address.length - 4)}
                  </span>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCopyAddress}>
                    {copied ? (
                      <svg
                        className="h-3 w-3 text-green-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
                    <a
                      href={`https://etherscan.io/address/${walletData.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Balance</p>
                <p className="text-2xl font-bold">{walletData.balance} ETH</p>
                <p className="text-sm text-muted-foreground">${walletData.usdValue} USD</p>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 gap-1" asChild>
                  <Link href="/wallet/send">
                    <ArrowUpRight className="h-4 w-4" />
                    Send
                  </Link>
                </Button>
                <Button className="flex-1 gap-1" variant="outline" asChild>
                  <Link href="/wallet/receive">
                    <ArrowDownRight className="h-4 w-4" />
                    Receive
                  </Link>
                </Button>
              </div>

              <div className="space-y-2">
                <Button variant="outline" className="w-full gap-2" onClick={handleRefresh}>
                  <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2 text-destructive border-destructive/20 hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4" />
                  Disconnect
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transactions and Assets */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <Tabs defaultValue="transactions" className="w-full">
                <div className="flex items-center justify-between">
                  <CardTitle>Activity</CardTitle>
                  <TabsList>
                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
                    <TabsTrigger value="assets">Assets</TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="transactions" className="w-full">
                <TabsContent value="transactions" className="space-y-4">
                  {transactions.map((transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                  ))}

                  <Button variant="ghost" className="w-full text-muted-foreground">
                    View All Transactions
                  </Button>
                </TabsContent>

                <TabsContent value="assets" className="space-y-4">
                  {assets.map((asset) => (
                    <AssetItem key={asset.id} asset={asset} />
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
