"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { ProductItem } from "@/types/product";
import Button from "@/components/ui/Button";
import api from "@/lib/api";
import StockBadge from "@/features/products/components/ProductStockBadge";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Props = {
  product: ProductItem;
  wishlistSet: Set<number>;
  refreshWishlist: () => Promise<void>;
};

export default function ProductCardGrid({
  product,
  wishlistSet,
  refreshWishlist,
}: Props) {
  const router = useRouter();
  const isWishlisted = wishlistSet.has(product.id);
  const imageUrl =
    product.image && product.image.startsWith("http")
      ? product.image
      : product.image
        ? `${API_URL}${product.image}`
        : null;

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (isWishlisted) {
        await api.delete(`/wishlist/${product.id}/`);
      } else {
        await api.post("/wishlist/add/", {
          product_id: product.id,
        });
      }
      await refreshWishlist();
    } catch (err) {
      console.error("Wishlist error", err);
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await api.post("/cart/add/", {
        product_id: product.id,
        quantity: 1,
      });
    } catch (err) {
      console.error("Add to cart error", err);
    }
  };

  return (
    <div
      onClick={() => router.push(`/products/${product.id}`)}
      className="group cursor-pointer overflow-hidden rounded-3xl bg-white p-3 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-xl hover:ring-green-500"
    >
      <div className="relative h-44 overflow-hidden rounded-2xl bg-gray-100">
        <div className="absolute top-3 left-3 z-10 rounded-full bg-black/70 px-2 py-1 text-[10px] text-white">
          {product.seller_name}
        </div>
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow"
        >
          <Heart
            size={16}
            className={
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"
            }
          />
        </button>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-gray-400">
            No Image
          </div>
        )}
      </div>
      <div className="flex flex-col p-2 pt-4">
        <h2 className="line-clamp-2 text-base font-semibold text-gray-800">
          {product.name}
        </h2>
        <div className="mt-2 flex items-center gap-2 text-sm">
          <span className="font-medium text-yellow-500">
            ★ {product.average_rating}
          </span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-500">{product.review_count} ulasan</span>
        </div>
        <p className="mt-3 text-xl font-bold text-green-600">
          Rp {product.price.toLocaleString()}
        </p>
        <span className="mt-2 inline-flex w-fit rounded-full py-1 text-xs">
          <StockBadge stock={product.stock} />
        </span>

        <div className="mt-4 flex w-full gap-2">
          <Button
            variant="success"
            size="sm"
            className="flex-1"
            onClick={handleAddToCart}
          >
            Keranjang
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/products/${product.id}`);
            }}
          >
            Detail
          </Button>
        </div>
      </div>
    </div>
  );
}
