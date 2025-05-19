export interface Creator {
  name: string
  avatar: string
}

export interface Proposal {
  id: number
  title: string
  description: string
  creator: Creator
  status: "active" | "passed" | "rejected" | "pending"
  votesFor: number
  votesAgainst: number
  votesAbstain: number
  totalVotes: number
  endTime: string
  category: string
  createdAt: string
}

export interface GovernanceStats {
  totalProposals: number
  activeProposals: number
  votingPower: number
  treasuryBalance: number
  totalVoters: number
  proposalSuccessRate: number
}
