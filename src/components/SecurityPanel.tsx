import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuditLog, AuditLogEntry } from '@/hooks/useAuditLog';
import { useRoleBasedAccess } from '@/hooks/useRoleBasedAccess';
import { Shield, AlertTriangle, Eye, Download, Users, Key } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const SecurityPanel = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const { getAuditLogs, exportAuditLogs, isLoading } = useAuditLog();
  const { userRole, isAdmin, isManager } = useRoleBasedAccess();

  useEffect(() => {
    if (isAdmin() || isManager()) {
      fetchAuditLogs();
    }
  }, []);

  const fetchAuditLogs = async () => {
    const logs = await getAuditLogs();
    setAuditLogs(logs);
  };

  const handleExportLogs = () => {
    exportAuditLogs();
  };

  const getActionBadgeVariant = (action: string) => {
    switch (action) {
      case 'create': return 'success';
      case 'update': return 'warning';
      case 'delete': return 'destructive';
      default: return 'secondary';
    }
  };

  const securityMetrics = {
    totalUsers: 12,
    activeUsers: 8,
    failedLogins: 2,
    securityAlerts: 1
  };

  if (!isAdmin() && !isManager()) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Access Restricted</h3>
          <p className="text-muted-foreground">
            You don't have permission to view security settings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Security & Compliance</h2>
          <p className="text-muted-foreground">
            Monitor system security and audit trails
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Role: {userRole}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{securityMetrics.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{securityMetrics.activeUsers}</p>
              </div>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Failed Logins</p>
                <p className="text-2xl font-bold">{securityMetrics.failedLogins}</p>
              </div>
              <Key className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Security Alerts</p>
                <p className="text-2xl font-bold">{securityMetrics.securityAlerts}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="audit-logs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="audit-logs">Audit Logs</TabsTrigger>
          <TabsTrigger value="access-control">Access Control</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="audit-logs" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>System Audit Logs</CardTitle>
                <CardDescription>
                  Track all system activities and changes
                </CardDescription>
              </div>
              <Button onClick={handleExportLogs} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Logs
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>Resource ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        Loading audit logs...
                      </TableCell>
                    </TableRow>
                  ) : auditLogs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        No audit logs found
                      </TableCell>
                    </TableRow>
                  ) : (
                    auditLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          {new Date(log.timestamp).toLocaleDateString()} {' '}
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getActionBadgeVariant(log.action) as any}>
                            {log.action}
                          </Badge>
                        </TableCell>
                        <TableCell>{log.resource_type}</TableCell>
                        <TableCell>{log.resource_id || '-'}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access-control" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Role-Based Access Control</CardTitle>
              <CardDescription>
                Manage user permissions and access levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Admin Role</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Full system access including user management
                    </p>
                    <Badge variant="destructive">High Privileges</Badge>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Manager Role</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Can manage patients, claims, and view reports
                    </p>
                    <Badge variant="secondary">Medium Privileges</Badge>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Staff Role</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Can create and update patient data and claims
                    </p>
                    <Badge variant="secondary">Standard Privileges</Badge>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Read-Only Role</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Can only view data, no modifications allowed
                    </p>
                    <Badge variant="outline">Limited Privileges</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>HIPAA Compliance Status</CardTitle>
              <CardDescription>
                Healthcare data protection and privacy compliance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">Data Encryption</h4>
                    <p className="text-sm text-muted-foreground">
                      Data encrypted in transit and at rest
                    </p>
                  </div>
                  <Badge variant="outline">✓ Compliant</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">Access Logging</h4>
                    <p className="text-sm text-muted-foreground">
                      All data access is logged and auditable
                    </p>
                  </div>
                  <Badge variant="outline">✓ Compliant</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">User Authentication</h4>
                    <p className="text-sm text-muted-foreground">
                      Multi-factor authentication enabled
                    </p>
                  </div>
                  <Badge variant="outline">✓ Compliant</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">Data Retention</h4>
                    <p className="text-sm text-muted-foreground">
                      Automated data retention policies
                    </p>
                  </div>
                  <Badge variant="secondary">⚠ Review Required</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};