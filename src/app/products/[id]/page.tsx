"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import Image from "next/image";
import BuyerLayout from "@/layouts/buyerlayouts";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: string;
  image?: string;
  seller_name?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const startTime = Date.now();

      try {
        setLoading(true);
        const response = await api.get(`/products/${id}/`);
        setProduct(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Produk tidak ditemukan atau terjadi kesalahan");
      } finally {
        const elapsed = Date.now() - startTime;
        const minimumLoadingTime = 800;
        if (elapsed < minimumLoadingTime) {
          setTimeout(() => {
            setLoading(false);
          }, minimumLoadingTime - elapsed);
        } else {
          setLoading(false);
        }
      }
    };
    fetchProduct();
  }, [id]);

  const imageUrl = product?.image
    ? product.image.startsWith("http")
      ? product.image
      : `${API_URL}${product.image}`
    : null;
  return (
    <BuyerLayout>
      <div className="mx-auto max-w-6xl p-6">
        {loading && (
          <div className="grid animate-pulse gap-8 md:grid-cols-2">
            <div className="h-[450px] rounded-3xl bg-gray-200"></div>

            <div>
              <div className="h-10 w-3/4 rounded bg-gray-200"></div>

              <div className="mt-4 h-8 w-40 rounded bg-gray-200"></div>

              <div className="mt-6 space-y-3">
                <div className="h-4 rounded bg-gray-200"></div>
                <div className="h-4 rounded bg-gray-200"></div>
                <div className="h-4 w-2/3 rounded bg-gray-200"></div>
              </div>
              <div className="mt-8 h-12 rounded-xl bg-gray-200"></div>
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="flex min-h-[60vh] items-center justify-center text-center text-red-500">
            {error}
          </div>
        )}

        {!loading && product && (
          <div className="grid gap-8 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-3xl bg-gray-100 shadow-sm ring-1 ring-black/5">
              <div className="relative h-[450px]">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-gray-400">
                    No Image
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {product.name}
                  </h1>
                </div>

                <div className="rounded-2xl bg-green-50 px-4 py-2">
                  <span className="text-sm font-medium text-green-700">
                    🏪 {product.seller_name}
                  </span>
                </div>
              </div>
              <div className="mt-5 space-y-2">
                <p className="text-3xl font-bold text-green-600">
                  Rp {product.price.toLocaleString()}
                </p>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">
                    Stock: {product.stock}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      product.status === "active"
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
              </div>
              <div className="mt-8 border-t pt-6">
                <h2 className="mb-3 text-lg font-semibold text-gray-900">
                  Deskripsi Produk
                </h2>

                <p className="leading-relaxed whitespace-pre-line text-gray-600">
                  {product.description}
                </p>
              </div>
              <div className="mt-5 space-y-2">
                <p className="text-xl font-semibold">
                  Rp {product.price.toLocaleString()}
                </p>
                <p>Stock: {product.stock}</p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  className="flex-1 cursor-pointer rounded-xl bg-green-600 py-3 font-medium text-white transition hover:bg-green-700"
                  onClick={() => {
                    console.log("Tambah ke Keranjang");
                  }}
                >
                  Tambah ke Keranjang
                </button>
                <button
                  className="flex-1 cursor-pointer rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
                  onClick={() => {
                    console.log("Beli Sekarang");
                  }}
                >
                  Beli Sekarang
                </button>
                <button
                  className="cursor-pointer rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
                  onClick={() => router.push("/products")}
                >
                  Kembali
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </BuyerLayout>
  );
}
