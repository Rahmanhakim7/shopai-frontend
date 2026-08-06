"use client";

import { useEffect, useState } from "react";
import { getSellerProductDetail } from "@/features/products/product.api";
import type { Product } from "@/types/product";
import axios from "axios";

export function useProductDetail(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await getSellerProductDetail(id);
        setProduct(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setProduct(null);
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return {
    product,
    loading,
  };
}
