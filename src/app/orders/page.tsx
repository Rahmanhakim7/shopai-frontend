"use client";

import BuyerLayout from "@/layouts/buyerlayouts";
import RoleGuard from "@/components/guards/RoleGuard";
import Script from "next/script";
import { Package, ShoppingBag } from "lucide-react";
import OrderCard from "@/features/orders/components/OrderCard";
import OrderFilters from "@/features/orders/components/OrderFilters";
import EmptyState from "@/components/ui/EmptyState";
import { useOrders } from "@/features/orders/hooks/useOrder";
import Loader from "@/components/ui/Loader";

export default function OrdersPage() {
  const {
    orders,
    loading,
    activeTab,
    setActiveTab,
    filteredOrders,
    getTabCount,
    fetchOrders,
  } = useOrders();

  return (
    <RoleGuard role="buyer">
      <BuyerLayout>
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          strategy="afterInteractive"
        />

        <div className="min-h-screen bg-gray-50 p-6">
          <div className="mb-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 via-green-600 to-emerald-700 px-6 py-5 shadow-lg shadow-green-100 md:px-7 md:py-6">
              <div className="absolute -top-16 -right-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

              <div className="absolute right-24 -bottom-20 h-36 w-36 rounded-full bg-emerald-300/20 blur-3xl" />

              <div className="relative flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 shadow-inner ring-1 ring-white/20 backdrop-blur-sm">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>

                <div>
                  <h1 className="text-xl font-bold tracking-tight text-white md:text-2xl">
                    Pesanan Saya
                  </h1>

                  <p className="mt-1 text-sm leading-relaxed text-green-100">
                    Pantau status pesanan, pembayaran, dan pengiriman kamu.
                  </p>
                </div>
              </div>
            </div>

            <OrderFilters
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              getTabCount={getTabCount}
            />
          </div>

          {loading ? (
            <div className="flex min-h-[420px] w-full items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <Loader text="Memuat pesanan..." size="md" />
              </div>
            </div>
          ) : orders.length === 0 ? (
            <EmptyState
              icon={<Package className="h-7 w-7" />}
              title="Belum ada pesanan"
              description="Pesanan yang kamu buat akan muncul di halaman ini."
            />
          ) : filteredOrders.length === 0 ? (
            <EmptyState
              icon={<Package className="h-7 w-7" />}
              title="Tidak ada pesanan"
              description="Belum ada pesanan yang sesuai dengan kategori ini."
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onPaymentSuccess={fetchOrders}
                />
              ))}
            </div>
          )}
        </div>
      </BuyerLayout>
    </RoleGuard>
  );
}
