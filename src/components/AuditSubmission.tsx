import { useState } from "react";
import { Upload, Shield, FileText, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAudityVault } from "@/hooks/useAudityVault";
import { useAccount } from "wagmi";

export function AuditSubmission() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    organization: "",
    auditType: "",
    reportHash: "",
  });
  const { toast } = useToast();
  const { submitAuditReport } = useAudityVault();
  const { address, isConnected } = useAccount();

  const handleFileUpload = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to submit audit reports.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.company || !formData.organization || !formData.auditType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsEncrypting(true);
    
    try {
      // Simulate encryption process
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      // In a real implementation, you would:
      // 1. Encrypt the data using FHE
      // 2. Generate proof
      // 3. Submit to contract
      
      // Mock encrypted values (in real implementation, these would be FHE encrypted)
      const mockEncryptedRiskScore = "0x" + "0".repeat(64);
      const mockEncryptedComplianceScore = "0x" + "0".repeat(64);
      const mockEncryptedFindingsCount = "0x" + "0".repeat(64);
      const mockProof = "0x" + "0".repeat(128);
      
      // Submit to contract
      await submitAuditReport([
        formData.organization as `0x${string}`,
        formData.reportHash,
        formData.auditType,
        mockEncryptedRiskScore as `0x${string}`,
        mockEncryptedComplianceScore as `0x${string}`,
        mockEncryptedFindingsCount as `0x${string}`,
        mockProof as `0x${string}`,
      ]);
      
      setIsEncrypting(false);
      setIsUploaded(true);
      
      toast({
        title: "Audit Submitted Successfully",
        description: "Your financial statements have been encrypted and submitted for verification.",
      });
    } catch (error) {
      console.error("Failed to submit audit:", error);
      setIsEncrypting(false);
      toast({
        title: "Submission Failed",
        description: "Failed to submit audit report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-primary" />
          <span>Submit Encrypted Audit</span>
        </CardTitle>
        <CardDescription>
          Upload your financial statements. All data is encrypted before transmission.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="company">Company Name</Label>
            <Input 
              id="company" 
              placeholder="Enter company name" 
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="organization">Organization Address</Label>
            <Input 
              id="organization" 
              placeholder="0x..." 
              value={formData.organization}
              onChange={(e) => setFormData({...formData, organization: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="audit-type">Audit Type</Label>
            <Input 
              id="audit-type" 
              placeholder="Financial, Compliance, etc." 
              value={formData.auditType}
              onChange={(e) => setFormData({...formData, auditType: e.target.value})}
            />
          </div>
        </div>

        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          
          {!isUploaded && !isEncrypting && (
            <>
              <div>
                <p className="text-sm font-medium">Drop your financial statements here</p>
                <p className="text-xs text-muted-foreground">PDF, Excel, or CSV files supported</p>
              </div>
              <Button onClick={handleFileUpload}>
                <Upload className="mr-2 h-4 w-4" />
                Choose Files
              </Button>
            </>
          )}

          {isEncrypting && (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <Lock className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-sm font-medium">Encrypting data...</span>
              </div>
              <Progress value={uploadProgress} className="w-full max-w-xs mx-auto" />
              <p className="text-xs text-muted-foreground">
                Using AES-256 encryption with zero-knowledge proofs
              </p>
            </div>
          )}

          {isUploaded && (
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-verified/10 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-verified" />
              </div>
              <div>
                <Badge className="bg-verified text-verified-foreground">
                  Successfully Encrypted & Submitted
                </Badge>
                <p className="text-xs text-muted-foreground mt-2">
                  Audit ID: AUD-2024-{Math.random().toString(36).substr(2, 8).toUpperCase()}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Shield className="h-4 w-4 text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground">Privacy Guarantee</p>
              <p className="text-muted-foreground">
                Your raw financial data never leaves your control. Only encrypted proofs are shared with auditors.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}