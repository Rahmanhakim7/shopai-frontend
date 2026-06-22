"use client";

import { useEffect, useState } from "react";
import BuyerLayout from "@/layouts/buyerlayouts";
import Link from "next/link";
import api from "@/lib/api";

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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/");
        setOrders(res.data.results ?? res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
        <div className="p-6">Loading...</div>
      </BuyerLayout>
    );
  }

  return (
    <BuyerLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="mb-6 text-2xl font-bold">Pesanan Saya</h1>

        {orders.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            Belum ada pesanan
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="font-bold">Order #{order.id}</h2>

                    <p className="text-sm text-gray-500">
                      {formatDate(order.created_at)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {order.seller_orders.map((sellerOrder) => (
                      <span
                        key={sellerOrder.id}
                        className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700"
                      >
                        {sellerOrder.seller_name}:{sellerOrder.status}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  {order.seller_orders.reduce(
                    (acc, seller) => acc + seller.items.length,
                    0,
                  )}{" "}
                  produk
                </div>

                <div className="mt-2 text-lg font-bold text-green-600">
                  {formatCurrency(order.total_amount)}
                </div>

                <div className="mt-4">
                  <Link
                    href={`/orders/${order.id}`}
                    className="rounded-lg bg-green-600 px-4 py-2 text-white"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </BuyerLayout>
  );
}
