-- Step 1: Drop all existing policies first
DROP POLICY IF EXISTS "Anyone can insert products" ON public.products;
DROP POLICY IF EXISTS "Anyone can update products" ON public.products;
DROP POLICY IF EXISTS "Anyone can delete products" ON public.products;
DROP POLICY IF EXISTS "Authenticated users can insert products" ON public.products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON public.products;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON public.products;

-- Step 2: Create new public policies
CREATE POLICY "Public can insert products"
  ON public.products
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can update products"
  ON public.products
  FOR UPDATE
  TO public
  USING (true);

CREATE POLICY "Public can delete products"
  ON public.products
  FOR DELETE
  TO public
  USING (true);
