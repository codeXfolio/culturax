"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NotificationFormData } from "../types";

interface NotificationsTabProps {
  formData: NotificationFormData;
  onFormChange?: (field: string, value: any) => void;
}

export function NotificationsTab({ formData, onFormChange }: NotificationsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Manage how you receive notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Creator Notifications</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">New Subscribers</h4>
                <p className="text-sm text-muted-foreground">When someone subscribes to your content</p>
              </div>
              <Switch defaultChecked={formData.creator.newSubscribers} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">NFT Sales</h4>
                <p className="text-sm text-muted-foreground">When your NFTs are purchased</p>
              </div>
              <Switch defaultChecked={formData.creator.nftSales} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Content Engagement</h4>
                <p className="text-sm text-muted-foreground">Likes, comments, and shares on your content</p>
              </div>
              <Select defaultValue={formData.creator.contentEngagement}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Engagement</SelectItem>
                  <SelectItem value="important">Important Only</SelectItem>
                  <SelectItem value="none">Disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Earnings Reports</h4>
                <p className="text-sm text-muted-foreground">Periodic reports of your earnings</p>
              </div>
              <Select defaultValue={formData.creator.earningsReports}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="none">Disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Direct Messages</h4>
                <p className="text-sm text-muted-foreground">When you receive messages from subscribers</p>
              </div>
              <Switch defaultChecked={formData.creator.directMessages} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Platform Notifications</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Platform Updates</h4>
                <p className="text-sm text-muted-foreground">News and updates about CreatorX</p>
              </div>
              <Switch defaultChecked={formData.platform.updates} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Creator Tips</h4>
                <p className="text-sm text-muted-foreground">Tips and best practices for creators</p>
              </div>
              <Switch defaultChecked={formData.platform.tips} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Marketing Opportunities</h4>
                <p className="text-sm text-muted-foreground">Promotional opportunities for creators</p>
              </div>
              <Switch defaultChecked={formData.platform.marketing} />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Disable All</Button>
          <Button>Save Preferences</Button>
        </div>
      </CardContent>
    </Card>
  );
}
