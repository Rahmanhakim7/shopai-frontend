"use client";
import { useEffect, useState } from "react";
import SellerLayout from "@/layouts/sellerlayouts";
import Image from "next/image";
import api from "@/lib/api";
import { useParams } from "next/navigation";
import RoleGuard from "@/components/guards/RoleGuard";
import { useAuth } from "@/context/AuthContext";
import {
  processSellerOrder,
  shipSellerOrder,
} from "@/features/seller/seller.api";
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
};

type SellerOrder = {
  id: number;
  buyer_name: string;
  seller_name: string;
  status: string;
  subtotal: number;
  created_at: string;
  payment_status: string;
  items: OrderItem[];
};

export default function SellerOrderDetailPage() {
  const params = useParams();
  const { user, loading: authLoading } = useAuth();
  const [order, setOrder] = useState<SellerOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user || user.role !== "seller") {
      return;
    }
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/seller/orders/${params.id}/`);
        setOrder(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [authLoading, user, params.id]);

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

  const handleProcessOrder = async () => {
    if (!order) return;
    try {
      setUpdating(true);
      await processSellerOrder(order.id);
      setOrder({
        ...order,
        status: "processed",
      });
    } catch (error) {
      console.error("Failed process order:", error);
    } finally {
      setUpdating(false);
    }
  };
  const handleShipOrder = async () => {
    if (!order) return;
    try {
      setUpdating(true);
      await shipSellerOrder(order.id);
      setOrder({
        ...order,
        status: "shipped",
      });
    } catch (error) {
      console.error("Failed ship order:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <RoleGuard role="seller">
        <SellerLayout sidebarTitle="Orders">
          <div className="p-6">Loading...</div>
        </SellerLayout>
      </RoleGuard>
    );
  }

  if (!order) {
    return (
      <RoleGuard role="seller">
        <SellerLayout sidebarTitle="Orders">
          <div className="p-6">Pesanan tidak ditemukan</div>
        </SellerLayout>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard role="seller">
      <SellerLayout sidebarTitle="Orders">
        <div className="min-h-screen bg-zinc-50 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Seller Order #{order.id}</h1>
            </div>
            <SellerStatusBadge status={order.status} />
          </div>
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-5 text-lg font-bold">Produk Pesanan</h2>

                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 border-b pb-4 last:border-0"
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
                        width={80}
                        height={80}
                        className="rounded-xl object-cover"
                        unoptimized
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-zinc-900">
                          {item.product_name}
                        </h3>
                        <p className="mt-1 text-sm text-zinc-500">
                          Qty : {item.quantity}
                        </p>
                        <p className="text-sm text-zinc-500">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6 lg:col-span-7">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-lg font-bold text-zinc-900">
                  Informasi Pesanan
                </h2>
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-zinc-500">Pembeli</p>
                      <p className="mt-1 font-semibold text-zinc-900">
                        {order.buyer_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500">Status Pembayaran</p>

                      <div className="mt-2">
                        <PaymentStatusBadge status={order.payment_status} />
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-zinc-500">Status Pesanan</p>
                      <div className="mt-2">
                        <SellerStatusBadge status={order.status} />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-zinc-500">Tanggal</p>
                      <p className="mt-1 font-medium text-zinc-900">
                        {formatDate(order.created_at)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500">Total</p>
                      <p className="mt-1 text-2xl font-bold text-green-600">
                        {formatCurrency(order.subtotal)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-5 text-lg font-bold text-zinc-900">
                  Aksi Pesanan
                </h2>
                {order.payment_status !== "paid" && (
                  <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
                    <p className="font-semibold text-yellow-700">
                      Menunggu Pembayaran
                    </p>

                    <p className="mt-1 text-sm text-yellow-600">
                      Seller belum dapat memproses pesanan sebelum pembayaran
                      berhasil.
                    </p>
                  </div>
                )}
                {order.payment_status === "paid" &&
                  order.status === "pending" && (
                    <button
                      onClick={handleProcessOrder}
                      disabled={updating}
                      className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-300"
                    >
                      {updating ? "Memproses..." : "Proses Pesanan"}
                    </button>
                  )}
                {order.status === "processed" && (
                  <div className="space-y-4">
                    <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                      <p className="font-semibold text-blue-700">
                        Pesanan Siap Dikirim
                      </p>
                      <p className="mt-1 text-sm text-blue-600">
                        Produk sudah selesai diproses. Silakan kirim pesanan
                        kepada pembeli.
                      </p>
                    </div>
                    <button
                      onClick={handleShipOrder}
                      disabled={updating}
                      className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                    >
                      {updating ? "Mengirim..." : "Kirim Pesanan"}
                    </button>
                  </div>
                )}
                {order.status === "shipped" && (
                  <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
                    <p className="font-semibold text-purple-700">
                      Pesanan Sedang Dikirim
                    </p>
                    <p className="mt-1 text-sm text-purple-600">
                      Menunggu pembeli mengonfirmasi bahwa pesanan telah
                      diterima.
                    </p>
                  </div>
                )}
                {order.status === "completed" && (
                  <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                    <p className="font-semibold text-green-700">
                      Pesanan Selesai
                    </p>
                    <p className="mt-1 text-sm text-green-600">
                      Transaksi telah selesai.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SellerLayout>
    </RoleGuard>
  );
}
