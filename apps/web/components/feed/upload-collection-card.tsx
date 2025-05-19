"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderPlus } from "lucide-react";
import Link from "next/link";

export function UploadCollectionCard() {
   return (
      <Card className="mb-6 border-dashed border-2 hover:border-primary/50 transition-colors">
         <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
               <FolderPlus className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Create New Collection</h3>
            <p className="text-sm text-muted-foreground mb-4">
               Organize your images into a new collection
            </p>
            <Button className="gap-2" asChild>
               <Link href="/upload-collection">
                  <FolderPlus className="h-4 w-4" />
                  Create Collection
               </Link>
            </Button>
         </CardContent>
      </Card>
   );
}
