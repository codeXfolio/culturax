"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/mode-toggle"
import { ArrowLeft, Search, Grid, List, Filter, Edit, MoreHorizontal, Download, Trash2, Share } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ImageItem } from "@/components/collections/image-item"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CollectionDetailPageProps {
  id: string
}

export function CollectionDetailPage({ id }: CollectionDetailPageProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Sample collection data - in a real app, this would be fetched based on the ID
  const collection = {
    id,
    name: id === "1" ? "Digital Art Collection" : "NFT Purchases",
    description:
      "My personal digital art creations and experiments with various styles and techniques. This collection showcases my journey as a digital artist.",
    coverImage: "/placeholder.svg?height=400&width=1200",
    itemCount: 24,
    lastUpdated: "2 days ago",
    tags: ["digital art", "personal", "experiments"],
    createdAt: "March 15, 2025",
  }

  // Sample images data
  const images = Array.from({ length: 20 }, (_, i) => ({
    id: `img-${i + 1}`,
    title: `Image ${i + 1}`,
    description: i % 3 === 0 ? "A detailed description of this creative piece and the techniques used." : "",
    src: `/placeholder.svg?height=${300 + (i % 3) * 100}&width=${400 + (i % 4) * 100}`,
    type: i % 4 === 0 ? "NFT" : i % 4 === 1 ? "Digital Art" : i % 4 === 2 ? "Photography" : "Sketch",
    createdAt: `${Math.floor(i / 3) + 1} ${Math.floor(i / 3) + 1 === 1 ? "day" : "days"} ago`,
    tags: i % 2 === 0 ? ["art", "digital"] : ["creative", "personal"],
    isFavorite: i % 5 === 0,
  }))

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 backdrop-blur-sm fixed top-0 w-full z-50 bg-background/80">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/collections">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <span className="font-bold text-xl truncate max-w-[200px] md:max-w-md">{collection.name}</span>
          </div>
          <ModeToggle />
        </div>
      </header>

      <main className="container pt-24 pb-16 max-w-7xl">
        {/* Collection Header */}
        <div className="relative mb-8">
          <div className="h-48 md:h-64 rounded-lg overflow-hidden">
            <img
              src={collection.coverImage || "/placeholder.svg"}
              alt={collection.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-sm p-4 rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-1">{collection.name}</h1>
                <p className="text-muted-foreground text-sm md:text-base">{collection.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {collection.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button variant="outline" className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2">
                      <Share className="h-4 w-4" />
                      Share Collection
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Download className="h-4 w-4" />
                      Download All
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                      <Trash2 className="h-4 w-4" />
                      Delete Collection
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span>{collection.itemCount} items</span>
              <span>•</span>
              <span>Created {collection.createdAt}</span>
              <span>•</span>
              <span>Updated {collection.lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <h2 className="text-xl font-medium">All Items</h2>

            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-60">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search in collection..." className="pl-9" />
              </div>

              <Select defaultValue="newest">
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="a-z">A-Z</SelectItem>
                  <SelectItem value="z-a">Z-A</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center rounded-md border border-input p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                  <span className="sr-only">Grid view</span>
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                  <span className="sr-only">List view</span>
                </Button>
              </div>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.map((image) => (
                <ImageItem key={image.id} image={image} viewMode="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {images.map((image) => (
                <ImageItem key={image.id} image={image} viewMode="list" />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
