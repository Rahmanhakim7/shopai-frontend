"use client";
import { useState } from "react";
import BuyerLayout from "@/layouts/buyerlayouts";
import ProductFilters from "@/features/products/components/ProductFilters";
import { Loader2, Package, Search } from "lucide-react";
import Pagination from "@/components/ui/Pagination";
import RoleGuard from "@/components/guards/RoleGuard";
import ProductToolbar from "@/features/products/components/ProductToolbar";
import ProductList from "@/features/products/components/ProductList";
import EmptyState from "@/components/ui/EmptyState";
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
    toggleWishlist,
    handleInStock,
    handleOutOfStock,
    handleConditionChange,
    handleResetFilter,
  } = useProduct();
  const isEmpty = !loading && products.length === 0;
  const hasFilter =
    search || inStock || outOfStock || condition || ordering !== "latest";
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const totalPages = Math.ceil(totalCount / 4);

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
                onOrderingChange={(value) => {
                  setOrdering(value);
                  setPage(1);
                }}
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
              <main className="flex min-h-[500px] flex-1 flex-col">
                <div className="flex-1">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                      <Loader2 className="h-10 w-10 animate-spin text-green-600" />
                      <p className="mt-3 text-sm text-zinc-500">
                        Memuat produk ...
                      </p>
                    </div>
                  ) : isEmpty ? (
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
                  ) : (
                    <ProductList
                      products={products}
                      viewMode={viewMode}
                      onToggleWishlist={toggleWishlist}
                    />
                  )}
                </div>
                {products.length > 0 && (
                  <div>
                    <Pagination
                      currentPage={page}
                      totalPages={totalPages}
                      onPageChange={setPage}
                    />
                  </div>
                )}
              </main>
            </div>
          </div>
        </div>
      </BuyerLayout>
    </RoleGuard>
  );
}
