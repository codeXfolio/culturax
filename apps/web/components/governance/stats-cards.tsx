import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { GovernanceStats } from "@/components/governance/types";

interface StatsCardsProps {
  stats: GovernanceStats;
  formatNumber: (num: number) => string;
}

export function StatsCards({ stats, formatNumber }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Voting Power
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between">
            <div className="text-2xl font-bold">
              {formatNumber(stats.votingPower)} CX
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Treasury Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${formatNumber(stats.treasuryBalance)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            <span className="text-green-500">+2.4%</span> from last month
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Platform Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <div className="text-muted-foreground">Total Proposals</div>
              <div className="font-medium">{stats.totalProposals}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Active Proposals</div>
              <div className="font-medium">{stats.activeProposals}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Total Voters</div>
              <div className="font-medium">
                {formatNumber(stats.totalVoters)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
