"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"
import type { Creator } from "./types"

interface StakeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  creator: Creator | null
  stakeAmount: number
  setStakeAmount: (amount: number) => void
  walletBalance: number
  isStaking: boolean
  stakeSuccess: boolean
  onStake: () => void
}

export function StakeDialog({
  open,
  onOpenChange,
  creator,
  stakeAmount,
  setStakeAmount,
  walletBalance,
  isStaking,
  stakeSuccess,
  onStake,
}: StakeDialogProps) {
  if (!creator) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Stake to {creator.name}</DialogTitle>
          <DialogDescription>
            Support this creator by staking ETH and earn {creator.apy}% APY plus CRX token rewards.
          </DialogDescription>
        </DialogHeader>
        {stakeSuccess ? (
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
            <h3 className="text-lg font-medium">Stake Successful!</h3>
            <p className="text-sm text-muted-foreground">
              You have successfully staked {stakeAmount.toFixed(2)} ETH to {creator.name}.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Amount to stake (ETH)</span>
                  <span>Balance: {walletBalance.toFixed(2)} ETH</span>
                </div>
                <div className="flex items-center gap-2">
                  <Slider
                    value={[stakeAmount]}
                    max={walletBalance}
                    step={0.01}
                    onValueChange={(value) => setStakeAmount(value[0])}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(Number(e.target.value))}
                    className="w-20"
                    min={0.01}
                    max={walletBalance}
                    step={0.01}
                  />
                </div>
                <div className="text-xs text-muted-foreground text-right">
                  ≈ ${(stakeAmount * 3500).toLocaleString()}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium">Staking Summary</h4>
                <div className="bg-muted rounded-lg p-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current stake</span>
                    <span>{creator.myStake.toFixed(2)} ETH</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>New stake</span>
                    <span>{(creator.myStake + stakeAmount).toFixed(2)} ETH</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Estimated APY</span>
                    <span className="text-green-500">{creator.apy}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Daily CRX rewards</span>
                    <span>~{Math.round(stakeAmount * creator.apy * 0.1)} CRX</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Estimated gas fee</span>
                    <span>~0.002 ETH</span>
                  </div>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  Staked ETH has a 7-day cooldown period before it can be unstaked. You will continue to earn rewards
                  during this period.
                </AlertDescription>
              </Alert>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={onStake} disabled={stakeAmount <= 0 || stakeAmount > walletBalance || isStaking}>
                {isStaking ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Staking...
                  </>
                ) : (
                  <>Stake {stakeAmount.toFixed(2)} ETH</>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
