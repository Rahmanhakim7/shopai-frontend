"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import BuyerLayout from "@/layouts/buyerlayouts";
import { Loader2, Grid3X3, List } from "lucide-react";
import SearchInput from "@/components/ui/SearchInput";
import Pagination from "@/components/ui/Pagination";
import { useSearchParams } from "next/navigation";
import SortDropdown from "@/components/ui/SortDropdown";
import ProductCardList from "@/components/product/ProductCardList";
import ProductCardGrid from "@/components/product/ProductCardGrid";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import type { ProductItem } from "@/types/product";

type WishlistItem = {
  id: number;
  product_id: number;
};

export default function ShopPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [inStock, setInStock] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);
  const [condition, setCondition] = useState<"new" | "used" | "">("");
  const [totalCount, setTotalCount] = useState(0);
  const [ordering, setOrdering] = useState("latest");
  const isEmpty = !loading && products.length === 0;
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const totalPages = Math.ceil(totalCount / 2);
  const [wishlistSet, setWishlistSet] = useState<Set<number>>(new Set());

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: String(page),
        search,
        ordering,
      });

      const stockFilter = getStockFilter();
      if (stockFilter) params.set("stock_filter", stockFilter);
      if (condition) params.set("condition", condition);
      const response = await api.get(`/products?${params.toString()}`);
      setProducts(response.data.data.results);
      setTotalCount(response.data.data.count);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    try {
      const res = await api.get("/wishlist/");
      const ids = res.data.map((item: WishlistItem) => item.product_id);
      setWishlistSet(new Set(ids));
    } catch (err) {
      console.error("Failed fetch wishlist", err);
    }
  };
  const getStockFilter = () => {
    if (inStock) return "in_stock";
    if (outOfStock) return "out_of_stock";
    return "";
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProducts();
      fetchWishlist();
    }, 300);

    return () => clearTimeout(timeout);
  }, [page, search, ordering, inStock, outOfStock, condition]);

  const refreshWishlist = async () => {
    await fetchWishlist();
  };

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

  const handleInStock = () => {
    setInStock((prev) => {
      const next = !prev;
      if (next) setOutOfStock(false);
      return next;
    });
  };

  const handleOutOfStock = () => {
    setOutOfStock((prev) => {
      const next = !prev;
      if (next) setInStock(false);
      return next;
    });
  };

  const handleResetFilter = () => {
    setInStock(false);
    setOutOfStock(false);
    setCondition("");
    setOrdering("latest");
    setSearch("");
    setPage(1);
  };

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
                  Filter produk sesuai kebutuhanmu
                </p>
              </div>
              <div className="space-y-3 border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-800">
                  Ketersediaan
                </h3>

                <div className="flex items-center gap-2 leading-none">
                  <Input
                    type="checkbox"
                    variant="checkbox"
                    checked={inStock}
                    onChange={handleInStock}
                  />
                  <span className="text-sm text-gray-600">Stok Tersedia</span>
                </div>

                <div className="flex items-center gap-2 leading-none">
                  <Input
                    type="checkbox"
                    variant="checkbox"
                    checked={outOfStock}
                    onChange={handleOutOfStock}
                  />
                  <span className="text-sm text-gray-600">Stok Habis</span>
                </div>
              </div>
              <div className="space-y-3 border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-800">Kondisi</h3>
                <div className="flex items-center gap-2 leading-none">
                  <Input
                    type="radio"
                    variant="radio"
                    checked={condition === "new"}
                    onChange={() =>
                      setCondition((prev) => (prev === "new" ? "" : "new"))
                    }
                  />
                  <span className="text-sm text-gray-600">Baru</span>
                </div>
                <div className="flex items-center gap-2 leading-none">
                  <Input
                    type="radio"
                    variant="radio"
                    checked={condition === "used"}
                    onChange={() =>
                      setCondition((prev) => (prev === "used" ? "" : "used"))
                    }
                  />
                  <span className="text-sm text-gray-600">Bekas</span>
                </div>
              </div>
              <div className="border-t pt-4">
                <Button
                  variant="success"
                  size="sm"
                  className="w-full"
                  onClick={handleResetFilter}
                >
                  Reset Filter
                </Button>
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
                    return viewMode === "grid" ? (
                      <ProductCardGrid
                        key={product.id}
                        product={product}
                        wishlistSet={wishlistSet}
                        refreshWishlist={refreshWishlist}
                      />
                    ) : (
                      <ProductCardList
                        key={product.id}
                        product={product}
                        wishlistSet={wishlistSet}
                        refreshWishlist={refreshWishlist}
                      />
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
