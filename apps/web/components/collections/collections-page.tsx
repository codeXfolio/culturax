"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/mode-toggle"
import { ArrowLeft, Search, Plus, Grid, List, Filter, FolderPlus } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CollectionCard } from "@/components/collections/collection-card"
import { Badge } from "@/components/ui/badge"

export function CollectionsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Sample collections data
  const collections = [
    {
      id: "1",
      name: "Digital Art Collection",
      description: "My personal digital art creations and experiments",
      coverImage: "/placeholder.svg?height=300&width=500",
      itemCount: 24,
      lastUpdated: "2 days ago",
      tags: ["digital art", "personal"],
    },
    {
      id: "2",
      name: "NFT Purchases",
      description: "NFTs I've collected from various creators",
      coverImage: "/placeholder.svg?height=300&width=500",
      itemCount: 12,
      lastUpdated: "1 week ago",
      tags: ["nft", "collectibles"],
    },
    {
      id: "3",
      name: "Photography",
      description: "My photography work and experiments",
      coverImage: "/placeholder.svg?height=300&width=500",
      itemCount: 36,
      lastUpdated: "3 days ago",
      tags: ["photography", "personal"],
    },
    {
      id: "4",
      name: "Inspiration",
      description: "Images that inspire my creative work",
      coverImage: "/placeholder.svg?height=300&width=500",
      itemCount: 48,
      lastUpdated: "Yesterday",
      tags: ["inspiration", "reference"],
    },
    {
      id: "5",
      name: "Project References",
      description: "Reference images for ongoing projects",
      coverImage: "/placeholder.svg?height=300&width=500",
      itemCount: 15,
      lastUpdated: "5 days ago",
      tags: ["reference", "projects"],
    },
    {
      id: "6",
      name: "Favorite Creators",
      description: "Work from my favorite digital artists",
      coverImage: "/placeholder.svg?height=300&width=500",
      itemCount: 30,
      lastUpdated: "1 month ago",
      tags: ["inspiration", "artists"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 backdrop-blur-sm fixed top-0 w-full z-50 bg-background/80">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/profile">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <span className="font-bold text-xl">My Collections</span>
          </div>
          <ModeToggle />
        </div>
      </header>

      <main className="container pt-24 pb-16 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Image Collections</h1>
            <p className="text-muted-foreground">Organize and browse your digital image collections</p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="gap-2">
              <FolderPlus className="h-4 w-4" />
              New Collection
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search collections..." className="pl-9" />
          </div>

          <div className="flex items-center gap-2">
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="a-z">A-Z</SelectItem>
                <SelectItem value="z-a">Z-A</SelectItem>
                <SelectItem value="most-items">Most Items</SelectItem>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}

            <Card className="overflow-hidden border-dashed hover:border-primary/50 transition-colors cursor-pointer flex items-center justify-center h-[300px]">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">Create New Collection</h3>
                <p className="text-sm text-muted-foreground">Organize your images into a new collection</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-4">
            {collections.map((collection) => (
              <Card key={collection.id} className="overflow-hidden hover:shadow-md transition-all">
                <CardContent className="p-0">
                  <Link href={`/collections/${collection.id}`} className="flex items-center gap-4 p-4">
                    <div className="h-16 w-24 bg-muted rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={collection.coverImage || "/placeholder.svg"}
                        alt={collection.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-lg truncate">{collection.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{collection.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{collection.itemCount} items</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">Updated {collection.lastUpdated}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex flex-wrap gap-1 justify-end">
                        {collection.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}

            <Card className="overflow-hidden border-dashed hover:border-primary/50 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-24 bg-primary/10 rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Create New Collection</h3>
                    <p className="text-sm text-muted-foreground">Organize your images into a new collection</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
