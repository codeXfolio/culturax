"use client"

import { Button } from "@/components/ui/button"
import { Coins, Compass, Home, MessageSquare, Sparkles, User, Wallet } from "lucide-react"
import Link from "next/link"

interface StakingSidebarProps {
  creatorFilter: string
  setCreatorFilter: (filter: string) => void
}

export function StakingSidebar({ creatorFilter, setCreatorFilter }: StakingSidebarProps) {
  return (
    <aside className="w-16 md:w-64 fixed left-0 top-16 h-[calc(100vh-4rem)] border-r border-border/40 p-2 md:p-4 hidden sm:block">
      <nav className="space-y-2">
        <Button variant="ghost" className="w-full justify-start gap-3" asChild>
          <Link href="/feed">
            <Home className="h-5 w-5" />
            <span className="hidden md:inline">Home</span>
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3" asChild>
          <Link href="/explore">
            <Compass className="h-5 w-5" />
            <span className="hidden md:inline">Explore</span>
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3" asChild>
          <Link href="/ai-tools">
            <Sparkles className="h-5 w-5" />
            <span className="hidden md:inline">AI Tools</span>
          </Link>
        </Button>
        <Button variant="secondary" className="w-full justify-start gap-3" asChild>
          <Link href="/staking">
            <Coins className="h-5 w-5" />
            <span className="hidden md:inline">Staking</span>
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3" asChild>
          <Link href="/messages">
            <MessageSquare className="h-5 w-5" />
            <span className="hidden md:inline">Messages</span>
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3" asChild>
          <Link href="/wallet-manager">
            <Wallet className="h-5 w-5" />
            <span className="hidden md:inline">Wallet</span>
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3" asChild>
          <Link href="/profile">
            <User className="h-5 w-5" />
            <span className="hidden md:inline">Profile</span>
          </Link>
        </Button>
      </nav>

      <div className="mt-8 hidden md:block">
        <h3 className="text-sm font-medium mb-4">Staking Filters</h3>
        <div className="space-y-2">
          <Button
            variant={creatorFilter === "all" ? "secondary" : "ghost"}
            size="sm"
            className="w-full justify-start"
            onClick={() => setCreatorFilter("all")}
          >
            All Creators
          </Button>
          <Button
            variant={creatorFilter === "staked" ? "secondary" : "ghost"}
            size="sm"
            className="w-full justify-start"
            onClick={() => setCreatorFilter("staked")}
          >
            My Staked Creators
          </Button>
          <Button
            variant={creatorFilter === "trending" ? "secondary" : "ghost"}
            size="sm"
            className="w-full justify-start"
            onClick={() => setCreatorFilter("trending")}
          >
            Trending Creators
          </Button>
        </div>
      </div>
    </aside>
  )
}
