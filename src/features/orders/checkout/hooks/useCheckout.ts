"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import type { CheckoutItem } from "@/features/orders/checkout/checkout.types";
import { createOrder } from "../checkout.api"
import { clearCheckoutData, getCheckoutData } from "../checkout.utils";

export function useCheckout() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [checkoutData, setCheckoutData] = useState<CheckoutItem[]>(() => {
    if (typeof window === "undefined") return [];
    return getCheckoutData();
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user || user.role !== "buyer") return;
    const data = getCheckoutData();
    if (!data.length) {
      router.replace("/cart");
      return;
    }
    setCheckoutData(data);
    setLoading(false);
  }, [authLoading, user, router]);

  const grandTotal = useMemo(() => {
    return checkoutData.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
  }, [checkoutData]);

  const totalItems = useMemo(() => {
    return checkoutData.reduce((acc, item) => acc + item.quantity, 0);
  }, [checkoutData]);

  const groupedItems = useMemo(() => {
    return checkoutData.reduce(
      (acc, item) => {
        if (!acc[item.seller_name]) {
          acc[item.seller_name] = [];
        }
        acc[item.seller_name].push(item);
        return acc;
      },
      {} as Record<string, CheckoutItem[]>,
    );
  }, [checkoutData]);

  const handleCreateOrder = async () => {
    try {
      setSubmitting(true);
      await createOrder(
        checkoutData.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
      );
      clearCheckoutData();
      router.replace("/orders");
    } catch (err) {
      console.error("Failed create order:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    checkoutData,
    loading,
    submitting,
    groupedItems,
    grandTotal,
    totalItems,
    handleCreateOrder,
  };
}
