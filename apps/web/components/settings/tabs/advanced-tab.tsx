"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { AdvancedFormData } from "../types";

interface AdvancedTabProps {
  formData: AdvancedFormData;
  onFormChange?: (field: string, value: any) => void;
}

export function AdvancedTab({ formData, onFormChange }: AdvancedTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Settings</CardTitle>
        <CardDescription>Configure advanced creator settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">API Access</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">API Access</h4>
                <p className="text-sm text-muted-foreground">Enable API access to your creator data</p>
              </div>
              <Switch defaultChecked={formData.apiAccess} />
            </div>

            <div className="p-4 border border-border rounded-md bg-muted/30">
              <p className="text-sm text-muted-foreground mb-2">
                API access allows you to integrate your CreatorX content with external applications and services.
              </p>
              <Button variant="outline" size="sm" disabled={!formData.apiAccess}>
                Generate API Key
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Content Backup</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Automatic Backups</h4>
                <p className="text-sm text-muted-foreground">Regularly backup your content</p>
              </div>
              <Switch defaultChecked={formData.backups.automatic} />
            </div>

            <Button variant="outline" size="sm">
              Download Content Archive
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Account Management</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Creator Status</h4>
                <p className="text-sm text-muted-foreground">Your current creator account status</p>
              </div>
              <Badge className="bg-green-500/10 text-green-500">
                {formData.account.status}
              </Badge>
            </div>

            <div className="pt-2 space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                Transfer Creator Account
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-destructive border-destructive/20 hover:bg-destructive/10"
              >
                Deactivate Creator Account
              </Button>
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
