import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface Patient {
  id: string;
  patient_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender?: string;
  phone?: string;
  email?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Claim {
  id: string;
  claim_number: string;
  patient_id: string;
  total_amount: number;
  submitted_amount: number;
  approved_amount?: number;
  paid_amount?: number;
  status: string;
  service_date: string;
  created_at: string;
  patients?: {
    first_name: string;
    last_name: string;
    patient_id: string;
  };
}

export interface Payment {
  id: string;
  payment_id: string;
  payer_name: string;
  amount: number;
  payment_date: string;
  status: string;
  created_at: string;
  claims?: {
    claim_number: string;
    total_amount: number;
  };
}

export const useHealthcareData = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch all healthcare data
  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [patientsResult, claimsResult, paymentsResult] = await Promise.all([
        supabase.from('patients').select('*').order('created_at', { ascending: false }),
        supabase.from('claims').select(`
          *,
          patients (
            first_name,
            last_name,
            patient_id
          )
        `).order('created_at', { ascending: false }),
        supabase.from('payments').select(`
          *,
          claims (
            claim_number,
            total_amount
          )
        `).order('created_at', { ascending: false })
      ]);

      if (patientsResult.error) throw patientsResult.error;
      if (claimsResult.error) throw claimsResult.error;
      if (paymentsResult.error) throw paymentsResult.error;

      setPatients(patientsResult.data || []);
      setClaims(claimsResult.data as Claim[] || []);
      setPayments(paymentsResult.data as Payment[] || []);

    } catch (error: any) {
      console.error('Error fetching healthcare data:', error);
      toast({
        title: "Error loading data",
        description: "Failed to load healthcare data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Create a new patient
  const createPatient = async (patientData: Omit<Patient, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .insert([{
          ...patientData,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
        .single();

      if (error) throw error;

      setPatients(prev => [data, ...prev]);
      toast({
        title: "Patient created",
        description: `Patient ${data.first_name} ${data.last_name} has been added.`,
      });

      return data;
    } catch (error: any) {
      console.error('Error creating patient:', error);
      toast({
        title: "Error creating patient",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  // Create a new claim
  const createClaim = async (claimData: any) => {
    try {
      const user = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('claims')
        .insert([{
          ...claimData,
          user_id: user.data.user?.id,
          claim_number: `CLM-${Date.now()}`,
        }])
        .select(`
          *,
          patients (
            first_name,
            last_name,
            patient_id
          )
        `)
        .single();

      if (error) throw error;

      setClaims(prev => [data as Claim, ...prev]);
      toast({
        title: "Claim created",
        description: `Claim ${data.claim_number} has been submitted.`,
      });

      return data;
    } catch (error: any) {
      console.error('Error creating claim:', error);
      toast({
        title: "Error creating claim",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  // Update claim status
  const updateClaimStatus = async (claimId: string, status: string, updates: Partial<Claim> = {}) => {
    try {
      const { data, error } = await supabase
        .from('claims')
        .update({ status, ...updates })
        .eq('id', claimId)
        .select(`
          *,
          patients (
            first_name,
            last_name,
            patient_id
          )
        `)
        .single();

      if (error) throw error;

      setClaims(prev => prev.map(claim => 
        claim.id === claimId ? data as Claim : claim
      ));

      toast({
        title: "Claim updated",
        description: `Claim ${data.claim_number} status updated to ${status}.`,
      });

      return data;
    } catch (error: any) {
      console.error('Error updating claim:', error);
      toast({
        title: "Error updating claim",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  // Get dashboard metrics
  const getDashboardMetrics = () => {
    const totalRevenue = payments.reduce((sum, payment) => 
      payment.status === 'processed' ? sum + payment.amount : sum, 0
    );
    
    const processedClaims = claims.filter(claim => 
      ['approved', 'paid'].includes(claim.status)
    ).length;
    
    const totalClaims = claims.length;
    const processingRate = totalClaims > 0 ? (processedClaims / totalClaims) * 100 : 0;
    
    const activePatients = patients.filter(patient => 
      patient.status === 'active'
    ).length;

    return {
      totalRevenue,
      processingRate: Math.round(processingRate),
      activePatients,
      totalClaims
    };
  };

  // Get revenue analytics data
  const getRevenueAnalytics = (timeRange: string) => {
    const now = new Date();
    let startDate = new Date();
    
    switch (timeRange) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 7);
    }

    const filteredPayments = payments.filter(payment => 
      new Date(payment.payment_date) >= startDate && payment.status === 'processed'
    );

    const filteredClaims = claims.filter(claim => 
      new Date(claim.service_date) >= startDate
    );

    const totalRevenue = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
    const totalClaims = filteredClaims.length;
    const avgRate = totalClaims > 0 ? 
      (filteredClaims.filter(c => c.status === 'paid').length / totalClaims) * 100 : 0;

    // Generate data points for charts based on time range
    const dataPoints = [];
    const numPoints = timeRange === 'week' ? 7 : timeRange === 'month' ? 4 : 12;
    
    for (let i = numPoints - 1; i >= 0; i--) {
      const date = new Date();
      if (timeRange === 'week') {
        date.setDate(date.getDate() - i);
      } else if (timeRange === 'month') {
        date.setDate(date.getDate() - (i * 7));
      } else {
        date.setMonth(date.getMonth() - i);
      }
      
      const periodPayments = filteredPayments.filter(payment => {
        const paymentDate = new Date(payment.payment_date);
        if (timeRange === 'week') {
          return paymentDate.toDateString() === date.toDateString();
        } else if (timeRange === 'month') {
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          return paymentDate >= weekStart && paymentDate <= weekEnd;
        } else {
          return paymentDate.getMonth() === date.getMonth() && 
                 paymentDate.getFullYear() === date.getFullYear();
        }
      });

      const periodClaims = filteredClaims.filter(claim => {
        const claimDate = new Date(claim.service_date);
        if (timeRange === 'week') {
          return claimDate.toDateString() === date.toDateString();
        } else if (timeRange === 'month') {
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          return claimDate >= weekStart && claimDate <= weekEnd;
        } else {
          return claimDate.getMonth() === date.getMonth() && 
                 claimDate.getFullYear() === date.getFullYear();
        }
      });

      dataPoints.push({
        period: timeRange === 'week' ? 
          date.toLocaleDateString('en-US', { weekday: 'short' }) :
          timeRange === 'month' ?
          `Week ${Math.ceil((date.getDate()) / 7)}` :
          date.toLocaleDateString('en-US', { month: 'short' }),
        revenue: periodPayments.reduce((sum, p) => sum + p.amount, 0),
        claims: periodClaims.length,
        rate: periodClaims.length > 0 ? 
          (periodClaims.filter(c => c.status === 'paid').length / periodClaims.length) * 100 : 0
      });
    }

    return {
      totalRevenue,
      totalClaims,
      avgRate: Math.round(avgRate),
      data: dataPoints
    };
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    patients,
    claims,
    payments,
    loading,
    createPatient,
    createClaim,
    updateClaimStatus,
    getDashboardMetrics,
    getRevenueAnalytics,
    refetch: fetchData
  };
};