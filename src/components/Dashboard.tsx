import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useHealthcareData } from '@/hooks/useHealthcareData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/components/StatsCard';
import { useToast } from '@/components/ui/use-toast';
import { ProcessClaimsPanel } from '@/components/ProcessClaimsPanel';
import { RevenueAnalyticsPanel } from '@/components/RevenueAnalyticsPanel';
import { SettingsPanel } from '@/components/SettingsPanel';
import { PatientManagementPanel } from '@/components/PatientManagementPanel';
import { AIClaimProcessor } from '@/components/AIClaimProcessor';
import { PriorAuthManager } from '@/components/PriorAuthManager';
import { MedicalCodingAssistant } from '@/components/MedicalCodingAssistant';
import { 
  Activity, 
  TrendingUp, 
  DollarSign, 
  Users, 
  FileText, 
  Clock,
  Settings,
  Bell,
  LogOut
} from 'lucide-react';

export const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const { getDashboardMetrics, loading } = useHealthcareData();
  const [activePanel, setActivePanel] = useState<'claims' | 'analytics' | 'settings' | 'patients' | 'prior-auth' | 'coding' | null>(null);
  
  const metrics = getDashboardMetrics();

  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "No new notifications at this time.",
    });
  };

  const handleSettings = () => {
    setActivePanel('settings');
  };

  const handleStartProcessing = () => {
    setActivePanel('claims');
  };

  const handleViewAnalytics = () => {
    setActivePanel('analytics');
  };

  const handleManagePatients = () => {
    setActivePanel('patients');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-heading text-foreground">HealthAI Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user?.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={handleNotifications}>
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm" onClick={handleSettings}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            value={loading ? "Loading..." : `$${metrics.totalRevenue.toLocaleString()}`}
            label="Total Revenue"
            description="This month"
            icon={<DollarSign className="w-5 h-5" />}
            variant="success"
          />
          <StatsCard 
            value={loading ? "Loading..." : `${metrics.processingRate}%`}
            label="Processing Rate"
            description="Automated"
            icon={<TrendingUp className="w-5 h-5" />}
            variant="primary"
          />
          <StatsCard 
            value={loading ? "Loading..." : metrics.activePatients.toString()}
            label="Active Patients"
            description="Current month"
            icon={<Users className="w-5 h-5" />}
            variant="default"
          />
          <StatsCard 
            value={loading ? "Loading..." : metrics.totalClaims.toString()}
            label="Claims Processed"
            description="Last 30 days"
            icon={<FileText className="w-5 h-5" />}
            variant="warning"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Process Claims
              </CardTitle>
              <CardDescription>
                Submit and track insurance claims with AI-powered validation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleStartProcessing}>
                Start Processing
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                Revenue Analytics
              </CardTitle>
              <CardDescription>
                View detailed revenue insights and forecasting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" onClick={handleViewAnalytics}>
                View Analytics
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-warning" />
                Patient Management
              </CardTitle>
              <CardDescription>
                Manage patient records and billing information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" onClick={handleManagePatients}>
                Manage Patients
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest updates from your healthcare revenue platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm">Claim #HC-2024-001 processed successfully</span>
                </div>
                <span className="text-xs text-muted-foreground">2 minutes ago</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <span className="text-sm">Payment of $2,450 received from BlueCross</span>
                </div>
                <span className="text-xs text-muted-foreground">15 minutes ago</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">New patient registration: John Smith</span>
                </div>
                <span className="text-xs text-muted-foreground">1 hour ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Panels */}
      {activePanel === 'claims' && (
        <div className="fixed inset-0 bg-background z-50 overflow-auto">
          <div className="p-6">
            <Button
              variant="outline"
              onClick={() => setActivePanel(null)}
              className="mb-4"
            >
              ← Back to Dashboard
            </Button>
            <AIClaimProcessor />
          </div>
        </div>
      )}
      {activePanel === 'prior-auth' && (
        <div className="fixed inset-0 bg-background z-50 overflow-auto">
          <div className="p-6">
            <Button
              variant="outline"
              onClick={() => setActivePanel(null)}
              className="mb-4"
            >
              ← Back to Dashboard
            </Button>
            <PriorAuthManager />
          </div>
        </div>
      )}
      {activePanel === 'coding' && (
        <div className="fixed inset-0 bg-background z-50 overflow-auto">
          <div className="p-6">
            <Button
              variant="outline"
              onClick={() => setActivePanel(null)}
              className="mb-4"
            >
              ← Back to Dashboard
            </Button>
            <MedicalCodingAssistant />
          </div>
        </div>
      )}
      {activePanel === 'analytics' && (
        <RevenueAnalyticsPanel onClose={() => setActivePanel(null)} />
      )}
      {activePanel === 'settings' && (
        <SettingsPanel onClose={() => setActivePanel(null)} />
      )}
      {activePanel === 'patients' && (
        <PatientManagementPanel onClose={() => setActivePanel(null)} />
      )}
    </div>
  );
};