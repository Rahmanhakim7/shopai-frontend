import ProductCardGrid from "@/components/product/ProductCardGrid";
import ProductCardList from "@/components/product/ProductCardList";
import type { ProductItem } from "@/types/product";

export type ProductViewMode = "grid" | "list";

type ProductListProps = {
  products: ProductItem[];
  viewMode: ProductViewMode;
  wishlistSet: Set<number>;
  refreshWishlist: () => Promise<void>;
};

export default function ProductList({
  products,
  viewMode,
  wishlistSet,
  refreshWishlist,
}: ProductListProps) {
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
            wishlistSet={wishlistSet}
            refreshWishlist={refreshWishlist}
          />
        ) : (
          <ProductCardList
            key={product.id}
            product={product}
            wishlistSet={wishlistSet}
            refreshWishlist={refreshWishlist}
          />
        ),
      )}
    </div>
  );
}