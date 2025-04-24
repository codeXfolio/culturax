"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MoreHorizontal, Download, ExternalLink } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import Link from "next/link"

interface ImageItemProps {
  image: {
    id: string
    title: string
    description: string
    src: string
    type: string
    createdAt: string
    tags: string[]
    isFavorite: boolean
  }
  viewMode: "grid" | "list"
}

export function ImageItem({ image, viewMode }: ImageItemProps) {
  const [isFavorite, setIsFavorite] = useState(image.isFavorite)

  if (viewMode === "grid") {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-all group">
        <div className="relative">
          <img src={image.src || "/placeholder.svg"} alt={image.title} className="w-full aspect-square object-cover" />

          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                {image.type}
              </Badge>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-background/80 backdrop-blur-sm rounded-full"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-background/80 backdrop-blur-sm rounded-full"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2" asChild>
                      <Link href={`/collections/${image.id.split("-")[0]}`}>
                        <ExternalLink className="h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Move to Collection</DropdownMenuItem>
                    <DropdownMenuItem>Edit Details</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium truncate">{image.title}</h3>
            <Button variant="ghost" size="sm" className="h-7 px-2 ml-2" asChild>
              <Link href={`/collections/${image.id.split("-")[0]}`}>View</Link>
            </Button>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-muted-foreground">{image.createdAt}</span>
            <div className="flex flex-wrap gap-1 justify-end">
              {image.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Update the list view mode to include a View button that navigates to the collection
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <CardContent className="p-0">
        <div className="flex items-center gap-4 p-4">
          <div className="h-16 w-16 md:h-20 md:w-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
            <img src={image.src || "/placeholder.svg"} alt={image.title} className="h-full w-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{image.title}</h3>
              <Badge variant="outline">{image.type}</Badge>
            </div>
            {image.description && (
              <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{image.description}</p>
            )}
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-muted-foreground">{image.createdAt}</span>
              <div className="flex flex-wrap gap-1 justify-end">
                {image.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsFavorite(!isFavorite)}>
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button variant="ghost" size="sm" className="h-8" asChild>
              <Link href={`/collections/${image.id.split("-")[0]}`}>View</Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="gap-2" asChild>
                  <Link href={`/collections/${image.id.split("-")[0]}`}>
                    <ExternalLink className="h-4 w-4" />
                    View Details
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Move to Collection</DropdownMenuItem>
                <DropdownMenuItem>Edit Details</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
