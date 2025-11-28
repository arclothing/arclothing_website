import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { LogOut, Plus, RefreshCw, Pencil, Trash2, Upload, X } from "lucide-react";

interface Product {
  id: number;
  brand: string;
  fabric: string;
  available_colors: number;
  sizes: string;
  moq: number;
  stock_status: string;
  media_urls: string[];
  description: string | null;
  category: string;
  created_at: string | null;
}

interface DatabaseProduct extends Omit<Product, 'media_urls'> {
  image_url: string | null;
  media_urls: string[] | null;
}

interface DatabaseProduct extends Omit<Product, 'media_urls'> {
  image_url: string | null;
  media_urls: string[] | null;
}

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    brand: "",
    fabric: "",
    available_colors: 0,
    sizes: "",
    moq: 0,
    stock_status: "In Stock",
    media_urls: [] as string[],
    description: "",
    category: "General",
  });

  useEffect(() => {
    checkAuth();
    fetchProducts();
  }, []);

  const checkAuth = () => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn || isLoggedIn !== "true") {
      navigate("/admin");
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: true });

      if (error) throw error;
      
      // Cast the data to our Product interface
      const productsData = (data || []).map((product: DatabaseProduct) => ({
        ...product,
        media_urls: Array.isArray(product.media_urls) ? product.media_urls : [],
        description: product.description || null
      }));
      
      setProducts(productsData as Product[]);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminEmail");
    navigate("/admin");
    toast.success("Logged out successfully");
  };
  // const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;
  //
  //   try {
  //     setUploading(true);
  //     const fileExt = file.name.split(".").pop();
  //     const fileName = `${Math.random()}.${fileExt}`;
  //     const filePath = `${fileName}`;
  //
  //     const { error: uploadError } = await supabase.storage
  //       .from("product-images")
  //       .upload(filePath, file);
  //
  //     if (uploadError) throw uploadError;
  //
  //     const { data } = supabase.storage
  //       .from("product-images")
  //       .getPublicUrl(filePath);
  //
  //     setFormData({ ...formData, image_url: data.publicUrl });
  //     toast.success("Image uploaded successfully");
  //   } catch (error: any) {
  //     toast.error(error.message || "Error uploading image");
  //   } finally {
  //     setUploading(false);
  //   }
  // };



  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploading(true);
      
      const newMediaUrls: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}_${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("product-images")
          .getPublicUrl(filePath);

        newMediaUrls.push(data.publicUrl);
      }

      setFormData({ 
        ...formData, 
        media_urls: [...formData.media_urls, ...newMediaUrls]
      });
      
      toast.success(`${files.length} file(s) uploaded successfully`);
    } catch (error: any) {
      toast.error(error.message || "Error uploading files");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingProduct) {
        // Ensure primary key 'id' is not included in update payload
        const { brand, fabric, available_colors, sizes, moq, stock_status, media_urls, description, category } = formData;
        const updatePayload = { brand, fabric, available_colors, sizes, moq, stock_status, media_urls, description, category };
        const { error } = await supabase
          .from("products")
          .update(updatePayload)
          .eq("id", editingProduct.id);

        if (error) throw error;
        toast.success("Product updated successfully");
      } else {
        const { error } = await supabase
          .from("products")
          .insert([formData]);

        if (error) throw error;
        toast.success("Product added successfully");
      }

      setDialogOpen(false);
      resetForm();
      fetchProducts();
    } catch (error: any) {
      toast.error(error.message || "Operation failed");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error: any) {
      toast.error(error.message || "Delete failed");
    }
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    // Exclude 'id' from form state to avoid attempting to update primary key
    setFormData({
      brand: product.brand,
      fabric: product.fabric,
      available_colors: product.available_colors,
      sizes: product.sizes,
      moq: product.moq,
      stock_status: product.stock_status,
      media_urls: product.media_urls,
      description: product.description || "",
      category: product.category,
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      brand: "",
      fabric: "",
      available_colors: 0,
      sizes: "",
      moq: 0,
      stock_status: "In Stock",
      media_urls: [] as string[],
      description: "",
      category: "General",
    });
  };

  const removeMedia = (index: number) => {
    const newMediaUrls = [...formData.media_urls];
    newMediaUrls.splice(index, 1);
    
    setFormData({
      ...formData,
      media_urls: newMediaUrls
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Products</h2>
            <p className="text-sm text-muted-foreground">Manage your product inventory</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchProducts} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Dialog open={dialogOpen} onOpenChange={(open) => {
              setDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-gradient-to-r from-primary to-primary/90">
                  <Plus className="h-4 w-4" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="media">Product Media (Images/Videos)</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="media"
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleMediaUpload}
                        disabled={uploading}
                        multiple
                      />
                      {uploading && <span className="text-sm text-muted-foreground">Uploading...</span>}
                    </div>
                    
                    {/* Media previews */}
                    {formData.media_urls.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {formData.media_urls.map((url, index) => (
                          <div key={index} className="relative group">
                            {url.includes('.mp4') || url.includes('.webm') || url.includes('.ogg') ? (
                              <video 
                                src={url} 
                                className="h-24 w-full object-cover rounded-lg border"
                                controls={false}
                              />
                            ) : (
                              <img 
                                src={url} 
                                alt={`Media ${index + 1}`} 
                                className="h-24 w-full object-cover rounded-lg border"
                              />
                            )}
                            <button
                              type="button"
                              onClick={() => removeMedia(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Product description..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="brand">Brand</Label>
                      <Input
                        id="brand"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        placeholder="T-Shirts, Jeans, Dresses, etc."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fabric">Fabric</Label>
                      <Input
                        id="fabric"
                        value={formData.fabric}
                        onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="colors">Available Colors</Label>
                      <Input
                        id="colors"
                        type="number"
                        min="0"
                        value={formData.available_colors}
                        onChange={(e) => setFormData({ ...formData, available_colors: Number(e.target.value) || 0 })}
                        placeholder="Number of available colors"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sizes">Sizes</Label>
                      <Input
                        id="sizes"
                        value={formData.sizes}
                        onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                        placeholder="S, M, L, XL"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="moq">MOQ (Minimum Order Quantity)</Label>
                      <Input
                        id="moq"
                        type="number"
                        min="1"
                        value={formData.moq}
                        onChange={(e) => setFormData({ ...formData, moq: Number(e.target.value) || 0 })}
                        placeholder="Enter minimum order quantity"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stock">Stock Status</Label>
                      <Input
                        id="stock"
                        value={formData.stock_status}
                        onChange={(e) => setFormData({ ...formData, stock_status: e.target.value })}
                        placeholder="In Stock, Limited Stock"
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    {editingProduct ? "Update Product" : "Add Product"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">No products yet. Add your first product!</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Fabric</TableHead>
                    <TableHead>Colors</TableHead>
                    <TableHead>Sizes</TableHead>
                    <TableHead>MOQ</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img src={(product.media_urls.length > 0 ? product.media_urls[0] : null) || 'https://via.placeholder.com/48x48?text=No+Image'} alt={product.brand} className="h-12 w-12 object-cover rounded-lg" />
                      </TableCell>
                      <TableCell className="font-medium">{product.brand}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {product.category}
                        </span>
                      </TableCell>
                      <TableCell>{product.fabric}</TableCell>
                      <TableCell>{product.available_colors}</TableCell>
                      <TableCell>{product.sizes}</TableCell>
                      <TableCell>{product.moq}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          product.stock_status === 'In Stock' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {product.stock_status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(product)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
