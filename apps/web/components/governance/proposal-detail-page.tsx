"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  FileText,
  User,
  Vote,
  X,
} from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import Header from "../navigation/header";
import { Sidebar } from "../navigation/sidebar";
import { fetchProfile } from "@/lib/utils";
import { useEffect, useState } from "react";
import MobileNavigation from "../navigation/mobile-navigation";

const proposals = [
  {
    id: 1,
    title: "Increase Creator Rewards Pool by 25%", // Increased from 20%
    description:
      "This proposal aims to increase the allocation of CRX tokens to the creator rewards pool by 25%, enhancing incentives for content creators on the platform.\n\nThe current allocation stands at 10M CRX tokens annually, which would increase to 12.5M CRX tokens with this proposal. This increase is designed to attract more high-quality creators to the platform and reward existing creators for their contributions.\n\nThe additional 2.5M CRX tokens would be distributed as follows:\n- 1.5M CRX for the top 100 creators based on engagement metrics\n- 600K CRX for new creator onboarding incentives\n- 400K CRX for special creator challenges and competitions",
    creator: {
      name: "Alex Rivera",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "active",
    votesFor: 1250000,
    votesAgainst: 450000,
    totalVotes: 1700000,
    endTime: "2023-06-15T23:59:59Z",
    category: "Treasury",
    createdAt: "2023-06-01T10:30:00Z",
  },
  {
    id: 2,
    title: "Implement Tiered Staking Rewards",
    description:
      "Proposal to implement a tiered staking rewards system that provides higher APY for longer-term stakers, encouraging platform loyalty.",
    creator: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "active",
    votesFor: 980000,
    votesAgainst: 750000,
    totalVotes: 1730000,
    endTime: "2023-06-18T23:59:59Z",
    category: "Protocol",
    createdAt: "2023-06-04T14:15:00Z",
  },
  {
    id: 3,
    title: "Add Support for Solana NFTs",
    description:
      "Expand platform capabilities to include Solana-based NFTs, opening up new opportunities for creators and collectors.",
    creator: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "passed",
    votesFor: 2100000,
    votesAgainst: 350000,
    totalVotes: 2450000,
    endTime: "2023-05-28T23:59:59Z",
    category: "Platform",
    createdAt: "2023-05-14T09:45:00Z",
  },
  {
    id: 4,
    title: "Reduce Platform Fee from 2.5% to 2%",
    description:
      "Proposal to reduce the platform fee charged on all transactions from 2.5% to 2%, making CreatorX more competitive and creator-friendly.",
    creator: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "rejected",
    votesFor: 890000,
    votesAgainst: 1450000,
    totalVotes: 2340000,
    endTime: "2023-05-25T23:59:59Z",
    category: "Fees",
    createdAt: "2023-05-11T16:20:00Z",
  },
  {
    id: 5,
    title: "Launch Creator Grants Program",
    description:
      "Establish a grants program that allocates 1M CRX tokens annually to fund innovative creator projects and content initiatives.",
    creator: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "pending",
    votesFor: 0,
    votesAgainst: 0,
    totalVotes: 0,
    endTime: "2023-06-25T23:59:59Z",
    category: "Treasury",
    createdAt: "2023-06-11T11:10:00Z",
  },
  {
    id: 6,
    title: "Implement Weekly Community AMAs",
    description:
      "Proposal to establish weekly Ask-Me-Anything sessions with the CreatorX team to improve transparency and community engagement.",
    creator: {
      name: "Sophia Martinez",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "active",
    votesFor: 560000,
    votesAgainst: 120000,
    totalVotes: 680000,
    endTime: "2023-06-20T23:59:59Z",
    category: "Community",
    createdAt: "2023-06-06T13:40:00Z",
  },
];

export function ProposalDetailPage({ id }: { id: string }) {
  const router = useRouter();
  const [showVoteDialog, setShowVoteDialog] = useState(false);
  const [voteType, setVoteType] = useState<
    "for" | "against" | "abstain" | null
  >(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchProfile().then((p: any) => {
      setProfile(p);
    });
  }, []);

  // Find the proposal by ID
  const proposal = proposals.find((p) => p.id === Number.parseInt(id));

  if (!proposal) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Proposal Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The proposal you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href="/governance">Back to Governance</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Format large numbers with K, M suffix
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate time remaining
  const getTimeRemaining = (endTime: string) => {
    const end = new Date(endTime).getTime();
    const now = new Date().getTime();
    const diff = end - now;

    if (diff <= 0) return "Ended";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) {
      return `${days}d ${hours}h remaining`;
    }

    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m remaining`;
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-500/20 text-green-600 hover:bg-green-500/20">
            Active
          </Badge>
        );
      case "passed":
        return (
          <Badge className="bg-blue-500/20 text-blue-600 hover:bg-blue-500/20">
            Passed
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-500/20 text-red-600 hover:bg-red-500/20">
            Rejected
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-600 hover:bg-yellow-500/20">
            Pending
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex">
        <Sidebar profile={profile} />

        {/* Main Content */}
        <main className="flex-1 p-4 pb-20 sm:pb-4 sm:ml-16 md:ml-64">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button
              variant="ghost"
              size="sm"
              className="mb-4 gap-1"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" /> Back to Proposals
            </Button>

            {/* Proposal Header */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {getStatusBadge(proposal.status)}
                <Badge variant="outline">{proposal.category}</Badge>
              </div>
              <h1 className="text-2xl font-bold mb-2">{proposal.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={proposal.creator.avatar || "/placeholder.svg"}
                      alt={proposal.creator.name}
                    />
                    <AvatarFallback>
                      {proposal.creator.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span>Created by {proposal.creator.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(proposal.createdAt)}</span>
                </div>
                {proposal.status === "active" && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{getTimeRemaining(proposal.endTime)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Proposal Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose dark:prose-invert max-w-none">
                      {proposal.description
                        .split("\n\n")
                        .map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                {proposal.totalVotes > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Voting Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="w-3 h-3 rounded-full bg-green-500"></span>
                              <span>
                                For: {formatNumber(proposal.votesFor)} (
                                {Math.round(
                                  (proposal.votesFor / proposal.totalVotes) *
                                    100
                                )}
                                %)
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-3 h-3 rounded-full bg-red-500"></span>
                              <span>
                                Against: {formatNumber(proposal.votesAgainst)} (
                                {Math.round(
                                  (proposal.votesAgainst /
                                    proposal.totalVotes) *
                                    100
                                )}
                                %)
                              </span>
                            </div>
                          </div>
                          <div className="flex h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                            <div
                              className="bg-green-500"
                              style={{
                                width: `${
                                  (proposal.votesFor / proposal.totalVotes) *
                                  100
                                }%`,
                              }}
                            ></div>
                            <div
                              className="bg-red-500"
                              style={{
                                width: `${
                                  (proposal.votesAgainst /
                                    proposal.totalVotes) *
                                  100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Vote className="h-4 w-4" />
                            <span className="text-sm">
                              {formatNumber(proposal.totalVotes)} total votes
                            </span>
                          </div>

                          {proposal.status === "active" && (
                            <Button onClick={() => setShowVoteDialog(true)}>
                              Cast Vote
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Status
                        </div>
                        <div>{getStatusBadge(proposal.status)}</div>
                      </div>

                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Category
                        </div>
                        <div>
                          <Badge variant="outline">{proposal.category}</Badge>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Creator
                        </div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={
                                proposal.creator.avatar || "/placeholder.svg"
                              }
                              alt={proposal.creator.name}
                            />
                            <AvatarFallback>
                              {proposal.creator.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{proposal.creator.name}</span>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Created On
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(proposal.createdAt)}</span>
                        </div>
                      </div>

                      {proposal.status === "active" && (
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">
                            Voting Ends
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{getTimeRemaining(proposal.endTime)}</span>
                          </div>
                        </div>
                      )}

                      {proposal.status === "active" && (
                        <Button
                          className="w-full mt-2"
                          onClick={() => setShowVoteDialog(true)}
                        >
                          Cast Vote
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      <MobileNavigation />

      {/* Vote Dialog */}
      <Dialog open={showVoteDialog} onOpenChange={setShowVoteDialog}>
        <DialogContent className="sm:max-w-[500px] w-[95%] max-w-[95%] sm:w-auto">
          <DialogHeader>
            <DialogTitle>Cast Your Vote</DialogTitle>
            <DialogDescription>{proposal.title}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg border ${
                  voteType === "for"
                    ? "border-green-500 bg-green-500/10"
                    : "border-border"
                } cursor-pointer`}
                onClick={() => setVoteType("for")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Vote For</span>
                  </div>
                  {voteType === "for" && (
                    <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Support this proposal
                </p>
              </div>

              <div
                className={`p-4 rounded-lg border ${
                  voteType === "against"
                    ? "border-red-500 bg-red-500/10"
                    : "border-border"
                } cursor-pointer`}
                onClick={() => setVoteType("against")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <X className="h-5 w-5 text-red-500" />
                    <span className="font-medium">Vote Against</span>
                  </div>
                  {voteType === "against" && (
                    <div className="h-4 w-4 rounded-full bg-red-500 flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Oppose this proposal
                </p>
              </div>

              <div
                className={`p-4 rounded-lg border ${
                  voteType === "abstain"
                    ? "border-gray-500 bg-gray-500/10"
                    : "border-border"
                } cursor-pointer`}
                onClick={() => setVoteType("abstain")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">Abstain</span>
                  </div>
                  {voteType === "abstain" && (
                    <div className="h-4 w-4 rounded-full bg-gray-500 flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Neither support nor oppose
                </p>
              </div>
            </div>

            <div className="rounded-lg border p-4 bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Your Voting Power</h4>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  Available: <strong>2,500 CRX</strong>
                </span>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowVoteDialog(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button disabled={!voteType} className="w-full sm:w-auto">
              Submit Vote
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
