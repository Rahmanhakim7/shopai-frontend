import { useState } from "react";
import { Product } from "@/types/product";
import { getSellerProducts, deleteSellerProduct } from "../product.api";

type FetchProductsParams = {
  page: number;
  search?: string;
  status?: string;
  ordering?: string;
};

export function useSellerProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchProducts = async ({
    page,
    search,
    status,
    ordering,
  }: FetchProductsParams) => {
    setLoading(true);

    try {
      const data = await getSellerProducts({
        page,
        search,
        status,
        ordering,
      });

      setProducts(data.results.data);
      setTotalProducts(data.count);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    await deleteSellerProduct(id);
  };

  return {
    products,
    loading,
    totalProducts,
    fetchProducts,
    deleteProduct,
  };
}
