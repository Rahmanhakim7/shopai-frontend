"use client";
import { useEffect, useState } from "react";
import BuyerLayout from "@/layouts/buyerlayouts";
import Link from "next/link";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import RoleGuard from "@/components/guards/RoleGuard";
import PaymentStatusBadge from "@/features/orders/components/PaymentStatusBadge";
import SellerStatusBadge from "@/features/orders/components/SellerStatusBadge";
import PayButton from "@/components/payments/PayButton";
import Script from "next/script";
import {
  ListFilter,
  Wallet,
  Package,
  Truck,
  CircleCheckBig,
  CircleX,
} from "lucide-react";

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
  payment_status: string;
  created_at: string;
  seller_orders: SellerOrder[];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("all");

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

  useEffect(() => {
    if (authLoading) return;
    if (!user || user.role !== "buyer") return;

    fetchOrders();
  }, [authLoading, user]);

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
          <div className="p-6">Loading...</div>
        </BuyerLayout>
      </RoleGuard>
    );
  }

  const tabs = [
    {
      key: "all",
      label: "Semua",
      icon: ListFilter,
    },
    {
      key: "pending_payment",
      label: "Belum Bayar",
      icon: Wallet,
    },
    {
      key: "processing",
      label: "Diproses",
      icon: Package,
    },
    {
      key: "shipping",
      label: "Dikirim",
      icon: Truck,
    },
    {
      key: "completed",
      label: "Selesai",
      icon: CircleCheckBig,
    },
    {
      key: "cancelled",
      label: "Batal",
      icon: CircleX,
    },
  ];

  const getTabCount = (key: string) => {
    switch (key) {
      case "all":
        return orders.length;

      case "pending_payment":
        return orders.filter((order) => order.payment_status === "pending")
          .length;

      case "processing":
        return orders.filter(
          (order) =>
            order.payment_status === "paid" &&
            order.seller_orders.some(
              (seller) =>
                seller.status === "pending" || seller.status === "processed",
            ),
        ).length;

      case "shipping":
        return orders.filter((order) =>
          order.seller_orders.some((seller) => seller.status === "shipped"),
        ).length;

      case "completed":
        return orders.filter((order) =>
          order.seller_orders.every((seller) => seller.status === "completed"),
        ).length;

      case "cancelled":
        return orders.filter(
          (order) =>
            order.payment_status === "cancelled" ||
            order.seller_orders.every(
              (seller) => seller.status === "cancelled",
            ),
        ).length;

      default:
        return 0;
    }
  };

  const filteredOrders = orders.filter((order) => {
    switch (activeTab) {
      case "pending_payment":
        return order.payment_status === "pending";
      case "processing":
        return (
          order.payment_status === "paid" &&
          order.seller_orders.some(
            (s) => s.status === "pending" || s.status === "processed",
          )
        );
      case "shipping":
        return order.seller_orders.some((s) => s.status === "shipped");
      case "completed":
        return order.seller_orders.every((s) => s.status === "completed");
      case "cancelled":
        return (
          order.payment_status === "cancelled" ||
          order.seller_orders.every((s) => s.status === "cancelled")
        );
      default:
        return true;
    }
  });

  return (
    <RoleGuard role="buyer">
      <BuyerLayout>
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          strategy="afterInteractive"
        />
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="">
            <h1 className="mb-6 text-2xl font-bold">Pesanan Saya</h1>
            <div className="mb-6 flex justify-center gap-2 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;

                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      activeTab === tab.key
                        ? "bg-green-600 text-white shadow-md"
                        : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>

                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        activeTab === tab.key
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {getTabCount(tab.key)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          {orders.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center shadow-sm">
              Belum ada pesanan
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {filteredOrders.map((order) => {
                return (
                  <div
                    key={order.id}
                    className="flex flex-col gap-6 rounded-2xl border border-green-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg lg:flex-row lg:justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h2 className="font-bold">Order #{order.id}</h2>
                          <p className="text-sm text-gray-500">
                            {formatDate(order.created_at)}
                          </p>
                          <div className="mt-2">
                            <PaymentStatusBadge status={order.payment_status} />
                          </div>
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
                      <div className="mt-4 flex flex-wrap gap-1">
                        <Link
                          href={`/orders/${order.id}`}
                          className="rounded-lg bg-green-600 px-4 py-1 font-semibold text-white"
                        >
                          Lihat Detail
                        </Link>
                        {order.payment_status === "pending" && (
                          <PayButton
                            orderId={order.id}
                            onPaymentSuccess={fetchOrders}
                            className="min-w-[140px] !bg-green-600 !px-4 !py-1 !text-white hover:!bg-green-700"
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col flex-wrap gap-2">
                      {order.seller_orders.map((sellerOrder) => (
                        <div
                          key={sellerOrder.id}
                          className="rounded-lg border border-zinc-200 p-3"
                        >
                          <p className="text-sm font-semibold text-zinc-900">
                            {sellerOrder.seller_name}
                          </p>
                          <div className="mt-2">
                            <SellerStatusBadge status={sellerOrder.status} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </BuyerLayout>
    </RoleGuard>
  );
}
