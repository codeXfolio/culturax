"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ModeToggle } from "@/components/mode-toggle"
import { ArrowLeft, Upload, X, Plus, ImagePlus, Tag } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export function UploadCollectionPage() {
  const [collectionName, setCollectionName] = useState("")
  const [description, setDescription] = useState("")
  const [tag, setTag] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [images, setImages] = useState<{ id: number; preview: string; file: File | null }[]>([])
  const [dragActive, setDragActive] = useState(false)

  const handleAddTag = () => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()])
      setTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file, index) => ({
        id: Date.now() + index,
        preview: URL.createObjectURL(file),
        file,
      }))
      setImages([...images, ...newImages])
    }
  }

  const handleRemoveImage = (id: number) => {
    setImages(images.filter((img) => img.id !== id))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newImages = Array.from(e.dataTransfer.files).map((file, index) => ({
        id: Date.now() + index,
        preview: URL.createObjectURL(file),
        file,
      }))
      setImages([...images, ...newImages])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would upload the images and create the collection
    console.log({
      collectionName,
      description,
      tags,
      images: images.map((img) => img.file),
    })
    // Then redirect or show success message
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 backdrop-blur-sm fixed top-0 w-full z-50 bg-background/80">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/feed">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <span className="font-bold text-xl">Upload Collection</span>
          </div>
          <ModeToggle />
        </div>
      </header>

      <main className="container pt-24 pb-16 max-w-4xl">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Collection Details */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Collection Details</h2>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="collection-name">Collection Name</Label>
                      <Input
                        id="collection-name"
                        placeholder="Enter collection name"
                        value={collectionName}
                        onChange={(e) => setCollectionName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your collection..."
                        className="min-h-[120px]"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags</Label>
                      <div className="flex gap-2">
                        <Input
                          id="tags"
                          placeholder="Add tags..."
                          value={tag}
                          onChange={(e) => setTag(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              handleAddTag()
                            }
                          }}
                        />
                        <Button type="button" onClick={handleAddTag} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {tags.map((t) => (
                            <Badge key={t} variant="secondary" className="flex items-center gap-1">
                              <Tag className="h-3 w-3" />
                              {t}
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 p-0 ml-1"
                                onClick={() => handleRemoveTag(t)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upload Instructions */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Upload Instructions</h2>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">
                        1
                      </span>
                      <span>Create a collection by filling out the details on the left</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">
                        2
                      </span>
                      <span>Upload images by dragging and dropping or using the upload button</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">
                        3
                      </span>
                      <span>Arrange your images in the desired order</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">
                        4
                      </span>
                      <span>Click "Create Collection" when you're ready to publish</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Image Upload */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Upload Images</h2>

                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center ${
                      dragActive ? "border-primary bg-primary/5" : "border-border"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      id="image-upload"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <ImagePlus className="h-10 w-10 text-muted-foreground" />
                        <p className="text-sm font-medium">Drag and drop images or click to upload</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, GIF, WEBP (max. 10MB each)</p>
                        <Button type="button" size="sm" variant="secondary" className="mt-2">
                          <Upload className="h-4 w-4 mr-2" /> Select Files
                        </Button>
                      </div>
                    </label>
                  </div>

                  {images.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-2">Uploaded Images ({images.length})</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {images.map((img) => (
                          <div key={img.id} className="relative group">
                            <div className="aspect-square rounded-md overflow-hidden border border-border">
                              <img
                                src={img.preview || "/placeholder.svg"}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="h-6 w-6 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => handleRemoveImage(img.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" asChild>
                  <Link href="/feed">Cancel</Link>
                </Button>
                <Button type="submit" disabled={!collectionName || images.length === 0}>
                  Create Collection
                </Button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
