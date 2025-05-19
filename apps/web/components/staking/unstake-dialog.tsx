"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Clock, Loader2, AlertCircle } from "lucide-react"
import type { Creator } from "./types"

interface UnstakeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  creator: Creator | null
  unstakeAmount: number
  setUnstakeAmount: (amount: number) => void
  isUnstaking: boolean
  unstakeSuccess: boolean
  onUnstake: () => void
}

export function UnstakeDialog({
  open,
  onOpenChange,
  creator,
  unstakeAmount,
  setUnstakeAmount,
  isUnstaking,
  unstakeSuccess,
  onUnstake,
}: UnstakeDialogProps) {
  if (!creator) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Unstake from {creator.name}</DialogTitle>
          <DialogDescription>
            Withdraw your staked ETH from this creator. A 7-day cooldown period applies before funds are released.
          </DialogDescription>
        </DialogHeader>
        {unstakeSuccess ? (
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
            <h3 className="text-lg font-medium">Unstake Initiated!</h3>
            <p className="text-sm text-muted-foreground">
              Your unstake request for {unstakeAmount.toFixed(2)} ETH has been initiated. Funds will be available in 7
              days.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current stake</span>
                  <span>{creator.myStake.toFixed(2)} ETH</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Amount to unstake (ETH)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Slider
                    value={[unstakeAmount]}
                    max={creator.myStake}
                    step={0.01}
                    onValueChange={(value) => setUnstakeAmount(value[0])}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={unstakeAmount}
                    onChange={(e) => setUnstakeAmount(Number(e.target.value))}
                    className="w-20"
                    min={0.01}
                    max={creator.myStake}
                    step={0.01}
                  />
                </div>
                <div className="text-xs text-muted-foreground text-right">
                  ≈ ${(unstakeAmount * 3500).toLocaleString()}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium">Unstaking Summary</h4>
                <div className="bg-muted rounded-lg p-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Amount remaining</span>
                    <span>{(creator.myStake - unstakeAmount).toFixed(2)} ETH</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Daily CRX rewards lost</span>
                    <span>~{Math.round(unstakeAmount * creator.apy * 0.1)} CRX</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cooldown period</span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> 7 days
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Estimated gas fee</span>
                    <span>~0.002 ETH</span>
                  </div>
                </div>
              </div>

              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Unstaking will initiate a 7-day cooldown period. You will immediately stop earning rewards on the
                  unstaked amount.
                </AlertDescription>
              </Alert>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={onUnstake}
                disabled={unstakeAmount <= 0 || unstakeAmount > creator.myStake || isUnstaking}
              >
                {isUnstaking ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Unstaking...
                  </>
                ) : (
                  <>Unstake {unstakeAmount.toFixed(2)} ETH</>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
