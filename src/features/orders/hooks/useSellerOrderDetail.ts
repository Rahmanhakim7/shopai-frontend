import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  processSellerOrder,
  shipSellerOrder,
} from "@/features/orders/order.api";
import { Order } from "../order.types";

export function useSellerOrderDetail(orderId: number, enabled: boolean = true) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const fetchOrder = async () => {
      try {
        const res = await api.get(`/seller/orders/${orderId}/`);
        setOrder(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, enabled]);

  const processOrder = async () => {
    if (!order) return;
    try {
      setUpdating(true);
      await processSellerOrder(order.id);
      setOrder({
        ...order,
        status: "processed",
      });
    } finally {
      setUpdating(false);
    }
  };

  const shipOrder = async () => {
    if (!order) return;
    try {
      setUpdating(true);
      await shipSellerOrder(order.id);
      setOrder({
        ...order,
        status: "shipped",
      });
    } finally {
      setUpdating(false);
    }
  };

  return {
    order,
    loading,
    updating,
    processOrder,
    shipOrder,
  };
}
