-- Helper to check if a user is admin based on profiles.role
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.user_id = _user_id
      AND p.role = 'admin'
  );
$$;

-- Tighten RLS on contact_inquiries: admin-only read/update
-- Remove overly-permissive policies if they exist
DROP POLICY IF EXISTS "Authenticated users can view inquiries" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Authenticated users can update inquiries" ON public.contact_inquiries;

-- Allow only admins to view inquiries
CREATE POLICY "Admins can view inquiries"
ON public.contact_inquiries
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- Allow only admins to update inquiries
CREATE POLICY "Admins can update inquiries"
ON public.contact_inquiries
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));