"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreatorFormData } from "../types";

interface CreatorTabProps {
  formData: CreatorFormData;
  onFormChange?: (field: string, value: any) => void;
}

export function CreatorTab({ formData, onFormChange }: CreatorTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Creator Profile</CardTitle>
        <CardDescription>Customize your creator profile and content settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Creator Information</h3>

          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="creator-category">Primary Category</Label>
              <Select defaultValue={formData.category}>
                <SelectTrigger id="creator-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="digital-art">Digital Art</SelectItem>
                  <SelectItem value="photography">Photography</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="3d-art">3D Art</SelectItem>
                  <SelectItem value="writing">Writing</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="creator-tags">Tags</Label>
              <Input
                id="creator-tags"
                defaultValue={formData.tags}
                placeholder="Enter tags separated by commas"
              />
              <p className="text-xs text-muted-foreground">Add tags to help users discover your content</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="creator-story">Creator Story</Label>
              <Textarea
                id="creator-story"
                className="min-h-[120px]"
                placeholder="Share your journey as a creator..."
                defaultValue={formData.story}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Content Settings</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Content Watermarking</h4>
                <p className="text-sm text-muted-foreground">Automatically add watermarks to your content</p>
              </div>
              <Switch defaultChecked={formData.contentSettings.watermarking} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Content Downloads</h4>
                <p className="text-sm text-muted-foreground">Allow subscribers to download your content</p>
              </div>
              <Select defaultValue={formData.contentSettings.downloads}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Allow All</SelectItem>
                  <SelectItem value="subscribers-only">Subscribers Only</SelectItem>
                  <SelectItem value="none">Disable Downloads</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Content License</h4>
                <p className="text-sm text-muted-foreground">Default license for your content</p>
              </div>
              <Select defaultValue={formData.contentSettings.license}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select license" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal Use Only</SelectItem>
                  <SelectItem value="commercial">Commercial License</SelectItem>
                  <SelectItem value="cc">Creative Commons</SelectItem>
                  <SelectItem value="custom">Custom License</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Verification</h3>

          <div className="p-4 border border-border rounded-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Verified Creator</h4>
                <p className="text-sm text-muted-foreground">Your account is verified</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Verification helps users identify authentic creators and builds trust in the platform.
            </p>
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
