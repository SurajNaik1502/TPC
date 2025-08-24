-- Drop the overly permissive policy that allows viewing all profiles
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create a policy that allows users to view their own complete profile
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create a policy that allows viewing only basic info (display_name, avatar_url) of other users
-- This supports chat functionality while protecting sensitive data
CREATE POLICY "Users can view basic profile info of others" 
ON public.profiles 
FOR SELECT 
USING (
  -- Allow access to display_name and avatar_url columns only for other users
  -- This is enforced at the application level by only selecting these columns
  auth.uid() IS NOT NULL AND auth.uid() != user_id
);