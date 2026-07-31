"use client";
import SellerLayout from "@/layouts/sellerlayouts";
import { useParams } from "next/navigation";
import RoleGuard from "@/components/guards/RoleGuard";
import { useSellerOrderDetail } from "@/features/orders/hooks/useSellerOrderDetail";
import SellerOrderItems from "@/features/orders/components/SellerOrderItems";
import OrderInfo from "@/features/orders/components/OrderInfo";
import SellerOrderActions from "@/features/orders/components/SellerOrderAction";
import Loader from "@/components/ui/Loader";
import { PackageSearch } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";

export default function SellerOrderDetailPage() {
  const params = useParams();
  const { order, loading, updating, processOrder, shipOrder } =
    useSellerOrderDetail(Number(params.id));

  return (
    <RoleGuard role="seller">
      <SellerLayout sidebarTitle="Detail Pesanan">
        {loading ? (
          <Loader />
        ) : !order ? (
          <EmptyState
            icon={<PackageSearch />}
            title="Pesanan tidak ditemukan"
            description="Pesanan yang Anda cari tidak tersedia atau sudah dihapus."
          />
        ) : (
          <div className="bg-zinc-50 p-6 rounded-lg">
            <div className="grid gap-6 lg:grid-cols-12">
              <SellerOrderItems items={order.items} />

              <div className="space-y-6 lg:col-span-7">
                <OrderInfo order={order} />

                <SellerOrderActions
                  order={order}
                  updating={updating}
                  onProcess={processOrder}
                  onShip={shipOrder}
                />
              </div>
            </div>
          </div>
        )}
      </SellerLayout>
    </RoleGuard>
  );
}
