"use client";

import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, TrendingUp } from "lucide-react";

interface StakingDashboardProps {
   totalStaked: number;
   pendingRewards: number;
   rewardsValue: number;
   nextReward: number;
   walletBalance: number;
   formatTimeRemaining: (seconds: number) => string;
   openClaimDialog: () => void;
}

export function StakingDashboard({
   totalStaked,
   pendingRewards,
   rewardsValue,
   nextReward,
   walletBalance,
   formatTimeRemaining,
   openClaimDialog,
}: StakingDashboardProps) {
   return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
         <Card>
            <CardHeader className="pb-2">
               <CardTitle className="text-lg">Total Staked</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold">
                     {totalStaked.toFixed(2)} ETH
                  </div>
                  <div className="text-sm text-muted-foreground">
                     ≈ ${(totalStaked * 3500).toLocaleString()}
                  </div>
               </div>
               <div className="mt-2 text-xs text-green-500 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+5.2% from last week</span>
               </div>
            </CardContent>
         </Card>

         <Card>
            <CardHeader className="pb-2">
               <CardTitle className="text-lg">Pending Rewards</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold">{pendingRewards} CX</div>
                  <div className="text-sm text-muted-foreground">
                     ≈ ${rewardsValue.toFixed(2)}
                  </div>
               </div>
               <div className="mt-2">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                     <span>Next reward in:</span>
                     <span>{formatTimeRemaining(nextReward)}</span>
                  </div>
                  <Progress
                     value={
                        ((12 * 60 * 60 - nextReward) / (12 * 60 * 60)) * 100
                     }
                     className="h-1"
                  />
               </div>
            </CardContent>
            <CardFooter>
               <Button
                  className="w-full"
                  onClick={openClaimDialog}
                  disabled={pendingRewards <= 0}
               >
                  Claim Rewards
               </Button>
            </CardFooter>
         </Card>

         <Card>
            <CardHeader className="pb-2">
               <CardTitle className="text-lg">Wallet Balance</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold">
                     {walletBalance.toFixed(2)} ETH
                  </div>
                  <div className="text-sm text-muted-foreground">
                     ≈ ${(walletBalance * 3500).toLocaleString()}
                  </div>
               </div>
               <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                     <Plus className="h-4 w-4 mr-2" /> Add Funds
                  </Button>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
