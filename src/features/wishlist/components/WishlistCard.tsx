"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AlertTriangle, Heart, PackageCheck, Store } from "lucide-react";
import Button from "@/components/ui/Button";
import { getImageUrl } from "@/utils/image";
import type { WishlistItem } from "../wishlist.types";

type WishlistCardProps = {
  item: WishlistItem;
  onRemove: (productId: number) => void;
};

export default function WishlistCard({ item, onRemove }: WishlistCardProps) {
  const router = useRouter();
  const imageUrl = getImageUrl(item.image);
  return (
    <div
      onClick={() => router.push(`/products/${item.product_id}`)}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg"
    >
      <div className="relative h-44 overflow-hidden bg-zinc-100">
        {item.image ? (
          <Image
            src={imageUrl}
            alt={item.name}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600">
            <span className="text-6xl font-bold text-white">
              {item.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 rounded-full bg-white/95 shadow-md hover:bg-red-50"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(item.product_id);
          }}
        >
          <Heart size={18} className="fill-red-500 text-red-500" />
        </Button>
      </div>
      <div className="space-y-3 p-4">
        <div>
          <h2 className="line-clamp-2 min-h-[42px] text-[15px] font-semibold text-zinc-800">
            {item.name}
          </h2>
          <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
            <Store size={14} />
            <span className="truncate">{item.seller_name}</span>
          </div>
        </div>
        <p className="text-xl font-bold text-green-600">
          Rp {item.price.toLocaleString()}
        </p>
        <div
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
            item.stock > 10
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {item.stock > 10 ? (
            <>
              <PackageCheck size={14} />
              Tersedia ({item.stock})
            </>
          ) : (
            <>
              <AlertTriangle size={14} />
              Sisa {item.stock}
            </>
          )}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/products/${item.product_id}`);
            }}
          >
            Lihat Detail
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(item.product_id);
            }}
          >
            Hapus
          </Button>
        </div>
      </div>
    </div>
  );
}
