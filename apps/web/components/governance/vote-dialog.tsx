"use client"

import { Button } from "@/components/ui/button"
import { Check, X, BarChart3, Coins, Plus } from "lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"
import type { Proposal } from "@/components/governance/types"

interface VoteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  proposal: Proposal | null
}

export function VoteDialog({ open, onOpenChange, proposal }: VoteDialogProps) {
  const [voteType, setVoteType] = useState<"for" | "against" | "abstain" | null>(null)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] w-[95%] max-w-[95%] sm:w-auto">
        <DialogHeader>
          <DialogTitle>Cast Your Vote</DialogTitle>
          <DialogDescription>{proposal?.title}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-4">
            <div
              className={`p-4 rounded-lg border ${voteType === "for" ? "border-green-500 bg-green-500/10" : "border-border"} cursor-pointer`}
              onClick={() => setVoteType("for")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Vote For</span>
                </div>
                {voteType === "for" && (
                  <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Support this proposal</p>
            </div>

            <div
              className={`p-4 rounded-lg border ${voteType === "against" ? "border-red-500 bg-red-500/10" : "border-border"} cursor-pointer`}
              onClick={() => setVoteType("against")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <X className="h-5 w-5 text-red-500" />
                  <span className="font-medium">Vote Against</span>
                </div>
                {voteType === "against" && (
                  <div className="h-4 w-4 rounded-full bg-red-500 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Oppose this proposal</p>
            </div>

            <div
              className={`p-4 rounded-lg border ${voteType === "abstain" ? "border-gray-500 bg-gray-500/10" : "border-border"} cursor-pointer`}
              onClick={() => setVoteType("abstain")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-gray-500" />
                  <span className="font-medium">Abstain</span>
                </div>
                {voteType === "abstain" && (
                  <div className="h-4 w-4 rounded-full bg-gray-500 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Neither support nor oppose</p>
            </div>
          </div>

          <div className="rounded-lg border p-4 bg-muted/50">
            <div className="flex items-center gap-2 mb-2">
              <Coins className="h-5 w-5 text-primary" />
              <h4 className="font-medium">Your Voting Power</h4>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">
                Available: <strong>2,500 CRX</strong>
              </span>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 gap-1 text-xs">
                    <Plus className="h-3 w-3" /> Delegate
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">Delegation</h4>
                    <p className="text-sm text-muted-foreground">
                      You can delegate your voting power to another address to vote on your behalf.
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button disabled={!voteType} className="w-full sm:w-auto">
            Submit Vote
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
