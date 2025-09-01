import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { StatsCard } from '@/components/StatsCard';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Calendar,
  Download,
  X,
  BarChart3,
  PieChart,
  FileText,
  Target
} from 'lucide-react';

interface RevenueAnalyticsPanelProps {
  onClose: () => void;
}

export const RevenueAnalyticsPanel = ({ onClose }: RevenueAnalyticsPanelProps) => {
  const [timeRange, setTimeRange] = useState('month');

  const monthlyData = [
    { month: 'Jan', revenue: 45000, claims: 120, rate: 94.2 },
    { month: 'Feb', revenue: 52000, claims: 140, rate: 96.1 },
    { month: 'Mar', revenue: 48000, claims: 130, rate: 95.4 },
    { month: 'Apr', revenue: 59000, claims: 160, rate: 97.3 },
    { month: 'May', revenue: 61000, claims: 170, rate: 96.8 },
    { month: 'Jun', revenue: 47250, claims: 150, rate: 94.3 },
  ];

  const topPerformers = [
    { category: 'Cardiology', revenue: 125000, percentage: 25.4, trend: 'up' },
    { category: 'Orthopedics', revenue: 98000, percentage: 19.9, trend: 'up' },
    { category: 'General Practice', revenue: 87000, percentage: 17.7, trend: 'down' },
    { category: 'Pediatrics', revenue: 76000, percentage: 15.4, trend: 'up' },
    { category: 'Dermatology', revenue: 65000, percentage: 13.2, trend: 'down' },
  ];

  const recentPayments = [
    { id: 'PAY-001', payer: 'Blue Cross Blue Shield', amount: 2450, date: '2024-01-15', status: 'completed' },
    { id: 'PAY-002', payer: 'United Healthcare', amount: 1850, date: '2024-01-14', status: 'pending' },
    { id: 'PAY-003', payer: 'Aetna', amount: 3200, date: '2024-01-13', status: 'completed' },
    { id: 'PAY-004', payer: 'Cigna', amount: 1650, date: '2024-01-12', status: 'completed' },
  ];

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp className="w-4 h-4 text-success" />
    ) : (
      <TrendingDown className="w-4 h-4 text-destructive" />
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success/20 text-success border-success/30">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-warning/20 text-warning border-warning/30">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Revenue Analytics</h2>
              <p className="text-muted-foreground">Comprehensive insights into your healthcare revenue</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard 
                  value="$47,250" 
                  label="Total Revenue"
                  description="This month"
                  icon={<DollarSign className="w-5 h-5" />}
                  variant="success"
                />
                <StatsCard 
                  value="94.3%" 
                  label="Collection Rate"
                  description="+2.1% vs last month"
                  icon={<Target className="w-5 h-5" />}
                  variant="primary"
                />
                <StatsCard 
                  value="150" 
                  label="Claims Processed"
                  description="This month"
                  icon={<FileText className="w-5 h-5" />}
                  variant="default"
                />
                <StatsCard 
                  value="3.2 days" 
                  label="Avg Payment Time"
                  description="-0.5 days improvement"
                  icon={<Calendar className="w-5 h-5" />}
                  variant="warning"
                />
              </div>

              {/* Revenue Chart Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Revenue Trend
                  </CardTitle>
                  <CardDescription>Monthly revenue performance over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto" />
                      <p className="text-muted-foreground">Interactive chart visualization</p>
                      <p className="text-sm text-muted-foreground">Revenue trends and forecasting</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Performance</CardTitle>
                    <CardDescription>Revenue and claims data by month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {monthlyData.map((data) => (
                        <div key={data.month} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                          <div>
                            <p className="font-medium">{data.month}</p>
                            <p className="text-sm text-muted-foreground">{data.claims} claims</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${data.revenue.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">{data.rate}% rate</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Growth Metrics</CardTitle>
                    <CardDescription>Key performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <span className="text-sm">Month-over-Month Growth</span>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-success" />
                        <span className="font-semibold text-success">+12.3%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <span className="text-sm">Average Claim Value</span>
                      <span className="font-semibold">$315</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <span className="text-sm">Denial Rate</span>
                      <div className="flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-success" />
                        <span className="font-semibold">5.7%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="categories" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Top Performing Categories
                  </CardTitle>
                  <CardDescription>Revenue breakdown by medical specialty</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPerformers.map((category) => (
                      <div key={category.category} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            {getTrendIcon(category.trend)}
                            <span className="font-medium">{category.category}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${category.revenue.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{category.percentage}% of total</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Payments</CardTitle>
                  <CardDescription>Latest payment transactions from insurance providers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPayments.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{payment.id}</span>
                            {getStatusBadge(payment.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">{payment.payer}</p>
                          <p className="text-xs text-muted-foreground">{payment.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${payment.amount.toLocaleString()}</p>
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