"use client";

import { useEffect, useState } from "react";
import BuyerLayout from "@/layouts/buyerlayouts";
import Image from "next/image";
import api from "@/lib/api";
import { useParams } from "next/navigation";
import RoleGuard from "@/components/guards/RoleGuard";
import { useAuth } from "@/context/AuthContext";
import PayButton from "@/components/payments/PayButton";
import Script from "next/script";
import {
  cancelOrder,
  completeSellerOrder,
  getOrder,
} from "@/features/orders/order.api";
import SellerStatusBadge from "@/features/orders/components/SellerStatusBadge";
import PaymentStatusBadge from "@/features/orders/components/PaymentStatusBadge";

const MEDIA_URL = process.env.NEXT_PUBLIC_API_URL;
type OrderItem = {
  id: number;
  product: number;
  product_name: string;
  product_image: string | null;
  quantity: number;
  price: number;
  subtotal: number;
  has_review?: boolean;
  review_rating?: number | null;
};

type SellerOrder = {
  id: number;
  seller_name: string;
  status: string;
  subtotal: number;
  items: OrderItem[];
};

type Order = {
  id: number;
  total_amount: number;
  payment_status: string;
  created_at: string;
  seller_orders: SellerOrder[];
};

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id;
  const [order, setOrder] = useState<Order | null>(null);
  const [completingId, setCompletingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { user, loading: authLoading } = useAuth();

  const fetchOrder = async () => {
    try {
      const res = await api.get(`/orders/${orderId}/`);
      setOrder(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteSellerOrder = async (sellerOrderId: number) => {
    if (!order) return;
    try {
      setCompletingId(sellerOrderId);
      await completeSellerOrder(sellerOrderId);
      const updatedOrder = await getOrder(order.id);
      setOrder(updatedOrder);
    } catch (error) {
      console.error(error);
    } finally {
      setCompletingId(null);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user || user.role !== "buyer") return;
    if (orderId) {
      fetchOrder();
    }
  }, [authLoading, user, orderId]);

  const handleSubmitReview = async () => {
    if (!selectedItem || !rating) return;
    try {
      setSubmitting(true);
      await api.post(`/reviews/order-items/${selectedItem.id}/`, {
        rating,
        comment,
      });
      const res = await api.get(`/orders/${orderId}/`);
      setOrder(res.data);
      setSelectedItem(null);
      setRating(0);
      setComment("");
      alert("Ulasan berhasil dikirim");
    } catch (error) {
      console.error(error);
      alert("Gagal mengirim ulasan");
    } finally {
      setSubmitting(false);
    }
  };

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(n);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  if (loading) {
    return (
      <RoleGuard role="buyer">
        <BuyerLayout>
          <div className="flex min-h-[60vh] items-center justify-center">
            Loading...
          </div>
        </BuyerLayout>
      </RoleGuard>
    );
  }

  if (!order) {
    return (
      <RoleGuard role="buyer">
        <BuyerLayout>
          <div className="flex min-h-[60vh] items-center justify-center">
            Order tidak ditemukan
          </div>
        </BuyerLayout>
      </RoleGuard>
    );
  }

  const handleCancelOrder = async () => {
    const confirmed = window.confirm("Yakin ingin membatalkan pesanan ini?");
    if (!confirmed) return;
    try {
      await cancelOrder(order!.id);
      alert("Pesanan berhasil dibatalkan.");
      await fetchOrder();
    } catch (error) {
      console.error(error);
      alert("Gagal membatalkan pesanan.");
    }
  };

  return (
    <RoleGuard role="buyer">
      <BuyerLayout>
        <div className="min-h-screen bg-gray-50 p-6">
          <h1 className="mb-6 text-2xl font-bold">
            Detail Pesanan #{order.id}
          </h1>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {order.seller_orders.map((sellerOrder) => (
                <div
                  key={sellerOrder.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm"
                >
                  <div className="flex items-center justify-between bg-green-100 px-4 py-3">
                    <span className="font-semibold">
                      🏪 {sellerOrder.seller_name}
                    </span>
                    <SellerStatusBadge status={sellerOrder.status} />
                  </div>
                  <div className="p-4">
                    {sellerOrder.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 border-b py-4 last:border-0"
                      >
                        <Image
                          src={
                            item.product_image
                              ? item.product_image.startsWith("http")
                                ? item.product_image
                                : `${MEDIA_URL}${item.product_image}`
                              : "/no-image.png"
                          }
                          alt={item.product_name}
                          width={70}
                          height={70}
                          className="rounded-lg object-cover"
                          unoptimized
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.product_name}</h3>
                          <p className="text-sm text-gray-500">
                            {formatCurrency(item.price)}
                          </p>
                          <p className="mt-1 text-sm">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">
                            {formatCurrency(item.subtotal)}
                          </div>
                          {sellerOrder.status === "completed" && (
                            <div className="mt-2">
                              {item.has_review ? (
                                <span className="text-sm font-medium text-amber-500">
                                  ⭐ {item.review_rating}/5
                                </span>
                              ) : (
                                <button
                                  onClick={() => {
                                    setRating(0);
                                    setComment("");
                                    setSelectedItem(item);
                                  }}
                                  className="text-sm font-medium text-green-600 hover:text-green-700"
                                >
                                  Beri Ulasan
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    <div className="mt-4 flex justify-between border-t pt-4 font-semibold">
                      <span>Subtotal Seller</span>
                      <span>{formatCurrency(sellerOrder.subtotal)}</span>
                    </div>
                    {sellerOrder.status === "shipped" && (
                      <div className="mt-5 border-t pt-5">
                        <button
                          onClick={() =>
                            handleCompleteSellerOrder(sellerOrder.id)
                          }
                          disabled={completingId === sellerOrder.id}
                          className="w-full rounded-xl bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                        >
                          {completingId === sellerOrder.id
                            ? "Memproses..."
                            : "📦 Pesanan Diterima"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="h-fit rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="mb-5 text-lg font-bold">Informasi Pesanan</h2>
              <div className="mb-4">
                <p className="text-sm text-gray-500">ID Pesanan</p>
                <p className="font-semibold">#{order.id}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Tanggal</p>
                <p>{formatDate(order.created_at)}</p>
              </div>
              <div className="mb-5">
                <p className="mb-2 text-sm text-gray-500">Status Pembayaran</p>
                <PaymentStatusBadge status={order.payment_status} />
              </div>
              <div className="border-t pt-5"></div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Bayar</span>
                  <span className="text-green-600">
                    {formatCurrency(order.total_amount)}
                  </span>
                </div>
                {order.payment_status === "pending" && (
                  <div className="mt-5 space-y-3">
                    <Script
                      src="https://app.sandbox.midtrans.com/snap/snap.js"
                      data-client-key={
                        process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
                      }
                      strategy="afterInteractive"
                    />

                    <PayButton
                      orderId={order.id}
                      onPaymentSuccess={fetchOrder}
                    />

                    <button
                      className="w-full rounded-xl border border-red-500 py-3 font-medium text-red-600 transition hover:bg-red-50"
                      onClick={handleCancelOrder}
                    >
                      Batalkan Pesanan
                    </button>
                  </div>
                )}
                {order.payment_status === "paid" && (
                  <div className="mt-5 rounded-xl bg-green-50 p-4 text-center">
                    <p className="font-semibold text-green-700">
                      Pembayaran berhasil.
                    </p>
                  </div>
                )}
                {order.payment_status === "cancelled" && (
                  <div className="mt-5 rounded-xl bg-red-50 p-4 text-center">
                    <p className="font-semibold text-red-700">
                      Pesanan telah dibatalkan.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
              <h2 className="text-xl font-bold">Beri Ulasan</h2>
              <div className="mt-4 flex items-center gap-3 rounded-xl border p-3">
                <Image
                  src={
                    selectedItem.product_image
                      ? selectedItem.product_image.startsWith("http")
                        ? selectedItem.product_image
                        : `${MEDIA_URL}${selectedItem.product_image}`
                      : "/no-image.png"
                  }
                  alt={selectedItem.product_name}
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                  unoptimized
                />
                <div>
                  <p className="font-medium">{selectedItem.product_name}</p>
                </div>
              </div>
              <div className="mt-5">
                <p className="mb-2 text-sm text-zinc-600">
                  Bagaimana kualitas produk ini?
                </p>
                <div className="flex gap-1 text-3xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                    >
                      {star <= rating ? "★" : "☆"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-5">
                <textarea
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Bagikan pengalaman Anda tentang produk ini..."
                  className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="rounded-xl border px-4 py-2"
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmitReview}
                  disabled={!rating || submitting}
                  className="rounded-xl bg-green-600 px-4 py-2 text-white disabled:opacity-50"
                >
                  {submitting ? "Mengirim..." : "Kirim Ulasan"}
                </button>
              </div>
            </div>
          </div>
        )}
      </BuyerLayout>
    </RoleGuard>
  );
}
