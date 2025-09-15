import { useState } from "react";
import { UserPlus, Mail, Shield, MoreVertical, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export function AuditorsManagement() {
  const [auditors, setAuditors] = useState([
    {
      id: "AUD-001",
      name: "John Mitchell",
      email: "j.mitchell@auditfirm.com",
      company: "Mitchell & Associates",
      specialization: "Financial Ratios",
      status: "active",
      totalAudits: 45,
      successRate: "98.2%"
    },
    {
      id: "AUD-002", 
      name: "Sarah Chen",
      email: "s.chen@globalaudit.com",
      company: "Global Audit Solutions",
      specialization: "Risk Assessment",
      status: "active",
      totalAudits: 67,
      successRate: "97.8%"
    },
    {
      id: "AUD-003",
      name: "David Rodriguez",
      email: "d.rodriguez@certifiedcpa.com",
      company: "Rodriguez CPA Firm",
      specialization: "Compliance Review",
      status: "pending",
      totalAudits: 23,
      successRate: "95.6%"
    }
  ]);

  const [isAddingAuditor, setIsAddingAuditor] = useState(false);
  const { toast } = useToast();

  const handleInviteAuditor = () => {
    toast({
      title: "Auditor Invited Successfully",
      description: "Invitation sent with encrypted access credentials.",
    });
    setIsAddingAuditor(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-verified text-verified-foreground">Active</Badge>;
      case "pending":
        return <Badge className="bg-pending text-pending-foreground">Pending</Badge>;
      default:
        return <Badge variant="outline">Inactive</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Auditors Management</h2>
          <p className="text-muted-foreground">Manage certified auditors with encrypted access</p>
        </div>
        <Dialog open={isAddingAuditor} onOpenChange={setIsAddingAuditor}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover">
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Auditor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite New Auditor</DialogTitle>
              <DialogDescription>
                Send an encrypted invitation to a certified auditor
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="auditor-name">Auditor Name</Label>
                <Input id="auditor-name" placeholder="Enter auditor's full name" />
              </div>
              <div>
                <Label htmlFor="auditor-email">Email Address</Label>
                <Input id="auditor-email" type="email" placeholder="auditor@firm.com" />
              </div>
              <div>
                <Label htmlFor="auditor-company">Company</Label>
                <Input id="auditor-company" placeholder="Audit firm name" />
              </div>
              <div>
                <Label htmlFor="auditor-specialization">Specialization</Label>
                <Input id="auditor-specialization" placeholder="e.g., Financial Ratios, Risk Assessment" />
              </div>
              <Button onClick={handleInviteAuditor} className="w-full bg-primary hover:bg-primary-hover">
                <Mail className="mr-2 h-4 w-4" />
                Send Encrypted Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {auditors.map((auditor) => (
          <Card key={auditor.id} className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{auditor.name}</h3>
                    <p className="text-sm text-muted-foreground">{auditor.company}</p>
                    <p className="text-xs text-muted-foreground">{auditor.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {getStatusBadge(auditor.status)}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                      <DropdownMenuItem>Revoke Access</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Specialization</p>
                  <p className="text-sm font-semibold text-foreground">{auditor.specialization}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Total Audits</p>
                  <p className="text-sm font-semibold text-foreground">{auditor.totalAudits}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                  <div className="flex items-center justify-center space-x-1">
                    <CheckCircle className="h-3 w-3 text-verified" />
                    <p className="text-sm font-semibold text-verified">{auditor.successRate}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}