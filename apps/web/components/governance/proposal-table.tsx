"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Vote } from "lucide-react"
import type { Proposal } from "@/components/governance/types"
import { useRouter } from "next/navigation"

interface ProposalTableProps {
  proposals: Proposal[]
  formatNumber: (num: number) => string
  getTimeRemaining: (endTime: string) => string
}

export function ProposalTable({ proposals, formatNumber, getTimeRemaining }: ProposalTableProps) {
  const router = useRouter()

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-600 hover:bg-green-500/20">Active</Badge>
      case "passed":
        return <Badge className="bg-blue-500/20 text-blue-600 hover:bg-blue-500/20">Passed</Badge>
      case "rejected":
        return <Badge className="bg-red-500/20 text-red-600 hover:bg-red-500/20">Rejected</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-600 hover:bg-yellow-500/20">Pending</Badge>
      default:
        return null
    }
  }

  const handleRowClick = (id: number) => {
    router.push(`/governance/${id}`)
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Proposal</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead className="hidden md:table-cell">Category</TableHead>
            <TableHead className="hidden md:table-cell">Votes</TableHead>
            <TableHead className="hidden md:table-cell">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proposals.map((proposal) => (
            <TableRow
              key={proposal.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleRowClick(proposal.id)}
            >
              <TableCell>
                <div className="flex flex-col">
                  <div className="font-medium">{proposal.title}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={proposal.creator.avatar || "/placeholder.svg"} alt={proposal.creator.name} />
                      <AvatarFallback>{proposal.creator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{proposal.creator.name}</span>
                    <span className="md:hidden">{getStatusBadge(proposal.status)}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{getStatusBadge(proposal.status)}</TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="outline">{proposal.category}</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center gap-1">
                  <Vote className="h-4 w-4" />
                  <span>{formatNumber(proposal.totalVotes)}</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {proposal.status === "active" ? (
                    <span>{getTimeRemaining(proposal.endTime)}</span>
                  ) : (
                    <span>Ended</span>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
