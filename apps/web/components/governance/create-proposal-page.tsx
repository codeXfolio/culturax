"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calendar, Coins, HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";

export function CreateProposalPage() {
   const router = useRouter();

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // In a real app, this would submit the proposal to the backend
      // For now, just redirect back to the governance page
      router.push("/governance");
   };

   return (
      <div className="min-h-screen bg-background">
         <div className="flex">
            {/* Main Content */}
            <main className="flex-1 p-4 pb-20 sm:pb-4 sm:ml-16 md:ml-64">
               <div className="max-w-3xl mx-auto">
                  {/* Back Button */}
                  <Button
                     variant="ghost"
                     size="sm"
                     className="mb-4 gap-1"
                     onClick={() => router.back()}
                  >
                     <ArrowLeft className="h-4 w-4" /> Back to Proposals
                  </Button>

                  {/* Page Header */}
                  <div className="mb-6">
                     <h1 className="text-2xl font-bold mb-1">
                        Create Proposal
                     </h1>
                     <p className="text-muted-foreground">
                        Submit a new governance proposal for the community to
                        vote on
                     </p>
                  </div>

                  {/* Proposal Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                     <Card>
                        <CardHeader>
                           <CardTitle className="text-lg">
                              Proposal Details
                           </CardTitle>
                           <CardDescription>
                              Provide information about your proposal
                           </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="space-y-2">
                              <label
                                 htmlFor="title"
                                 className="text-sm font-medium flex items-center gap-1"
                              >
                                 Title
                                 <TooltipProvider>
                                    <Tooltip>
                                       <TooltipTrigger asChild>
                                          <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                                       </TooltipTrigger>
                                       <TooltipContent>
                                          <p className="text-sm">
                                             Keep your title clear and concise
                                          </p>
                                       </TooltipContent>
                                    </Tooltip>
                                 </TooltipProvider>
                              </label>
                              <Input
                                 id="title"
                                 placeholder="Enter proposal title"
                                 required
                              />
                           </div>

                           <div className="space-y-2">
                              <label
                                 htmlFor="category"
                                 className="text-sm font-medium"
                              >
                                 Category
                              </label>
                              <Select required>
                                 <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="platform">
                                       Platform
                                    </SelectItem>
                                    <SelectItem value="treasury">
                                       Treasury
                                    </SelectItem>
                                    <SelectItem value="protocol">
                                       Protocol
                                    </SelectItem>
                                    <SelectItem value="community">
                                       Community
                                    </SelectItem>
                                    <SelectItem value="fees">Fees</SelectItem>
                                 </SelectContent>
                              </Select>
                           </div>

                           <div className="space-y-2">
                              <label
                                 htmlFor="description"
                                 className="text-sm font-medium flex items-center gap-1"
                              >
                                 Description
                                 <TooltipProvider>
                                    <Tooltip>
                                       <TooltipTrigger asChild>
                                          <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                                       </TooltipTrigger>
                                       <TooltipContent>
                                          <p className="text-sm">
                                             Provide a detailed explanation of
                                             your proposal
                                          </p>
                                       </TooltipContent>
                                    </Tooltip>
                                 </TooltipProvider>
                              </label>
                              <Textarea
                                 id="description"
                                 placeholder="Provide a detailed description of your proposal"
                                 className="min-h-[200px]"
                                 required
                              />
                           </div>

                           <div className="space-y-2">
                              <label
                                 htmlFor="duration"
                                 className="text-sm font-medium"
                              >
                                 Voting Duration
                              </label>
                              <Select defaultValue="7" required>
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
                        </CardContent>
                     </Card>

                     <Card>
                        <CardHeader>
                           <CardTitle className="text-lg">
                              Proposal Requirements
                           </CardTitle>
                           <CardDescription>
                              Review the requirements for submitting a proposal
                           </CardDescription>
                        </CardHeader>
                        <CardContent>
                           <div className="rounded-lg border p-4 bg-muted/50">
                              <div className="flex items-center gap-2 mb-2">
                                 <Coins className="h-5 w-5 text-primary" />
                                 <h4 className="font-medium">
                                    Token Requirements
                                 </h4>
                              </div>
                              <p className="text-sm text-muted-foreground mb-4">
                                 You need at least 1,000 CRX tokens to create a
                                 proposal. Your tokens will be locked until the
                                 proposal ends.
                              </p>
                              <div className="flex items-center justify-between">
                                 <span className="text-sm">
                                    Your balance: <strong>2,500 CRX</strong>
                                 </span>
                                 <Badge
                                    variant="outline"
                                    className="bg-green-500/10 text-green-600"
                                 >
                                    Eligible
                                 </Badge>
                              </div>
                           </div>

                           <div className="rounded-lg border p-4 bg-muted/50 mt-4">
                              <div className="flex items-center gap-2 mb-2">
                                 <Calendar className="h-5 w-5 text-primary" />
                                 <h4 className="font-medium">Timeline</h4>
                              </div>
                              <div className="space-y-2 text-sm">
                                 <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                       Review Period:
                                    </span>
                                    <span>24 hours</span>
                                 </div>
                                 <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                       Voting Period:
                                    </span>
                                    <span>Based on selected duration</span>
                                 </div>
                                 <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                       Execution Delay:
                                    </span>
                                    <span>48 hours after passing</span>
                                 </div>
                              </div>
                           </div>
                        </CardContent>
                     </Card>

                     <div className="flex flex-col sm:flex-row gap-4 justify-end">
                        <Button
                           type="button"
                           variant="outline"
                           onClick={() => router.back()}
                           className="w-full sm:w-auto"
                        >
                           Cancel
                        </Button>
                        <Button type="submit" className="w-full sm:w-auto">
                           Submit Proposal
                        </Button>
                     </div>
                  </form>
               </div>
            </main>
         </div>
      </div>
   );
}
