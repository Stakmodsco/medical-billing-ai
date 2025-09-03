-- Create core healthcare database schema

-- Patients table
CREATE TABLE public.patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  patient_id TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  phone TEXT,
  email TEXT,
  address JSONB,
  insurance_primary JSONB,
  insurance_secondary JSONB,
  medical_record_number TEXT,
  emergency_contact JSONB,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'deceased')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Healthcare providers table
CREATE TABLE public.providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  provider_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  specialty TEXT,
  npi_number TEXT UNIQUE,
  license_number TEXT,
  phone TEXT,
  email TEXT,
  address JSONB,
  credentials TEXT[],
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insurance companies table
CREATE TABLE public.insurance_companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  contact_info JSONB,
  claim_submission_info JSONB,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Claims table
CREATE TABLE public.claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  claim_number TEXT UNIQUE NOT NULL,
  patient_id UUID REFERENCES public.patients(id) NOT NULL,
  provider_id UUID REFERENCES public.providers(id) NOT NULL,
  insurance_company_id UUID REFERENCES public.insurance_companies(id) NOT NULL,
  claim_type TEXT NOT NULL CHECK (claim_type IN ('medical', 'dental', 'vision', 'pharmacy')),
  service_date DATE NOT NULL,
  submission_date TIMESTAMPTZ DEFAULT now(),
  diagnosis_codes TEXT[],
  procedure_codes TEXT[],
  total_amount DECIMAL(10,2) NOT NULL,
  submitted_amount DECIMAL(10,2) NOT NULL,
  approved_amount DECIMAL(10,2),
  paid_amount DECIMAL(10,2),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'pending', 'approved', 'denied', 'paid', 'appealed')),
  denial_reason TEXT,
  notes TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  claim_id UUID REFERENCES public.claims(id) NOT NULL,
  payment_id TEXT UNIQUE NOT NULL,
  payer_name TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_date DATE NOT NULL,
  payment_method TEXT,
  check_number TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processed', 'failed', 'returned')),
  remittance_advice JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Audit logs table for HIPAA compliance
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Prior authorizations table
CREATE TABLE public.prior_authorizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES public.patients(id) NOT NULL,
  provider_id UUID REFERENCES public.providers(id) NOT NULL,
  insurance_company_id UUID REFERENCES public.insurance_companies(id) NOT NULL,
  authorization_number TEXT UNIQUE,
  service_type TEXT NOT NULL,
  procedure_codes TEXT[],
  diagnosis_codes TEXT[],
  requested_date DATE NOT NULL,
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied', 'expired')),
  approval_criteria TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insurance_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prior_authorizations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for patients
CREATE POLICY "Users can view their own patients" ON public.patients
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own patients" ON public.patients
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own patients" ON public.patients
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for providers
CREATE POLICY "Users can view their own providers" ON public.providers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own providers" ON public.providers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own providers" ON public.providers
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for insurance companies (viewable by all authenticated users)
CREATE POLICY "Authenticated users can view insurance companies" ON public.insurance_companies
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can create insurance companies" ON public.insurance_companies
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create RLS policies for claims
CREATE POLICY "Users can view their own claims" ON public.claims
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own claims" ON public.claims
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own claims" ON public.claims
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for payments
CREATE POLICY "Users can view their own payments" ON public.payments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own payments" ON public.payments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own payments" ON public.payments
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for audit logs
CREATE POLICY "Users can view their own audit logs" ON public.audit_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can create audit logs" ON public.audit_logs
  FOR INSERT WITH CHECK (true);

-- Create RLS policies for prior authorizations
CREATE POLICY "Users can view their own prior authorizations" ON public.prior_authorizations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own prior authorizations" ON public.prior_authorizations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own prior authorizations" ON public.prior_authorizations
  FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_patients_user_id ON public.patients(user_id);
CREATE INDEX idx_patients_patient_id ON public.patients(patient_id);
CREATE INDEX idx_claims_user_id ON public.claims(user_id);
CREATE INDEX idx_claims_patient_id ON public.claims(patient_id);
CREATE INDEX idx_claims_status ON public.claims(status);
CREATE INDEX idx_claims_service_date ON public.claims(service_date);
CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_payments_claim_id ON public.payments(claim_id);
CREATE INDEX idx_payments_payment_date ON public.payments(payment_date);
CREATE INDEX idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_timestamp ON public.audit_logs(timestamp);

-- Create triggers for updated_at columns
CREATE TRIGGER update_patients_updated_at
  BEFORE UPDATE ON public.patients
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_providers_updated_at
  BEFORE UPDATE ON public.providers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_insurance_companies_updated_at
  BEFORE UPDATE ON public.insurance_companies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_claims_updated_at
  BEFORE UPDATE ON public.claims
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_prior_authorizations_updated_at
  BEFORE UPDATE ON public.prior_authorizations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample insurance companies
INSERT INTO public.insurance_companies (name, code, contact_info, claim_submission_info) VALUES
('Aetna', 'AETNA', '{"phone": "1-800-872-3862", "website": "aetna.com"}', '{"submission_type": "electronic", "endpoint": "api.aetna.com/claims"}'),
('Blue Cross Blue Shield', 'BCBS', '{"phone": "1-888-630-2583", "website": "bcbs.com"}', '{"submission_type": "electronic", "endpoint": "api.bcbs.com/claims"}'),
('Cigna', 'CIGNA', '{"phone": "1-800-244-6224", "website": "cigna.com"}', '{"submission_type": "electronic", "endpoint": "api.cigna.com/claims"}'),
('UnitedHealthcare', 'UHC', '{"phone": "1-888-545-5205", "website": "uhc.com"}', '{"submission_type": "electronic", "endpoint": "api.uhc.com/claims"}'),
('Humana', 'HUMANA', '{"phone": "1-800-448-6262", "website": "humana.com"}', '{"submission_type": "electronic", "endpoint": "api.humana.com/claims"}');