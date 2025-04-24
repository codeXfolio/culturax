import { Badge } from "@/components/ui/badge"
import { Eye, Heart, MessageSquare } from "lucide-react"

export function TopPostsTable() {
  // Sample data
  const topPosts = [
    {
      id: 1,
      title: "Digital Art Collection #1",
      type: "NFT",
      date: "Apr 5, 2025",
      views: 1240,
      likes: 89,
      comments: 32,
    },
    {
      id: 2,
      title: "Behind the Scenes: Creative Process",
      type: "Video",
      date: "Apr 2, 2025",
      views: 856,
      likes: 64,
      comments: 14,
    },
    {
      id: 3,
      title: "Exclusive Tutorial for Subscribers",
      type: "Tutorial",
      date: "Mar 28, 2025",
      views: 732,
      likes: 57,
      comments: 23,
    },
    {
      id: 4,
      title: "New NFT Collection Preview",
      type: "NFT",
      date: "Mar 25, 2025",
      views: 645,
      likes: 48,
      comments: 11,
    },
    {
      id: 5,
      title: "Artist Statement: My Creative Journey",
      type: "Article",
      date: "Mar 20, 2025",
      views: 512,
      likes: 37,
      comments: 9,
    },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left font-medium py-2 px-4">Title</th>
            <th className="text-left font-medium py-2 px-4">Type</th>
            <th className="text-left font-medium py-2 px-4">Date</th>
            <th className="text-right font-medium py-2 px-4">Views</th>
            <th className="text-right font-medium py-2 px-4">Likes</th>
            <th className="text-right font-medium py-2 px-4">Comments</th>
          </tr>
        </thead>
        <tbody>
          {topPosts.map((post) => (
            <tr key={post.id} className="border-b border-border/50 hover:bg-muted/30">
              <td className="py-3 px-4">{post.title}</td>
              <td className="py-3 px-4">
                <Badge variant="outline" className="font-normal">
                  {post.type}
                </Badge>
              </td>
              <td className="py-3 px-4 text-muted-foreground">{post.date}</td>
              <td className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <Eye className="h-3 w-3 text-muted-foreground" />
                  <span>{post.views}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <Heart className="h-3 w-3 text-muted-foreground" />
                  <span>{post.likes}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <MessageSquare className="h-3 w-3 text-muted-foreground" />
                  <span>{post.comments}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
