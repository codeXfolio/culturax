"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import {
   ArrowLeft,
   Search,
   Grid,
   List,
   Filter,
   Edit,
   MoreHorizontal,
   Download,
   Trash2,
   Share,
   Plus,
   Tag,
   X,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ImageItem } from "@/components/collections/image-item";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import JSZip from "jszip";

interface Collection {
   id: string;
   title: string;
   description: string;
   tags: string;
   userId: string;
   coverImage: string;
   createdAt: string;
   updatedAt: string;
   user: {
      id: string;
      name: string;
      username: string;
      avatar: string;
   };
   files?: {
      name: string;
      path: string;
   }[];
}

interface CollectionDetailPageProps {
   id: string;
}

export function CollectionDetailPage({ id }: CollectionDetailPageProps) {
   const router = useRouter();
   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
   const [collection, setCollection] = useState<Collection | null>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
   const [editForm, setEditForm] = useState({
      title: "",
      description: "",
      tags: "",
   });
   const [tagInput, setTagInput] = useState("");
   const [tags, setTags] = useState<string[]>([]);
   const { toast } = useToast();

   useEffect(() => {
      const fetchCollection = async () => {
         try {
            const authSignature = localStorage.getItem("authSignature");
            const authAddress = localStorage.getItem("authAddress");

            const response = await fetch(
               `${process.env.NEXT_PUBLIC_API_URL}/api/collection/${id}`,
               {
                  headers: {
                     "x-eth-signature": authSignature || "",
                     "x-eth-address": authAddress || "",
                  },
               }
            );
            const data = await response.json();

            if (!data.success) {
               throw new Error(data.error || "Failed to fetch collection");
            }

            setCollection(data.data);
            // Initialize edit form with current values
            setEditForm({
               title: data.data.title,
               description: data.data.description,
               tags: data.data.tags,
            });
            // Initialize tags array
            setTags(data.data.tags.split(",").filter(Boolean));
         } catch (err) {
            setError(
               err instanceof Error ? err.message : "Failed to fetch collection"
            );
         } finally {
            setLoading(false);
         }
      };

      fetchCollection();
   }, [id]);

   const handleAddTag = () => {
      if (tagInput.trim() && !tags.includes(tagInput.trim())) {
         setTags([...tags, tagInput.trim()]);
         setTagInput("");
      }
   };

   const handleRemoveTag = (tagToRemove: string) => {
      setTags(tags.filter((t) => t !== tagToRemove));
   };

   const handleEditSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         const authSignature = localStorage.getItem("authSignature");
         const authAddress = localStorage.getItem("authAddress");

         const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/collection/update/${id}`,
            {
               method: "PUT",
               headers: {
                  "Content-Type": "application/json",
                  "x-eth-signature": authSignature || "",
                  "x-eth-address": authAddress || "",
               },
               body: JSON.stringify({
                  ...editForm,
                  tags: tags.join(","),
               }),
            }
         );

         const data = await response.json();

         if (!data.success) {
            throw new Error(data.error || "Failed to update collection");
         }

         // Update local state with new data
         setCollection((prev) => {
            if (!prev) return null;
            return {
               ...prev,
               ...data.data,
            };
         });

         toast({
            title: "Success",
            description: "Collection updated successfully",
         });

         setIsEditDialogOpen(false);
      } catch (err) {
         toast({
            title: "Error",
            description:
               err instanceof Error
                  ? err.message
                  : "Failed to update collection",
            variant: "destructive",
         });
      }
   };

   const handleDownloadAll = async () => {
      try {
         const authSignature = localStorage.getItem("authSignature");
         const authAddress = localStorage.getItem("authAddress");

         // Create a zip file containing all images
         const zip = new JSZip();

         // Add each image to the zip
         for (const file of collection?.files || []) {
            const response = await fetch(
               `${process.env.NEXT_PUBLIC_API_URL}${file.path}`
            );
            const blob = await response.blob();
            zip.file(file.name, blob);
         }

         // Generate and download the zip file
         const content = await zip.generateAsync({ type: "blob" });
         const url = window.URL.createObjectURL(content);
         const link = document.createElement("a");
         link.href = url;
         link.download = `${collection?.title || "collection"}.zip`;
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
         window.URL.revokeObjectURL(url);

         toast({
            title: "Success",
            description: "Collection downloaded successfully",
         });
      } catch (err) {
         toast({
            title: "Error",
            description:
               err instanceof Error
                  ? err.message
                  : "Failed to download collection",
            variant: "destructive",
         });
      }
   };

   const handleDeleteCollection = async () => {
      try {
         const authSignature = localStorage.getItem("authSignature");
         const authAddress = localStorage.getItem("authAddress");

         const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/collection/delete/${id}`,
            {
               method: "DELETE",
               headers: {
                  "x-eth-signature": authSignature || "",
                  "x-eth-address": authAddress || "",
               },
            }
         );

         const data = await response.json();

         if (!data.success) {
            throw new Error(data.error || "Failed to delete collection");
         }

         toast({
            title: "Success",
            description: "Collection deleted successfully",
         });

         // Close the dialog
         setIsDeleteDialogOpen(false);

         // Redirect to collections page
         router.push("/feed");
      } catch (err) {
         toast({
            title: "Error",
            description:
               err instanceof Error
                  ? err.message
                  : "Failed to delete collection",
            variant: "destructive",
         });
      }
   };

   if (loading) {
      return (
         <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
               <p className="mt-4 text-muted-foreground">
                  Loading collection...
               </p>
            </div>
         </div>
      );
   }

   if (error || !collection) {
      return (
         <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center">
               <p className="text-destructive">
                  {error || "Collection not found"}
               </p>
               <Button variant="outline" className="mt-4" asChild>
                  <Link href="/collections">Back to Collections</Link>
               </Button>
            </div>
         </div>
      );
   }

   // Transform files into images array for the ImageItem component
   const images =
      collection.files?.map((file, index) => ({
         id: `img-${index + 1}`,
         title: file.name,
         description: "",
         src: file.path,
         type: "Image",
         createdAt: new Date(collection.createdAt).toLocaleDateString(),
         tags: collection.tags.split(","),
         isFavorite: false,
      })) || [];

   return (
      <div className="min-h-screen bg-background">
         <header className="border-b border-border/40 backdrop-blur-sm fixed top-0 w-full z-50 bg-background/80">
            <div className="container flex items-center justify-between h-16">
               <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" asChild>
                     <Link href="#" onClick={() => window.history.back()}>
                        <ArrowLeft className="h-5 w-5" />
                     </Link>
                  </Button>
                  <span className="font-bold text-xl truncate max-w-[200px] md:max-w-md">
                     {collection.title}
                  </span>
               </div>
               <ModeToggle />
            </div>
         </header>

         <main className="container pt-24 pb-16 max-w-7xl">
            {/* Collection Header */}
            <div className="relative mb-8">
               <div className="h-48 md:h-72 rounded-lg overflow-hidden">
                  <img
                     src={
                        process.env.NEXT_PUBLIC_API_URL +
                           collection.coverImage || "/placeholder.svg"
                     }
                     alt={collection.title}
                     className="w-full h-full object-cover"
                  />
               </div>

               <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-sm p-4 rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                     <div>
                        <h1 className="text-2xl md:text-3xl font-bold mb-1">
                           {collection.title}
                        </h1>
                        <p className="text-muted-foreground text-sm md:text-base">
                           {collection.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                           {collection.tags.split(",").map((tag) => (
                              <Badge key={tag} variant="default">
                                 {tag}
                              </Badge>
                           ))}
                        </div>
                     </div>
                     <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                           variant="outline"
                           className="gap-2"
                           onClick={() => setIsEditDialogOpen(true)}
                        >
                           <Edit className="h-4 w-4" />
                           Edit
                        </Button>
                        <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="icon">
                                 <MoreHorizontal className="h-4 w-4" />
                              </Button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                 className="gap-2"
                                 onClick={handleDownloadAll}
                              >
                                 <Download className="h-4 w-4" />
                                 Download All
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                 className="gap-2 text-destructive focus:text-destructive"
                                 onClick={() => setIsDeleteDialogOpen(true)}
                              >
                                 <Trash2 className="h-4 w-4" />
                                 Delete Collection
                              </DropdownMenuItem>
                           </DropdownMenuContent>
                        </DropdownMenu>
                     </div>
                  </div>

                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                     <span>{images.length} items</span>
                     <span>•</span>
                     <span>
                        Created{" "}
                        {new Date(collection.createdAt).toLocaleDateString()}
                     </span>
                     <span>•</span>
                     <span>
                        Updated{" "}
                        {new Date(collection.updatedAt).toLocaleDateString()}
                     </span>
                  </div>
               </div>
            </div>

            {/* Filters */}
            <div className="mb-6">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <h2 className="text-xl font-medium">All Items</h2>

                  <div className="flex items-center gap-2">
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
                  </div>
               </div>

               {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                     {images.map((image) => (
                        <ImageItem
                           key={image.id}
                           image={image}
                           viewMode="grid"
                        />
                     ))}
                  </div>
               ) : (
                  <div className="space-y-4">
                     {images.map((image) => (
                        <ImageItem
                           key={image.id}
                           image={image}
                           viewMode="list"
                        />
                     ))}
                  </div>
               )}
            </div>
         </main>

         {/* Edit Collection Dialog */}
         <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Edit Collection</DialogTitle>
               </DialogHeader>
               <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div className="space-y-2">
                     <Label htmlFor="title">Title</Label>
                     <Input
                        id="title"
                        value={editForm.title}
                        onChange={(e) =>
                           setEditForm((prev) => ({
                              ...prev,
                              title: e.target.value,
                           }))
                        }
                        required
                     />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="description">Description</Label>
                     <Textarea
                        id="description"
                        value={editForm.description}
                        onChange={(e) =>
                           setEditForm((prev) => ({
                              ...prev,
                              description: e.target.value,
                           }))
                        }
                        required
                     />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="tags">Tags</Label>
                     <div className="flex gap-2">
                        <Input
                           id="tags"
                           placeholder="Add tags..."
                           value={tagInput}
                           onChange={(e) => setTagInput(e.target.value)}
                           onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                 e.preventDefault();
                                 handleAddTag();
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
                                    onClick={() => handleRemoveTag(t)}
                                 >
                                    <X className="h-3 w-3" />
                                 </Button>
                              </Badge>
                           ))}
                        </div>
                     )}
                  </div>
                  <DialogFooter>
                     <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditDialogOpen(false)}
                     >
                        Cancel
                     </Button>
                     <Button type="submit">Save Changes</Button>
                  </DialogFooter>
               </form>
            </DialogContent>
         </Dialog>

         {/* Delete Collection Confirmation Dialog */}
         <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Delete Collection</DialogTitle>
               </DialogHeader>
               <div className="py-4">
                  <p className="text-muted-foreground">
                     Are you sure you want to delete this collection? This
                     action cannot be undone.
                  </p>
               </div>
               <DialogFooter>
                  <Button
                     type="button"
                     variant="outline"
                     onClick={() => setIsDeleteDialogOpen(false)}
                  >
                     Cancel
                  </Button>
                  <Button
                     type="button"
                     variant="destructive"
                     onClick={handleDeleteCollection}
                  >
                     Delete
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </div>
   );
}
