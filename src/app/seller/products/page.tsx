"use client";
import { useEffect } from "react";
import Link from "next/link";
import SellerLayout from "@/layouts/sellerlayouts";
import RoleGuard from "@/components/guards/RoleGuard";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import EmptyState from "@/components/ui/EmptyState";
import ProductTable from "@/features/products/components/ProductTable";
import SellerProductFilters from "@/features/products/components/SellerProductFilters";
import { useSellerProducts } from "@/features/products/hooks/useSellerProducts";
import { useSellerProductQuery } from "@/features/products/hooks/useSellerProductQuery";
import { useSellerProductActions } from "@/features/products/hooks/useSellerProductActions";
import { PRODUCT_PAGE_SIZE } from "@/features/products/constants/paginations";

export default function SellerProducts() {
  const { user, loading: authLoading } = useAuth();
  const { products, loading, totalProducts, fetchProducts, deleteProduct } =
    useSellerProducts();
  const {
    currentPage,
    search,
    searchInput,
    setSearchInput,
    status,
    ordering,
    updateQueryParams,
  } = useSellerProductQuery();
  const totalPages = Math.ceil(totalProducts / PRODUCT_PAGE_SIZE);
  const handleStatusChange = (value: string) => {
    updateQueryParams(1, searchInput, value, ordering);
  };
  const handlePageChange = (page: number) => {
    updateQueryParams(page, searchInput, status, ordering);
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user || user.role !== "seller") return;
    fetchProducts({
      page: currentPage,
      search,
      status,
      ordering,
    });
  }, [authLoading, user, currentPage, search, status, ordering]);

  useEffect(() => {
    if (searchInput === search) return;
    const delay = setTimeout(() => {
      updateQueryParams(1, searchInput, status, ordering);
    }, 500);
    return () => clearTimeout(delay);
  }, [searchInput, search]);

  const { handleDelete } = useSellerProductActions({
    deleteProduct,
    fetchProducts,
    currentPage,
    search,
    status,
    ordering,
  });

  return (
    <RoleGuard role="seller">
      <SellerLayout sidebarTitle="Produk">
        <div className="mb-3 flex justify-end">
          <Link href="/seller/products/add">
            <Button variant="success">+ Tambah Produk</Button>
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-lg shadow-green-100/30">
          <SellerProductFilters
            searchInput={searchInput}
            status={status}
            onSearchChange={setSearchInput}
            onStatusChange={handleStatusChange}
          />

          {loading ? (
            <Loader text="Loading produk..." />
          ) : products.length === 0 ? (
            <EmptyState
              icon="📦"
              title="Produk tidak ditemukan"
              description="Coba ubah pencarian atau tambahkan produk baru."
              action={
                <Link href="/seller/products/add">
                  <Button variant="success">Tambah Produk</Button>
                </Link>
              }
            />
          ) : (
            <ProductTable
              products={products}
              totalProducts={totalProducts}
              currentPage={currentPage}
              totalPages={totalPages}
              ordering={ordering}
              searchInput={searchInput}
              status={status}
              onDelete={handleDelete}
              onPageChange={handlePageChange}
              updateQueryParams={updateQueryParams}
            />
          )}
        </div>
      </SellerLayout>
    </RoleGuard>
  );
}
