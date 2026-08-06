import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { Review } from "@/features/products/types/product";
import { getProductDetail, getProductReviews } from "../product.api";
import { PRODUCT_REVIEW_PAGE_SIZE } from "../constants/paginations";

export const useProductDetail = (id: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReviews = async (page = 1) => {
    const data = await getProductReviews(id, page);
    setReviews(data.results);
    setCurrentPage(page);
    setTotalPages(Math.ceil(data.count / PRODUCT_REVIEW_PAGE_SIZE));
  };

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      const startTime = Date.now();
      try {
        setLoading(true);
        const product = await getProductDetail(id);
        setProduct(product);
        await fetchReviews(1);
      } catch {
        setError("Produk tidak ditemukan");
      } finally {
        const elapsed = Date.now() - startTime;
        const minimumLoadingTime = 800;

        if (elapsed < minimumLoadingTime) {
          setTimeout(() => setLoading(false), minimumLoadingTime - elapsed);
        } else {
          setLoading(false);
        }
      }
    };
    fetchProduct();
  }, [id]);

  return {
    product,
    reviews,
    loading,
    error,
    currentPage,
    totalPages,
    fetchReviews,
  };
};
