import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useSellerProductQuery() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const ordering = searchParams.get("ordering") || "";
  const [searchInput, setSearchInput] = useState(search);
  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const updateQueryParams = (
    page: number,
    searchValue: string,
    statusValue: string,
    orderingValue: string,
  ) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    if (searchValue) {
      params.set("search", searchValue);
    }
    if (statusValue) {
      params.set("status", statusValue);
    }
    if (orderingValue) {
      params.set("ordering", orderingValue);
    }
    router.push(`/seller/products?${params.toString()}`);
  };

  return {
    currentPage,
    search,
    searchInput,
    setSearchInput,
    status,
    ordering,
    updateQueryParams,
  };
}
