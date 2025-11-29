import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Share2 } from "lucide-react";
import { ProductCarousel } from "@/components/ProductCarousel";

interface ProductModalProps {
  product: {
    id: number;
    brand: string;
    fabric: string;
    available_colors: number;
    sizes: string;
    moq: number;
    stock_status: string;
    media_urls: string[];
    image_url: string | null;
    description: string | null;
    category: string;
  };
  onClose: () => void;
  isOpen: boolean;
}

export const ProductModal = ({ product, onClose, isOpen }: ProductModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Use media_urls if available, otherwise fallback to image_url
  const images = product.media_urls.length > 0 ? product.media_urls : (product.image_url ? [product.image_url] : []);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.brand,
          text: `Check out this ${product.brand} product!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
        // Fallback to copy URL
        copyToClipboard();
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("Link copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });
  };

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in the ${product.brand} product. Could you please provide more details?`;
    const whatsappUrl = `https://wa.me/+919900724060?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-[#0f0f0f] border border-[#D4AF37]/30 rounded-2xl scrollbar-hide"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors lg:top-6 lg:right-6"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-6 p-0 lg:p-6">
          {/* Product Images - Full width on mobile, no borders */}
          <div className="relative w-full bg-black">
            <div className="aspect-square w-full relative">
              <ProductCarousel 
                images={images} 
                alt={product.brand} 
              />
              {/* Share button positioned on the image area for easy access */}
              <button
                onClick={handleShare}
                className="absolute bottom-4 right-4 bg-[#D4AF37] text-black p-3 rounded-full shadow-lg hover:bg-[#b08d2f] transition-all duration-300 z-10"
              >
                <Share2 size={24} />
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6 p-6 lg:p-0 lg:pt-0">
            <div>
              <h2 className="text-2xl font-bold text-[#D4AF37]">{product.brand}</h2>
              <p className="text-lg text-[#bfbfbf] mt-1">{product.category}</p>
              
              <div className="flex items-center gap-2 mt-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  product.stock_status === 'In Stock' 
                    ? 'bg-green-600/20 text-green-400' 
                    : 'bg-yellow-600/20 text-yellow-300'
                }`}>
                  {product.stock_status}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#bfbfbf]">Fabric</p>
                  <p className="font-medium text-[#dcdcdc]">{product.fabric}</p>
                </div>
                <div>
                  <p className="text-sm text-[#bfbfbf]">Available Colors</p>
                  <p className="font-medium text-[#dcdcdc]">{product.available_colors}</p>
                </div>
                <div>
                  <p className="text-sm text-[#bfbfbf]">Sizes</p>
                  <p className="font-medium text-[#dcdcdc]">{product.sizes}</p>
                </div>
                <div>
                  <p className="text-sm text-[#bfbfbf]">MOQ</p>
                  <p className="font-medium text-[#dcdcdc]">{product.moq} pieces</p>
                </div>
              </div>

              {product.description && (
                <div>
                  <p className="text-sm text-[#bfbfbf]">Description</p>
                  <p className="text-[#dcdcdc]">{product.description}</p>
                </div>
              )}
            </div>

            {/* WhatsApp Chat Button below product details */}
            <div className="pt-4">
              <Button 
                onClick={handleWhatsApp}
                className="w-full bg-white text-[#25D366] hover:bg-gray-100 gap-2 py-6 text-lg border border-[#25D366]"
              >
                <img src="/whatsapp_icon.png" alt="WhatsApp" className="w-6 h-6" />
                Chat on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};