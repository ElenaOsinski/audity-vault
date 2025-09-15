import { Shield, FileCheck, Users, BarChart3, Settings, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WalletConnect } from "./WalletConnect";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navItems = [
    { icon: BarChart3, label: "Dashboard", active: true },
    { icon: FileCheck, label: "Submit Audit", active: false },
    { icon: Shield, label: "Verify Ratios", active: false },
    { icon: Users, label: "Auditors", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Audits with Privacy Integrity</h1>
                <p className="text-sm text-muted-foreground">Secure Financial Compliance Platform</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-accent">
              <div className="w-2 h-2 bg-accent rounded-full mr-2" />
              Encrypted
            </Badge>
            <WalletConnect />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-card-elevated min-h-screen">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant={item.active ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>
          
          <div className="p-4 mt-8">
            <Card className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Security Status</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                All data encrypted end-to-end
              </p>
              <Badge className="bg-verified text-verified-foreground">
                Verified Secure
              </Badge>
            </Card>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}