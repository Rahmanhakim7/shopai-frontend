"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createSellerProduct } from "../product.api";
import type { ProductFormValues } from "../types/product";
import { showSuccess, showError } from "@/utils/alert";

const INITIAL_VALUES: ProductFormValues = {
  name: "",
  description: "",
  price: "",
  stock: "",
  status: "active",
  condition: "new",
};

export default function useCreateProduct() {
  const router = useRouter();
  const [values, setValues] = useState(INITIAL_VALUES);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof ProductFormValues, value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("stock", values.stock);
      formData.append("status", values.status);
      formData.append("condition", values.condition);

      if (image) {
        formData.append("image", image);
      }

      await createSellerProduct(formData);

      await showSuccess("Produk berhasil ditambahkan.");

      router.push("/seller/products");
    } catch (error) {
      console.error(error);
      showError("Gagal menambahkan produk.");
    } finally {
      setLoading(false);
    }
  };

  return {
    values,
    preview,
    loading,
    handleChange,
    handleImageChange,
    handleSubmit,
  };
}
