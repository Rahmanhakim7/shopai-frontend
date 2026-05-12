import React from "react";
import Button from "./Button";

type ProductCardProps = {
  title: string;
  price: number;
  image: string;
  category?: string;
  rating?: number;
  onAddToCart?: () => void;
};

export default function ProductCard({
  title,
  price,
  image,
  category,
  rating,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-zinc-200 overflow-hidden hover:shadow-xl transition">
      <img src={image} alt={title} className="w-full h-56 object-cover"/>
      <div className="p-4 space-y-3">
        {category && (
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
            {category}
          </span>
        )}
        <h2 className="text-lg font-semibold line-clamp-2">
          {title}
        </h2>
        {rating && (
          <p className="text-sm text-yellow-500">
            ⭐ {rating}
          </p>
        )}
        <p className="text-xl font-bold text-purple-600">
          Rp {price.toLocaleString("id-ID")}
        </p>
        <Button
          onClick={onAddToCart}
          className="w-full"
          variant="primary">
          Tambah ke Keranjang
        </Button>
      </div>
    </div>
  );
}