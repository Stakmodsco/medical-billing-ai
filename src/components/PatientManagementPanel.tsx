import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { StatsCard } from '@/components/StatsCard';
import { useToast } from '@/components/ui/use-toast';
import { 
  Search, 
  Plus,
  X,
  Users,
  Eye,
  Edit,
  FileText,
  Calendar,
  Phone,
  Mail,
  Filter
} from 'lucide-react';

interface PatientManagementPanelProps {
  onClose: () => void;
}

export const PatientManagementPanel = ({ onClose }: PatientManagementPanelProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const patients = [
    { 
      id: 'P001', 
      name: 'John Smith', 
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      lastVisit: '2024-01-15',
      status: 'active',
      totalClaims: 12,
      totalRevenue: 3450
    },
    { 
      id: 'P002', 
      name: 'Sarah Johnson', 
      email: 'sarah.j@email.com',
      phone: '(555) 987-6543',
      lastVisit: '2024-01-14',
      status: 'active',
      totalClaims: 8,
      totalRevenue: 2280
    },
    { 
      id: 'P003', 
      name: 'Michael Brown', 
      email: 'mbrown@email.com',
      phone: '(555) 456-7890',
      lastVisit: '2024-01-10',
      status: 'pending',
      totalClaims: 5,
      totalRevenue: 1650
    },
    { 
      id: 'P004', 
      name: 'Emily Davis', 
      email: 'emily.davis@email.com',
      phone: '(555) 321-0987',
      lastVisit: '2024-01-08',
      status: 'active',
      totalClaims: 15,
      totalRevenue: 4200
    },
  ];

  const recentActivities = [
    { patient: 'John Smith', action: 'Claim submitted', date: '2024-01-15', amount: '$285' },
    { patient: 'Sarah Johnson', action: 'Payment received', date: '2024-01-14', amount: '$450' },
    { patient: 'Michael Brown', action: 'Visit scheduled', date: '2024-01-13', amount: '-' },
    { patient: 'Emily Davis', action: 'Claim approved', date: '2024-01-12', amount: '$320' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success/20 text-success border-success/30">Active</Badge>;
      case 'pending':
        return <Badge className="bg-warning/20 text-warning border-warning/30">Pending</Badge>;
      case 'inactive':
        return <Badge className="bg-muted/20 text-muted-foreground border-muted/30">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleAddPatient = () => {
    toast({
      title: "Add Patient",
      description: "Patient registration form coming soon!",
    });
  };

  const handleViewPatient = (patientId: string) => {
    toast({
      title: "View Patient",
      description: `Opening patient ${patientId} details...`,
    });
  };

  const handleEditPatient = (patientId: string) => {
    toast({
      title: "Edit Patient",
      description: `Editing patient ${patientId} information...`,
    });
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Patient Management</h2>
              <p className="text-muted-foreground">Manage patient records and billing information</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={handleAddPatient}>
              <Plus className="w-4 h-4 mr-2" />
              Add Patient
            </Button>
            <Button variant="outline" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="patients">Patients</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard 
                  value="1,478" 
                  label="Total Patients"
                  description="Active records"
                  icon={<Users className="w-5 h-5" />}
                  variant="primary"
                />
                <StatsCard 
                  value="1,342" 
                  label="Active Patients"
                  description="Currently receiving care"
                  icon={<Users className="w-5 h-5" />}
                  variant="success"
                />
                <StatsCard 
                  value="136" 
                  label="New This Month"
                  description="First-time patients"
                  icon={<Plus className="w-5 h-5" />}
                  variant="warning"
                />
                <StatsCard 
                  value="$315" 
                  label="Avg Revenue/Patient"
                  description="Per visit"
                  icon={<FileText className="w-5 h-5" />}
                  variant="default"
                />
              </div>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Patient Demographics</CardTitle>
                    <CardDescription>Age and gender distribution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <span className="text-sm">Ages 18-35</span>
                        <span className="font-semibold">342 (23%)</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <span className="text-sm">Ages 36-55</span>
                        <span className="font-semibold">587 (40%)</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <span className="text-sm">Ages 56+</span>
                        <span className="font-semibold">549 (37%)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Visit Frequency</CardTitle>
                    <CardDescription>Patient visit patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <span className="text-sm">Regular Visits</span>
                        <span className="font-semibold">987 patients</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <span className="text-sm">Occasional Visits</span>
                        <span className="font-semibold">355 patients</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <span className="text-sm">First Time</span>
                        <span className="font-semibold">136 patients</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="patients" className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search patients by name, email, or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="space-y-4">
                {filteredPatients.map((patient) => (
                  <Card key={patient.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-foreground">{patient.name}</h3>
                              {getStatusBadge(patient.status)}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {patient.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {patient.phone}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Last visit: {patient.lastVisit}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-semibold">${patient.totalRevenue.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">{patient.totalClaims} claims</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewPatient(patient.id)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEditPatient(patient.id)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Patient Activity</CardTitle>
                  <CardDescription>Latest interactions and transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">{activity.patient}</p>
                          <p className="text-sm text-muted-foreground">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.date}</p>
                        </div>
                        <div className="text-right">
                          {activity.amount !== '-' && (
                            <p className="font-semibold">{activity.amount}</p>
                          )}
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};