"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Coins } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface CreateProposalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateProposalDialog({ open, onOpenChange }: CreateProposalDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] w-[95%] max-w-[95%] sm:w-auto">
        <DialogHeader>
          <DialogTitle>Create New Proposal</DialogTitle>
          <DialogDescription>Submit a new governance proposal for the community to vote on.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input id="title" placeholder="Enter proposal title" />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <Select defaultValue="platform">
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="platform">Platform</SelectItem>
                <SelectItem value="treasury">Treasury</SelectItem>
                <SelectItem value="protocol">Protocol</SelectItem>
                <SelectItem value="community">Community</SelectItem>
                <SelectItem value="fees">Fees</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Provide a detailed description of your proposal"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="duration" className="text-sm font-medium">
              Voting Duration
            </label>
            <Select defaultValue="7">
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 days</SelectItem>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="14">14 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border p-4 bg-muted/50">
            <div className="flex items-center gap-2 mb-2">
              <Coins className="h-5 w-5 text-primary" />
              <h4 className="font-medium">Proposal Requirements</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              You need at least 1,000 CRX tokens to create a proposal. Your tokens will be locked until the proposal
              ends.
            </p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm">
                Your balance: <strong>2,500 CRX</strong>
              </span>
              <Badge variant="outline" className="bg-green-500/10 text-green-600">
                Eligible
              </Badge>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button className="w-full sm:w-auto">Submit Proposal</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
