"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProposalTable } from "@/components/governance/proposal-table";
import { StatsCards } from "@/components/governance/stats-cards";
import { CreateProposalDialog } from "@/components/governance/create-proposal-dialog";
import { EmptyProposals } from "@/components/governance/empty-proposals";
import { useRouter } from "next/navigation";
import {
  PlusCircle,
  Clock,
  Hourglass,
  CheckCircle,
  XCircle,
} from "lucide-react";
import type { GovernanceStats, Proposal } from "@/components/governance/types";
import { Sidebar } from "../navigation/sidebar";
import Header from "../navigation/header";
import MobileNavigation from "../navigation/mobile-navigation";
import { fetchProfile } from "@/lib/utils";

export function GovernancePage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    fetchProfile().then((p: any) => {
      setProfile(p);
    });
  }, []);

  // Sample governance stats
  const stats: GovernanceStats = {
    totalProposals: 156,
    activeProposals: 8,
    votingPower: 2500,
    treasuryBalance: 1250000,
    totalVoters: 3450,
    proposalSuccessRate: 70,
  };

  // Sample proposals data
  const proposals: Proposal[] = [
    {
      id: 1,
      title: "Increase creator rewards by 5%",
      description:
        "This proposal aims to increase the rewards for content creators by 5% to incentivize more quality content.",
      creator: {
        name: "Alex Johnson",
        avatar: "/abstract-letter-aj.png",
      },
      status: "active",
      votesFor: 1500,
      votesAgainst: 500,
      votesAbstain: 200,
      totalVotes: 2200,
      endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
      category: "Treasury",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    },
    {
      id: 2,
      title: "Add new content category for educational material",
      description:
        "This proposal suggests adding a new category specifically for educational content to better organize the platform.",
      creator: {
        name: "Sarah Miller",
        avatar: "/stylized-sm-logo.png",
      },
      status: "passed",
      votesFor: 3000,
      votesAgainst: 800,
      votesAbstain: 150,
      totalVotes: 3950,
      endTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      category: "Platform",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    },
    {
      id: 3,
      title: "Implement community challenges with token rewards",
      description:
        "This proposal aims to implement monthly community challenges with token rewards to increase engagement.",
      creator: {
        name: "David Chen",
        avatar: "/dc-skyline-night.png",
      },
      status: "active",
      votesFor: 1200,
      votesAgainst: 300,
      votesAbstain: 100,
      totalVotes: 1600,
      endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
      category: "Community",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    },
    {
      id: 4,
      title: "Reduce platform fees for small creators",
      description:
        "This proposal suggests reducing platform fees for creators with fewer than 1000 subscribers to help them grow.",
      creator: {
        name: "Emily Wong",
        avatar: "/graffiti-ew.png",
      },
      status: "rejected",
      votesFor: 1000,
      votesAgainst: 2500,
      votesAbstain: 300,
      totalVotes: 3800,
      endTime: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
      category: "Treasury",
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
    },
    {
      id: 5,
      title: "Launch creator mentorship program",
      description:
        "This proposal aims to establish a mentorship program where experienced creators can guide newcomers.",
      creator: {
        name: "Michael Brown",
        avatar: "/monogram-mb.png",
      },
      status: "pending",
      votesFor: 0,
      votesAgainst: 0,
      votesAbstain: 0,
      totalVotes: 0,
      endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
      category: "Community",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
  ];

  // Helper functions
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const getTimeRemaining = (endTime: string) => {
    const end = new Date(endTime).getTime();
    const now = Date.now();
    const diff = end - now;

    if (diff <= 0) return "Ended";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) {
      return `${days}d ${hours}h`;
    }

    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  // Filter proposals by status
  const activeProposals = proposals.filter((p) => p.status === "active");
  const pendingProposals = proposals.filter((p) => p.status === "pending");
  const passedProposals = proposals.filter((p) => p.status === "passed");
  const rejectedProposals = proposals.filter((p) => p.status === "rejected");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex pt-16">
        <main className="flex-1 sm:ml-16 md:ml-64 p-4">
          <Sidebar profile={profile} />

          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="mb-4">
                <h1 className="text-3xl font-bold tracking-tight">
                  Governance
                </h1>
                <p className="text-muted-foreground">
                  Vote on proposals and help shape the future of the platform.
                </p>
              </div>
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <PlusCircle className="h-4 w-4" />
                Create Proposal
              </Button>
            </div>

            <StatsCards stats={stats} formatNumber={formatNumber} />

            <Card>
              <CardHeader>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle>Proposals</CardTitle>
                  <div className="inline-flex space-x-1 rounded-md bg-muted p-1">
                    <Button
                      variant={activeTab === "active" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveTab("active")}
                      className="flex items-center gap-1"
                    >
                      <Clock className="h-4 w-4" />
                      <span>Active ({activeProposals.length})</span>
                    </Button>
                    <Button
                      variant={activeTab === "pending" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveTab("pending")}
                      className="flex items-center gap-1"
                    >
                      <Hourglass className="h-4 w-4" />
                      <span>Pending ({pendingProposals.length})</span>
                    </Button>
                    <Button
                      variant={activeTab === "passed" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveTab("passed")}
                      className="flex items-center gap-1"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Passed ({passedProposals.length})</span>
                    </Button>
                    <Button
                      variant={activeTab === "rejected" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveTab("rejected")}
                      className="flex items-center gap-1"
                    >
                      <XCircle className="h-4 w-4" />
                      <span>Rejected ({rejectedProposals.length})</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeTab === "active" &&
                    (activeProposals.length > 0 ? (
                      <ProposalTable
                        proposals={activeProposals}
                        formatNumber={formatNumber}
                        getTimeRemaining={getTimeRemaining}
                      />
                    ) : (
                      <EmptyProposals
                        activeTab="active"
                        onCreateProposal={() => setIsCreateDialogOpen(true)}
                      />
                    ))}

                  {activeTab === "pending" &&
                    (pendingProposals.length > 0 ? (
                      <ProposalTable
                        proposals={pendingProposals}
                        formatNumber={formatNumber}
                        getTimeRemaining={getTimeRemaining}
                      />
                    ) : (
                      <EmptyProposals
                        activeTab="pending"
                        onCreateProposal={() => setIsCreateDialogOpen(true)}
                      />
                    ))}

                  {activeTab === "passed" &&
                    (passedProposals.length > 0 ? (
                      <ProposalTable
                        proposals={passedProposals}
                        formatNumber={formatNumber}
                        getTimeRemaining={getTimeRemaining}
                      />
                    ) : (
                      <EmptyProposals
                        activeTab="passed"
                        onCreateProposal={() => setIsCreateDialogOpen(true)}
                      />
                    ))}

                  {activeTab === "rejected" &&
                    (rejectedProposals.length > 0 ? (
                      <ProposalTable
                        proposals={rejectedProposals}
                        formatNumber={formatNumber}
                        getTimeRemaining={getTimeRemaining}
                      />
                    ) : (
                      <EmptyProposals
                        activeTab="rejected"
                        onCreateProposal={() => setIsCreateDialogOpen(true)}
                      />
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <MobileNavigation />

      <CreateProposalDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}
