"use client";
import SellerLayout from "@/layouts/sellerlayouts";
import RoleGuard from "@/components/guards/RoleGuard";
import useSellerDashboard from "@/features/seller/dashboard/hooks/useSellerDashboard";
import DashboardStats from "@/features/seller/dashboard/components/DashboardStats";
import SalesOverviewChart from "@/features/seller/dashboard/components/SalesOverviewChart";
import OrderPerformance from "@/features/seller/dashboard/components/OrderPerformance";
import RecentOrdersTable from "@/features/seller/dashboard/components/RecentOrdersTable";

export default function SellerDashboard() {
  const { dashboard, recentOrders, isGrowth } = useSellerDashboard();
  return (
    <RoleGuard role="seller">
      <SellerLayout sidebarTitle="Dashboard">
        <DashboardStats dashboard={dashboard} />
        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <SalesOverviewChart dashboard={dashboard} isGrowth={isGrowth} />
          <OrderPerformance dashboard={dashboard} />
        </div>
        <RecentOrdersTable recentOrders={recentOrders} />
      </SellerLayout>
    </RoleGuard>
  );
}
