import { ArrowLeft, Download, FileText, Shield, Calendar, User, Building } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface AuditDetailsProps {
  auditId: string;
  onBack: () => void;
}

export function AuditDetails({ auditId, onBack }: AuditDetailsProps) {
  // Mock data - in real app this would come from API
  const auditData = {
    id: auditId,
    company: "TechCorp Industries",
    submittedBy: "Sarah Johnson",
    submittedAt: "2024-01-15T10:30:00Z",
    period: "Q4 2024",
    status: "completed",
    auditor: "John Mitchell",
    auditorFirm: "Mitchell & Associates",
    ratios: [
      {
        name: "Current Ratio",
        category: "Liquidity",
        expected: "2.1",
        calculated: "2.08",
        variance: "-0.95%",
        status: "verified",
        notes: "Within acceptable range. Strong liquidity position."
      },
      {
        name: "Debt-to-Equity Ratio",
        category: "Leverage",
        expected: "0.4",
        calculated: "0.42",
        variance: "+5.0%",
        status: "verified",
        notes: "Slight increase but remains conservative."
      },
      {
        name: "Return on Equity (ROE)",
        category: "Profitability", 
        expected: "15%",
        calculated: "14.8%",
        variance: "-1.33%",
        status: "verified",
        notes: "Excellent performance, meeting growth targets."
      },
      {
        name: "Quick Ratio",
        category: "Liquidity",
        expected: "1.5",
        calculated: "1.2", 
        variance: "-20%",
        status: "flagged",
        notes: "Below expected threshold. Requires attention to liquid assets."
      }
    ],
    timeline: [
      {
        date: "2024-01-15T10:30:00Z",
        event: "Audit Submitted",
        description: "Financial statements uploaded and encrypted"
      },
      {
        date: "2024-01-15T11:15:00Z",
        event: "Assigned to Auditor", 
        description: "John Mitchell from Mitchell & Associates"
      },
      {
        date: "2024-01-16T09:00:00Z",
        event: "Verification Started",
        description: "Ratio calculations initiated"
      },
      {
        date: "2024-01-16T14:30:00Z",
        event: "Verification Completed",
        description: "All ratios verified and flagged items identified"
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "text-verified";
      case "flagged":
        return "text-destructive";
      default:
        return "text-pending";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-verified text-verified-foreground">Verified</Badge>;
      case "flagged":
        return <Badge variant="destructive">Flagged</Badge>;
      default:
        return <Badge className="bg-pending text-pending-foreground">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Audits
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Audit Details</h1>
          <p className="text-muted-foreground">Audit ID: {auditData.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Info */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5 text-primary" />
                <span>Company Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Company Name</p>
                  <p className="text-sm font-semibold text-foreground">{auditData.company}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Reporting Period</p>
                  <p className="text-sm font-semibold text-foreground">{auditData.period}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Submitted By</p>
                  <p className="text-sm font-semibold text-foreground">{auditData.submittedBy}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Submission Date</p>
                  <p className="text-sm font-semibold text-foreground">
                    {new Date(auditData.submittedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Ratios */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span>Financial Ratio Analysis</span>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {auditData.ratios.map((ratio, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">{ratio.name}</h4>
                        <p className="text-sm text-muted-foreground">{ratio.category}</p>
                      </div>
                      {getStatusBadge(ratio.status)}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Expected</p>
                        <p className="font-medium text-foreground">{ratio.expected}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Calculated</p>
                        <p className={`font-medium ${getStatusColor(ratio.status)}`}>
                          {ratio.calculated}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Variance</p>
                        <p className={`font-medium ${getStatusColor(ratio.status)}`}>
                          {ratio.variance}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 rounded p-3">
                      <p className="text-sm text-muted-foreground">{ratio.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Auditor Info */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span>Auditor</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground">{auditData.auditor}</p>
                <p className="text-sm text-muted-foreground">{auditData.auditorFirm}</p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Contact Auditor
              </Button>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Audit Timeline</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditData.timeline.map((event, index) => (
                  <div key={index} className="flex space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{event.event}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.date).toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security Info */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="font-medium text-foreground">Encryption Level</p>
                <p className="text-muted-foreground">AES-256 with Zero-Knowledge Proofs</p>
              </div>
              <div className="text-sm">
                <p className="font-medium text-foreground">Data Access</p>
                <p className="text-muted-foreground">Ratio calculations only - no raw data exposed</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}