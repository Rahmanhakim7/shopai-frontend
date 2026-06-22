"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";

import { ProductItem } from "@/types/product";
import Button from "@/components/ui/Button";
import api from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Props = {
  product: ProductItem;
  wishlistSet: Set<number>;
  refreshWishlist: () => Promise<void>;
};

export default function ProductCardList({
  product,
  wishlistSet,
  refreshWishlist,
}: Props) {
  const router = useRouter();

  const isFavorite = wishlistSet.has(product.id);

  const imageUrl =
    product.image && product.image.startsWith("http")
      ? product.image
      : product.image
        ? `${API_URL}${product.image}`
        : null;

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      if (isFavorite) {
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
      </div>
      <div className="flex-1">
        <h2 className="text-base font-semibold text-gray-800">
          {product.name}
        </h2>

        <p className="mt-1 text-sm text-gray-500">{product.seller_name}</p>

        <p className="mt-2 text-lg font-bold text-green-600">
          Rp {product.price.toLocaleString()}
        </p>

        <span className="mt-2 inline-block text-xs text-gray-500">
          Stock: {product.stock}
        </span>
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

        <Button
          variant={isFavorite ? "danger" : "secondary"}
          size="sm"
          onClick={toggleFavorite}
        >
          <span className="flex items-center gap-2">
            <Heart size={16} className={isFavorite ? "fill-white" : ""} />
            Favorite
          </span>
        </Button>
      </div>
    </div>
  );
}
