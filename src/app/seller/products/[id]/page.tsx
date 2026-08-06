"use client";
import { useParams } from "next/navigation";
import SellerLayout from "@/layouts/sellerlayouts";
import RoleGuard from "@/components/guards/RoleGuard";
import Loader from "@/components/ui/Loader";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useProductDetail } from "@/features/products/hooks/useSellerProductDetail";
import ProductDetailCard from "@/features/products/components/ProductDetailCard";
import EmptyState from "@/components/ui/EmptyState";

export default function SellerProductDetailPage() {
  const params = useParams();
  const { product, loading } = useProductDetail(params.id as string);
  return (
    <RoleGuard role="seller">
      <SellerLayout sidebarTitle="Detail Produk">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <Loader text="Memuat detail produk..." size="lg" />
          ) : !product ? (
            <EmptyState
              icon="📦"
              title="Produk tidak ditemukan"
              description="Produk mungkin sudah dihapus. Kamu dapat menambahkan produk baru."
              action={
                <Link href="/seller/products/add">
                  <Button variant="success">Tambah Produk</Button>
                </Link>
              }
            />
          ) : (
            <ProductDetailCard product={product} />
          )}
        </div>
      </SellerLayout>
    </RoleGuard>
  );
}
