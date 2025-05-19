import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import {
   ArrowDownRight,
   Copy,
   ExternalLink,
   RefreshCw,
   Send,
} from "lucide-react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { Dispatch, SetStateAction, useState } from "react";
import { useToast } from "../ui/use-toast";
import { TransactionService } from "@/lib/transaction";
import { NexusClient, SessionData } from "@biconomy/abstractjs";
import { parseEther, parseUnits, stringify } from "viem";
import { AA_CONFIG } from "@/context/config";
import { soneiumMinato } from "viem/chains";
import { StartaleAccountClient } from "startale-aa-sdk";
import { SmartSession } from "@/lib/session";
import { toFunctionSelector } from "viem";

interface WalletInfoCardProps {
   walletData: {
      address: string;
      ensName: string;
   };
   onRefresh: () => void;
   refreshing: boolean;
   startaleClient: StartaleAccountClient;
}

export function WalletInfoCard({
   walletData,
   onRefresh,
   refreshing,
   startaleClient,
}: WalletInfoCardProps) {
   const [copied, setCopied] = useState(false);
   const [transferToken, setTransferToken] = useState("eth");
   const [transferAmount, setTransferAmount] = useState("");
   const [recipientAddress, setRecipientAddress] = useState("");
   const [dialogOpen, setDialogOpen] = useState(false);
   const [completionDialogOpen, setCompletionDialogOpen] = useState(false);
   const [isTransferring, setIsTransferring] = useState(false);
   const [txHash, setTxHash] = useState<string>("");
   const [qrDialogOpen, setQrDialogOpen] = useState(false);

   const handleCopyAddress = () => {
      navigator.clipboard.writeText(walletData.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   const handleTransfer = async () => {
      try {
         setIsTransferring(true);

         let activeSession: SessionData | null = null;

         if (!localStorage.getItem("walletSessionData")) {
            const session = new SmartSession(
               startaleClient as unknown as StartaleAccountClient
            );
            const sessionData = await session.createSession([
               {
                  contractAddress: AA_CONFIG.USDC_ADDRESS,
                  functionSelector: toFunctionSelector(
                     "transfer(address,uint256)"
                  ),
                  sudo: true,
               },
               {
                  contractAddress: AA_CONFIG.CULTURA_X_ADDRESS,
                  functionSelector: toFunctionSelector(
                     "transfer(address,uint256)"
                  ),
                  sudo: true,
               },
            ]);

            if (sessionData) {
               localStorage.setItem(
                  "walletSessionData",
                  stringify(sessionData)
               );
               activeSession = sessionData;
            }
         } else {
            activeSession = JSON.parse(
               localStorage.getItem("walletSessionData") || ""
            );
         }

         let hash = "";

         if (transferToken === "eth") {
            hash = await startaleClient.sendTransaction({
               to: recipientAddress as `0x${string}`,
               value: parseEther(transferAmount),
               chain: soneiumMinato,
            });
         } else {
            const tokenAddress = {
               usdc: AA_CONFIG.USDC_ADDRESS,
               cx: AA_CONFIG.CULTURA_X_ADDRESS,
            };
            const transactionService = new TransactionService(
               startaleClient as unknown as StartaleAccountClient,
               activeSession
            );
            hash = await transactionService.transferERC20(
               tokenAddress[transferToken as keyof typeof tokenAddress],
               recipientAddress as `0x${string}`,
               parseUnits(transferAmount, transferToken === "usdc" ? 6 : 18)
            );
         }

         setIsTransferring(false);
         setTxHash(hash);
         setDialogOpen(false);
         setCompletionDialogOpen(true);
      } catch (error) {
         console.error(error);
      } finally {
         setIsTransferring(false);
      }
   };

   return (
      <Card className="md:col-span-1">
         <CardHeader className="pb-2">
            <CardTitle>Wallet</CardTitle>
         </CardHeader>
         <CardContent className="space-y-6">
            <div className="flex flex-col items-center text-center pt-6">
               <div className="p-2 bg-white rounded-lg cursor-pointer">
                  <QRCodeSVG
                     value={walletData.address}
                     size={88}
                     level="H"
                     includeMargin={false}
                     onClick={() => setQrDialogOpen(true)}
                  />
               </div>
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
                        href={`${process.env.NEXT_PUBLIC_EXPLORER_URL}/address/${walletData.address}`}
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
                  onClick={onRefresh}
               >
                  <RefreshCw
                     className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                  />
                  Refresh Balances
               </Button>

               <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
                                 <SelectItem value="eth">ETH</SelectItem>
                                 <SelectItem value="usdc">USDC</SelectItem>
                                 <SelectItem value="cx">CX</SelectItem>
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
                           <Label htmlFor="recipient">Recipient Address</Label>
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
                              !transferAmount ||
                              !recipientAddress ||
                              isTransferring
                           }
                        >
                           {isTransferring ? (
                              <>
                                 <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                 Processing...
                              </>
                           ) : (
                              "Transfer"
                           )}
                        </Button>
                     </DialogFooter>
                  </DialogContent>
               </Dialog>
            </div>

            <Dialog
               open={completionDialogOpen}
               onOpenChange={setCompletionDialogOpen}
            >
               <DialogContent>
                  <DialogHeader>
                     <DialogTitle>Transfer Complete</DialogTitle>
                     <DialogDescription className="pt-4">
                        Your transfer of {transferAmount}{" "}
                        {transferToken.toUpperCase()} has been completed
                        successfully.
                     </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pb-4">
                     <div className="space-y-2">
                        <Label htmlFor="txHash">Transaction Hash</Label>
                        <div className="flex gap-2">
                           <Input
                              id="txHash"
                              value={txHash}
                              disabled
                              className="font-mono text-sm"
                           />
                           <Button variant="outline" size="icon" asChild>
                              <a
                                 href={`${process.env.NEXT_PUBLIC_EXPLORER_URL}/tx/${txHash}`}
                                 target="_blank"
                                 rel="noopener noreferrer"
                              >
                                 <ExternalLink className="h-4 w-4" />
                              </a>
                           </Button>
                        </div>
                     </div>
                  </div>
                  <DialogFooter>
                     <Button onClick={() => setCompletionDialogOpen(false)}>
                        Close
                     </Button>
                  </DialogFooter>
               </DialogContent>
            </Dialog>

            <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
               <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                     <DialogTitle>Wallet Address QR Code</DialogTitle>
                     <DialogDescription>
                        Scan this QR code to get the wallet address
                     </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-center py-4">
                     <div className="bg-white p-4 rounded-lg">
                        <QRCodeSVG
                           value={walletData.address}
                           size={300}
                           level="H"
                           includeMargin={false}
                        />
                     </div>
                  </div>
                  <DialogFooter>
                     <Button onClick={() => setQrDialogOpen(false)}>
                        Close
                     </Button>
                  </DialogFooter>
               </DialogContent>
            </Dialog>
         </CardContent>
      </Card>
   );
}
