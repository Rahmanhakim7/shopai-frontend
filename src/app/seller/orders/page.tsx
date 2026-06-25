"use client";

import { useEffect, useState } from "react";
import SellerLayout from "@/layouts/sellerlayouts";
import Link from "next/link";
import api from "@/lib/api";

type SellerOrder = {
  id: number;
  buyer_name: string;
  seller_name: string;
  status: string;
  subtotal: number;
  created_at: string;
  items: {
    id: number;
    quantity: number;
  }[];
};

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState<SellerOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/seller/orders/");

        setOrders(res.data.results ?? res.data);
      } catch (error) {
        console.error("Failed fetch seller orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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

  return (
    <SellerLayout sidebarTitle="Orders">
      <div className="min-h-screen bg-zinc-50 p-6">
        <div className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900">Pesanan</h1>

              <p className="mt-1 text-zinc-500">
                Pantau dan kelola seluruh transaksi pelanggan.
              </p>
            </div>

            {!loading && (
              <div className="rounded-xl border border-green-100 bg-green-50 px-5 py-3">
                <p className="text-xs font-semibold tracking-wider text-green-600 uppercase">
                  Total Pesanan
                </p>

                <p className="text-2xl font-bold text-green-700">
                  {orders.length}
                </p>
              </div>
            )}
          </div>
          {!loading && orders.length > 0 && (
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-zinc-500">Total Pesanan</p>

                <p className="mt-2 text-3xl font-bold text-zinc-900">
                  {orders.length}
                </p>
              </div>

              <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5 shadow-sm">
                <p className="text-sm text-yellow-700">Menunggu Diproses</p>

                <p className="mt-2 text-3xl font-bold text-yellow-700">
                  {orders.filter((order) => order.status === "pending").length}
                </p>
              </div>

              <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
                <p className="text-sm text-green-700">Pesanan Selesai</p>

                <p className="mt-2 text-3xl font-bold text-green-700">
                  {
                    orders.filter((order) => order.status === "completed")
                      .length
                  }
                </p>
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="animate-pulse">
              <div className="border-b p-5">
                <div className="h-5 w-48 rounded bg-zinc-200" />
              </div>

              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-7 gap-4 border-b px-6 py-5"
                >
                  <div className="h-4 rounded bg-zinc-200" />
                  <div className="h-4 rounded bg-zinc-200" />
                  <div className="h-4 rounded bg-zinc-200" />
                  <div className="h-4 rounded bg-zinc-200" />
                  <div className="h-4 rounded bg-zinc-200" />
                  <div className="h-4 rounded bg-zinc-200" />
                  <div className="h-4 rounded bg-zinc-200" />
                </div>
              ))}
            </div>
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100">
              📦
            </div>

            <h3 className="text-lg font-semibold text-zinc-900">
              Belum Ada Pesanan
            </h3>

            <p className="mt-2 text-zinc-500">
              Pesanan dari pelanggan akan muncul di sini.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-600">
                    Order
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-600">
                    Pembeli
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-600">
                    Produk
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-600">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-600">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-600">
                    Tanggal
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-zinc-600">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="transition hover:bg-zinc-50">
                    <td className="px-6 py-3 font-semibold text-zinc-900">
                      #{order.id}
                    </td>

                    <td className="px-6 py-3 text-zinc-700">
                      {order.buyer_name}
                    </td>

                    <td className="px-6 py-3 text-zinc-700">
                      {order.items.length} Produk
                    </td>

                    <td className="px-6 py-3 font-semibold text-green-600">
                      {formatCurrency(order.subtotal)}
                    </td>

                    <td className="px-6 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="px-6 py-3 text-zinc-500">
                      {formatDate(order.created_at)}
                    </td>

                    <td className="px-6 py-3 text-center">
                      <Link
                        href={`/seller/orders/${order.id}`}
                        className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-green-700"
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </SellerLayout>
  );
}
