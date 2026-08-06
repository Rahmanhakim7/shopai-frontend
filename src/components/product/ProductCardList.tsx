"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/features/products/types/product";
import Button from "@/components/ui/Button";
import api from "@/lib/api";
import StockBadge from "@/features/products/components/ProductStockBadge";
import { Heart } from "lucide-react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Props = {
  product: Product;
  onToggleWishlist: (productId: number) => void;
};

export default function ProductCardList({ product, onToggleWishlist }: Props) {
  const router = useRouter();
  const imageUrl =
    product.image && product.image.startsWith("http")
      ? product.image
      : product.image
        ? `${API_URL}${product.image}`
        : null;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await api.post("/cart/add/", {
        product_id: product.id,
        quantity: 1,
      });
    } catch (err) {
      console.error("Cart error", err);
    }
  };

  return (
    <div
      onClick={() => router.push(`/products/${product.id}`)}
      className="flex cursor-pointer items-center gap-5 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 transition hover:shadow-lg"
    >
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            unoptimized
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-gray-400">
            No Image
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow transition hover:scale-110"
        >
          <Heart
            size={16}
            className={
              product.is_wishlisted
                ? "fill-red-500 text-red-500"
                : "text-zinc-500"
            }
          />
        </button>
      </div>
      <div className="flex-1">
        <h2 className="text-base font-semibold text-gray-800">
          {product.name}
        </h2>
        <p className="mt-1 text-sm text-gray-500">{product.seller_name}</p>
        <p className="mt-2 text-lg font-bold text-green-600">
          Rp {product.price.toLocaleString()}
        </p>
        <div>
          <StockBadge stock={product.stock} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
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
        <Button variant="success" size="sm" onClick={handleAddToCart}>
          Cart
        </Button>
      </div>
    </div>
  );
}
