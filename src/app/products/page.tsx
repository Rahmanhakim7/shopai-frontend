"use client";
import { useState } from "react";
import BuyerLayout from "@/layouts/buyerlayouts";
import { getWishlist } from "@/features/products/product.api";
import ProductFilters from "@/features/products/components/ProductFilters";
import { Loader2 } from "lucide-react";
import Pagination from "@/components/ui/Pagination";
import RoleGuard from "@/components/guards/RoleGuard";
import { WishlistItem } from "@/features/products/types/product";
import ProductToolbar from "@/features/products/components/ProductToolbar";
import ProductList from "@/features/products/components/ProductList";
import EmptyState from "@/components/ui/EmptyState";
import { Package, Search } from "lucide-react";
import { useProduct } from "@/features/products/hooks/useProduct";

export default function ShopPage() {
  const {
    products,
    loading,
    search,
    setSearch,
    page,
    setPage,
    ordering,
    setOrdering,
    inStock,
    outOfStock,
    condition,
    totalCount,
    handleInStock,
    handleOutOfStock,
    handleConditionChange,
    handleResetFilter,
  } = useProduct();
  const isEmpty = !loading && products.length === 0;
  const hasFilter =
    search || inStock || outOfStock || condition || ordering !== "latest";
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const totalPages = Math.ceil(totalCount / 2);
  const [wishlistSet, setWishlistSet] = useState<Set<number>>(new Set());

  const fetchWishlist = async () => {
    try {
      const wishlist = await getWishlist();
      const ids = wishlist.map((item: WishlistItem) => item.product_id);
      setWishlistSet(new Set(ids));
    } catch (err) {
      console.error(err);
    }
  };

  const refreshWishlist = async () => {
    await fetchWishlist();
  };

  return (
    <RoleGuard role="buyer">
      <BuyerLayout>
        <div className="min-h-screen">
          <div className="sticky top-0 z-20">
            <div className="mx-auto max-w-7xl px-4 py-4">
              <ProductToolbar
                search={search}
                ordering={ordering}
                viewMode={viewMode}
                onSearchChange={(value) => {
                  setSearch(value);
                  setPage(1);
                }}
                onOrderingChange={setOrdering}
                onViewModeChange={setViewMode}
              />
            </div>
          </div>
          <div className="mx-auto max-w-7xl px-4 py-6">
            <div className="flex gap-6">
              <ProductFilters
                inStock={inStock}
                outOfStock={outOfStock}
                condition={condition}
                onToggleInStock={handleInStock}
                onToggleOutOfStock={handleOutOfStock}
                onConditionChange={handleConditionChange}
                onReset={handleResetFilter}
              />
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
                    <div className="rounded-3xl border border-dashed border-gray-300 bg-white">
                      {hasFilter ? (
                        <EmptyState
                          icon={<Search className="h-7 w-7" />}
                          title="Produk tidak ditemukan"
                          description={
                            <>
                              Kami tidak menemukan produk untuk{" "}
                              <span className="font-medium text-zinc-700">
                                {search || "filter yang dipilih"}
                              </span>
                              .
                              <br />
                              Coba gunakan kata kunci lain atau hapus filter.
                            </>
                          }
                          action={
                            <button
                              onClick={handleResetFilter}
                              className="cursor-pointer rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                            >
                              Reset Filter
                            </button>
                          }
                        />
                      ) : (
                        <EmptyState
                          icon={<Package className="h-7 w-7" />}
                          title="Belum ada produk"
                          description={
                            <>
                              Saat ini belum ada produk yang tersedia.
                              <br />
                              Silakan cek kembali nanti.
                            </>
                          }
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <ProductList
                    products={products}
                    viewMode={viewMode}
                    wishlistSet={wishlistSet}
                    refreshWishlist={refreshWishlist}
                  />
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
    </RoleGuard>
  );
}
