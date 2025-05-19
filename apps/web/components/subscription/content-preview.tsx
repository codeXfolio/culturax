import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, FileText, Video, Music, ImageIcon } from "lucide-react";
import Link from "next/link";

interface ContentPreviewProps {
   content: {
      id: string;
      title: string;
      type: string;
      thumbnail: string;
      locked: boolean;
   };
}

export function ContentPreview({ content }: ContentPreviewProps) {
   const getTypeIcon = () => {
      switch (content.type) {
         case "image":
            return <ImageIcon className="h-4 w-4" />;
         case "video":
            return <Video className="h-4 w-4" />;
         case "text":
            return <FileText className="h-4 w-4" />;
         case "audio":
            return <Music className="h-4 w-4" />;
         default:
            return <FileText className="h-4 w-4" />;
      }
   };

   return (
      <Card className="overflow-hidden border-2 shadow-md">
         <div className="relative">
            <img
               src={
                  process.env.NEXT_PUBLIC_API_URL + content.thumbnail ||
                  "/placeholder.svg"
               }
               alt={content.title}
               className="w-full h-48 object-cover"
            />
            <Badge
               variant="secondary"
               className="absolute top-2 right-2 flex items-center gap-1"
            >
               {getTypeIcon()}
               <span>{content.type}</span>
            </Badge>

            {content.locked && (
               <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center">
                  <Lock className="h-8 w-8 mb-2 text-primary" />
                  <p className="text-sm font-medium">Subscribers Only</p>
               </div>
            )}
         </div>

         <CardContent className="p-4">
            <h3 className="font-medium mb-2">{content.title}</h3>
            {content.locked ? (
               <Button size="sm" className="w-full">
                  Unlock
               </Button>
            ) : (
               <Button size="sm" variant="outline" className="w-full" asChild>
                  <Link href={`/collection/${content.id}`}>View</Link>
               </Button>
            )}
         </CardContent>
      </Card>
   );
}
