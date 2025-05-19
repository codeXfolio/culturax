export interface Creator {
  id: number
  name: string
  username: string
  avatar: string
  category: string
  description: string
  apy: number
  totalStaked: number
  stakers: number
  myStake: number
  trending: boolean
  verified: boolean
}

export interface ClaimHistoryItem {
  id: number
  date: string
  amount: number
  status: string
  txHash: string
}

export interface StakingData {
  totalStaked: number
  totalRewards: number
  walletBalance: number
  pendingRewards: number
  rewardsValue: number
  totalEarned: number
  tokenPrice: number
  nextReward: number
  claimHistory: ClaimHistoryItem[]
}
