"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   ArrowLeft,
   Copy,
   ExternalLink,
   RefreshCw,
   Wallet,
   ArrowUpRight,
   ArrowDownRight,
   Send,
   Plus,
   History,
} from "lucide-react";
import Link from "next/link";
import { TransactionItem } from "@/components/wallet/transaction-item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Sidebar } from "../navigation/sidebar";
import MobileNavigation from "../navigation/mobile-navigation";
export function WalletManagerPage() {
   const [copied, setCopied] = useState(false);
   const [refreshing, setRefreshing] = useState(false);
   const [activeTab, setActiveTab] = useState("assets");
   const [transferToken, setTransferToken] = useState("eth");
   const [transferAmount, setTransferAmount] = useState("");
   const [recipientAddress, setRecipientAddress] = useState("");

   // Mock wallet data
   const walletData = {
      address: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
      ensName: "creator.eth",
      avatar: "/placeholder.svg?height=100&width=100",
   };

   // Mock token balances
   const tokenBalances = [
      {
         id: 1,
         name: "Ethereum",
         symbol: "ETH",
         balance: "1.245",
         usdValue: "2,856.45",
         icon: "/placeholder.svg?height=40&width=40",
         change: "+5.2%",
         positive: true,
      },
      {
         id: 2,
         name: "USD Coin",
         symbol: "USDC",
         balance: "150.00",
         usdValue: "150.00",
         icon: "/placeholder.svg?height=40&width=40",
         change: "+0.1%",
         positive: true,
      },
      {
         id: 3,
         name: "CreatorX Token",
         symbol: "CX",
         balance: "500.00",
         usdValue: "750.00",
         icon: "/placeholder.svg?height=40&width=40",
         change: "-2.5%",
         positive: false,
      },
   ];

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
         type: "sent",
         amount: "50 CX",
         to: "0x9c8...4f2d",
         date: "Apr 2, 2025",
         status: "confirmed",
      },
      {
         id: 4,
         type: "received",
         amount: "100 USDC",
         from: "0x5d6...7e8f",
         date: "Apr 1, 2025",
         status: "confirmed",
      },
      {
         id: 5,
         type: "sent",
         amount: "25 CX",
         to: "0x2f4...9e3a",
         date: "Mar 28, 2025",
         status: "confirmed",
      },
   ];

   const handleCopyAddress = () => {
      navigator.clipboard.writeText(walletData.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   const handleRefresh = () => {
      setRefreshing(true);
      setTimeout(() => setRefreshing(false), 1500);
   };

   const handleTransfer = () => {
      // In a real app, this would connect to a wallet and execute the transfer
      console.log(
         `Transferring ${transferAmount} ${transferToken.toUpperCase()} to ${recipientAddress}`
      );
      // Reset form
      setTransferAmount("");
      setRecipientAddress("");
   };

   return (
      <div className="min-h-screen bg-background">
         <div className="flex pt-16">
            {/* Sidebar Navigation */}
            <div className="hidden md:block">
               <Sidebar />
            </div>

            <main className="container pt-8 md:pt-24 pb-16 w-full md:max-w-5xl">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Wallet Info */}
                  <Card className="md:col-span-1">
                     <CardHeader className="pb-2">
                        <CardTitle>Wallet</CardTitle>
                        <CardDescription>
                           Manage your Web3 wallet
                        </CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-6">
                        <div className="flex flex-col items-center text-center">
                           <Avatar className="h-16 w-16 mb-2">
                              <AvatarImage
                                 src={walletData.avatar}
                                 alt="ENS Avatar"
                              />
                              <AvatarFallback>
                                 <Wallet className="h-6 w-6" />
                              </AvatarFallback>
                           </Avatar>
                           <h3 className="font-medium">{walletData.ensName}</h3>
                           <div className="flex items-center gap-1 mt-1">
                              <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                                 {walletData.address.substring(0, 6)}...
                                 {walletData.address.substring(
                                    walletData.address.length - 4
                                 )}
                              </span>
                              <Button
                                 variant="ghost"
                                 size="icon"
                                 className="h-6 w-6"
                                 onClick={handleCopyAddress}
                              >
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
                              <Button
                                 variant="ghost"
                                 size="icon"
                                 className="h-6 w-6"
                                 asChild
                              >
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

                        <div className="space-y-2">
                           <Button
                              variant="outline"
                              className="w-full gap-2"
                              onClick={handleRefresh}
                           >
                              <RefreshCw
                                 className={`h-4 w-4 ${
                                    refreshing ? "animate-spin" : ""
                                 }`}
                              />
                              Refresh Balances
                           </Button>

                           <Dialog>
                              <DialogTrigger asChild>
                                 <Button className="w-full gap-2">
                                    <Send className="h-4 w-4" />
                                    Transfer Tokens
                                 </Button>
                              </DialogTrigger>
                              <DialogContent>
                                 <DialogHeader>
                                    <DialogTitle>Transfer Tokens</DialogTitle>
                                    <DialogDescription>
                                       Send tokens to another wallet address.
                                    </DialogDescription>
                                 </DialogHeader>
                                 <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                       <Label htmlFor="token">Token</Label>
                                       <Select
                                          value={transferToken}
                                          onValueChange={setTransferToken}
                                       >
                                          <SelectTrigger>
                                             <SelectValue placeholder="Select token" />
                                          </SelectTrigger>
                                          <SelectContent>
                                             <SelectItem value="eth">
                                                ETH
                                             </SelectItem>
                                             <SelectItem value="usdc">
                                                USDC
                                             </SelectItem>
                                             <SelectItem value="cx">
                                                CX
                                             </SelectItem>
                                          </SelectContent>
                                       </Select>
                                    </div>
                                    <div className="space-y-2">
                                       <Label htmlFor="amount">Amount</Label>
                                       <Input
                                          id="amount"
                                          type="number"
                                          placeholder="0.00"
                                          value={transferAmount}
                                          onChange={(e) =>
                                             setTransferAmount(e.target.value)
                                          }
                                       />
                                    </div>
                                    <div className="space-y-2">
                                       <Label htmlFor="recipient">
                                          Recipient Address
                                       </Label>
                                       <Input
                                          id="recipient"
                                          placeholder="0x..."
                                          value={recipientAddress}
                                          onChange={(e) =>
                                             setRecipientAddress(e.target.value)
                                          }
                                       />
                                    </div>
                                 </div>
                                 <DialogFooter>
                                    <Button
                                       onClick={handleTransfer}
                                       disabled={
                                          !transferAmount || !recipientAddress
                                       }
                                    >
                                       Transfer
                                    </Button>
                                 </DialogFooter>
                              </DialogContent>
                           </Dialog>

                           <Button
                              variant="outline"
                              className="w-full gap-2"
                              asChild
                           >
                              <Link href="/wallet-manager/receive">
                                 <ArrowDownRight className="h-4 w-4" />
                                 Receive
                              </Link>
                           </Button>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Tokens and Transactions */}
                  <Card className="md:col-span-2">
                     <CardHeader className="pb-2">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                           <CardTitle>Wallet Overview</CardTitle>
                           <div className="flex space-x-1 rounded-md bg-muted p-1">
                              <Button
                                 variant={
                                    activeTab === "assets" ? "default" : "ghost"
                                 }
                                 size="sm"
                                 onClick={() => setActiveTab("assets")}
                                 className="flex items-center gap-1"
                              >
                                 <Wallet className="h-4 w-4" />
                                 <span>Assets</span>
                              </Button>
                              <Button
                                 variant={
                                    activeTab === "transactions"
                                       ? "default"
                                       : "ghost"
                                 }
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
                                 <Card
                                    key={token.id}
                                    className="overflow-hidden"
                                 >
                                    <CardContent className="p-3 sm:p-4">
                                       <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                          <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center overflow-hidden mx-auto sm:mx-0">
                                             <img
                                                src={
                                                   token.icon ||
                                                   "/placeholder.svg"
                                                }
                                                alt={token.name}
                                                className="h-6 w-6"
                                             />
                                          </div>
                                          <div className="flex-1 min-w-0 text-center sm:text-left">
                                             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 gap-1">
                                                <p className="font-medium text-sm sm:text-base">
                                                   {token.name}
                                                </p>
                                                <p className="font-medium text-base sm:text-lg">
                                                   {token.balance}{" "}
                                                   {token.symbol}
                                                </p>
                                             </div>
                                             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                                <div className="flex items-center gap-2 justify-center sm:justify-start">
                                                   <Badge
                                                      variant="outline"
                                                      className={`text-xs ${
                                                         token.positive
                                                            ? "text-green-500"
                                                            : "text-red-500"
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
                                          <div className="flex gap-1 justify-center sm:justify-end">
                                             <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                asChild
                                             >
                                                <Link href="/wallet-manager/receive">
                                                   <ArrowDownRight className="h-4 w-4" />
                                                </Link>
                                             </Button>
                                             <Dialog>
                                                <DialogTrigger asChild>
                                                   <Button
                                                      variant="outline"
                                                      size="icon"
                                                      className="h-8 w-8"
                                                   >
                                                      <ArrowUpRight className="h-4 w-4" />
                                                   </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                   <DialogHeader>
                                                      <DialogTitle>
                                                         Transfer {token.symbol}
                                                      </DialogTitle>
                                                      <DialogDescription>
                                                         Send {token.symbol} to
                                                         another wallet address.
                                                      </DialogDescription>
                                                   </DialogHeader>
                                                   <div className="space-y-4 py-4">
                                                      <div className="space-y-2">
                                                         <Label htmlFor="amount">
                                                            Amount
                                                         </Label>
                                                         <Input
                                                            id="amount"
                                                            type="number"
                                                            placeholder="0.00"
                                                            value={
                                                               transferAmount
                                                            }
                                                            onChange={(e) =>
                                                               setTransferAmount(
                                                                  e.target.value
                                                               )
                                                            }
                                                         />
                                                         <p className="text-xs text-muted-foreground">
                                                            Available:{" "}
                                                            {token.balance}{" "}
                                                            {token.symbol}
                                                         </p>
                                                      </div>
                                                      <div className="space-y-2">
                                                         <Label htmlFor="recipient">
                                                            Recipient Address
                                                         </Label>
                                                         <Input
                                                            id="recipient"
                                                            placeholder="0x..."
                                                            value={
                                                               recipientAddress
                                                            }
                                                            onChange={(e) =>
                                                               setRecipientAddress(
                                                                  e.target.value
                                                               )
                                                            }
                                                         />
                                                      </div>
                                                   </div>
                                                   <DialogFooter>
                                                      <Button
                                                         onClick={
                                                            handleTransfer
                                                         }
                                                         disabled={
                                                            !transferAmount ||
                                                            !recipientAddress
                                                         }
                                                      >
                                                         Transfer
                                                      </Button>
                                                   </DialogFooter>
                                                </DialogContent>
                                             </Dialog>
                                          </div>
                                       </div>
                                    </CardContent>
                                 </Card>
                              ))}

                              <Button
                                 variant="outline"
                                 className="w-full gap-2"
                              >
                                 <Plus className="h-4 w-4" />
                                 Add Custom Token
                              </Button>
                           </div>
                        )}

                        {activeTab === "transactions" && (
                           <div className="space-y-4 mt-2">
                              {transactions.map((transaction) => (
                                 <TransactionItem
                                    key={transaction.id}
                                    transaction={transaction}
                                 />
                              ))}

                              <Button
                                 variant="ghost"
                                 className="w-full text-muted-foreground"
                              >
                                 View All Transactions
                              </Button>
                           </div>
                        )}
                     </CardContent>
                  </Card>
               </div>
            </main>
         </div>
         <MobileNavigation />
      </div>
   );
}
