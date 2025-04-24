"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/mode-toggle"
import { ArrowLeft, Search, Send, Plus, MoreHorizontal, Phone, Video, Image, Paperclip, Smile } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState<number | null>(1)
  const [messageInput, setMessageInput] = useState("")

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      user: {
        name: "Alex Rivera",
        username: "alexrivera",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: true,
        isVerified: true,
      },
      lastMessage: {
        text: "Thanks for subscribing to my premium tier!",
        time: "10:30 AM",
        isRead: true,
      },
      unreadCount: 0,
    },
    {
      id: 2,
      user: {
        name: "Sarah Johnson",
        username: "sarahjcreates",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: false,
        isVerified: true,
      },
      lastMessage: {
        text: "I just released a new tutorial on digital painting techniques",
        time: "Yesterday",
        isRead: false,
      },
      unreadCount: 2,
    },
    {
      id: 3,
      user: {
        name: "Michael Chen",
        username: "michaelchenmusic",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: true,
        isVerified: false,
      },
      lastMessage: {
        text: "Check out my latest music NFT drop!",
        time: "2 days ago",
        isRead: true,
      },
      unreadCount: 0,
    },
    {
      id: 4,
      user: {
        name: "Emma Wilson",
        username: "emmawilsonart",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: false,
        isVerified: true,
      },
      lastMessage: {
        text: "Would you be interested in a collaboration?",
        time: "3 days ago",
        isRead: true,
      },
      unreadCount: 0,
    },
    {
      id: 5,
      user: {
        name: "David Kim",
        username: "davidkimdesign",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: false,
        isVerified: false,
      },
      lastMessage: {
        text: "Thanks for the feedback on my latest design",
        time: "1 week ago",
        isRead: true,
      },
      unreadCount: 0,
    },
  ]

  // Mock messages for the active conversation
  const messages = [
    {
      id: 1,
      senderId: 1, // Alex Rivera
      text: "Hey there! Thanks for checking out my work.",
      time: "10:15 AM",
      isOwn: false,
    },
    {
      id: 2,
      senderId: "user",
      text: "Your latest NFT collection is amazing! I really like the futuristic landscapes.",
      time: "10:20 AM",
      isOwn: true,
    },
    {
      id: 3,
      senderId: 1,
      text: "Thank you! I've been working on that style for a while now. I'm glad you appreciate it.",
      time: "10:25 AM",
      isOwn: false,
    },
    {
      id: 4,
      senderId: "user",
      text: "I just subscribed to your premium tier. Looking forward to the exclusive content!",
      time: "10:28 AM",
      isOwn: true,
    },
    {
      id: 5,
      senderId: 1,
      text: "Thanks for subscribing to my premium tier! You'll get access to behind-the-scenes content, tutorials, and early access to my NFT drops.",
      time: "10:30 AM",
      isOwn: false,
    },
  ]

  const activeUser = conversations.find((conv) => conv.id === activeConversation)?.user

  const handleSendMessage = () => {
    if (!messageInput.trim()) return
    // In a real app, this would send the message to the backend
    console.log(`Sending message to ${activeUser?.name}: ${messageInput}`)
    setMessageInput("")
  }

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
            <span className="font-bold text-xl">Messages</span>
          </div>
          <ModeToggle />
        </div>
      </header>

      <main className="container pt-16 pb-16 h-screen max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6 h-[calc(100vh-8rem)]">
          {/* Conversations List */}
          <div className={`md:block ${activeConversation ? "hidden" : "block"} border-r border-border/40`}>
            <div className="flex items-center justify-between p-4">
              <h2 className="font-bold text-lg">Conversations</h2>
              <Button variant="ghost" size="icon">
                <Plus className="h-5 w-5" />
              </Button>
            </div>

            <div className="px-4 pb-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search messages..." className="pl-9" />
              </div>
            </div>

            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="space-y-1 p-2">
                {conversations.map((conversation) => (
                  <div key={conversation.id}>
                    <button
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        activeConversation === conversation.id ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                      }`}
                      onClick={() => setActiveConversation(conversation.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                            <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {conversation.user.isOnline && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <p className="font-medium truncate">{conversation.user.name}</p>
                              {conversation.user.isVerified && (
                                <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{conversation.lastMessage.time}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage.text}</p>
                            {conversation.unreadCount > 0 && <Badge className="ml-2">{conversation.unreadCount}</Badge>}
                          </div>
                        </div>
                      </div>
                    </button>
                    <Separator className="my-1" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className={`md:col-span-2 ${activeConversation ? "block" : "hidden md:block"} h-full flex flex-col`}>
            {activeConversation && activeUser ? (
              <>
                {/* Chat Header */}
                <div className="border-b border-border/40 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setActiveConversation(null)}
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </Button>
                      <Avatar>
                        <AvatarImage src={activeUser.avatar} alt={activeUser.name} />
                        <AvatarFallback>{activeUser.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1">
                          <p className="font-medium">{activeUser.name}</p>
                          {activeUser.isVerified && (
                            <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <span
                            className={`h-2 w-2 rounded-full ${activeUser.isOnline ? "bg-green-500" : "bg-muted"}`}
                          ></span>
                          <p className="text-xs text-muted-foreground">{activeUser.isOnline ? "Online" : "Offline"}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Phone className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Video className="h-5 w-5" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Search in Conversation</DropdownMenuItem>
                          <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Block User</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                        {!message.isOwn && (
                          <Avatar className="h-8 w-8 mr-2 mt-1">
                            <AvatarImage src={activeUser.avatar} alt={activeUser.name} />
                            <AvatarFallback>{activeUser.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                        <div className={`max-w-[70%]`}>
                          <Card
                            className={`${message.isOwn ? "bg-primary text-primary-foreground" : "bg-muted"} border-0`}
                          >
                            <CardContent className="p-3">
                              <p className="text-sm">{message.text}</p>
                            </CardContent>
                          </Card>
                          <p className="text-xs text-muted-foreground mt-1 ml-1">{message.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="border-t border-border/40 p-4">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Image className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Smile className="h-5 w-5" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      className="flex-1"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button variant="primary" size="icon" onClick={handleSendMessage} disabled={!messageInput.trim()}>
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h3 className="font-medium text-lg mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground">Choose a conversation from the list to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
