"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TokenCreationForm } from "@/components/token-generator/token-creation-form";
import { TokenList } from "@/components/token-generator/token-list";
import { TokenUsageExamples } from "@/components/token-generator/token-usage-examples";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Header from "../navigation/header";
import MobileNavigation from "../navigation/mobile-navigation";

export function TokenGeneratorPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto pt-20 pb-20 sm:pb-4">
        <div className="max-w-5xl mx-auto">
          {/* Wallet-style Tabs */}
          <div className="flex overflow-x-auto pb-4 gap-2">
            <Button
              variant={activeTab === "create" ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setActiveTab("create")}
            >
              Create Token
            </Button>
            <Button
              variant={activeTab === "manage" ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setActiveTab("manage")}
            >
              Manage Tokens
            </Button>
            <Button
              variant={activeTab === "examples" ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setActiveTab("examples")}
            >
              Usage Examples
            </Button>
          </div>

          {/* Content based on active tab */}
          <div className="mt-4">
            {activeTab === "create" && (
              <Card>
                <CardContent className="pt-6">
                  <TokenCreationForm />
                </CardContent>
              </Card>
            )}

            {activeTab === "manage" && (
              <Card>
                <CardContent className="pt-6">
                  <TokenList />
                </CardContent>
              </Card>
            )}

            {activeTab === "examples" && (
              <Card>
                <CardContent className="pt-6">
                  <TokenUsageExamples />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <MobileNavigation />
    </div>
  );
}
