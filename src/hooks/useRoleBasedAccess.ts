import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export type UserRole = 'admin' | 'manager' | 'staff' | 'readonly';

export interface Permission {
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete';
}

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    { resource: '*', action: 'create' },
    { resource: '*', action: 'read' },
    { resource: '*', action: 'update' },
    { resource: '*', action: 'delete' }
  ],
  manager: [
    { resource: 'patients', action: 'create' },
    { resource: 'patients', action: 'read' },
    { resource: 'patients', action: 'update' },
    { resource: 'claims', action: 'create' },
    { resource: 'claims', action: 'read' },
    { resource: 'claims', action: 'update' },
    { resource: 'payments', action: 'read' },
    { resource: 'payments', action: 'update' },
    { resource: 'prior_authorizations', action: 'create' },
    { resource: 'prior_authorizations', action: 'read' },
    { resource: 'prior_authorizations', action: 'update' },
    { resource: 'providers', action: 'create' },
    { resource: 'providers', action: 'read' },
    { resource: 'providers', action: 'update' }
  ],
  staff: [
    { resource: 'patients', action: 'create' },
    { resource: 'patients', action: 'read' },
    { resource: 'patients', action: 'update' },
    { resource: 'claims', action: 'create' },
    { resource: 'claims', action: 'read' },
    { resource: 'prior_authorizations', action: 'create' },
    { resource: 'prior_authorizations', action: 'read' },
    { resource: 'providers', action: 'read' }
  ],
  readonly: [
    { resource: 'patients', action: 'read' },
    { resource: 'claims', action: 'read' },
    { resource: 'payments', action: 'read' },
    { resource: 'prior_authorizations', action: 'read' },
    { resource: 'providers', action: 'read' }
  ]
};

export const useRoleBasedAccess = () => {
  const [userRole, setUserRole] = useState<UserRole>('readonly');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;

        setUserRole((data?.role as UserRole) || 'readonly');
      } catch (error) {
        console.error('Error fetching user role:', error);
        setUserRole('readonly'); // Default to most restrictive role
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  const hasPermission = (resource: string, action: Permission['action']): boolean => {
    const permissions = ROLE_PERMISSIONS[userRole];
    
    return permissions.some(permission => 
      (permission.resource === '*' || permission.resource === resource) &&
      permission.action === action
    );
  };

  const canAccess = (resource: string): boolean => {
    return hasPermission(resource, 'read');
  };

  const canCreate = (resource: string): boolean => {
    return hasPermission(resource, 'create');
  };

  const canUpdate = (resource: string): boolean => {
    return hasPermission(resource, 'update');
  };

  const canDelete = (resource: string): boolean => {
    return hasPermission(resource, 'delete');
  };

  const isAdmin = (): boolean => {
    return userRole === 'admin';
  };

  const isManager = (): boolean => {
    return userRole === 'admin' || userRole === 'manager';
  };

  const updateUserRole = async (userId: string, newRole: UserRole) => {
    if (!isAdmin()) {
      throw new Error('Insufficient permissions to update user roles');
    }

    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('user_id', userId);

    if (error) throw error;
  };

  return {
    userRole,
    isLoading,
    hasPermission,
    canAccess,
    canCreate,
    canUpdate,
    canDelete,
    isAdmin,
    isManager,
    updateUserRole
  };
};