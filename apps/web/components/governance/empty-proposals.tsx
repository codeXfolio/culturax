"use client"

import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

interface EmptyProposalsProps {
  activeTab: string
  onCreateProposal: () => void
}

export function EmptyProposals({ activeTab, onCreateProposal }: EmptyProposalsProps) {
  return (
    <div className="text-center py-12">
      <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">No proposals found</h3>
      <p className="text-muted-foreground mb-4">
        There are no {activeTab !== "all" ? activeTab : ""} proposals at the moment.
      </p>
      <Button onClick={onCreateProposal}>Create a Proposal</Button>
    </div>
  )
}
