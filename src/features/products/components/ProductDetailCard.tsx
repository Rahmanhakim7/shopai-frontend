"use client";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ProductStatusBadge from "./ProductStatusBadge";
import ProductConditionBadge from "./ProductConditionBadge";
import ProductStockBadge from "./ProductStockBadge";
import { getImageUrl } from "@/utils/image";
import type { Product } from "@/types/product";

type ProductDetailCardProps = {
  product: Product;
};

export default function ProductDetailCard({ product }: ProductDetailCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-zinc-800">{product.name}</h1>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-3xl font-bold text-green-600">
            Rp {product.price}
          </p>
          <ProductConditionBadge condition={product.condition} />
        </div>
      </div>
      <div className="grid gap-8 p-8 lg:grid-cols-[380px_1fr]">
        <div>
          <div className="relative h-[360px] overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100">
            <Image
              src={getImageUrl(product.image)}
              alt={product.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="rounded-xl border border-zinc-200">
            <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
              <span className="font-medium text-zinc-500">Status Produk</span>
              <ProductStatusBadge status={product.status} />
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <span className="font-medium text-zinc-500">Stok Produk</span>
              <ProductStockBadge stock={product.stock} />
            </div>
          </div>
          <div className="mt-6 flex-1 rounded-xl border border-zinc-200">
            <div className="border-b border-zinc-200 px-5 py-3">
              <h3 className="font-semibold text-zinc-700">Deskripsi Produk</h3>
            </div>

            <div className="min-h-[180px] p-5 text-sm leading-7 text-zinc-600">
              {product.description || (
                <span className="text-zinc-400 italic">
                  Belum ada deskripsi produk.
                </span>
              )}
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <Link href="/seller/products">
              <Button variant="secondary">Kembali</Button>
            </Link>
            <Link href={`/seller/products/${product.id}/edit`}>
              <Button variant="success">Edit Produk</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
