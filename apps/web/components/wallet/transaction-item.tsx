import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, Image, CreditCard } from "lucide-react";

interface TransactionItemProps {
   transaction: {
      id: number;
      type: string;
      amount: string;
      fiatAmount?: string;
      to?: string;
      from?: string;
      title?: string;
      date: string;
      status: string;
   };
}

export function TransactionItem({ transaction }: TransactionItemProps) {
   const getTransactionIcon = () => {
      switch (transaction.type) {
         case "sent":
            return <ArrowUpRight className="h-4 w-4 text-red-500" />;
         case "received":
            return <ArrowDownRight className="h-4 w-4 text-green-500" />;
         case "nft":
            return <Image className="h-4 w-4 text-purple-500" />;
         case "subscription":
            return <CreditCard className="h-4 w-4 text-blue-500" />;
         default:
            return <ArrowUpRight className="h-4 w-4" />;
      }
   };

   const getStatusColor = () => {
      switch (transaction.status) {
         case "confirmed":
            return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
         case "pending":
            return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
         case "failed":
            return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
         default:
            return "bg-muted text-muted-foreground";
      }
   };

   return (
      <Card className="overflow-hidden">
         <CardContent className="p-3 sm:p-4">
            <div className="flex flex-row items-center gap-3 w-full">
               <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                  {getTransactionIcon()}
               </div>

               <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <p className="font-medium text-sm text-left truncate">
                     {transaction.title ||
                        (transaction.type === "sent"
                           ? "Sent ETH"
                           : "Received ETH")}
                  </p>
                  <p className="text-xs text-muted-foreground text-left truncate">
                     {transaction.to && `To: ${transaction.to}`}
                     {transaction.from && `From: ${transaction.from}`}
                  </p>
               </div>

               <div className="flex flex-col items-end min-w-fit">
                  <p className="font-medium text-sm">{transaction.amount}</p>
                  {transaction.fiatAmount && (
                     <p className="text-xs text-muted-foreground">
                        {transaction.fiatAmount}
                     </p>
                  )}
               </div>

               <div className="hidden sm:block ml-2">
                  <Badge
                     variant="outline"
                     className={`text-xs ${getStatusColor()}`}
                  >
                     {transaction.status}
                  </Badge>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
