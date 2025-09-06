import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Activity, Cpu, HardDrive, Wifi, AlertTriangle, CheckCircle, 
  TrendingUp, TrendingDown, Zap, Clock, Database 
} from 'lucide-react';

interface PerformanceMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  responseTime: number;
  throughput: number;
  errorRate: number;
  uptime: number;
}

interface SystemAlert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: Date;
  resolved: boolean;
}

export const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0,
    responseTime: 0,
    throughput: 0,
    errorRate: 0,
    uptime: 99.9
  });

  const [historicalData, setHistoricalData] = useState<Array<{
    time: string;
    cpu: number;
    memory: number;
    responseTime: number;
  }>>([]);

  const [alerts, setAlerts] = useState<SystemAlert[]>([
    {
      id: '1',
      type: 'warning',
      message: 'High memory usage detected (85%)',
      timestamp: new Date(Date.now() - 300000),
      resolved: false
    },
    {
      id: '2',
      type: 'info',
      message: 'Database optimization completed',
      timestamp: new Date(Date.now() - 900000),
      resolved: true
    }
  ]);

  const [isMonitoring, setIsMonitoring] = useState(true);

  // Simulate real-time metrics
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      const newMetrics: PerformanceMetrics = {
        cpu: Math.random() * 100,
        memory: 60 + Math.random() * 30,
        disk: 40 + Math.random() * 20,
        network: Math.random() * 1000,
        responseTime: 150 + Math.random() * 100,
        throughput: 800 + Math.random() * 400,
        errorRate: Math.random() * 5,
        uptime: 99.5 + Math.random() * 0.5
      };

      setMetrics(newMetrics);

      // Add to historical data
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      
      setHistoricalData(prev => {
        const newData = [
          ...prev.slice(-29), // Keep last 29 entries
          {
            time: timeString,
            cpu: newMetrics.cpu,
            memory: newMetrics.memory,
            responseTime: newMetrics.responseTime
          }
        ];
        return newData;
      });

      // Generate alerts based on metrics
      if (newMetrics.cpu > 90 && !alerts.find(a => a.message.includes('CPU') && !a.resolved)) {
        const newAlert: SystemAlert = {
          id: Date.now().toString(),
          type: 'error',
          message: `Critical CPU usage: ${newMetrics.cpu.toFixed(1)}%`,
          timestamp: new Date(),
          resolved: false
        };
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
      }

      if (newMetrics.memory > 85 && !alerts.find(a => a.message.includes('memory') && !a.resolved)) {
        const newAlert: SystemAlert = {
          id: Date.now().toString(),
          type: 'warning',
          message: `High memory usage: ${newMetrics.memory.toFixed(1)}%`,
          timestamp: new Date(),
          resolved: false
        };
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isMonitoring, alerts]);

  const getStatusColor = (value: number, thresholds: { warning: number; critical: number }) => {
    if (value >= thresholds.critical) return 'text-red-600';
    if (value >= thresholds.warning) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStatusBadge = (value: number, thresholds: { warning: number; critical: number }) => {
    if (value >= thresholds.critical) return <Badge variant="destructive">Critical</Badge>;
    if (value >= thresholds.warning) return <Badge variant="secondary">Warning</Badge>;
    return <Badge variant="outline">Normal</Badge>;
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, resolved: true } : alert
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Performance Monitor</h2>
          <p className="text-muted-foreground">
            Real-time system performance and health metrics
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
            <span className="text-sm">{isMonitoring ? 'Live' : 'Paused'}</span>
          </div>
          <Button 
            variant={isMonitoring ? "outline" : "default"}
            onClick={() => setIsMonitoring(!isMonitoring)}
          >
            {isMonitoring ? 'Pause' : 'Start'} Monitoring
          </Button>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">CPU Usage</p>
                <p className={`text-2xl font-bold ${getStatusColor(metrics.cpu, { warning: 70, critical: 90 })}`}>
                  {metrics.cpu.toFixed(1)}%
                </p>
              </div>
              <Cpu className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-2">
              {getStatusBadge(metrics.cpu, { warning: 70, critical: 90 })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Memory Usage</p>
                <p className={`text-2xl font-bold ${getStatusColor(metrics.memory, { warning: 75, critical: 90 })}`}>
                  {metrics.memory.toFixed(1)}%
                </p>
              </div>
              <HardDrive className="h-8 w-8 text-green-500" />
            </div>
            <div className="mt-2">
              {getStatusBadge(metrics.memory, { warning: 75, critical: 90 })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Response Time</p>
                <p className={`text-2xl font-bold ${getStatusColor(metrics.responseTime, { warning: 300, critical: 500 })}`}>
                  {metrics.responseTime.toFixed(0)}ms
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
            <div className="mt-2">
              {getStatusBadge(metrics.responseTime, { warning: 300, critical: 500 })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Uptime</p>
                <p className="text-2xl font-bold text-green-600">
                  {metrics.uptime.toFixed(2)}%
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <div className="mt-2">
              <Badge variant="outline">Excellent</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Real-time Performance</CardTitle>
            <CardDescription>CPU and Memory usage over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="cpu" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="CPU %"
                />
                <Line 
                  type="monotone" 
                  dataKey="memory" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={2}
                  name="Memory %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Response Time Trend</CardTitle>
            <CardDescription>API response time monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="responseTime" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  name="Response Time (ms)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Metrics</CardTitle>
          <CardDescription>Current system performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">CPU Usage</span>
                  <span className="text-sm">{metrics.cpu.toFixed(1)}%</span>
                </div>
                <Progress value={metrics.cpu} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Memory Usage</span>
                  <span className="text-sm">{metrics.memory.toFixed(1)}%</span>
                </div>
                <Progress value={metrics.memory} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Disk Usage</span>
                  <span className="text-sm">{metrics.disk.toFixed(1)}%</span>
                </div>
                <Progress value={metrics.disk} className="h-2" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Network I/O</span>
                <Badge variant="outline">{metrics.network.toFixed(0)} KB/s</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Throughput</span>
                <Badge variant="outline">{metrics.throughput.toFixed(0)} req/min</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Error Rate</span>
                <Badge variant={metrics.errorRate > 2 ? "destructive" : "outline"}>
                  {metrics.errorRate.toFixed(2)}%
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-green-600" />
                <span className="text-sm">System Health: Optimal</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Database: Connected</span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 text-green-600" />
                <span className="text-sm">API: All endpoints active</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>System Alerts</CardTitle>
          <CardDescription>Recent system notifications and warnings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <p className="text-muted-foreground">No active alerts</p>
              </div>
            ) : (
              alerts.map((alert) => (
                <Alert key={alert.id} className={alert.resolved ? 'opacity-50' : ''}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{alert.message}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {alert.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    {!alert.resolved && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => resolveAlert(alert.id)}
                      >
                        Resolve
                      </Button>
                    )}
                  </AlertDescription>
                </Alert>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};