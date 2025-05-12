"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Subscriber } from "@/types/profile";

interface SubscribersTabProps {
   subscribers: Subscriber[];
}

export function SubscribersTab({ subscribers }: SubscribersTabProps) {
   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Subscribers</h2>
            <Button variant="outline" size="sm">
               Export
            </Button>
         </div>

         <Card>
            <CardContent className="p-0">
               <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                     <thead>
                        <tr className="border-b border-border">
                           <th className="text-left font-medium py-3 px-4">
                              Subscriber
                           </th>
                           <th className="text-left font-medium py-3 px-4">
                              Since
                           </th>
                           <th className="text-right font-medium py-3 px-4">
                              Action
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {subscribers.map((subscriber) => (
                           <tr
                              key={subscriber.id}
                              className="border-b border-border/50 hover:bg-muted/30"
                           >
                              <td className="py-3 px-4">
                                 <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                       <AvatarImage
                                          src={subscriber.avatar}
                                          alt={subscriber.name}
                                       />
                                       <AvatarFallback>
                                          {subscriber.name.charAt(0)}
                                       </AvatarFallback>
                                    </Avatar>
                                    <div>
                                       <p className="font-medium">
                                          {subscriber.name}
                                       </p>
                                       <p className="text-xs text-muted-foreground">
                                          @{subscriber.username}
                                       </p>
                                    </div>
                                 </div>
                              </td>
                              <td className="py-3 px-4 text-muted-foreground">
                                 {subscriber.since}
                              </td>
                              <td className="py-3 px-4 text-right">
                                 <Button variant="ghost" size="sm">
                                    Message
                                 </Button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
