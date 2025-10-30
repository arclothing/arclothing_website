import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface ProductCardProps {
  image_url: string | null;
  brand: string;
  fabric: string;
  available_colors: number;
  sizes: string;
  moq: number;
  stock_status: string;
  category: string;
}

export const ProductCard = ({
  image_url,
  brand,
  fabric,
  available_colors,
  sizes,
  moq,
  stock_status,
  category,
}: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)] hover:-translate-y-1 border border-[#D4AF37]/30 bg-[#0f0f0f] text-[#dcdcdc]">
      <div className="aspect-square overflow-hidden bg-black">
        <img
          src={image_url || 'https://via.placeholder.com/300x300?text=No+Image'}
          alt={`${brand} - ${fabric}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
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
  );
};
