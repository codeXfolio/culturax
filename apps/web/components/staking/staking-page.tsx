"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { StakingSidebar } from "./staking-sidebar";
import { Sidebar } from "../navigation/sidebar";
import { StakingDashboard } from "./staking-dashboard";
import { CreatorTable } from "./creator-table";
import { StakeDialog } from "./stake-dialog";
import { UnstakeDialog } from "./unstake-dialog";
import { ClaimDialog } from "./claim-dialog";
import MobileNavigation from "../navigation/mobile-navigation";
import { useCreators } from "./use-staking";
import { fetchProfile } from "@/lib/utils";

export interface Creator {
   id: number;
   name: string;
   username: string;
   avatar: string;
   category: string;
   description: string;
   apy: number;
   totalStaked: number;
   stakers: number;
   myStake: number;
   trending: boolean;
   verified: boolean;
}

export interface ClaimHistoryItem {
   id: number;
   date: string;
   amount: number;
   status: string;
   txHash: string;
}

export interface StakingData {
   totalStaked: number;
   totalRewards: number;
   walletBalance: number;
   pendingRewards: number;
   rewardsValue: number;
   totalEarned: number;
   tokenPrice: number;
   nextReward: number;
   claimHistory: ClaimHistoryItem[];
}

export function StakingPage() {
   const [creatorFilter, setCreatorFilter] = useState("all");
   const [showStakeDialog, setShowStakeDialog] = useState(false);
   const [showUnstakeDialog, setShowUnstakeDialog] = useState(false);
   const [showClaimDialog, setShowClaimDialog] = useState(false);
   const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
   const [stakeAmount, setStakeAmount] = useState(0.5);
   const [unstakeAmount, setUnstakeAmount] = useState(0.5);
   const [isStaking, setIsStaking] = useState(false);
   const [isUnstaking, setIsUnstaking] = useState(false);
   const [isClaiming, setIsClaiming] = useState(false);
   const [stakeSuccess, setStakeSuccess] = useState(false);
   const [unstakeSuccess, setUnstakeSuccess] = useState(false);
   const [claimSuccess, setClaimSuccess] = useState(false);
   const [profile, setProfile] = useState<{
      avatar: string;
      accountType: string;
   } | null>(null);

   // Get staking data from custom hook
   const {
      creators,
      stakingData,
      walletBalance,
      pendingRewards,
      rewardsValue,
      nextReward,
      totalStaked,
      handleStake,
      handleUnstake,
      handleClaim,
      formatTimeRemaining,
   } = useCreators();

   // Filter creators based on selected filter
   const filteredCreators = creators.filter((creator) => {
      if (creatorFilter === "staked") return creator.myStake > 0;
      if (creatorFilter === "trending") return creator.trending;
      return true;
   });

   // Handle stake dialog
   const openStakeDialog = (creator: Creator) => {
      setSelectedCreator(creator);
      setStakeAmount(0.5);
      setShowStakeDialog(true);
   };

   // Handle unstake dialog
   const openUnstakeDialog = (creator: Creator) => {
      setSelectedCreator(creator);
      setUnstakeAmount(creator.myStake / 2);
      setShowUnstakeDialog(true);
   };

   // Handle claim dialog
   const openClaimDialog = () => {
      setShowClaimDialog(true);
   };

   // Handle stake submission
   const handleStakeSubmit = async () => {
      if (!selectedCreator) return;

      setIsStaking(true);
      await handleStake(selectedCreator.id, stakeAmount);
      setIsStaking(false);
      setStakeSuccess(true);

      // Reset after success message
      setTimeout(() => {
         setShowStakeDialog(false);
         setStakeSuccess(false);
      }, 2000);
   };

   // Handle unstake submission
   const handleUnstakeSubmit = async () => {
      if (!selectedCreator) return;

      setIsUnstaking(true);
      await handleUnstake(selectedCreator.id, unstakeAmount);
      setIsUnstaking(false);
      setUnstakeSuccess(true);

      // Reset after success message
      setTimeout(() => {
         setShowUnstakeDialog(false);
         setUnstakeSuccess(false);
      }, 2000);
   };

   // Handle claim submission
   const handleClaimSubmit = async () => {
      setIsClaiming(true);
      await handleClaim();
      setIsClaiming(false);
      setClaimSuccess(true);

      // Reset after success message
      setTimeout(() => {
         setShowClaimDialog(false);
         setClaimSuccess(false);
      }, 2000);
   };

   useEffect(() => {
      fetchProfile().then((profile) => {
         setProfile(profile);
      });
   }, []);

   return (
      <div className="min-h-screen bg-background">
         <div className="flex pt-16">
            {/* Sidebar Navigation */}
            <Sidebar profile={profile} />

            {/* Main Content */}
            <main className="flex-1 sm:ml-16 md:ml-64 p-4">
               <div className="max-w-6xl mx-auto">
                  {/* Header */}
                  <div className="mb-6">
                     <h1 className="text-2xl font-bold mb-1">
                        Creator Staking
                     </h1>
                     <p className="text-muted-foreground">
                        Stake ETH to your favorite creators and earn CRX token
                        rewards
                     </p>
                  </div>

                  {/* Mobile Filters */}
                  <div className="sm:hidden mb-4">
                     <Select
                        value={creatorFilter}
                        onValueChange={setCreatorFilter}
                     >
                        <SelectTrigger className="w-full">
                           <SelectValue placeholder="Filter creators" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="all">All Creators</SelectItem>
                           <SelectItem value="staked">
                              My Staked Creators
                           </SelectItem>
                           <SelectItem value="trending">
                              Trending Creators
                           </SelectItem>
                        </SelectContent>
                     </Select>
                  </div>

                  {/* Dashboard Cards */}
                  <StakingDashboard
                     totalStaked={totalStaked}
                     pendingRewards={pendingRewards}
                     rewardsValue={rewardsValue}
                     nextReward={nextReward}
                     walletBalance={walletBalance}
                     formatTimeRemaining={formatTimeRemaining}
                     openClaimDialog={openClaimDialog}
                  />

                  {/* Creators Table */}
                  <div className="mb-6">
                     <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">
                           {creatorFilter === "all" && "All Creators"}
                           {creatorFilter === "staked" && "My Staked Creators"}
                           {creatorFilter === "trending" && "Trending Creators"}
                        </h2>
                        <div className="flex items-center gap-2">
                           <Select defaultValue="apy">
                              <SelectTrigger className="w-[130px]">
                                 <SelectValue placeholder="Sort by" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="apy">
                                    Highest APY
                                 </SelectItem>
                                 <SelectItem value="staked">
                                    Most Staked
                                 </SelectItem>
                                 <SelectItem value="stakers">
                                    Most Stakers
                                 </SelectItem>
                              </SelectContent>
                           </Select>
                           <Button variant="outline" size="icon">
                              <Filter className="h-4 w-4" />
                           </Button>
                        </div>
                     </div>

                     <CreatorTable
                        creators={filteredCreators}
                        openStakeDialog={openStakeDialog}
                        openUnstakeDialog={openUnstakeDialog}
                     />
                  </div>
               </div>
            </main>
         </div>

         {/* Mobile Navigation */}
         <MobileNavigation />

         {/* Dialogs */}
         <StakeDialog
            open={showStakeDialog}
            onOpenChange={setShowStakeDialog}
            creator={selectedCreator}
            stakeAmount={stakeAmount}
            setStakeAmount={setStakeAmount}
            walletBalance={walletBalance}
            isStaking={isStaking}
            stakeSuccess={stakeSuccess}
            onStake={handleStakeSubmit}
         />

         <UnstakeDialog
            open={showUnstakeDialog}
            onOpenChange={setShowUnstakeDialog}
            creator={selectedCreator}
            unstakeAmount={unstakeAmount}
            setUnstakeAmount={setUnstakeAmount}
            isUnstaking={isUnstaking}
            unstakeSuccess={unstakeSuccess}
            onUnstake={handleUnstakeSubmit}
         />

         <ClaimDialog
            open={showClaimDialog}
            onOpenChange={setShowClaimDialog}
            pendingRewards={pendingRewards}
            rewardsValue={rewardsValue}
            tokenPrice={stakingData.tokenPrice}
            isClaiming={isClaiming}
            claimSuccess={claimSuccess}
            onClaim={handleClaimSubmit}
            claimHistory={stakingData.claimHistory}
         />
      </div>
   );
}
