-- OSMS RECURSION FIX (Run this to solve "infinite recursion detected in policy")
-- RUN THIS IN SUPABASE SQL EDITOR

-- 1. Create a security-bypass function to check roles
-- This function runs with 'SECURITY DEFINER', allowing it to read 'public.users' 
-- without triggering the RLS policies on 'public.users'.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- We query the users table directly. Since this is SECURITY DEFINER,
  -- it bypasses RLS and prevents the infinite loop.
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Clean up ALL problematic policies on the users table
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Admins can manage users" ON public.users;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;

-- 3. Recreate users policies WITHOUT recursion
-- Policy: Users can see themselves
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Policy: Admins can see everyone (Uses the non-recursive function)
CREATE POLICY "Admins can view all users" ON public.users
  FOR SELECT USING (public.is_admin());

-- Policy: Admins can do everything
CREATE POLICY "Admins can manage users" ON public.users
  FOR ALL USING (public.is_admin());

-- 4. Fix activity_logs policies (This was also causing recursion due to joins)
DROP POLICY IF EXISTS "Admins can view all activity logs" ON public.activity_logs;
CREATE POLICY "Admins can view all activity logs" 
    ON public.activity_logs FOR SELECT 
    USING (public.is_admin());

-- 5. Force update your admin account (RUN THIS)
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'admin@gmail.com' OR email = 'admin@uu.edu';

-- 6. Verify enrollment (Optional: run this to see if you are correctly set)
-- SELECT id, email, role FROM public.users WHERE email = 'admin@gmail.com';
