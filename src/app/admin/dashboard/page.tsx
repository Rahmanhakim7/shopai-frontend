"use client";

import AdminLayout from "@/layouts/adminlayouts";
import RoleGuard from "@/components/guards/RoleGuard";
import AdminDashboardHero from "@/features/admin/components/AdminDashboardHero";
import AdminDashboardStats from "@/features/admin/components/AdminDashboardStats";
import UserGrowthChart from "@/features/admin/components/UserGrowthChart";
import useAdminDashboard from "@/features/admin/hooks/useAdminDashboard";
import OrderGrowthChart from "@/features/admin/components/OrderGrowthChart";

export default function AdminDashboard() {
  const { dashboard, loading, error } = useAdminDashboard();
  return (
    <RoleGuard role="admin">
      <AdminLayout sidebarTitle="Dashboard">
        <div className="space-y-8">
          <AdminDashboardHero />

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <AdminDashboardStats dashboard={dashboard} loading={loading} />
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <UserGrowthChart dashboard={dashboard} loading={loading} />
            <OrderGrowthChart dashboard={dashboard} loading={loading} />
          </div>
        </div>
      </AdminLayout>
    </RoleGuard>
  );
}
