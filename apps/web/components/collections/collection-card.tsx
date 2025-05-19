import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface CollectionCardProps {
  collection: {
    id: string
    name: string
    description: string
    coverImage: string
    itemCount: number
    lastUpdated: string
    tags: string[]
  }
}

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <Link href={`/collections/${collection.id}`}>
        <div className="h-40 bg-muted overflow-hidden">
          <img
            src={collection.coverImage || "/placeholder.svg"}
            alt={collection.name}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-lg mb-1 truncate">{collection.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{collection.description}</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {collection.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="px-4 py-3 border-t border-border/40 flex justify-between">
          <span className="text-xs text-muted-foreground">{collection.itemCount} items</span>
          <span className="text-xs text-muted-foreground">Updated {collection.lastUpdated}</span>
        </CardFooter>
      </Link>
    </Card>
  )
}
