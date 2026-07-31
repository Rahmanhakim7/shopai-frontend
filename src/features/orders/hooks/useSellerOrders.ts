import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getSellerOrders } from "../order.api";
import type { Order } from "../order.types";

export function useSellerOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const { user, loading: authLoading } = useAuth();
  const pageSize = 5;
  const totalPages = Math.ceil(totalOrders / pageSize);

  const fetchOrders = async (page = currentPage) => {
    setLoading(true);
    try {
      const data = await getSellerOrders(page);
      setOrders(data.results);
      setTotalOrders(data.count);
    } catch (error) {
      console.error("Failed fetch seller orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user || user.role !== "seller") {
      setLoading(false);
      return;
    }
    fetchOrders(currentPage);
  }, [authLoading, user, currentPage]);
  return {
    orders,
    loading,
    currentPage,
    setCurrentPage,
    totalPages,
    totalOrders,
    refreshOrders: () => fetchOrders(currentPage),
  };
}
