"use client"

import { useState, useEffect } from "react"
import type { Creator, StakingData, ClaimHistoryItem } from "./types"

// Mock creator data
const mockCreators: Creator[] = [
  {
    id: 1,
    name: "Alex Rivera",
    username: "alexrivera",
    avatar: "/placeholder.svg?height=200&width=200",
    category: "Digital Art",
    description: "Digital artist specializing in futuristic landscapes and NFT collections.",
    apy: 12.5,
    totalStaked: 45.8,
    stakers: 128,
    myStake: 0.75,
    trending: true,
    verified: true,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    username: "sarahjcreates",
    avatar: "/placeholder.svg?height=200&width=200",
    category: "Photography",
    description: "Capturing moments and emotions through the lens. NFT photographer and visual storyteller.",
    apy: 9.8,
    totalStaked: 32.4,
    stakers: 95,
    myStake: 0.5,
    trending: false,
    verified: true,
  },
  {
    id: 3,
    name: "Michael Chen",
    username: "michaelchenmusic",
    avatar: "/placeholder.svg?height=200&width=200",
    category: "Music",
    description: "Electronic music producer and sound designer. Creating audio NFTs and immersive experiences.",
    apy: 15.2,
    totalStaked: 58.6,
    stakers: 210,
    myStake: 1.2,
    trending: true,
    verified: false,
  },
  {
    id: 4,
    name: "Emma Wilson",
    username: "emmawilsonart",
    avatar: "/placeholder.svg?height=200&width=200",
    category: "Tutorials",
    description: "Digital art educator sharing techniques and tutorials for aspiring creators.",
    apy: 8.5,
    totalStaked: 21.3,
    stakers: 76,
    myStake: 0,
    trending: false,
    verified: true,
  },
  {
    id: 5,
    name: "David Kim",
    username: "davidkimdesign",
    avatar: "/placeholder.svg?height=200&width=200",
    category: "UI Design",
    description: "UI/UX designer creating interfaces for Web3 applications and digital experiences.",
    apy: 10.2,
    totalStaked: 28.7,
    stakers: 82,
    myStake: 0,
    trending: false,
    verified: false,
  },
  {
    id: 6,
    name: "Sophia Martinez",
    username: "sophiam",
    avatar: "/placeholder.svg?height=200&width=200",
    category: "3D Art",
    description: "3D artist and animator creating immersive digital sculptures and environments.",
    apy: 14.8,
    totalStaked: 39.5,
    stakers: 115,
    myStake: 0,
    trending: true,
    verified: true,
  },
]

// Mock claim history
const mockClaimHistory: ClaimHistoryItem[] = [
  {
    id: 1,
    date: "2023-05-01",
    amount: 75,
    status: "Completed",
    txHash: "0x1a2b3c...",
  },
  {
    id: 2,
    date: "2023-04-15",
    amount: 120,
    status: "Completed",
    txHash: "0x4d5e6f...",
  },
  {
    id: 3,
    date: "2023-04-01",
    amount: 85,
    status: "Completed",
    txHash: "0x7g8h9i...",
  },
]

// Initial staking data
const initialStakingData: StakingData = {
  totalStaked: 2.45,
  totalRewards: 0.12,
  walletBalance: 1.8,
  pendingRewards: 125,
  rewardsValue: 125 * 0.85,
  totalEarned: 450,
  tokenPrice: 0.85,
  nextReward: 12 * 60 * 60, // 12 hours in seconds
  claimHistory: mockClaimHistory,
}

export function useCreators() {
  const [creators, setCreators] = useState<Creator[]>(mockCreators)
  const [stakingData, setStakingData] = useState<StakingData>(initialStakingData)

  // Calculate total staked amount
  const totalStaked = creators.reduce((total, creator) => total + creator.myStake, 0)

  // Format time remaining for next reward
  const formatTimeRemaining = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  // Simulate countdown for next reward
  useEffect(() => {
    const timer = setInterval(() => {
      setStakingData((prev) => ({
        ...prev,
        nextReward: prev.nextReward > 0 ? prev.nextReward - 1 : 0,
      }))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Handle stake
  const handleStake = async (creatorId: number, amount: number) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Update creator stake
    setCreators((prev) =>
      prev.map((creator) => {
        if (creator.id === creatorId) {
          return {
            ...creator,
            myStake: creator.myStake + amount,
            totalStaked: creator.totalStaked + amount,
            stakers: creator.myStake === 0 ? creator.stakers + 1 : creator.stakers,
          }
        }
        return creator
      }),
    )

    // Update wallet balance
    setStakingData((prev) => ({
      ...prev,
      walletBalance: prev.walletBalance - amount,
    }))
  }

  // Handle unstake
  const handleUnstake = async (creatorId: number, amount: number) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Update creator stake
    setCreators((prev) =>
      prev.map((creator) => {
        if (creator.id === creatorId) {
          const newMyStake = creator.myStake - amount
          return {
            ...creator,
            myStake: newMyStake,
            totalStaked: creator.totalStaked - amount,
            stakers: newMyStake <= 0 ? creator.stakers - 1 : creator.stakers,
          }
        }
        return creator
      }),
    )

    // Update wallet balance (will be available after cooldown in real implementation)
    setStakingData((prev) => ({
      ...prev,
      walletBalance: prev.walletBalance + amount,
    }))
  }

  // Handle claim
  const handleClaim = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Update staking data
    setStakingData((prev) => ({
      ...prev,
      totalEarned: prev.totalEarned + prev.pendingRewards,
      pendingRewards: 0,
      rewardsValue: 0,
      claimHistory: [
        {
          id: Date.now(),
          date: new Date().toISOString().split("T")[0],
          amount: prev.pendingRewards,
          status: "Completed",
          txHash: `0x${Math.random().toString(16).substring(2, 10)}...`,
        },
        ...prev.claimHistory,
      ],
    }))
  }

  return {
    creators,
    stakingData,
    walletBalance: stakingData.walletBalance,
    pendingRewards: stakingData.pendingRewards,
    rewardsValue: stakingData.rewardsValue,
    nextReward: stakingData.nextReward,
    totalStaked,
    handleStake,
    handleUnstake,
    handleClaim,
    formatTimeRemaining,
  }
}
