"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ChevronRight, ExternalLink, Loader2 } from "lucide-react"
import type { ClaimHistoryItem } from "./types"

interface ClaimDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pendingRewards: number
  rewardsValue: number
  tokenPrice: number
  isClaiming: boolean
  claimSuccess: boolean
  onClaim: () => void
  claimHistory: ClaimHistoryItem[]
}

export function ClaimDialog({
  open,
  onOpenChange,
  pendingRewards,
  rewardsValue,
  tokenPrice,
  isClaiming,
  claimSuccess,
  onClaim,
  claimHistory,
}: ClaimDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Claim CRX Tokens</DialogTitle>
          <DialogDescription>
            Claim your earned CRX tokens to your wallet. Tokens will be sent to your connected wallet address.
          </DialogDescription>
        </DialogHeader>
        {claimSuccess ? (
          <div className="py-6 text-center space-y-2">
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto">
              <svg
                className="h-6 w-6 text-green-600 dark:text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-medium">Claim Successful!</h3>
            <p className="text-sm text-muted-foreground">
              You have successfully claimed {pendingRewards} CRX tokens to your wallet.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 py-4">
              <div className="bg-muted rounded-lg p-4 text-center">
                <h3 className="text-2xl font-bold">{pendingRewards} CRX</h3>
                <p className="text-sm text-muted-foreground">≈ ${rewardsValue.toFixed(2)}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Claim Summary</h4>
                <div className="bg-muted rounded-lg p-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Token price</span>
                    <span>${tokenPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Destination</span>
                    <span className="flex items-center">
                      <span className="truncate max-w-[150px]">0x1a2b...3c4d</span>
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Estimated gas fee</span>
                    <span>~0.001 ETH</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Recent Claims</h4>
                <div className="bg-muted rounded-lg p-3 space-y-2 max-h-[120px] overflow-y-auto">
                  {claimHistory.map((claim) => (
                    <div key={claim.id} className="flex justify-between text-sm">
                      <span className="flex items-center">
                        <span>{claim.date}</span>
                        <span className="mx-2">•</span>
                        <span>{claim.amount} CRX</span>
                      </span>
                      <span className="text-green-500">{claim.status}</span>
                    </div>
                  ))}
                </div>
                <Button variant="link" size="sm" className="text-xs h-auto p-0">
                  View all claims <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={onClaim} disabled={pendingRewards <= 0 || isClaiming}>
                {isClaiming ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Claiming...
                  </>
                ) : (
                  <>Claim {pendingRewards} CRX</>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
