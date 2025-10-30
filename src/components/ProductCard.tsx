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
    <Card className="group overflow-hidden border-border bg-card transition-all duration-300 hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={image_url || 'https://via.placeholder.com/300x300?text=No+Image'}
          alt={`${brand} - ${fabric}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-lg text-foreground">{brand}</h3>
            <Badge variant="outline" className="text-xs mt-1">
              {category}
            </Badge>
          </div>
          <Badge 
            variant={stock_status === "In Stock" ? "default" : "secondary"}
            className="shrink-0"
          >
            {stock_status}
          </Badge>
        </div>
        
        <div className="space-y-2 text-sm">
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">Fabric:</span> {fabric}
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">Colors:</span> {available_colors} available
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">Sizes:</span> {sizes}
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">MOQ:</span> {moq} pieces
          </p>
        </div>
      </div>
    </Card>
  );
};
