-- Add category column to existing products table
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS category text NOT NULL DEFAULT 'General';

-- Create indexes for better mobile performance
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON public.products(brand);
CREATE INDEX IF NOT EXISTS idx_products_stock_status ON public.products(stock_status);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON public.products(created_at DESC);

-- Update existing products with sample categories (optional)
UPDATE public.products 
SET category = CASE 
  WHEN brand ILIKE '%nike%' OR brand ILIKE '%adidas%' OR brand ILIKE '%puma%' THEN 'T-Shirts'
  WHEN brand ILIKE '%levi%' OR brand ILIKE '%wrangler%' THEN 'Jeans'
  WHEN brand ILIKE '%h&m%' OR brand ILIKE '%zara%' THEN 'Dresses'
  ELSE 'General'
END
WHERE category = 'General';
