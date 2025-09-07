-- Tighten RLS for insurance_companies
ALTER TABLE public.insurance_companies ENABLE ROW LEVEL SECURITY;

-- Drop existing permissive policies if they exist
DROP POLICY IF EXISTS "Authenticated users can create insurance companies" ON public.insurance_companies;
DROP POLICY IF EXISTS "Authenticated users can view insurance companies" ON public.insurance_companies;

-- Only admins can create insurance companies
CREATE POLICY "Admins can create insurance companies"
ON public.insurance_companies
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

-- Admins can view all insurance companies
CREATE POLICY "Admins can view insurance companies"
ON public.insurance_companies
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- Regular authenticated users can view only active insurance companies
CREATE POLICY "Users can view active insurance companies"
ON public.insurance_companies
FOR SELECT
TO authenticated
USING ((status = 'active'::text) AND (auth.role() = 'authenticated'::text));