-- Add media columns to support multiple images and videos
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS media_urls jsonb NOT NULL DEFAULT '[]';

-- Add a description column for product descriptions
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS description text;

COMMENT ON COLUMN public.products.media_urls IS 'JSON array of media URLs (images and videos)';