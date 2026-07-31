import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import StatsCard from "./StatsCard";
import { DashboardData } from  "../dashboard.types";
import { formatCurrency } from "@/utils/currency";

type DashboardStatsProps = {
  dashboard: DashboardData;
};

export default function DashboardStats({ dashboard }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Produk"
        value={dashboard.total_products}
        icon={Package}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
      />

      <StatsCard
        title="Total Pesanan"
        value={dashboard.total_orders}
        icon={ShoppingCart}
        iconBgColor="bg-green-100"
        iconColor="text-green-600"
      />

      <StatsCard
        title="Pendapatan"
        value={formatCurrency(dashboard.revenue)}
        icon={DollarSign}
        iconBgColor="bg-yellow-100"
        iconColor="text-yellow-600"
      />

      <StatsCard
        title="Pelanggan"
        value={dashboard.total_customers}
        icon={Users}
        iconBgColor="bg-purple-100"
        iconColor="text-purple-600"
      />
    </div>
  );
}
