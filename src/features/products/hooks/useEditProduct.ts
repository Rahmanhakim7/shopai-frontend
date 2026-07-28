"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getSellerProductDetail, updateSellerProduct } from "../product.api";
import { getImageUrl } from "@/utils/image";
import { showError, showSuccess } from "@/utils/alert";
import type { ProductFormValues } from "../types/product";

const INITIAL_VALUES: ProductFormValues = {
  name: "",
  description: "",
  price: "",
  stock: "",
  status: "active",
  condition: "new",
};

export default function useEditProduct(id: string) {
  const router = useRouter();
  const [values, setValues] = useState<ProductFormValues>(INITIAL_VALUES);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const data = await getSellerProductDetail(id);
        const product = data.data;
        setValues({
          name: product.name,
          description: product.description,
          price: product.price.toString(),
          stock: product.stock.toString(),
          status: product.status,
          condition: product.condition,
        });

        if (product.image) {
          setPreview(getImageUrl(product.image));
        }
      } catch (error) {
        console.error(error);
        showError("Gagal mengambil data produk.");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
      await updateSellerProduct(id, formData);
      await showSuccess("Produk berhasil diperbarui.");
      router.push("/seller/products");
    } catch (error) {
      console.error(error);
      showError("Gagal memperbarui produk.");
    } finally {
      setLoading(false);
    }
  };

  return {
    values,
    preview,
    loading,
    fetchLoading,
    handleChange,
    handleImageChange,
    handleSubmit,
  };
}
