"use client";
import SellerLayout from "@/layouts/sellerlayouts";
import RoleGuard from "@/components/guards/RoleGuard";
import { useSellerOrders } from "@/features/orders/hooks/useSellerOrders";
import EmptyState from "@/components/ui/EmptyState";
import SellerOrderTable from "@/features/orders/components/SellerOrderTable";

export default function SellerOrdersPage() {
  const { orders, loading } = useSellerOrders();
  return (
    <RoleGuard role="seller">
      <SellerLayout sidebarTitle="Orders">
        <div className="min-h-screen bg-zinc-50 p-6">
          <div className="mb-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
            <EmptyState
              icon={<span>📦</span>}
              title="Belum Ada Pesanan"
              description="Pesanan dari pelanggan akan muncul di sini."
            />
          ) : (
              <SellerOrderTable orders={orders} />
          )}
        </div>
      </SellerLayout>
    </RoleGuard>
  );
}
