"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";
import { ArrowLeft, Upload, X, Plus, ImagePlus, Tag } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Header from "../navigation/header";
import { Sidebar } from "../navigation/sidebar";
import { fetchProfile } from "@/lib/utils";
import MobileNavigation from "../navigation/mobile-navigation";

export function UploadCollectionPage() {
   const router = useRouter();
   const { toast } = useToast();
   const [isLoading, setIsLoading] = useState(false);
   const [collectionName, setCollectionName] = useState("");
   const [description, setDescription] = useState("");
   const [tag, setTag] = useState("");
   const [tags, setTags] = useState<string[]>([]);
   const [images, setImages] = useState<
      { id: number; preview: string; file: File | null }[]
   >([]);
   const [zipFile, setZipFile] = useState<File | null>(null);
   const [coverImage, setCoverImage] = useState<File | null>(null);
   const [dragActive, setDragActive] = useState(false);
   const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
      null
   );
   const [profile, setProfile] = useState<any>(null);
   useEffect(() => {
      const userId = localStorage.getItem("userId");
      if (userId) {
         fetchProfile().then((profile) => {
            setProfile(profile);
         });
      }
   }, []);

   const handleAddTag = () => {
      if (tag.trim() && !tags.includes(tag.trim())) {
         setTags([...tags, tag.trim()]);
         setTag("");
      }
   };

   const handleRemoveTag = (tagToRemove: string) => {
      setTags(tags.filter((t) => t !== tagToRemove));
   };

   const handleZipUpload = (file: File) => {
      if (file.type === "application/zip" || file.name.endsWith(".zip")) {
         setZipFile(file);
      } else {
         // You might want to show an error message here
         console.error("Please upload a ZIP file");
      }
   };

   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
         handleZipUpload(e.target.files[0]);
      }
   };

   const handleRemoveZip = () => {
      setZipFile(null);
   };

   const handleDrag = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
         setDragActive(true);
      } else if (e.type === "dragleave") {
         setDragActive(false);
      }
   };

   const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
         handleZipUpload(e.dataTransfer.files[0]);
      }
   };

   const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
         const file = e.target.files[0];
         setCoverImage(file);
         setCoverImagePreview(URL.createObjectURL(file));
      }
   };

   const handleRemoveCoverImage = () => {
      setCoverImage(null);
      setCoverImagePreview(null);
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!collectionName || !zipFile) return;

      setIsLoading(true);
      try {
         const formData = new FormData();
         const userId = localStorage.getItem("userId");
         formData.append("title", collectionName);
         formData.append("description", description);
         formData.append("tags", tags.join(","));
         formData.append("userId", userId || "");
         formData.append("images", zipFile);
         if (coverImage) {
            formData.append("coverImage", coverImage);
         }

         const authSignature = localStorage.getItem("authSignature");
         const authAddress = localStorage.getItem("authAddress");

         const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/collection/upload`,
            {
               method: "POST",
               body: formData,
               headers: {
                  "x-eth-signature": authSignature || "",
                  "x-eth-address": authAddress || "",
               },
            }
         );

         const data = await response.json();

         if (!response.ok) {
            throw new Error(data.error || "Failed to upload collection");
         }

         toast({
            title: "Success",
            description: "Collection uploaded successfully",
         });

         // Redirect to the collection page or feed
         router.push("/feed");
      } catch (error) {
         console.error("Upload error:", error);
         toast({
            title: "Error",
            description:
               error instanceof Error
                  ? error.message
                  : "Failed to upload collection",
            variant: "destructive",
         });
      } finally {
         setIsLoading(false);
      }
   };

   const handleSelectClick = () => {
      const fileInput = document.getElementById(
         "zip-upload"
      ) as HTMLInputElement;
      if (fileInput) {
         fileInput.click();
      }
   };

   return (
      <div className="min-h-screen bg-background">
         <Header />

         {/* Sidebar Navigation */}
         <div className="hidden md:block">
            <Sidebar profile={profile} />
         </div>

         <main className="container pt-8 md:pt-24 pb-16 w-full md:max-w-5xl">
            <form onSubmit={handleSubmit}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Collection Details */}
                  <div className="space-y-6">
                     <Card>
                        <CardContent className="p-6">
                           <h2 className="text-xl font-bold mb-4">
                              Collection Details
                           </h2>

                           <div className="space-y-4">
                              <div className="space-y-2">
                                 <Label htmlFor="collection-name">
                                    Collection Name
                                 </Label>
                                 <Input
                                    id="collection-name"
                                    placeholder="Enter collection name"
                                    value={collectionName}
                                    onChange={(e) =>
                                       setCollectionName(e.target.value)
                                    }
                                    required
                                 />
                              </div>

                              <div className="space-y-2">
                                 <Label htmlFor="description">
                                    Description
                                 </Label>
                                 <Textarea
                                    id="description"
                                    placeholder="Describe your collection..."
                                    className="min-h-[120px]"
                                    value={description}
                                    onChange={(e) =>
                                       setDescription(e.target.value)
                                    }
                                 />
                              </div>

                              <div className="space-y-2">
                                 <Label htmlFor="cover-image">
                                    Cover Image
                                 </Label>
                                 <div className="flex flex-col gap-4">
                                    {coverImagePreview ? (
                                       <div className="relative group">
                                          <div className="aspect-video rounded-md overflow-hidden border border-border">
                                             <img
                                                src={coverImagePreview}
                                                alt="Cover preview"
                                                className="w-full h-full object-cover"
                                             />
                                          </div>
                                          <Button
                                             type="button"
                                             variant="destructive"
                                             size="icon"
                                             className="h-6 w-6 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                             onClick={handleRemoveCoverImage}
                                          >
                                             <X className="h-3 w-3" />
                                          </Button>
                                       </div>
                                    ) : (
                                       <div className="border-2 border-dashed rounded-lg p-6 text-center">
                                          <input
                                             type="file"
                                             id="cover-image"
                                             className="hidden"
                                             accept="image/*"
                                             onChange={handleCoverImageChange}
                                          />
                                          <label
                                             htmlFor="cover-image"
                                             className="cursor-pointer"
                                          >
                                             <div className="flex flex-col items-center justify-center gap-2">
                                                <ImagePlus className="h-10 w-10 text-muted-foreground" />
                                                <p className="text-sm font-medium">
                                                   Click to upload cover image
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                   PNG, JPG, GIF, WEBP (max.
                                                   5MB)
                                                </p>
                                             </div>
                                          </label>
                                       </div>
                                    )}
                                 </div>
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
                                             e.preventDefault();
                                             handleAddTag();
                                          }
                                       }}
                                    />
                                    <Button
                                       type="button"
                                       onClick={handleAddTag}
                                       size="sm"
                                    >
                                       <Plus className="h-4 w-4" />
                                    </Button>
                                 </div>

                                 {tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                       {tags.map((t) => (
                                          <Badge
                                             key={t}
                                             variant="secondary"
                                             className="flex items-center gap-1"
                                          >
                                             <Tag className="h-3 w-3" />
                                             {t}
                                             <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="h-4 w-4 p-0 ml-1"
                                                onClick={() =>
                                                   handleRemoveTag(t)
                                                }
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
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-6">
                     <Card>
                        <CardContent className="p-6">
                           <h2 className="text-xl font-bold mb-4">
                              Upload Images ZIP
                           </h2>

                           <div
                              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                                 dragActive
                                    ? "border-primary bg-primary/5"
                                    : "border-border"
                              }`}
                              onDragEnter={handleDrag}
                              onDragLeave={handleDrag}
                              onDragOver={handleDrag}
                              onDrop={handleDrop}
                           >
                              <input
                                 type="file"
                                 id="zip-upload"
                                 className="hidden"
                                 accept=".zip"
                                 onChange={handleImageUpload}
                              />
                              <label
                                 htmlFor="zip-upload"
                                 className="cursor-pointer"
                              >
                                 <div className="flex flex-col items-center justify-center gap-2">
                                    <ImagePlus className="h-10 w-10 text-muted-foreground" />
                                    <p className="text-sm font-medium">
                                       Drag and drop ZIP file or click to upload
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                       ZIP file containing your images
                                    </p>
                                    <Button
                                       type="button"
                                       size="sm"
                                       variant="secondary"
                                       className="mt-2"
                                       onClick={handleSelectClick}
                                    >
                                       <Upload className="h-4 w-4 mr-2" />{" "}
                                       Select ZIP File
                                    </Button>
                                 </div>
                              </label>
                           </div>

                           {zipFile && (
                              <div className="mt-6">
                                 <h3 className="text-sm font-medium mb-2">
                                    Selected ZIP File
                                 </h3>
                                 <div className="flex items-center justify-between p-3 border rounded-md">
                                    <div className="flex items-center gap-2">
                                       <span className="text-sm">
                                          {zipFile.name}
                                       </span>
                                       <span className="text-xs text-muted-foreground">
                                          {(zipFile.size / 1024 / 1024).toFixed(
                                             2
                                          )}{" "}
                                          MB
                                       </span>
                                    </div>
                                    <Button
                                       type="button"
                                       variant="destructive"
                                       size="icon"
                                       className="h-6 w-6"
                                       onClick={handleRemoveZip}
                                    >
                                       <X className="h-3 w-3" />
                                    </Button>
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
                        <Button
                           type="submit"
                           disabled={!collectionName || !zipFile || isLoading}
                        >
                           {isLoading ? "Uploading..." : "Create Collection"}
                        </Button>
                     </div>
                  </div>
               </div>
            </form>
         </main>

         <MobileNavigation />
      </div>
   );
}
