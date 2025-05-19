import { Card, CardContent } from "@/components/ui/card";
import { Eye, Heart } from "lucide-react";

interface Content {
   id: number;
   title: string;
   type: string;
   thumbnail: string;
   views: number;
   likes: number;
   date: string;
}

interface ContentCardProps {
   content: Content;
}

export function ContentCard({ content }: ContentCardProps) {
   return (
      <Card className="overflow-hidden">
         <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
               <div className="relative w-full sm:w-[120px] h-[80px] bg-muted">
                  <img
                     src={content.thumbnail || "/placeholder.svg"}
                     alt={content.title}
                     className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-background/80 text-xs font-medium px-1.5 py-0.5 rounded">
                     {content.type}
                  </div>
               </div>
               <div className="p-4 flex-1">
                  <h3 className="font-medium text-sm mb-1">{content.title}</h3>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                           <Eye className="h-3 w-3" />
                           <span>{content.views}</span>
                        </div>
                     </div>
                     <div className="text-xs text-muted-foreground">
                        {content.date}
                     </div>
                  </div>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
