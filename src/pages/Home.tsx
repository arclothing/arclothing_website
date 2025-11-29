import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductCard } from "@/components/ProductCard";

interface Product {
  id: number;
  brand: string;
  fabric: string;
  available_colors: number;
  sizes: string;
  moq: number;
  stock_status: string;
  image_url: string | null;
  media_urls: string[];
  category: string;
  description: string | null;
}

const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        
        // Fetch trending products
        const { data: productsData, error: productsError } = await supabase
          .from("products")
          .select("*")
          .order("id", { ascending: false });
        if (productsError) throw productsError;
        const productsList = (productsData || []).slice(0, 4);
        setTrendingProducts(productsList);
        
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("products")
          .select("category");
        if (categoriesError) throw categoriesError;
        const uniqueCategories = Array.from(new Set(categoriesData.map(p => p.category))).filter(Boolean);
        setCategories(uniqueCategories);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1a1a1a] to-black py-20 text-[#D4AF37]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">AR FASHIONS</h1>
            <p className="text-xl mb-8 opacity-90">Bulk clothing orders for retailers, wholesalers, and businesses</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="/catalog">
                <Button size="lg" className="bg-[#D4AF37] text-black hover:bg-[#b08d2f]">Browse Products</Button>
              </a>
              <a href="/contact">
                <Button size="lg" variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black bg-transparent">Get Quote</Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-16 bg-black border-t border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-[#D4AF37]">Trending Products</h2>
            <a href="/catalog"><Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black">View All</Button></a>
          </div>
          
          {/* Categories as small sub-heading */}
          {categories.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <a
                  key={category}
                  href={`/catalog?category=${encodeURIComponent(category)}`}
                  className="text-sm px-3 py-1 bg-[#1a1a1a] text-[#D4AF37] rounded-full border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-black transition-colors"
                >
                  {category}
                </a>
              ))}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="h-80 bg-muted rounded-2xl animate-pulse" />
              ))
            ) : (
              trendingProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />

      {/* WhatsApp Floating Icon */}
      <a 
        href="https://wa.me/+919900724060" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center bg-white"
      >
        <img src="/whatsapp_icon.png" alt="Chat on WhatsApp" className="w-8 h-8" />
      </a>
    </div>
  );
};

export default Home;