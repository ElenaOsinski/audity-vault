import { DashboardLayout } from "@/components/DashboardLayout";
import { AuditSubmission } from "@/components/AuditSubmission";
import { VerificationPanel } from "@/components/VerificationPanel";
import { AuditorsManagement } from "@/components/AuditorsManagement";
import { SettingsPanel } from "@/components/SettingsPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Compliance Dashboard</h2>
          <p className="text-muted-foreground">
            Secure encrypted audit submissions and verifications with zero-knowledge privacy
          </p>
        </div>

        <Tabs defaultValue="verification" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="verification">Verify Ratios</TabsTrigger>
            <TabsTrigger value="submission">Submit Audit</TabsTrigger>
            <TabsTrigger value="auditors">Auditors</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="verification" className="space-y-6">
            <VerificationPanel />
          </TabsContent>
          
          <TabsContent value="submission" className="space-y-6">
            <AuditSubmission />
          </TabsContent>
          
          <TabsContent value="auditors" className="space-y-6">
            <AuditorsManagement />
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <SettingsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Index;
