"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, Bell, DollarSign, User, Settings, FileText } from "lucide-react"

export function CreatorSettings() {
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=200&width=200")
  const [coverImage, setCoverImage] = useState("/placeholder.svg?height=400&width=1200")

  return (
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList className="grid grid-cols-5 w-full max-w-3xl">
        <TabsTrigger value="profile" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>Profile</span>
        </TabsTrigger>
        <TabsTrigger value="creator" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span>Creator</span>
        </TabsTrigger>
        <TabsTrigger value="monetization" className="flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          <span>Monetization</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <span>Notifications</span>
        </TabsTrigger>
        <TabsTrigger value="advanced" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span>Advanced</span>
        </TabsTrigger>
      </TabsList>

      {/* Profile Settings */}
      <TabsContent value="profile" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal information and public profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profileImage || "/placeholder.svg"} alt="Profile" />
                    <AvatarFallback>AR</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Upload className="h-3 w-3" />
                    Change
                  </Button>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="display-name">Display Name</Label>
                      <Input id="display-name" defaultValue="Alex Rivera" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue="alexrivera" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      defaultValue="Digital artist specializing in futuristic landscapes and NFT collections. Creating at the intersection of art and technology."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Cover Image</Label>
                <div className="relative h-40 rounded-md overflow-hidden border border-border">
                  <img src={coverImage || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 right-2">
                    <Button variant="secondary" size="sm" className="gap-1">
                      <Upload className="h-3 w-3" />
                      Change Cover
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Contact Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="alex.rivera@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="https://alexrivera.art" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Social Media Links</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Twitter" defaultValue="@alexrivera_art" />
                  <Input placeholder="Instagram" defaultValue="@alexrivera.art" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Creator Settings */}
      <TabsContent value="creator" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Creator Profile</CardTitle>
            <CardDescription>Customize your creator profile and content settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Creator Information</h3>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="creator-category">Primary Category</Label>
                  <Select defaultValue="digital-art">
                    <SelectTrigger id="creator-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="digital-art">Digital Art</SelectItem>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="3d-art">3D Art</SelectItem>
                      <SelectItem value="writing">Writing</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="creator-tags">Tags</Label>
                  <Input
                    id="creator-tags"
                    defaultValue="digital art, futuristic, landscapes, nft, cyberpunk"
                    placeholder="Enter tags separated by commas"
                  />
                  <p className="text-xs text-muted-foreground">Add tags to help users discover your content</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="creator-story">Creator Story</Label>
                  <Textarea
                    id="creator-story"
                    className="min-h-[120px]"
                    placeholder="Share your journey as a creator..."
                    defaultValue="I've been creating digital art for over 10 years, specializing in futuristic landscapes and cyberpunk aesthetics. My work explores the intersection of technology and humanity, envisioning possible futures through digital mediums."
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Content Settings</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Content Watermarking</h4>
                    <p className="text-sm text-muted-foreground">Automatically add watermarks to your content</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Content Downloads</h4>
                    <p className="text-sm text-muted-foreground">Allow subscribers to download your content</p>
                  </div>
                  <Select defaultValue="subscribers-only">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Allow All</SelectItem>
                      <SelectItem value="subscribers-only">Subscribers Only</SelectItem>
                      <SelectItem value="none">Disable Downloads</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Content License</h4>
                    <p className="text-sm text-muted-foreground">Default license for your content</p>
                  </div>
                  <Select defaultValue="personal">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select license" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Personal Use Only</SelectItem>
                      <SelectItem value="commercial">Commercial License</SelectItem>
                      <SelectItem value="cc">Creative Commons</SelectItem>
                      <SelectItem value="custom">Custom License</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Verification</h3>

              <div className="p-4 border border-border rounded-md">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Verified Creator</h4>
                    <p className="text-sm text-muted-foreground">Your account is verified</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Verification helps users identify authentic creators and builds trust in the platform.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Monetization Settings */}
      <TabsContent value="monetization" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Monetization Settings</CardTitle>
            <CardDescription>Manage your subscription and payment preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Subscription Settings</h3>

              <div className="p-4 border border-border rounded-md">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Monthly Subscription</h4>
                  <Badge className="bg-blue-500/10 text-blue-500">Active</Badge>
                </div>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="subscription-price">Price (USD)</Label>
                    <Input id="subscription-price" type="number" defaultValue="9.99" min="1" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subscription-description">Description</Label>
                    <Textarea
                      id="subscription-description"
                      defaultValue="Get exclusive access to all my content and behind-the-scenes material."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subscription-perks">Perks (one per line)</Label>
                    <Textarea
                      id="subscription-perks"
                      defaultValue="Exclusive posts and updates
Behind-the-scenes content
Early access to NFT drops
Direct messaging
Monthly Q&A sessions
Community access"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">NFT Settings</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Default Royalty</h4>
                    <p className="text-sm text-muted-foreground">Percentage you receive from secondary sales</p>
                  </div>
                  <div className="flex items-center w-[180px]">
                    <Input type="number" defaultValue="10" min="0" max="50" className="text-right" />
                    <span className="ml-2">%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Default NFT Standard</h4>
                    <p className="text-sm text-muted-foreground">Token standard for your NFTs</p>
                  </div>
                  <Select defaultValue="erc721">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select standard" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="erc721">ERC-721 (Single)</SelectItem>
                      <SelectItem value="erc1155">ERC-1155 (Multiple)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Payout Settings</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Payout Wallet</h4>
                    <p className="text-sm text-muted-foreground">Wallet to receive earnings</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input defaultValue="0x1a2b...8f9d" className="w-[180px]" readOnly />
                    <Button variant="outline" size="sm">
                      Change
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Minimum Payout</h4>
                    <p className="text-sm text-muted-foreground">Minimum amount for automatic payouts</p>
                  </div>
                  <div className="flex items-center w-[180px]">
                    <span className="mr-2">$</span>
                    <Input type="number" defaultValue="50" min="10" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Payout Schedule</h4>
                    <p className="text-sm text-muted-foreground">How often you receive payments</p>
                  </div>
                  <Select defaultValue="monthly">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Notifications Settings */}
      <TabsContent value="notifications" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Manage how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Creator Notifications</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">New Subscribers</h4>
                    <p className="text-sm text-muted-foreground">When someone subscribes to your content</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">NFT Sales</h4>
                    <p className="text-sm text-muted-foreground">When your NFTs are purchased</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Content Engagement</h4>
                    <p className="text-sm text-muted-foreground">Likes, comments, and shares on your content</p>
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Engagement</SelectItem>
                      <SelectItem value="important">Important Only</SelectItem>
                      <SelectItem value="none">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Earnings Reports</h4>
                    <p className="text-sm text-muted-foreground">Periodic reports of your earnings</p>
                  </div>
                  <Select defaultValue="weekly">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="none">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Direct Messages</h4>
                    <p className="text-sm text-muted-foreground">When you receive messages from subscribers</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Platform Notifications</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Platform Updates</h4>
                    <p className="text-sm text-muted-foreground">News and updates about CreatorX</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Creator Tips</h4>
                    <p className="text-sm text-muted-foreground">Tips and best practices for creators</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Marketing Opportunities</h4>
                    <p className="text-sm text-muted-foreground">Promotional opportunities for creators</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Disable All</Button>
              <Button>Save Preferences</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Advanced Settings */}
      <TabsContent value="advanced" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Advanced Settings</CardTitle>
            <CardDescription>Configure advanced creator settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">API Access</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">API Access</h4>
                    <p className="text-sm text-muted-foreground">Enable API access to your creator data</p>
                  </div>
                  <Switch />
                </div>

                <div className="p-4 border border-border rounded-md bg-muted/30">
                  <p className="text-sm text-muted-foreground mb-2">
                    API access allows you to integrate your CreatorX content with external applications and services.
                  </p>
                  <Button variant="outline" size="sm" disabled>
                    Generate API Key
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Content Backup</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Automatic Backups</h4>
                    <p className="text-sm text-muted-foreground">Regularly backup your content</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Button variant="outline" size="sm">
                  Download Content Archive
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Account Management</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Creator Status</h4>
                    <p className="text-sm text-muted-foreground">Your current creator account status</p>
                  </div>
                  <Badge className="bg-green-500/10 text-green-500">Active</Badge>
                </div>

                <div className="pt-2 space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Transfer Creator Account
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-destructive border-destructive/20 hover:bg-destructive/10"
                  >
                    Deactivate Creator Account
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
