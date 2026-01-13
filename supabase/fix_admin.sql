-- OSMS Admin Fix Script
-- Run this in your Supabase SQL Editor

-- 1. Create a security definer function to check admin status
-- This avoids RLS recursion when checking roles
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Add missing policies for activity_logs
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'activity_logs' AND policyname = 'Admins can view all activity logs'
    ) THEN
        CREATE POLICY "Admins can view all activity logs" 
            ON public.activity_logs FOR SELECT 
            USING (public.is_admin());
    END IF;
END $$;

-- 3. Fix the admin role for your specific email (run this for each admin email)
-- Replace 'admin@gmail.com' with your actual email if different
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'admin@gmail.com' OR email = 'admin@uu.edu';

-- 4. Ensure RLS is enabled
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- 5. Update other policies to use the new is_admin() function for better performance
-- (Optional but recommended to avoid recursion)
DROP POLICY IF EXISTS "Admins can view all users" ON users;
CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can manage users" ON users;
CREATE POLICY "Admins can manage users" ON users
  FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can manage students" ON students;
CREATE POLICY "Admins can manage students" ON students
  FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can manage faculty" ON faculty;
CREATE POLICY "Admins can manage faculty" ON faculty
  FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can manage all courses" ON courses;
CREATE POLICY "Admins can manage all courses" ON courses
  FOR ALL USING (public.is_admin());
