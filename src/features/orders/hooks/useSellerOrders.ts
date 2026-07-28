import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getSellerOrders } from "../order.api";
import type { SellerOrder } from "../order.types";

export function useSellerOrders() {
  const [orders, setOrders] = useState<SellerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  useEffect(() => {
    if (authLoading) return;
    if (!user || user.role !== "seller") {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await getSellerOrders();
        setOrders(data);
      } catch (error) {
        console.error("Failed fetch seller orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [authLoading, user]);
  return {
    orders,
    loading,
    refreshOrders: async () => {
      setLoading(true);
      try {
        const data = await getSellerOrders();
        setOrders(data);
      } catch (error) {
        console.error("Failed fetch seller orders:", error);
      } finally {
        setLoading(false);
      }
    },
  };
}