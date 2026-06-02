"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import BuyerLayout from "@/layouts/buyerlayouts";
import { Loader2, Grid3X3, List } from "lucide-react";
import Image from "next/image";
import SearchInput from "@/components/ui/SearchInput";
import Pagination from "@/components/ui/Pagination";
import { useSearchParams } from "next/navigation";
import SortDropdown from "@/components/ui/SortDropdown";

type ProductItem = {
  id: number;
  name: string;
  price: number;
  stock: number;
  status: string;
  image: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ShopPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();
  const [ordering, setOrdering] = useState("latest");
  const isEmpty = !loading && products.length === 0;
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const totalPages = Math.ceil(totalCount / 2);
  const fetchProducts = async () => {
    try {
      const response = await api.get(
        `/products?page=${page}&search=${search}&ordering=${ordering}`,
      );
      setProducts(response.data.data.results);
      setTotalCount(response.data.data.count);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace(
        `/products?page=${page}&search=${search}&ordering=${ordering}`,
      );
      fetchProducts();
    }, 500);
    return () => clearTimeout(timeout);
  }, [page, search, ordering]);

  const sortOptions = [
    {
      label: "Terbaru",
      value: "latest",
    },
    {
      label: "Harga Terendah",
      value: "price_asc",
    },
    {
      label: "Harga Tertinggi",
      value: "price_desc",
    },
    {
      label: "Nama A-Z",
      value: "name_asc",
    },
    {
      label: "Nama Z-A",
      value: "name_desc",
    },
  ];

  return (
    <BuyerLayout>
      <div className="min-h-screen">
        <div className="sticky top-0 z-20">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <SearchInput
                value={search}
                onChange={(e) => {
                  (setSearch(e.target.value), setPage(1));
                }}
                placeholder="Cari produk favoritmu..."
              />
              <div className="flex items-center gap-3">
                <SortDropdown
                  value={ordering}
                  onChange={setOrdering}
                  options={sortOptions}
                />
                <div className="flex overflow-hidden rounded-xl border">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`rounded-xl p-3 transition-all ${
                      viewMode === "grid"
                        ? "bg-green-600 text-white shadow-md"
                        : "bg-white text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <Grid3X3 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`rounded-xl p-3 transition-all ${
                      viewMode === "list"
                        ? "bg-green-600 text-white shadow-md"
                        : "bg-white text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex gap-6">
            <aside className="hidden h-fit w-72 space-y-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 lg:block">
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Filter Produk
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Saring produk sesuai kebutuhanmu
                </p>
              </div>
              <div className="space-y-3 border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-800">Harga</h3>
                <input type="range" className="w-full accent-green-500" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Rp 0</span>
                  <span>Rp 10.000+</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["< 10k", "10k-50k", "50k-100k", "> 100k"].map((item) => (
                    <button
                      key={item}
                      className="rounded-full border px-3 py-1 text-xs text-gray-600 hover:bg-gray-100"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3 border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-800">
                  Ketersediaan
                </h3>

                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="accent-green-500" />
                  Stok tersedia
                </label>

                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="accent-green-500" />
                  Habis
                </label>
              </div>
              <div className="space-y-3 border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-800">Kondisi</h3>

                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="accent-green-500" />
                  Baru
                </label>

                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="accent-green-500" />
                  Bekas
                </label>
              </div>
              <div className="border-t pt-4">
                <button className="w-full rounded-xl bg-green-600 py-2 text-sm font-medium text-white transition hover:bg-green-700">
                  Reset Filter
                </button>
              </div>
            </aside>
            <main className="flex-1">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="h-10 w-10 animate-spin text-green-600" />
                  <p className="mt-3 text-sm text-zinc-500">
                    Loading products...
                  </p>
                </div>
              ) : isEmpty ? (
                <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white py-20 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-2xl">
                    🔍
                  </div>

                  <h2 className="text-lg font-semibold text-gray-800">
                    Produk tidak ditemukan
                  </h2>

                  <p className="mt-2 max-w-md text-sm text-gray-500">
                    Kami tidak menemukan produk untuk{" "}
                    <span className="font-medium text-gray-700">
                      “{search || "pencarian ini"}”
                    </span>
                    . Coba gunakan kata kunci lain atau hapus filter.
                  </p>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => {
                        setSearch("");
                        setPage(1);
                      }}
                      className="rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                    >
                      Reset Pencarian
                    </button>

                    <button
                      onClick={() => {
                        setOrdering("latest");
                        setSearch("");
                        setPage(1);
                      }}
                      className="rounded-xl border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Kembali ke Semua Produk
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
                      : "flex flex-col gap-4"
                  }
                >
                  {products.map((product) => {
                    const imageUrl = product.image
                      ? product.image.startsWith("http")
                        ? product.image
                        : `${API_URL}${product.image}`
                      : null;
                    return (
                      <div
                        key={product.id}
                        onClick={() => router.push(`/products/${product.id}`)}
                        className={`group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-green-500 ${
                          viewMode === "grid"
                            ? "p-3"
                            : "flex items-center gap-5 p-4"
                        }`}
                      >
                        <div
                          className={`relative overflow-hidden rounded-2xl bg-gray-100 ${
                            viewMode === "grid"
                              ? "h-44"
                              : "h-24 w-24 flex-shrink-0"
                          }`}
                        >
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={product.name}
                              fill
                              unoptimized
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-xs text-gray-400">
                              No Image
                            </div>
                          )}
                        </div>
                        <div
                          className={
                            viewMode === "grid" ? "p-2 pt-4" : "flex-1"
                          }
                        >
                          <h2 className="text-base font-semibold text-gray-800">
                            {product.name}
                          </h2>
                          <p className="mt-2 text-xl font-bold text-green-600">
                            Rp {product.price.toLocaleString()}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                              Stock: {product.stock}
                            </span>
                          </div>
                        </div>
                        {viewMode === "list" && (
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/products/${product.id}`);
                              }}
                              className="cursor-pointer rounded-xl border px-4 py-2 text-sm"
                            >
                              Detail
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log("Tambah keranjang");
                              }}
                              className="cursor-pointer rounded-xl bg-green-600 px-4 py-2 text-sm text-white"
                            >
                              Keranjang
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              {products.length > 0 && (
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              )}
            </main>
          </div>
        </div>
      </div>
    </BuyerLayout>
  );
}
