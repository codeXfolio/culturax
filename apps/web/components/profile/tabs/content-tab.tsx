"use client"

import { Button } from "@/components/ui/button"
import { ContentCard } from "@/components/dashboard/content-card"
import { Upload, ImageIcon } from "lucide-react"
import Link from "next/link"
import { ContentItem } from "@/types/profile"

interface ContentTabProps {
  contentItems: ContentItem[]
}

export function ContentTab({ contentItems }: ContentTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">My Content</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Upload className="h-4 w-4" />
            Upload
          </Button>
          <Button size="sm" className="gap-2" asChild>
            <Link href="/nft-mint">
              <ImageIcon className="h-4 w-4" />
              Mint NFT
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {contentItems.map((content) => (
          <ContentCard key={content.id} content={content} />
        ))}
      </div>
    </div>
  )
}
