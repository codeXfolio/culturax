"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
   HoverCard,
   HoverCardContent,
   HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Info, TrendingUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import type { Creator } from "./types";

interface CreatorTableProps {
   creators: Creator[];
   openStakeDialog: (creator: Creator) => void;
   openUnstakeDialog: (creator: Creator) => void;
}

export function CreatorTable({
   creators,
   openStakeDialog,
   openUnstakeDialog,
}: CreatorTableProps) {
   const [expandedCreator, setExpandedCreator] = useState<number | null>(null);

   const toggleExpand = (id: number) => {
      setExpandedCreator(expandedCreator === id ? null : id);
   };

   return (
      <div className="w-full overflow-hidden">
         {/* Desktop Table */}
         <div className="hidden md:block">
            <div className="w-full border rounded-lg overflow-hidden">
               <table className="w-full">
                  <thead>
                     <tr className="bg-muted/50">
                        <th className="text-left p-3 font-medium text-muted-foreground text-sm">
                           Creator
                        </th>
                        <th className="text-center p-3 font-medium text-muted-foreground text-sm">
                           APY
                        </th>
                        <th className="text-center p-3 font-medium text-muted-foreground text-sm">
                           Total Staked
                        </th>
                        <th className="text-center p-3 font-medium text-muted-foreground text-sm">
                           Stakers
                        </th>
                        <th className="text-center p-3 font-medium text-muted-foreground text-sm">
                           Your Stake
                        </th>
                        <th className="text-right p-3 font-medium text-muted-foreground text-sm">
                           Actions
                        </th>
                     </tr>
                  </thead>
                  <tbody className="divide-y">
                     {creators.map((creator) => (
                        <tr
                           key={creator.id}
                           className="hover:bg-muted/30 transition-colors"
                        >
                           <td className="p-3">
                              <div className="flex items-center gap-3">
                                 <Avatar className="h-10 w-10 border">
                                    <AvatarImage
                                       src={
                                          creator.avatar || "/placeholder.svg"
                                       }
                                       alt={creator.name}
                                    />
                                    <AvatarFallback>
                                       {creator.name.charAt(0)}
                                    </AvatarFallback>
                                 </Avatar>
                                 <div>
                                    <div className="flex items-center gap-1">
                                       <span className="font-medium">
                                          {creator.name}
                                       </span>
                                       {creator.verified && (
                                          <svg
                                             className="h-4 w-4 text-blue-500 fill-current"
                                             viewBox="0 0 24 24"
                                          >
                                             <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                          </svg>
                                       )}
                                       {creator.trending && (
                                          <Badge
                                             variant="secondary"
                                             className="flex items-center gap-1 ml-1"
                                          >
                                             <TrendingUp className="h-3 w-3" />{" "}
                                             Trending
                                          </Badge>
                                       )}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                       @{creator.username}
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1 max-w-xs">
                                       {creator.description}
                                    </div>
                                 </div>
                              </div>
                           </td>
                           <td className="p-3 text-center">
                              <HoverCard>
                                 <HoverCardTrigger>
                                    <div className="font-semibold text-green-500 flex items-center justify-center">
                                       {creator.apy}%{" "}
                                       <Info className="h-3 w-3 ml-1 text-muted-foreground" />
                                    </div>
                                 </HoverCardTrigger>
                                 <HoverCardContent className="w-80">
                                    <div className="space-y-2">
                                       <h4 className="font-medium">
                                          Annual Percentage Yield
                                       </h4>
                                       <p className="text-sm text-muted-foreground">
                                          This is the estimated annual return on
                                          your staked ETH. The actual APY may
                                          vary based on creator performance and
                                          platform activity.
                                       </p>
                                       <div className="text-xs text-muted-foreground">
                                          <div className="flex justify-between">
                                             <span>Daily rewards:</span>
                                             <span>
                                                {(creator.apy / 365).toFixed(2)}
                                                %
                                             </span>
                                          </div>
                                          <div className="flex justify-between">
                                             <span>Monthly rewards:</span>
                                             <span>
                                                {(creator.apy / 12).toFixed(2)}%
                                             </span>
                                          </div>
                                       </div>
                                    </div>
                                 </HoverCardContent>
                              </HoverCard>
                           </td>
                           <td className="p-3 text-center font-medium">
                              {creator.totalStaked.toFixed(1)} ETH
                           </td>
                           <td className="p-3 text-center font-medium">
                              {creator.stakers}
                           </td>
                           <td className="p-3">
                              {creator.myStake > 0 ? (
                                 <div>
                                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                       <span>
                                          {creator.myStake.toFixed(2)} ETH
                                       </span>
                                       <span>
                                          $
                                          {(
                                             creator.myStake * 3500
                                          ).toLocaleString()}
                                       </span>
                                    </div>
                                    <Progress
                                       value={
                                          (creator.myStake /
                                             (creator.totalStaked * 0.2)) *
                                          100
                                       }
                                       className="h-1"
                                    />
                                    <div className="mt-1 text-xs text-muted-foreground">
                                       ~
                                       {Math.round(
                                          creator.myStake * creator.apy * 0.1
                                       )}{" "}
                                       CRX/day
                                    </div>
                                 </div>
                              ) : (
                                 <span className="text-muted-foreground text-sm">
                                    None
                                 </span>
                              )}
                           </td>
                           <td className="p-3 text-right">
                              <div className="flex justify-end gap-2">
                                 {creator.myStake > 0 ? (
                                    <>
                                       <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() =>
                                             openStakeDialog(creator)
                                          }
                                       >
                                          Add
                                       </Button>
                                       <Button
                                          variant="destructive"
                                          size="sm"
                                          onClick={() =>
                                             openUnstakeDialog(creator)
                                          }
                                       >
                                          Unstake
                                       </Button>
                                    </>
                                 ) : (
                                    <Button
                                       size="sm"
                                       onClick={() => openStakeDialog(creator)}
                                    >
                                       Stake Now
                                    </Button>
                                 )}
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Mobile Table */}
         <div className="md:hidden space-y-4">
            {creators.map((creator) => (
               <div
                  key={creator.id}
                  className="border rounded-lg overflow-hidden bg-card"
               >
                  <div
                     className="p-4 flex items-center justify-between cursor-pointer"
                     onClick={() => toggleExpand(creator.id)}
                  >
                     <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border">
                           <AvatarImage
                              src={creator.avatar || "/placeholder.svg"}
                              alt={creator.name}
                           />
                           <AvatarFallback>
                              {creator.name.charAt(0)}
                           </AvatarFallback>
                        </Avatar>
                        <div>
                           <div className="flex items-center gap-1">
                              <span className="font-medium">
                                 {creator.name}
                              </span>
                              {creator.verified && (
                                 <svg
                                    className="h-4 w-4 text-blue-500 fill-current"
                                    viewBox="0 0 24 24"
                                 >
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                 </svg>
                              )}
                           </div>
                           <div className="text-xs text-muted-foreground">
                              @{creator.username}
                           </div>
                        </div>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="text-right">
                           <div className="font-semibold text-green-500">
                              {creator.apy}% APY
                           </div>
                           {creator.myStake > 0 && (
                              <div className="text-xs text-muted-foreground">
                                 {creator.myStake.toFixed(2)} ETH staked
                              </div>
                           )}
                        </div>
                        <ChevronDown
                           className={`h-5 w-5 transition-transform ${
                              expandedCreator === creator.id ? "rotate-180" : ""
                           }`}
                        />
                     </div>
                  </div>

                  {expandedCreator === creator.id && (
                     <div className="px-4 pb-4 pt-0 border-t">
                        <div className="text-sm text-muted-foreground mb-3">
                           {creator.description}
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-4">
                           <div className="text-center p-2 bg-muted/30 rounded-md">
                              <div className="text-xs text-muted-foreground">
                                 Total Staked
                              </div>
                              <div className="font-semibold">
                                 {creator.totalStaked.toFixed(1)} ETH
                              </div>
                           </div>
                           <div className="text-center p-2 bg-muted/30 rounded-md">
                              <div className="text-xs text-muted-foreground">
                                 Stakers
                              </div>
                              <div className="font-semibold">
                                 {creator.stakers}
                              </div>
                           </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 mb-4">
                           <div className="text-center p-2 bg-muted/30 rounded-md">
                              <div className="text-xs text-muted-foreground">
                                 Daily Rewards
                              </div>
                              <div className="font-semibold">
                                 ~
                                 {Math.round(
                                    creator.myStake * creator.apy * 0.1
                                 )}{" "}
                                 CRX
                              </div>
                           </div>
                        </div>

                        {creator.myStake > 0 && (
                           <div className="mb-4">
                              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                 <span>Your stake:</span>
                                 <span>
                                    {creator.myStake.toFixed(2)} ETH ($
                                    {(creator.myStake * 3500).toLocaleString()})
                                 </span>
                              </div>
                              <Progress
                                 value={
                                    (creator.myStake /
                                       (creator.totalStaked * 0.2)) *
                                    100
                                 }
                                 className="h-1"
                              />
                           </div>
                        )}

                        <div className="flex gap-2">
                           {creator.myStake > 0 ? (
                              <>
                                 <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => openStakeDialog(creator)}
                                 >
                                    Add Stake
                                 </Button>
                                 <Button
                                    variant="destructive"
                                    className="flex-1"
                                    onClick={() => openUnstakeDialog(creator)}
                                 >
                                    Unstake
                                 </Button>
                              </>
                           ) : (
                              <Button
                                 className="w-full"
                                 onClick={() => openStakeDialog(creator)}
                              >
                                 Stake Now
                              </Button>
                           )}
                        </div>
                     </div>
                  )}
               </div>
            ))}
         </div>
      </div>
   );
}
