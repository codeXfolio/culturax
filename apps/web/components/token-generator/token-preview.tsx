import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Users, Lock } from "lucide-react";

interface TokenPreviewProps {
  tokenData: {
    name: string;
    symbol: string;
    description: string;
    supply: number;
    price: number;
    category: string;
    transferable: boolean;
    accessLevel: number;
  };
}

export function TokenPreview({ tokenData }: TokenPreviewProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "content":
        return <Lock className="h-4 w-4" />;
      case "community":
        return <Users className="h-4 w-4" />;
      default:
        return <Sparkles className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "content":
        return "bg-blue-500";
      case "community":
        return "bg-green-500";
      case "events":
        return "bg-purple-500";
      case "merchandise":
        return "bg-amber-500";
      case "utility":
        return "bg-cyan-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "content":
        return "Content Access";
      case "community":
        return "Community";
      case "events":
        return "Events";
      case "merchandise":
        return "Merchandise";
      case "utility":
        return "Utility";
      default:
        return "General";
    }
  };

  const getAccessLevelLabel = (level: number) => {
    switch (level) {
      case 1:
        return "Basic Access";
      case 2:
        return "Standard Access";
      case 3:
        return "Enhanced Access";
      case 4:
        return "Premium Access";
      case 5:
        return "VIP Access";
      default:
        return "Basic Access";
    }
  };

  return (
    <Card className="overflow-hidden border-2">
      <div className={`h-2 ${getCategoryColor(tokenData.category)}`} />
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{tokenData.name || "Token Name"}</CardTitle>
            <CardDescription>{tokenData.symbol || "SYM"}</CardDescription>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            {getCategoryIcon(tokenData.category)}
            {getCategoryLabel(tokenData.category)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="min-h-[80px]">
          <p className="text-sm text-muted-foreground">
            {tokenData.description || "Token description will appear here..."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Supply</p>
            <p className="font-medium">
              {tokenData.supply?.toLocaleString() || "0"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Price</p>
            <p className="font-medium">{tokenData.price || "0"} ETH</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Transferable</p>
            <p className="font-medium">
              {tokenData.transferable ? "Yes" : "No"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Access Level</p>
            <p className="font-medium">
              {getAccessLevelLabel(tokenData.accessLevel)}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 flex justify-between pt-4">
        <p className="text-xs text-muted-foreground">Preview Only</p>
        <Badge variant="secondary" className="text-xs">
          <Sparkles className="h-3 w-3 mr-1" />
          Fan Token
        </Badge>
      </CardFooter>
    </Card>
  );
}
