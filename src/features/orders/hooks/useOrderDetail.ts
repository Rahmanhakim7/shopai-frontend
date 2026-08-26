"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { cancelOrder, completeSellerOrder, getOrder } from "../order.api";
import type { Order, OrderItem } from "../order.types";
import { showConfirm, showError, showSuccess } from "@/utils/alert";

export function useOrderDetail() {
  const params = useParams();
  const orderId = params.id;

  const { user, loading: authLoading } = useAuth();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [completingId, setCompletingId] = useState<number | null>(null);

  const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchOrder = useCallback(async () => {
    if (!orderId) return;

    try {
      setLoading(true);

      const res = await api.get(`/orders/${orderId}/`);
      setOrder(res.data);
    } catch (error) {
      console.error(error);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (authLoading) return;

    if (!user || user.role !== "buyer") {
      setLoading(false);
      return;
    }

    fetchOrder();
  }, [authLoading, user, fetchOrder]);

  const handleCompleteSellerOrder = async (sellerOrderId: number) => {
    if (!order) return;

    try {
      setCompletingId(sellerOrderId);

      await completeSellerOrder(sellerOrderId);

      const updatedOrder = await getOrder(order.id);
      setOrder(updatedOrder);

      await showSuccess("Pesanan berhasil dikonfirmasi diterima.");
    } catch (error) {
      console.error(error);
      await showError("Gagal mengonfirmasi pesanan. Silakan coba lagi.");
    } finally {
      setCompletingId(null);
    }
  };

  const handleCancelOrder = async () => {
    if (!order) return;
    const result = await showConfirm(
      "Batalkan Pesanan?",
      "Pesanan yang dibatalkan tidak dapat dikembalikan.",
    );
    if (!result.isConfirmed) return;
    try {
      await cancelOrder(order.id);
      await showSuccess("Pesanan berhasil dibatalkan.");
      await fetchOrder();
    } catch (error) {
      console.error(error);
      await showError("Gagal membatalkan pesanan. Silakan coba lagi.");
    }
  };

  const handleSubmitReview = async () => {
    if (!selectedItem) {
      await showError("Produk yang akan diulas tidak ditemukan.");
      return;
    }

    if (!rating) {
      await showError("Silakan pilih rating terlebih dahulu.");
      return;
    }

    try {
      setSubmitting(true);
      await api.post(`/reviews/order-items/${selectedItem.id}/`, {
        rating,
        comment,
      });
      await fetchOrder();
      setSelectedItem(null);
      setRating(0);
      setComment("");

      await showSuccess("Ulasan berhasil dikirim.");
    } catch (error) {
      console.error(error);

      await showError("Gagal mengirim ulasan. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  const openReview = (item: OrderItem) => {
    setSelectedItem(item);
    setRating(0);
    setComment("");
  };

  const closeReview = () => {
    setSelectedItem(null);
    setRating(0);
    setComment("");
  };

  return {
    order,
    loading,
    completingId,
    selectedItem,
    rating,
    comment,
    submitting,
    setSelectedItem,
    setRating,
    setComment,
    openReview,
    closeReview,
    fetchOrder,
    handleCompleteSellerOrder,
    handleCancelOrder,
    handleSubmitReview,
  };
}
