import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

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

const ProductCatalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [stock, setStock] = useState<string>("All");
  const [categories, setCategories] = useState<string[]>([]);
  const [sort, setSort] = useState<string>("latest");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("id", { ascending: true });
        if (error) throw error;
        const productsData = data || [];
        setProducts(productsData);
        const unique = Array.from(new Set(productsData.map(p => p.category))).filter(Boolean);
        setCategories(unique);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    let data = [...products];
    if (category !== "All") data = data.filter(p => p.category === category);
    if (stock !== "All") data = data.filter(p => p.stock_status === stock);
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(p => p.brand.toLowerCase().includes(q) || p.fabric.toLowerCase().includes(q));
    }
    if (sort === "latest") data.sort((a, b) => (a.id < b.id ? 1 : -1));
    if (sort === "brand-asc") data.sort((a, b) => a.brand.localeCompare(b.brand));
    if (sort === "brand-desc") data.sort((a, b) => b.brand.localeCompare(a.brand));
    return data;
  }, [products, category, stock, search, sort]);

  return (
    <div className="min-h-screen bg-black text-[#dcdcdc]">
      <Navbar />

      {/* Banner */}
      <section className="border-b border-[#D4AF37]/30 bg-gradient-to-br from-black via-[#0e0e0e] to-black text-[#D4AF37]">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Catalog</h1>
          <p className="mt-2 text-[#bfbfbf]">Trending pants and shirts for B2B bulk orders.</p>
          {categories.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {["All", ...categories].map(c => (
                <Badge
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`cursor-pointer ${category === c ? "bg-[#D4AF37] text-black" : "bg-transparent border border-[#D4AF37]/40 text-[#D4AF37]"}`}
                >
                  {c}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        {/* Controls */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-2">
            <Input className="bg-black text-[#dcdcdc] border-[#D4AF37]/30" placeholder="Search by brand or fabric..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={stock} onValueChange={setStock}>
            <SelectTrigger className="bg-black text-[#dcdcdc] border-[#D4AF37]/30">
              <SelectValue placeholder="Stock" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Stock</SelectItem>
              <SelectItem value="In Stock">In Stock</SelectItem>
              <SelectItem value="Limited Stock">Limited Stock</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="bg-black text-[#dcdcdc] border-[#D4AF37]/30">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="brand-asc">Brand A→Z</SelectItem>
              <SelectItem value="brand-desc">Brand Z→A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 bg-[#111] border border-[#D4AF37]/10 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-[#bfbfbf]">No products match your filters.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 p-6 border border-[#D4AF37]/30 rounded-2xl bg-black text-[#dcdcdc] flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-[#D4AF37]">Bulk Orders Welcome</h3>
            <p className="text-[#bfbfbf]">We specialize in B2B. Contact us for pricing and MOQ offers.</p>
          </div>
          <Button asChild className="bg-[#D4AF37] text-black hover:bg-[#b08d2f]">
            <a href="/contact">Contact Sales</a>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ProductCatalog;