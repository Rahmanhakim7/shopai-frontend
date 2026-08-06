"use client";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { deleteWishlist, getWishlist } from "../wishlist.api";
import type { WishlistItem } from "../wishlist.types";

export default function useWishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchWishlist = useCallback(async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const data = await getWishlist(page);
      setWishlist(data.results);
      setTotalCount(data.count);
    } catch (error) {
      console.error("Failed fetch wishlist", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  const removeWishlist = async (productId: number) => {
    try {
      await deleteWishlist(productId);
      if (wishlist.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        fetchWishlist();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user || user.role !== "buyer") return;
    fetchWishlist();
  }, [authLoading, user, fetchWishlist]);

  return {
    wishlist,
    loading,
    removeWishlist,
    page,
    setPage,
    fetchWishlist,
    totalCount,
  };
}
