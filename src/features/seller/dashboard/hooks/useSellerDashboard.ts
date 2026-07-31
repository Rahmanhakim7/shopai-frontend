import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getDashboard, getRecentOrders } from "../dashboard.api";
import {
  initialDashboard,
  type DashboardData,
  type RecentOrder,
} from "../dashboard.types";

export default function useSellerDashboard() {
  const { user, loading } = useAuth();
  const [dashboard, setDashboard] = useState<DashboardData>(initialDashboard);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  useEffect(() => {
    if (loading) return;
    if (!user || user.role !== "seller") {
      return;
    }

    const fetchDashboard = async () => {
      try {
        const [dashboardData, recentOrdersData] = await Promise.all([
          getDashboard(),
          getRecentOrders(),
        ]);
        setDashboard(dashboardData);
        setRecentOrders(recentOrdersData);
      } catch (error) {
        console.error("Failed to fetch dashboard", error);
      }
    };
    fetchDashboard();
  }, [loading, user]);
  
  const isGrowth = dashboard.growth_percentage >= 0;
  return {
    dashboard,
    recentOrders,
    isGrowth,
  };
}
