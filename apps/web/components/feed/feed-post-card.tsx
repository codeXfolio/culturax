"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageSquare, Share2, Lock } from "lucide-react"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

interface FeedPostCardProps {
  post: {
    id: number
    title: string
    content: string
    image?: string
    date: string
    likes: number
    comments: number
    isSubscriberOnly: boolean
    commentsList?: {
      id: number
      user: {
        name: string
        avatar: string
        isVerified?: boolean
      }
      content: string
      date: string
      likes: number
    }[]
  }
}

export function FeedPostCard({ post }: FeedPostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")

  // Default comments if none provided
  const commentsList = post.commentsList || [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: true,
      },
      content: "This is amazing content! Thanks for sharing your insights.",
      date: "2 hours ago",
      likes: 12,
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "I've been following your work for a while now. Always top quality!",
      date: "5 hours ago",
      likes: 8,
    },
  ]

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      // In a real app, you would send this to an API
      console.log("New comment:", newComment)
      setNewComment("")
      // For demo purposes, we're not actually adding the comment to the list
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Creator" />
              <AvatarFallback>CR</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-medium text-sm">Alex Rivera</span>
                <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xs text-muted-foreground">{post.date}</span>
            </div>
          </div>

          {post.isSubscriberOnly && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Lock className="h-3 w-3" />
              <span>Subscribers Only</span>
            </Badge>
          )}
        </div>

        <div className="mb-3">
          <h3 className="font-medium mb-2">{post.title}</h3>
          <p className="text-sm text-muted-foreground">{post.content}</p>
        </div>

        {post.image && !post.isSubscriberOnly && (
          <div className="relative mb-3 rounded-md overflow-hidden">
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
        )}

        {post.image && post.isSubscriberOnly && (
          <div className="relative mb-3 rounded-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent flex flex-col items-center justify-center z-10">
              <Lock className="h-8 w-8 mb-2 text-primary" />
              <p className="font-medium mb-1">Exclusive Content</p>
              <p className="text-sm text-muted-foreground mb-3">Subscribe to unlock</p>
              <Button size="sm">Subscribe</Button>
            </div>
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-auto object-cover rounded-md blur-sm"
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between p-4 pt-0 border-t border-border/40">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="gap-1 px-2">
            <Heart className="h-4 w-4" />
            <span>{post.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1 px-2" onClick={() => setShowComments(!showComments)}>
            <MessageSquare className="h-4 w-4" />
            <span>{post.comments}</span>
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
      <Collapsible open={showComments} onOpenChange={setShowComments}>
        <CollapsibleContent>
          <div className="px-4 py-3 border-t border-border/40">
            <h4 className="font-medium text-sm mb-3">Comments ({commentsList.length})</h4>

            <div className="space-y-4 mb-4">
              {commentsList.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                    <AvatarFallback>{comment.user.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-sm font-medium">{comment.user.name}</span>
                      {comment.user.isVerified && (
                        <svg className="h-3.5 w-3.5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      <span className="text-xs text-muted-foreground ml-1">{comment.date}</span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                    <div className="mt-1">
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        <Heart className="h-3 w-3 mr-1" />
                        <span>{comment.likes}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-3" />

            <form onSubmit={handleSubmitComment} className="flex flex-col gap-2">
              <Textarea
                placeholder="Add a comment..."
                className="min-h-[80px] text-sm"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div className="flex justify-end">
                <Button type="submit" size="sm" disabled={!newComment.trim()}>
                  Post Comment
                </Button>
              </div>
            </form>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
