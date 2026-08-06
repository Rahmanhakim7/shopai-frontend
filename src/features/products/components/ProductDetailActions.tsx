import { MouseEventHandler } from "react";
import Button from "@/components/ui/Button";
import {
  ArrowLeft,
  ShoppingCart,
  Zap,
} from "lucide-react";

type ProductDetailActionsProps = {
  stock: number;
  onAddToCart: MouseEventHandler<HTMLButtonElement>;
  onBuyNow: () => void;
  onBack: () => void;
};

export default function ProductDetailActions({
  stock,
  onAddToCart,
  onBuyNow,
  onBack,
}: ProductDetailActionsProps) {
  return (
    <div className="mt-auto flex flex-col gap-3 sm:flex-row">
      <Button
        variant="success"
        size="sm"
        className="h-12 flex-1 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
        onClick={onAddToCart}
      >
        <>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Tambah ke Keranjang
        </>
      </Button>

      <Button
        variant="primary"
        size="sm"
        className="h-12 flex-1 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        disabled={stock <= 0}
        onClick={onBuyNow}
      >
        <Zap className="mr-2 h-5 w-5" />
        Beli Sekarang
      </Button>

      <Button
        variant="secondary"
        size="sm"
        className="h-12 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        onClick={onBack}
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Kembali
      </Button>
    </div>
  );
}
