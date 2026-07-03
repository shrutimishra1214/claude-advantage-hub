
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.subscribers;

CREATE POLICY "Anyone can subscribe with valid email"
  ON public.subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND length(email) <= 254
    AND (name IS NULL OR length(name) <= 100)
  );

REVOKE SELECT ON public.subscribers FROM anon, authenticated;
