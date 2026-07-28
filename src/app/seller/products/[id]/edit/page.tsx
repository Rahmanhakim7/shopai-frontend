"use client";

import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import SellerLayout from "@/layouts/sellerlayouts";
import ProductForm from "@/features/products/components/ProductForm";
import useEditProduct from "@/features/products/hooks/useEditProduct";

export default function EditProductPage() {
  const { id } = useParams();

  const {
    values,
    preview,
    loading,
    fetchLoading,
    handleChange,
    handleImageChange,
    handleSubmit,
  } = useEditProduct(id as string);

  return (
    <SellerLayout sidebarTitle="Edit Produk">
      <div className="mx-auto max-w-5xl">
        {fetchLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-green-600" />
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-8 shadow-md">
            <ProductForm
              values={values}
              preview={preview}
              loading={loading}
              submitLabel="Simpan Perubahan"
              onChange={handleChange}
              onImageChange={handleImageChange}
              onSubmit={handleSubmit}
            />
          </div>
        )}
      </div>
    </SellerLayout>
  );
}
