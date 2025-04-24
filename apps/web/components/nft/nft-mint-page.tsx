"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ModeToggle } from "@/components/mode-toggle"
import { ArrowLeft, Upload, Wallet, Info } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { NftPreview } from "@/components/nft/nft-preview"

export function NftMintPage() {
  const [nftData, setNftData] = useState({
    title: "",
    description: "",
    image: null,
    price: "",
    royalty: "10",
    supply: "1",
    standard: "ERC-721",
    hasUnlockable: false,
    unlockableContent: "",
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNftData({
        ...nftData,
        image: URL.createObjectURL(e.target.files[0]),
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNftData({
      ...nftData,
      [name]: value,
    })
  }

  const handleSwitchChange = (checked: boolean) => {
    setNftData({
      ...nftData,
      hasUnlockable: checked,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setNftData({
      ...nftData,
      [name]: value,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 backdrop-blur-sm fixed top-0 w-full z-50 bg-background/80">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/creator-profile">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <span className="font-bold text-xl">Mint NFT</span>
          </div>
          <ModeToggle />
        </div>
      </header>

      <main className="container pt-24 pb-16 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* NFT Form */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="image">Upload Media</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  accept="image/*,video/*"
                  onChange={handleImageChange}
                />
                <label htmlFor="image" className="cursor-pointer">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, GIF, SVG, MP4 or WEBM (max. 100MB)</p>
                    <Button size="sm" variant="secondary" className="mt-2">
                      Select File
                    </Button>
                  </div>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter NFT title"
                value={nftData.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your NFT..."
                className="min-h-[100px]"
                value={nftData.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (ETH)</Label>
                <Input
                  id="price"
                  name="price"
                  placeholder="0.05"
                  type="number"
                  step="0.001"
                  min="0"
                  value={nftData.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="royalty">Royalty %</Label>
                <Input
                  id="royalty"
                  name="royalty"
                  placeholder="10"
                  type="number"
                  min="0"
                  max="50"
                  value={nftData.royalty}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="standard">Token Standard</Label>
                <Select
                  defaultValue={nftData.standard}
                  onValueChange={(value) => handleSelectChange("standard", value)}
                >
                  <SelectTrigger id="standard">
                    <SelectValue placeholder="Select standard" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ERC-721">ERC-721 (Single)</SelectItem>
                    <SelectItem value="ERC-1155">ERC-1155 (Multiple)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="supply">Supply</Label>
                <Input
                  id="supply"
                  name="supply"
                  placeholder="1"
                  type="number"
                  min="1"
                  disabled={nftData.standard === "ERC-721"}
                  value={nftData.supply}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="unlockable">Unlockable Content</Label>
                  <p className="text-xs text-muted-foreground">Content only revealed to the owner after purchase</p>
                </div>
                <Switch id="unlockable" checked={nftData.hasUnlockable} onCheckedChange={handleSwitchChange} />
              </div>

              {nftData.hasUnlockable && (
                <Textarea
                  id="unlockableContent"
                  name="unlockableContent"
                  placeholder="Enter content that will be unlocked after purchase (links, codes, etc.)"
                  className="min-h-[100px]"
                  value={nftData.unlockableContent}
                  onChange={handleInputChange}
                />
              )}
            </div>

            <Button className="w-full gap-2">
              <Wallet className="h-4 w-4" />
              Mint NFT
            </Button>
          </div>

          {/* NFT Preview */}
          <div>
            <div className="sticky top-24">
              <h3 className="text-lg font-medium mb-4">Preview</h3>
              <NftPreview nftData={nftData} />

              <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border/50">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">About NFT Minting</p>
                    <p className="text-xs text-muted-foreground">
                      Minting an NFT requires a small gas fee paid in ETH. Make sure your wallet is connected and has
                      sufficient funds. After minting, your NFT will be visible in your dashboard and available for
                      sale.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
