"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Download, ArrowUpRight, Calendar, Filter, Clipboard } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function CreatorEarnings() {
  const [dateRange, setDateRange] = useState("30days")

  // Sample data for charts
  const monthlyEarnings = [
    { name: "Jan", subscriptions: 1200, nftSales: 800 },
    { name: "Feb", subscriptions: 1350, nftSales: 950 },
    { name: "Mar", subscriptions: 1500, nftSales: 1200 },
    { name: "Apr", subscriptions: 1650, nftSales: 1100 },
    { name: "May", subscriptions: 1800, nftSales: 1500 },
    { name: "Jun", subscriptions: 2000, nftSales: 1300 },
  ]

  // Sample transactions
  const transactions = [
    {
      id: 1,
      type: "subscription",
      amount: "$9.99",
      from: "Sarah Johnson",
      fromUsername: "sarahjcreates",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "Today, 2:45 PM",
      status: "completed",
    },
    {
      id: 2,
      type: "nft",
      amount: "$250.00",
      from: "Michael Chen",
      fromUsername: "michaelchenmusic",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "Yesterday, 10:30 AM",
      status: "completed",
      item: "Digital Dreamscape #42",
    },
    {
      id: 3,
      type: "royalty",
      amount: "$25.00",
      from: "NFT Marketplace",
      date: "Apr 2, 2025",
      status: "completed",
      item: "Neon Future #15",
    },
    {
      id: 4,
      type: "subscription",
      amount: "$9.99",
      from: "Emma Wilson",
      fromUsername: "emmawilsonart",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "Apr 1, 2025",
      status: "completed",
    },
    {
      id: 5,
      type: "payout",
      amount: "$1,250.00",
      to: "Your Wallet",
      date: "Mar 31, 2025",
      status: "completed",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Earnings Overview */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Earnings Overview</CardTitle>
              <CardDescription>Summary of your creator earnings</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="alltime">All Time</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total Earnings</span>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold">$9,400.00</div>
              <div className="flex items-center text-xs text-green-500 mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+15.3% from last period</span>
              </div>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Subscription Revenue</span>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold">$5,400.00</div>
              <div className="flex items-center text-xs text-green-500 mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+8.7% from last period</span>
              </div>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">NFT Revenue</span>
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold">$4,000.00</div>
              <div className="flex items-center text-xs text-green-500 mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+24.5% from last period</span>
              </div>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyEarnings} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                <Legend />
                <Bar dataKey="subscriptions" name="Subscription Revenue" fill="#8b5cf6" />
                <Bar dataKey="nftSales" name="NFT Sales" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Latest Paid Subscribers & Transactions */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Latest Paid Subscribers */}
        <Card>
          <CardHeader>
            <CardTitle>Latest Paid Subscribers</CardTitle>
            <CardDescription>Your most recent subscription payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Sarah Johnson",
                  username: "sarahjcreates",
                  avatar: "/placeholder.svg?height=40&width=40",
                  amount: "$9.99",
                  date: "Today, 2:45 PM",
                  isNew: true,
                },
                {
                  name: "Michael Chen",
                  username: "michaelchenmusic",
                  avatar: "/placeholder.svg?height=40&width=40",
                  amount: "$9.99",
                  date: "Yesterday, 10:30 AM",
                  isNew: false,
                },
                {
                  name: "Emma Wilson",
                  username: "emmawilsonart",
                  avatar: "/placeholder.svg?height=40&width=40",
                  amount: "$9.99",
                  date: "Apr 2, 2025",
                  isNew: true,
                },
                {
                  name: "David Rodriguez",
                  username: "davidrodmusic",
                  avatar: "/placeholder.svg?height=40&width=40",
                  amount: "$9.99",
                  date: "Apr 1, 2025",
                  isNew: false,
                },
                {
                  name: "Olivia Taylor",
                  username: "oliviataylor",
                  avatar: "/placeholder.svg?height=40&width=40",
                  amount: "$9.99",
                  date: "Mar 30, 2025",
                  isNew: false,
                },
              ].map((subscriber, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border/50 rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img
                        src={subscriber.avatar || "/placeholder.svg"}
                        alt={subscriber.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{subscriber.name}</p>
                        {subscriber.isNew && (
                          <Badge variant="outline" className="bg-green-500/10 text-green-500">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">@{subscriber.username}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                        Subscriber
                      </Badge>
                      <p className="font-medium text-green-500">{subscriber.amount}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{subscriber.date}</p>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-muted-foreground">
                View All Subscribers
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest earnings and payouts</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-3 w-3" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 border border-border/50 rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        transaction.type === "subscription"
                          ? "bg-purple-500/10 text-purple-500"
                          : transaction.type === "nft"
                            ? "bg-blue-500/10 text-blue-500"
                            : transaction.type === "royalty"
                              ? "bg-green-500/10 text-green-500"
                              : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {transaction.type === "subscription" ? (
                        <Users className="h-5 w-5" />
                      ) : transaction.type === "nft" ? (
                        <ImageIcon className="h-5 w-5" />
                      ) : transaction.type === "royalty" ? (
                        <DollarSign className="h-5 w-5" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">
                          {transaction.type === "subscription"
                            ? "Subscription"
                            : transaction.type === "nft"
                              ? "NFT Sale"
                              : transaction.type === "royalty"
                                ? "NFT Royalty"
                                : "Payout"}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {transaction.from
                          ? `From: ${transaction.from}`
                          : transaction.to
                            ? `To: ${transaction.to}`
                            : transaction.item
                              ? `Item: ${transaction.item}`
                              : ""}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${transaction.type === "payout" ? "text-red-500" : "text-green-500"}`}>
                      {transaction.type === "payout" ? `-${transaction.amount}` : transaction.amount}
                    </p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
              ))}

              <Button variant="ghost" className="w-full text-muted-foreground">
                View All Transactions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payout History & Settings */}
      <Card>
        <CardHeader>
          <Tabs defaultValue="history">
            <div className="flex items-center justify-between">
              <CardTitle>Payouts</CardTitle>
              <TabsList>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="history">
            <TabsContent value="history" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Available for Payout</h3>
                  <p className="text-2xl font-bold">$1,856.45</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Request Payout</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Request Payout</DialogTitle>
                      <DialogDescription>Choose a wallet address to receive your payout of $1,856.45</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="wallet-address">Wallet Address</Label>
                        <Select defaultValue="connected">
                          <SelectTrigger>
                            <SelectValue placeholder="Select wallet address" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="connected">Connected Wallet (0x1a2b...8f9d)</SelectItem>
                            <SelectItem value="manual">Enter Manually</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="manual-address">Manual Address Input</Label>
                        <div className="flex gap-2">
                          <Input id="manual-address" placeholder="Enter wallet address (0x...)" />
                          <Button variant="outline" size="icon">
                            <Clipboard className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Please double-check the address before confirming
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="payout-amount">Amount</Label>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">$</span>
                          <Input id="payout-amount" defaultValue="1,856.45" />
                          <Button variant="outline" size="sm">
                            Max
                          </Button>
                        </div>
                      </div>

                      <div className="rounded-md bg-muted p-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Network Fee:</span>
                          <span>~$2.50</span>
                        </div>
                        <div className="flex justify-between text-sm font-medium">
                          <span>You will receive:</span>
                          <span>$1,853.95</span>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" className="w-full sm:w-auto">
                        Cancel
                      </Button>
                      <Button className="w-full sm:w-auto">Confirm Payout</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="border border-border rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left font-medium py-3 px-4">Date</th>
                      <th className="text-left font-medium py-3 px-4">Amount</th>
                      <th className="text-left font-medium py-3 px-4">Method</th>
                      <th className="text-right font-medium py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4">Mar 31, 2025</td>
                      <td className="py-3 px-4">$1,250.00</td>
                      <td className="py-3 px-4">ETH Wallet</td>
                      <td className="py-3 px-4 text-right">
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">
                          Completed
                        </Badge>
                      </td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4">Feb 28, 2025</td>
                      <td className="py-3 px-4">$980.00</td>
                      <td className="py-3 px-4">ETH Wallet</td>
                      <td className="py-3 px-4 text-right">
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">
                          Completed
                        </Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Jan 31, 2025</td>
                      <td className="py-3 px-4">$750.00</td>
                      <td className="py-3 px-4">ETH Wallet</td>
                      <td className="py-3 px-4 text-right">
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">
                          Completed
                        </Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <div className="p-4 border border-border rounded-md bg-muted/30">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Current Payout Schedule</h3>
                    <p className="text-sm text-muted-foreground">Monthly (Last day of each month)</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Next Payout Date</p>
                    <p className="text-sm text-muted-foreground">April 30, 2025</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Estimated Amount</p>
                    <p className="text-sm text-muted-foreground">$1,856.45 (current balance)</p>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-border rounded-md">
                <h3 className="font-medium mb-3">Payout Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Payout Method</p>
                      <p className="text-sm text-muted-foreground">ETH Wallet (0x1a2b...8f9d)</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Minimum Payout</p>
                      <p className="text-sm text-muted-foreground">$50.00</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Payout Schedule</p>
                      <p className="text-sm text-muted-foreground">Monthly</p>
                    </div>
                    <Select defaultValue="monthly">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select schedule" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper component for the Users icon
function Users({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

// Helper component for the ImageIcon
function ImageIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  )
}
