"use client";

import { useEffect, useState } from "react";
import SellerLayout from "@/layouts/sellerlayouts";
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
};

type SellerOrder = {
  id: number;
  buyer_name: string;
  seller_name: string;
  status: string;
  subtotal: number;
  created_at: string;
  items: OrderItem[];
};

export default function SellerOrderDetailPage() {
  const params = useParams();

  const [order, setOrder] = useState<SellerOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
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
  }, [params.id]);

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
  const updateStatus = async (status: string) => {
    try {
      setUpdating(true);
      await api.patch(`/seller/orders/${order?.id}/status/`, {
        status,
      });
      setOrder((prev) =>
        prev
          ? {
              ...prev,
              status,
            }
          : prev,
      );
    } catch (error) {
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "processed":
        return "bg-blue-100 text-blue-700";
      case "shipped":
        return "bg-purple-100 text-purple-700";
      case "completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-zinc-100 text-zinc-700";
    }
  };
  if (loading) {
    return (
      <SellerLayout sidebarTitle="Orders">
        <div className="p-6">Loading...</div>
      </SellerLayout>
    );
  }
  if (!order) {
    return (
      <SellerLayout sidebarTitle="Orders">
        <div className="p-6">Pesanan tidak ditemukan</div>
      </SellerLayout>
    );
  }
  return (
    <SellerLayout sidebarTitle="Orders">
      <div className="min-h-screen bg-zinc-50 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Seller Order #{order.id}</h1>

            <p className="mt-1 text-zinc-500">Pembeli: {order.buyer_name}</p>
          </div>
          <span
            className={`rounded-full px-4 py-2 text-sm font-medium ${getStatusColor(
              order.status,
            )}`}
          >
            {order.status}
          </span>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
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
                      <h3 className="font-semibold">{item.product_name}</h3>
                      <p className="text-sm text-zinc-500">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm text-zinc-500">
                        {formatCurrency(item.price)}
                      </p>
                    </div>
                    <div className="font-bold text-green-600">
                      {formatCurrency(item.subtotal)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold">Informasi Pesanan</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Pembeli</span>
                  <span>{order.buyer_name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tanggal</span>
                  <span>{formatDate(order.created_at)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="font-bold text-green-600">
                    {formatCurrency(order.subtotal)}
                  </span>
                </div>
              </div>
              <div className="mt-6 border-t pt-6">
                <h3 className="mb-3 font-semibold">Update Status</h3>
                <select
                  value={order.status}
                  disabled={updating}
                  onChange={(e) => updateStatus(e.target.value)}
                  className="w-full rounded-xl border p-3"
                >
                  <option value="pending">Pending</option>
                  <option value="processed">Processed</option>
                  <option value="shipped">Shipped</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
}
