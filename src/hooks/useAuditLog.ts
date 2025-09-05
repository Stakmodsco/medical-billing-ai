import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AuditLogEntry {
  id: string;
  user_id: string | null;
  action: string;
  resource_type: string;
  resource_id: string | null;
  old_values: any;
  new_values: any;
  ip_address: string | null;
  user_agent: string | null;
  timestamp: string;
}

export const useAuditLog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const logAction = async (
    action: string,
    resourceType: string,
    resourceId?: string,
    oldValues?: any,
    newValues?: any
  ) => {
    try {
      const { error } = await supabase
        .from('audit_logs')
        .insert({
          action,
          resource_type: resourceType,
          resource_id: resourceId || null,
          old_values: oldValues || null,
          new_values: newValues || null,
          ip_address: null, // Would be populated by server-side logic
          user_agent: navigator.userAgent
        });

      if (error) {
        console.error('Audit log error:', error);
      }
    } catch (error) {
      console.error('Failed to log action:', error);
    }
  };

  const getAuditLogs = async (filters?: {
    resourceType?: string;
    resourceId?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('audit_logs')
        .select('*')
        .order('timestamp', { ascending: false });

      if (filters?.resourceType) {
        query = query.eq('resource_type', filters.resourceType);
      }
      if (filters?.resourceId) {
        query = query.eq('resource_id', filters.resourceId);
      }
      if (filters?.startDate) {
        query = query.gte('timestamp', filters.startDate);
      }
      if (filters?.endDate) {
        query = query.lte('timestamp', filters.endDate);
      }

      const { data, error } = await query.limit(100);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch audit logs",
          variant: "destructive"
        });
        throw error;
      }

      return data as AuditLogEntry[];
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const exportAuditLogs = async (filters?: any) => {
    try {
      const logs = await getAuditLogs(filters);
      const csv = convertToCSV(logs);
      downloadCSV(csv, 'audit-logs.csv');
      
      toast({
        title: "Success",
        description: "Audit logs exported successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export audit logs",
        variant: "destructive"
      });
    }
  };

  const convertToCSV = (data: AuditLogEntry[]) => {
    const headers = ['Timestamp', 'Action', 'Resource Type', 'Resource ID', 'User Agent'];
    const rows = data.map(log => [
      new Date(log.timestamp).toLocaleString(),
      log.action,
      log.resource_type,
      log.resource_id || '',
      log.user_agent || ''
    ]);
    
    return [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
  };

  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return {
    isLoading,
    logAction,
    getAuditLogs,
    exportAuditLogs
  };
};