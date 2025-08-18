-- Fix the function search path issue by making it immutable
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, company_name, role)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data ->> 'company_name',
    NEW.raw_user_meta_data ->> 'role'
  );
  RETURN NEW;
END;
$$;