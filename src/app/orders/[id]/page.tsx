"use client";

import { useEffect, useState } from "react";
import BuyerLayout from "@/layouts/buyerlayouts";
import Image from "next/image";
import api from "@/lib/api";
import { useParams } from "next/navigation";

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
  created_at: string;
  seller_orders: SellerOrder[];
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-700";
    case "shipped":
      return "bg-blue-100 text-blue-700";
    case "processed":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-zinc-100 text-zinc-700";
  }
};

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
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
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

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
      <BuyerLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          Loading...
        </div>
      </BuyerLayout>
    );
  }

  if (!order) {
    return (
      <BuyerLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          Order tidak ditemukan
        </div>
      </BuyerLayout>
    );
  }

  return (
    <BuyerLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="mb-6 text-2xl font-bold">Detail Pesanan #{order.id}</h1>
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
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                      sellerOrder.status,
                    )}`}
                  >
                    {sellerOrder.status}
                  </span>
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
                </div>
              </div>
            ))}
          </div>
          <div className="h-fit rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-bold">Informasi Pesanan</h2>
            <div className="mb-3 flex justify-between">
              <span>ID Pesanan</span>
              <span>#{order.id}</span>
            </div>
            <div className="mb-3 flex justify-between">
              <span>Tanggal</span>
              <span>{formatDate(order.created_at)}</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total Bayar</span>
                <span className="text-green-600">
                  {formatCurrency(order.total_amount)}
                </span>
              </div>
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
  );
}
