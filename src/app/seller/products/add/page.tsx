"use client";
import SellerLayout from "@/layouts/sellerlayouts";
import RoleGuard from "@/components/guards/RoleGuard";
import ProductForm from "@/features/products/components/ProductForm";
import useCreateProduct from "@/features/products/hooks/useCreateProduct";

export default function AddProductPage() {
  const {
    values,
    preview,
    loading,
    handleChange,
    handleImageChange,
    handleSubmit,
  } = useCreateProduct();

  return (
    <RoleGuard role="seller">
      <SellerLayout sidebarTitle="Tambah Produk">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl bg-white p-8 shadow-md">
            <ProductForm
              values={values}
              preview={preview}
              loading={loading}
              submitLabel="Tambah Produk"
              onChange={handleChange}
              onImageChange={handleImageChange}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </SellerLayout>
    </RoleGuard>
  );
}
