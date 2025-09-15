import { useState } from "react";
import { Settings, Shield, Bell, Key, Database, Users, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export function SettingsPanel() {
  const [settings, setSettings] = useState({
    autoVerification: true,
    emailNotifications: true,
    encryptionLevel: "aes-256",
    auditRetention: "7-years",
    accessLogging: true,
    multiFactorAuth: true
  });

  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings Updated Successfully",
      description: "Your security and notification preferences have been saved.",
    });
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground">Manage your compliance and security preferences</p>
      </div>

      <div className="grid gap-6">
        {/* Security Settings */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Security & Privacy</span>
            </CardTitle>
            <CardDescription>
              Configure encryption and access control settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Multi-Factor Authentication</Label>
                <p className="text-xs text-muted-foreground">
                  Require additional verification for sensitive operations
                </p>
              </div>
              <Switch
                checked={settings.multiFactorAuth}
                onCheckedChange={(checked) => updateSetting('multiFactorAuth', checked)}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="encryption-level">Encryption Level</Label>
              <Select value={settings.encryptionLevel} onValueChange={(value) => updateSetting('encryptionLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select encryption level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aes-128">AES-128 (Standard)</SelectItem>
                  <SelectItem value="aes-256">AES-256 (Recommended)</SelectItem>
                  <SelectItem value="rsa-2048">RSA-2048 (Maximum Security)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Access Logging</Label>
                <p className="text-xs text-muted-foreground">
                  Track all access to encrypted audit data
                </p>
              </div>
              <Switch
                checked={settings.accessLogging}
                onCheckedChange={(checked) => updateSetting('accessLogging', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Audit Settings */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-primary" />
              <span>Audit Configuration</span>
            </CardTitle>
            <CardDescription>
              Set preferences for audit processing and verification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Automatic Verification</Label>
                <p className="text-xs text-muted-foreground">
                  Enable AI-powered preliminary verification of ratios
                </p>
              </div>
              <Switch
                checked={settings.autoVerification}
                onCheckedChange={(checked) => updateSetting('autoVerification', checked)}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="audit-retention">Data Retention Period</Label>
              <Select value={settings.auditRetention} onValueChange={(value) => updateSetting('auditRetention', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select retention period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3-years">3 Years</SelectItem>
                  <SelectItem value="5-years">5 Years</SelectItem>
                  <SelectItem value="7-years">7 Years (Recommended)</SelectItem>
                  <SelectItem value="10-years">10 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-primary" />
              <span>Notifications</span>
            </CardTitle>
            <CardDescription>
              Configure how you receive audit updates and alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Email Notifications</Label>
                <p className="text-xs text-muted-foreground">
                  Receive updates on audit status changes
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="notification-email">Notification Email</Label>
              <Input 
                id="notification-email" 
                type="email" 
                placeholder="admin@company.com"
                defaultValue="admin@company.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* API & Integration */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-primary" />
              <span>API & Integration</span>
            </CardTitle>
            <CardDescription>
              Manage external integrations and API access
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <div className="flex space-x-2">
                <Input 
                  id="api-key" 
                  type="password"
                  value="••••••••-••••-••••-••••-••••••••••••"
                  readOnly
                />
                <Button variant="outline" size="sm">
                  <Key className="h-4 w-4 mr-1" />
                  Regenerate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSaveSettings} className="bg-primary hover:bg-primary-hover">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}