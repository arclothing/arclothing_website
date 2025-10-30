import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Shirt, Zap } from "lucide-react";

interface Product {
  id: number;
  brand: string;
  fabric: string;
  available_colors: number;
  sizes: string;
  moq: number;
  stock_status: string;
  image_url: string | null;
  category: string;
}

const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("id", { ascending: false });
        if (error) throw error;
        const list = (data || []).slice(0, 4);
        setTrendingProducts(list);
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
            <h1 className="text-5xl font-bold mb-4">Premium B2B Fashion Supplier</h1>
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

      {/* Our Brands (logos only) */}
      <section className="py-12 bg-black border-b border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-semibold text-[#D4AF37] mb-8">Our Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 items-center justify-items-center">
            {[
              { src: "/brands/nike-logo.png", alt: "Nike" },
              { src: "/brands/adidas-logo.png", alt: "Adidas" },
              { src: "/brands/puma-png.png", alt: "Puma" },
              { src: "/brands/levi-logo.png", alt: "Levi's" },
            ].map((logo) => (
              <img
                key={logo.src}
                src={logo.src}
                alt={logo.alt}
                className="h-12 md:h-16 w-auto object-contain"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[#0e0e0e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#D4AF37]">Why Choose AR Fashion?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border border-[#D4AF37]/40 bg-black text-[#dcdcdc]">
              <CardHeader>
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <Zap className="text-accent-foreground" size={24} />
                </div>
                <CardTitle>Competitive Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Best wholesale prices for bulk orders with flexible MOQ</p>
              </CardContent>
            </Card>

            <Card className="border border-[#D4AF37]/40 bg-black text-[#dcdcdc]">
              <CardHeader>
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <Shirt className="text-accent-foreground" size={24} />
                </div>
                <CardTitle>Quality Assurance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Premium fabrics and rigorous quality control on all products</p>
              </CardContent>
            </Card>

            <Card className="border border-[#D4AF37]/40 bg-black text-[#dcdcdc]">
              <CardHeader>
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="text-accent-foreground" size={24} />
                </div>
                <CardTitle>Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Quick turnaround times and reliable shipping worldwide</p>
              </CardContent>
            </Card>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="h-80 bg-muted rounded-2xl animate-pulse" />
              ))
            ) : (
              trendingProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition border border-[#D4AF37]/30 bg-[#0f0f0f] text-[#dcdcdc]">
                  <div className="aspect-square bg-black overflow-hidden">
                    <img
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.brand}
                      className="w-full h-full object-cover hover:scale-105 transition"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg text-[#D4AF37]">{product.brand}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-[#bfbfbf]">
                      <p>{product.fabric}</p>
                      <p>MOQ: {product.moq} pcs</p>
                    </div>
                    <a href="/catalog"><Button className="w-full mt-4 bg-[#D4AF37] text-black hover:bg-[#b08d2f]">View Details</Button></a>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

