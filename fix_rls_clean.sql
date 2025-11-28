DROP POLICY IF EXISTS "Authenticated users can insert products" ON public.products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON public.products;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON public.products;

CREATE POLICY "Anyone can insert products"
  ON public.products
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update products"
  ON public.products
  FOR UPDATE
  TO public
  USING (true);

CREATE POLICY "Anyone can delete products"
  ON public.products
  FOR DELETE
  TO public
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete product images" ON storage.objects;

CREATE POLICY "Anyone can upload product images"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Anyone can update product images"
  ON storage.objects
  FOR UPDATE
  TO public
  USING (bucket_id = 'product-images');

CREATE POLICY "Anyone can delete product images"
  ON storage.objects
  FOR DELETE
  TO public
  USING (bucket_id = 'product-images');
