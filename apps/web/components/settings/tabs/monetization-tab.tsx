"use client";

import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { MonetizationFormData } from "../types";

interface MonetizationTabProps {
   formData: MonetizationFormData;
   onFormChange?: (field: string, value: any) => void;
}

export function MonetizationTab({
   formData,
   onFormChange,
}: MonetizationTabProps) {
   return (
      <Card>
         <CardHeader>
            <CardTitle>Monetization Settings</CardTitle>
            <CardDescription>
               Manage your subscription and payment preferences
            </CardDescription>
         </CardHeader>
         <CardContent className="space-y-6">
            <div className="space-y-4">
               <h3 className="text-lg font-medium">Subscription Settings</h3>
               <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Monthly Subscription</h4>
                  <Badge className="bg-blue-500/10 text-blue-500">
                     {formData.subscription.isActive ? "Active" : "Inactive"}
                  </Badge>
               </div>

               <div className="space-y-3">
                  <div className="space-y-2">
                     <Label htmlFor="subscription-price">Price (USD)</Label>
                     <Input
                        id="subscription-price"
                        type="number"
                        defaultValue={formData.subscription.price}
                        min="1"
                     />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="subscription-description">
                        Description
                     </Label>
                     <Textarea
                        id="subscription-description"
                        defaultValue={formData.subscription.description}
                     />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="subscription-perks">
                        Perks (one per line)
                     </Label>
                     <Textarea
                        id="subscription-perks"
                        defaultValue={formData.subscription.perks}
                     />
                  </div>
               </div>
            </div>

            <div className="flex justify-end gap-2">
               <Button variant="outline">Cancel</Button>
               <Button>Save Changes</Button>
            </div>
         </CardContent>
      </Card>
   );
}
