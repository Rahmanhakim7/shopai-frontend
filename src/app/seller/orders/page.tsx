"use client";

import SellerLayout from "@/layouts/sellerlayouts";
import RoleGuard from "@/components/guards/RoleGuard";
import EmptyState from "@/components/ui/EmptyState";
import FullScreenLoader from "@/components/ui/FullScreenLoader";
import Pagination from "@/components/ui/Pagination";
import SellerOrderTable from "@/features/orders/components/SellerOrderTable";
import { useSellerOrders } from "@/features/orders/hooks/useSellerOrders";

export default function SellerOrdersPage() {
  const { orders, loading, currentPage, setCurrentPage, totalPages, totalOrders } = useSellerOrders();
  return (
    <RoleGuard role="seller">
      <SellerLayout sidebarTitle="Pesanan">
        <div className="min-h-screen bg-zinc-50 p-6">
          <div className="mb-4 flex justify-end">
            <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-4 text-white shadow-lg shadow-green-200/50">
              <p className="text-xs font-semibold tracking-widest text-green-100 uppercase">
                Total Pesanan
              </p>
              <p className="mt-1 text-center text-3xl font-bold">
                {loading ? "-" : totalOrders}
              </p>
            </div>
          </div>

          {loading ? (
            <FullScreenLoader text="Memuat pesanan..." fullScreen={false} />
          ) : orders.length === 0 ? (
            <div className="rounded-2xl bg-white shadow-sm">
              <EmptyState
                icon={<span>📦</span>}
                title="Belum Ada Pesanan"
                description="Pesanan dari pelanggan akan muncul di sini."
              />
            </div>
          ) : (
            <>
              <SellerOrderTable orders={orders} />
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-zinc-600">
                  Total Pesanan :
                  <span className="font-semibold text-green-600">
                    {" "}
                    {totalOrders}
                  </span>
                </p>
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </SellerLayout>
    </RoleGuard>
  );
}
