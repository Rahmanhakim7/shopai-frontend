import { useCallback, useEffect, useMemo, useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import type { Order } from "../order.types";

export type OrderTab =
  | "all"
  | "pending_payment"
  | "processing"
  | "shipping"
  | "completed"
  | "cancelled";

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<OrderTab>("all");

  const { user, loading: authLoading } = useAuth();

  const fetchOrders = useCallback(async () => {
    const startTime = Date.now();
    try {
      setLoading(true);
      const res = await api.get("/orders/");
      setOrders(res.data.results ?? res.data);
    } catch (err) {
      console.error(err);
    } finally {
      const elapsed = Date.now() - startTime;
      const minimumLoadingTime = 700;
      const remainingTime = minimumLoadingTime - elapsed;
      if (remainingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTime));
      }
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!user || user.role !== "buyer") {
      setLoading(false);
      return;
    }
    fetchOrders();
  }, [authLoading, user, fetchOrders]);

  const getTabCount = useCallback(
    (key: OrderTab) => {
      switch (key) {
        case "all":
          return orders.length;
        case "pending_payment":
          return orders.filter((order) => order.payment_status === "pending")
            .length;
        case "processing":
          return orders.filter(
            (order) =>
              order.payment_status === "paid" &&
              order.seller_orders.some(
                (seller) =>
                  seller.status === "pending" || seller.status === "processed",
              ),
          ).length;
        case "shipping":
          return orders.filter((order) =>
            order.seller_orders.some((seller) => seller.status === "shipped"),
          ).length;
        case "completed":
          return orders.filter((order) =>
            order.seller_orders.every(
              (seller) => seller.status === "completed",
            ),
          ).length;
        case "cancelled":
          return orders.filter(
            (order) =>
              order.payment_status === "cancelled" ||
              order.seller_orders.every(
                (seller) => seller.status === "cancelled",
              ),
          ).length;
        default:
          return 0;
      }
    },
    [orders],
  );

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      switch (activeTab) {
        case "pending_payment":
          return order.payment_status === "pending";
        case "processing":
          return (
            order.payment_status === "paid" &&
            order.seller_orders.some(
              (seller) =>
                seller.status === "pending" || seller.status === "processed",
            )
          );
        case "shipping":
          return order.seller_orders.some(
            (seller) => seller.status === "shipped",
          );
        case "completed":
          return order.seller_orders.every(
            (seller) => seller.status === "completed",
          );
        case "cancelled":
          return (
            order.payment_status === "cancelled" ||
            order.seller_orders.every((seller) => seller.status === "cancelled")
          );
        default:
          return true;
      }
    });
  }, [orders, activeTab]);

  return {
    orders,
    loading,
    activeTab,
    setActiveTab,
    filteredOrders,
    getTabCount,
    fetchOrders,
  };
}
