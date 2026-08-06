import { useEffect, useState } from "react";
import { getProducts } from "../product.api";
import { getStockFilter } from "../utils/stock";
import type { Product } from "@/features/products/types/product";
import { ProductConditionFilter } from "../constants/product-condition";
import api from "@/lib/api";

export function useProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [inStock, setInStock] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);
  const [condition, setCondition] = useState<ProductConditionFilter>("");
  const [ordering, setOrdering] = useState("latest");
  const [totalCount, setTotalCount] = useState(0);
  const stockFilter = getStockFilter(inStock, outOfStock);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts({
        page,
        search,
        ordering,
        stock_filter: stockFilter,
        condition,
      });
      setProducts(data.results);
      setTotalCount(data.count);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timeout);
  }, [page, search, ordering, inStock, outOfStock, condition]);

  const handleResetFilter = () => {
    setInStock(false);
    setOutOfStock(false);
    setCondition("");
    setOrdering("latest");
    setSearch("");
    setPage(1);
  };

  const handleInStock = () => {
    setInStock((prev) => {
      const next = !prev;
      if (next) {
        setOutOfStock(false);
      }
      return next;
    });
    setPage(1);
  };

  const handleOutOfStock = () => {
    setOutOfStock((prev) => {
      const next = !prev;
      if (next) {
        setInStock(false);
      }
      return next;
    });
    setPage(1);
  };

  const handleConditionChange = (value: ProductConditionFilter) => {
    setCondition((prev) => (prev === value ? "" : value));
    setPage(1);
  };

  const toggleWishlist = async (productId: number) => {
    try {
      await api.post("/wishlist/add/", {
        product_id: productId,
      });

      setProducts((prev) =>
        prev.map((product) =>
          product.id === productId
            ? {
                ...product,
                is_wishlisted: !product.is_wishlisted,
              }
            : product,
        ),
      );
    } catch (error) {
      console.error("Toggle wishlist error", error);
    }
  };

  return {
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
  };
}
