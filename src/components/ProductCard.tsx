import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductModal } from "@/components/ProductModal";

interface ProductCardProps {
  id: number;
  image_url: string | null;
  media_urls: string[];
  brand: string;
  fabric: string;
  available_colors: number;
  sizes: string;
  moq: number;
  stock_status: string;
  category: string;
  description?: string | null;
}

export const ProductCard = ({
  id,
  image_url,
  media_urls = [],
  brand,
  fabric,
  available_colors,
  sizes,
  moq,
  stock_status,
  category,
  description = null,
}: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Use media_urls if available, otherwise fallback to image_url
  const images = media_urls.length > 0 ? media_urls : (image_url ? [image_url] : []);
  
  const nextImage = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };
  
  const prevImage = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  // Handle drag start
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX - translateX);
  };

  // Handle drag move
  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const newTranslateX = clientX - startX;
    setTranslateX(newTranslateX);
    
    // If drag distance is significant, change image
    if (Math.abs(newTranslateX) > 50) {
      if (newTranslateX > 0) {
        prevImage();
      } else {
        nextImage();
      }
      setTranslateX(0);
      setIsDragging(false);
    }
  };

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
    setTranslateX(0);
  };

  // Reset to current image when index changes
  useEffect(() => {
    setTranslateX(0);
  }, [currentImageIndex]);

  // Product data for modal
  const productData = {
    id,
    brand,
    fabric,
    available_colors,
    sizes,
    moq,
    stock_status,
    media_urls,
    image_url,
    description,
    category,
  };

  return (
    <>
      <Card 
        className="group overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)] hover:-translate-y-1 border border-[#D4AF37]/30 bg-[#0f0f0f] text-[#dcdcdc] cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="aspect-square overflow-hidden bg-black relative">
          {images.length > 0 ? (
            <div
              ref={carouselRef}
              className={`h-full w-full cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              <img
                src={images[currentImageIndex] || 'https://via.placeholder.com/300x300?text=No+Image'}
                alt={`${brand} - ${fabric}`}
                className="h-full w-full object-contain" // Changed from object-cover to object-contain
              />
              
              {/* Navigation arrows for carousel */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      prevImage();
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      nextImage();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight size={20} />
                  </button>
                  
                  {/* Indicators */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {images.map((_, index) => (
                      <div 
                        key={index}
                        className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-[#D4AF37]' : 'bg-white/50'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gray-800">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>
        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-lg text-[#D4AF37]">{brand}</h3>
              <Badge variant="outline" className="text-xs mt-1 border-[#D4AF37]/40 text-[#D4AF37]">
                {category}
              </Badge>
            </div>
            <span className={`shrink-0 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              stock_status === 'In Stock' ? 'bg-green-600/20 text-green-400' : 'bg-yellow-600/20 text-yellow-300'
            }`}>
              {stock_status}
            </span>
          </div>
          
          <div className="space-y-2 text-sm">
            <p className="text-[#bfbfbf]">
              <span className="font-medium text-[#dcdcdc]">Fabric:</span> {fabric}
            </p>
            <p className="text-[#bfbfbf]">
              <span className="font-medium text-[#dcdcdc]">Colors:</span> {available_colors} available
            </p>
            <p className="text-[#bfbfbf]">
              <span className="font-medium text-[#dcdcdc]">Sizes:</span> {sizes}
            </p>
            <p className="text-[#bfbfbf]">
              <span className="font-medium text-[#dcdcdc]">MOQ:</span> {moq} pieces
            </p>
          </div>
        </div>
      </Card>
      
      <ProductModal 
        product={productData}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};