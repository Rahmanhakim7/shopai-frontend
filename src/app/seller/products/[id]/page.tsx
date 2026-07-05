"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import SellerLayout from "@/layouts/sellerlayouts";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Link from "next/link";
import RoleGuard from "@/components/guards/RoleGuard";
import Loader from "@/components/ui/Loader";
import { Product } from "@/types/product";
import { getSellerProductDetail } from "@/features/products/product.api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export default function SellerProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const response = await getSellerProductDetail(params.id as string);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  const imageUrl = product?.image?.startsWith("http")
    ? product?.image
    : `${API_URL}${product?.image}`;

  return (
    <RoleGuard role="seller">
      <SellerLayout sidebarTitle="Detail Produk">
        <div className="mx-auto max-w-7xl">
          <div className="mb-2 flex flex-col gap-4 border-zinc-200 pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-zinc-800">
                Detail Produk
              </h1>
              <p className="mt-2 text-sm text-zinc-500">
                Lihat informasi lengkap mengenai produk yang kamu jual.
              </p>
            </div>
            {!loading && product && (
              <Link href={`/seller/products/${product.id}/edit`}>
                <Button variant="success">Edit Produk</Button>
              </Link>
            )}
          </div>
          {loading ? (
            <Loader text="Memuat detail produk..." size="lg" />
          ) : !product ? (
            <div className="py-20 text-center">
              <p className="text-zinc-500">Produk tidak ditemukan.</p>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                <h2 className="mb-5 text-lg font-semibold">Gambar Produk</h2>
                <div className="relative h-[500px] overflow-hidden rounded-2xl bg-zinc-100">
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
              <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
                <div className="space-y-7">
                  <div>
                    <p className="text-sm text-zinc-500">Nama Produk</p>
                    <h2 className="mt-1 text-3xl font-bold text-zinc-800">
                      {product.name}
                    </h2>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">Harga</p>
                    <h3 className="mt-1 text-4xl font-bold text-green-600">
                      Rp {product.price}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-zinc-50 p-4">
                    <div>
                      <p className="text-sm text-zinc-500">Stok</p>
                      <p className="text-xl font-semibold">{product.stock}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500">Status</p>
                      <span
                        className={`mt-2 inline-flex rounded-full px-4 py-1 text-sm font-semibold ${
                          product.status === "active"
                            ? "bg-green-100 text-green-700"
                            : product.status === "inactive"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-sm text-zinc-500">Deskripsi</p>
                    <div className="rounded-xl bg-zinc-50 p-5 text-justify leading-7 text-zinc-700">
                      {product.description}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Link href="/seller/products">
                      <Button variant="secondary">Kembali</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </SellerLayout>
    </RoleGuard>
  );
}
