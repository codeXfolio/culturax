"use client"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import { CreatorEarnings } from "@/components/earnings/creator-earnings"

export function CreatorEarningsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 backdrop-blur-sm fixed top-0 w-full z-50 bg-background/80">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/creator-profile">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <span className="font-bold text-xl">Earnings</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="container pt-24 pb-16 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Creator Earnings</h1>
          <p className="text-muted-foreground">Track your revenue, transactions, and payout history</p>
        </div>

        <CreatorEarnings />
      </main>
    </div>
  )
}
