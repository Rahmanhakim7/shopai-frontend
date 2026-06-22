"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import api from "@/lib/api";



type Props = {
  productId: number;
};

interface WishlistItem {
  id: number;
  product_id: number;
}

export default function WishlistButton({ productId }: Props) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      if (isWishlisted) {
        await api.delete(`/wishlist/${productId}/`);
        setIsWishlisted(false);
      } else {
        await api.post("/wishlist/add/", {
          product_id: productId,
        });
        setIsWishlisted(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const check = async () => {
      try {
        const res = await api.get("/wishlist/");
        const exists = res.data.some(
          (item: WishlistItem) => item.product_id === productId,
        );
        setIsWishlisted(exists);
      } catch (err) {
        console.error(err);
      }
    };

    check();
  }, [productId]);

  return (
    <button
      onClick={toggleWishlist}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow"
    >
      <Heart
        size={16}
        className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"}
      />
    </button>
  );
}
