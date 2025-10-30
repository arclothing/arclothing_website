-- Optimize products table for mobile and add category column
-- Drop existing table and recreate with optimized schema
DROP TABLE IF EXISTS public.products CASCADE;

-- Create optimized products table
CREATE TABLE public.products (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  brand text NOT NULL,
  fabric text NOT NULL,
  available_colors int NOT NULL DEFAULT 0,
  sizes text NOT NULL,
  moq int NOT NULL DEFAULT 0,
  stock_status text NOT NULL DEFAULT 'In Stock',
  image_url text,
  category text NOT NULL DEFAULT 'General',
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Public read access for the storefront
CREATE POLICY "Anyone can view products"
  ON public.products
  FOR SELECT
  USING (true);

-- Public write access (for admin operations)
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

-- Create index for better mobile performance
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_brand ON public.products(brand);
CREATE INDEX idx_products_stock_status ON public.products(stock_status);
CREATE INDEX idx_products_created_at ON public.products(created_at DESC);

-- Add some sample categories
INSERT INTO public.products (brand, fabric, available_colors, sizes, moq, stock_status, image_url, category) VALUES
('Nike', 'Cotton Blend', 5, 'S,M,L,XL', 100, 'In Stock', 'https://via.placeholder.com/300x300?text=Nike+Shirt', 'T-Shirts'),
('Adidas', 'Polyester', 3, 'S,M,L,XL,XXL', 150, 'In Stock', 'https://via.placeholder.com/300x300?text=Adidas+Shirt', 'T-Shirts'),
('Puma', 'Cotton', 4, 'M,L,XL', 75, 'Limited Stock', 'https://via.placeholder.com/300x300?text=Puma+Shirt', 'T-Shirts'),
('Levi''s', 'Denim', 2, '28,30,32,34,36', 200, 'In Stock', 'https://via.placeholder.com/300x300?text=Levis+Jeans', 'Jeans'),
('Wrangler', 'Denim', 3, '30,32,34,36,38', 120, 'In Stock', 'https://via.placeholder.com/300x300?text=Wrangler+Jeans', 'Jeans'),
('H&M', 'Cotton', 6, 'XS,S,M,L,XL', 80, 'In Stock', 'https://via.placeholder.com/300x300?text=H&M+Dress', 'Dresses'),
('Zara', 'Polyester Blend', 4, 'S,M,L,XL', 90, 'In Stock', 'https://via.placeholder.com/300x300?text=Zara+Dress', 'Dresses');
