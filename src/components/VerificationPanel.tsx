import { useState } from "react";
import { CheckCircle, Clock, AlertCircle, TrendingUp, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AuditDetails } from "./AuditDetails";
import { useToast } from "@/hooks/use-toast";

export function VerificationPanel() {
  const [selectedAudit, setSelectedAudit] = useState<string | null>(null);
  const { toast } = useToast();

  if (selectedAudit) {
    return (
      <AuditDetails 
        auditId={selectedAudit} 
        onBack={() => setSelectedAudit(null)} 
      />
    );
  }

  const handleCompleteVerification = (auditId: string) => {
    toast({
      title: "Verification Completed",
      description: `Audit ${auditId} has been successfully verified and approved.`,
    });
  };
  const auditItems = [
    {
      id: "AUD-001",
      company: "TechCorp Industries",
      ratios: [
        { name: "Current Ratio", expected: "2.1", calculated: "2.08", status: "verified" },
        { name: "Debt-to-Equity", expected: "0.4", calculated: "0.42", status: "verified" },
        { name: "ROE", expected: "15%", calculated: "14.8%", status: "verified" },
      ],
      status: "completed",
      submittedAt: "2024-01-15",
    },
    {
      id: "AUD-002", 
      company: "Global Finance Ltd",
      ratios: [
        { name: "Quick Ratio", expected: "1.5", calculated: "1.2", status: "flagged" },
        { name: "Interest Coverage", expected: "8.0", calculated: "6.5", status: "pending" },
      ],
      status: "under-review",
      submittedAt: "2024-01-16",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-verified" />;
      case "pending":
        return <Clock className="h-4 w-4 text-pending" />;
      case "flagged":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-verified text-verified-foreground">Verified</Badge>;
      case "under-review":
        return <Badge className="bg-pending text-pending-foreground">Under Review</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Audits</p>
                <p className="text-2xl font-bold text-foreground">127</p>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Verified</p>
                <p className="text-2xl font-bold text-verified">98</p>
              </div>
              <div className="h-12 w-12 bg-verified/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-verified" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold text-pending">29</p>
              </div>
              <div className="h-12 w-12 bg-pending/10 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-pending" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audit List */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>Recent Audit Verifications</CardTitle>
          <CardDescription>
            Review financial ratios without accessing raw financial data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {auditItems.map((audit) => (
              <div key={audit.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{audit.company}</h3>
                    <p className="text-sm text-muted-foreground">
                      Audit ID: {audit.id} • Submitted: {audit.submittedAt}
                    </p>
                  </div>
                  {getStatusBadge(audit.status)}
                </div>

                <div className="space-y-3">
                  {audit.ratios.map((ratio, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(ratio.status)}
                        <span className="font-medium">{ratio.name}</span>
                      </div>
                      <div className="text-right text-sm">
                        <div className="flex space-x-4">
                          <span className="text-muted-foreground">
                            Expected: {ratio.expected}
                          </span>
                          <span className={`font-medium ${
                            ratio.status === "verified" ? "text-verified" :
                            ratio.status === "flagged" ? "text-destructive" : "text-pending"
                          }`}>
                            Calculated: {ratio.calculated}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {audit.status === "under-review" && (
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>Verification Progress</span>
                      <span>60%</span>
                    </div>
                    <Progress value={60} />
                  </div>
                )}

                <div className="flex space-x-2 pt-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setSelectedAudit(audit.id)}
                  >
                    View Details
                  </Button>
                  {audit.status === "under-review" && (
                    <Button 
                      size="sm" 
                      className="bg-primary hover:bg-primary-hover"
                      onClick={() => handleCompleteVerification(audit.id)}
                    >
                      Complete Verification
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}