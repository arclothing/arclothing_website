import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DraggableCarouselProps {
  images: string[];
  alt: string;
}

export const DraggableCarousel = ({ images, alt }: DraggableCarouselProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Use images array or fallback to single image
  const media = images.length > 0 ? images : [];
  
  const nextImage = () => {
    if (media.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % media.length);
    }
  };
  
  const prevImage = () => {
    if (media.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + media.length) % media.length);
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

  if (media.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-800">
        <span className="text-gray-500">No Media</span>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
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
          src={media[currentImageIndex]}
          alt={`${alt} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ transform: `translateX(${translateX}px)` }}
        />
      </div>
      
      {/* Navigation arrows for carousel */}
      {media.length > 1 && (
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
            {media.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-[#D4AF37]' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};