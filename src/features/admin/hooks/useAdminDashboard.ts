"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export type UserGrowthData = {
  month: string;
  buyers: number;
  sellers: number;
};

export type OrderGrowthData = {
  month: string;
  orders: number;
};

export type AdminDashboardData = {
  total_users: number;
  total_sellers: number;
  total_products: number;
  total_orders: number;
  user_growth: UserGrowthData[];
  order_growth: OrderGrowthData[];
};

export default function useAdminDashboard() {
  const [dashboard, setDashboard] = useState<AdminDashboardData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get<AdminDashboardData>("/admin/dashboard/");

        setDashboard(response.data);
      } catch (err) {
        console.error(err);
        setError("Gagal mengambil data dashboard admin.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return {
    dashboard,
    loading,
    error,
  };
}
