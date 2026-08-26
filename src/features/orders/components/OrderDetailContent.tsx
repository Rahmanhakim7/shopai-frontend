"use client";

import Image from "next/image";
import Script from "next/script";
import { Store, PackageCheck, CreditCard } from "lucide-react";
import type { Order, OrderItem } from "../order.types";
import SellerStatusBadge from "./SellerStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";
import PayButton from "@/components/payments/PayButton";

const MEDIA_URL = process.env.NEXT_PUBLIC_API_URL;

type OrderDetailContentProps = {
  order: Order;
  completingId: number | null;
  onComplete: (sellerOrderId: number) => Promise<void>;
  onReview: (item: OrderItem) => void;
  onPaymentSuccess: () => Promise<void>;
  onCancel: () => Promise<void>;
};

export default function OrderDetailContent({
  order,
  completingId,
  onComplete,
  onReview,
  onPaymentSuccess,
  onCancel,
}: OrderDetailContentProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const getImageUrl = (image: string | null) => {
    if (!image) return "/no-image.png";
    if (image.startsWith("http")) {
      return image;
    }
    return `${MEDIA_URL}${image}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <PackageCheck className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
                Detail Pesanan
              </h1>

              <p className="mt-1 text-sm text-zinc-500">
                Order #{order.id} · {formatDate(order.created_at)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {order.seller_orders.map((sellerOrder) => (
              <div
                key={sellerOrder.id}
                className="overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm"
              >
                <div className="flex items-center justify-between gap-4 border-b border-green-100 bg-green-50 px-5 py-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-green-600 shadow-sm">
                      <Store className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-zinc-500">Toko</p>

                      <p className="truncate font-semibold text-zinc-900">
                        {sellerOrder.seller_name}
                      </p>
                    </div>
                  </div>

                  <SellerStatusBadge status={sellerOrder.status} />
                </div>

                <div className="p-5">
                  <div className="divide-y divide-zinc-100">
                    {sellerOrder.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 py-4 first:pt-0 last:pb-0"
                      >
                        <Image
                          src={getImageUrl(item.product_image)}
                          alt={item.product_name}
                          width={76}
                          height={76}
                          className="h-[76px] w-[76px] shrink-0 rounded-xl object-cover"
                          unoptimized
                        />

                        <div className="min-w-0 flex-1">
                          <h3 className="line-clamp-2 font-medium text-zinc-900">
                            {item.product_name}
                          </h3>

                          <p className="mt-1 text-sm text-zinc-500">
                            {formatCurrency(item.price)}
                          </p>

                          <p className="mt-1 text-sm text-zinc-500">
                            Qty: {item.quantity}
                          </p>

                          {sellerOrder.status === "completed" && (
                            <div className="mt-2">
                              {item.has_review ? (
                                <span className="text-sm font-medium text-amber-500">
                                  ★ {item.review_rating}/5
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => onReview(item)}
                                  className="text-sm font-medium text-green-600 transition hover:text-green-700"
                                >
                                  Beri Ulasan
                                </button>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="shrink-0 text-right">
                          <p className="font-semibold text-green-600">
                            {formatCurrency(item.subtotal)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4">
                    <span className="text-sm font-medium text-zinc-500">
                      Subtotal Seller
                    </span>

                    <span className="font-semibold text-zinc-900">
                      {formatCurrency(sellerOrder.subtotal)}
                    </span>
                  </div>

                  {sellerOrder.status === "shipped" && (
                    <div className="mt-5 border-t border-zinc-100 pt-5">
                      <button
                        type="button"
                        onClick={() => onComplete(sellerOrder.id)}
                        disabled={completingId === sellerOrder.id}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <PackageCheck className="h-5 w-5" />

                        {completingId === sellerOrder.id
                          ? "Memproses..."
                          : "Pesanan Diterima"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="h-fit rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <CreditCard className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-bold text-zinc-900">Informasi Pesanan</h2>

                <p className="text-xs text-zinc-500">Ringkasan transaksi</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-zinc-500">ID Pesanan</p>
                <p className="mt-1 font-semibold text-zinc-900">#{order.id}</p>
              </div>

              <div>
                <p className="text-sm text-zinc-500">Tanggal</p>
                <p className="mt-1 text-zinc-900">
                  {formatDate(order.created_at)}
                </p>
              </div>

              <div>
                <p className="mb-2 text-sm text-zinc-500">Status Pembayaran</p>

                <PaymentStatusBadge status={order.payment_status} />
              </div>
            </div>

            <div className="my-5 border-t border-zinc-100" />

            <div className="flex items-center justify-between gap-4">
              <span className="font-semibold text-zinc-700">Total Bayar</span>

              <span className="text-lg font-bold text-green-600">
                {formatCurrency(order.total_amount)}
              </span>
            </div>

            {order.payment_status === "pending" && (
              <div className="mt-5 space-y-3">
                <Script
                  src="https://app.sandbox.midtrans.com/snap/snap.js"
                  data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
                  strategy="afterInteractive"
                />

                <PayButton
                  orderId={order.id}
                  onPaymentSuccess={onPaymentSuccess}
                  className="w-full"
                />

                <button
                  type="button"
                  onClick={onCancel}
                  className="w-full rounded-xl border border-red-200 py-3 font-medium text-red-600 transition hover:bg-red-50"
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
  );
}
