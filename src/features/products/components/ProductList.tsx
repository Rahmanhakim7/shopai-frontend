import ProductCardGrid from "@/components/product/ProductCardGrid";
import ProductCardList from "@/components/product/ProductCardList";
import type { Product } from "@/features/products/types/product";

export type ProductViewMode = "grid" | "list";

type ProductListProps = {
  products: Product[];
  viewMode: ProductViewMode;
  onToggleWishlist: (productId: number) => void;
};

export default function ProductList({ products, viewMode, onToggleWishlist }: ProductListProps) {
  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
          : "flex flex-col gap-4"
      }
    >
      {products.map((product) =>
        viewMode === "grid" ? (
          <ProductCardGrid
            key={product.id}
            product={product}
            onToggleWishlist={onToggleWishlist}
          />
        ) : (
          <ProductCardList
            key={product.id}
            product={product}
            onToggleWishlist={onToggleWishlist}
          />
        ),
      )}
    </div>
  );
}
