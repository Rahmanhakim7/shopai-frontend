import { useEffect, useState } from "react";
import { getProducts } from "../product.api";
import { getStockFilter } from "../utils/stock";
import type { ProductItem } from "@/types/product";
import { ProductConditionFilter } from "../constants/product-condition";

export function useProduct() {
  const [products, setProducts] = useState<ProductItem[]>([]);
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
    const timeout = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timeout);
  }, [page, search, ordering, inStock, outOfStock, condition]);

  const handleResetFilter = () => {
    setLoading(true);
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
  };

  const handleOutOfStock = () => {
    setOutOfStock((prev) => {
      const next = !prev;

      if (next) {
        setInStock(false);
      }

      return next;
    });
  };

  const handleConditionChange = (value: ProductConditionFilter) => {
    setCondition((prev) => (prev === value ? "" : value));
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

    handleInStock,
    handleOutOfStock,
    handleConditionChange,
    handleResetFilter,
  };
}
