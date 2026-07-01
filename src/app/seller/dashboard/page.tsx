"use client";

import SellerLayout from "@/layouts/sellerlayouts";
import { Package, ShoppingCart, DollarSign, Users } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RoleGuard from "@/components/guards/RoleGuard";
import { useAuth } from "@/context/AuthContext";

type SalesOverview = {
  month: string;
  sales: number;
};

type DashboardData = {
  total_products: number;
  total_orders: number;
  revenue: number;
  total_customers: number;
  completed_orders: number;
  shipped_orders: number;
  processed_orders: number;
  pending_orders: number;
  completed_percentage: number;
  shipped_percentage: number;
  processed_percentage: number;
  pending_percentage: number;
  sales_overview: SalesOverview[];
  growth_percentage: number;
  period: number;
};

type RecentOrder = {
  order_id: number;
  customer: string;
  products: string[];
  subtotal: number;
  status: string;
  status_label: string;
};

export default function SellerDashboard() {
  const [dashboard, setDashboard] = useState<DashboardData>({
    total_products: 0,
    total_orders: 0,
    revenue: 0,
    total_customers: 0,
    sales_overview: [],
    growth_percentage: 0,
    period: 0,
    completed_orders: 0,
    shipped_orders: 0,
    processed_orders: 0,
    pending_orders: 0,
    completed_percentage: 0,
    shipped_percentage: 0,
    processed_percentage: 0,
    pending_percentage: 0,
  });

  const { user, loading } = useAuth();
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const isGrowth = dashboard.growth_percentage >= 0;

  useEffect(() => {
    if (loading) return;
    if (!user || user.role !== "seller") {
      return;
    }
    const fetchDashboard = async () => {
      try {
        const [dashboardResponse, recentOrderResponse] = await Promise.all([
          api.get("/seller/dashboards/"),
          api.get("/seller/recent-orders/"),
        ]);
        setDashboard(dashboardResponse.data);
        setRecentOrders(recentOrderResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDashboard();
  }, [loading, user]);

  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700",
    processed: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    completed: "bg-green-100 text-green-700",
  };

  return (
    <RoleGuard role="seller">
      <SellerLayout sidebarTitle="Dashboard">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500">
                  Total Products
                </p>
                <h2 className="mt-3 text-3xl font-bold text-zinc-800">
                  {dashboard.total_products}
                </h2>
              </div>
              <div className="rounded-xl bg-blue-100 p-3">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500">
                  Total Orders
                </p>
                <h2 className="mt-3 text-3xl font-bold text-zinc-800">
                  {dashboard.total_orders}
                </h2>
              </div>
              <div className="rounded-xl bg-green-100 p-3">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500">Revenue</p>
                <h2 className="mt-3 text-2xl font-bold text-zinc-800">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(dashboard.revenue)}
                </h2>
              </div>
              <div className="rounded-xl bg-yellow-100 p-3">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500">Customers</p>
                <h2 className="mt-3 text-3xl font-bold text-zinc-800">
                  {dashboard.total_customers}
                </h2>
              </div>
              <div className="rounded-xl bg-yellow-100 p-3">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="rounded-3xl bg-white p-7 shadow-lg shadow-green-100/40 xl:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-zinc-800">
                  Sales Overview
                </h2>
                <p className="text-sm text-zinc-500">{dashboard.period}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-zinc-500">Total Revenue</p>
                <h3 className="text-3xl font-bold text-green-600">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(dashboard.revenue)}
                </h3>
                <div className="mt-2 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  {isGrowth ? (
                    <>
                      {" "}
                      naik {dashboard.growth_percentage.toFixed(1)} % dibanding
                      bulan lalu
                    </>
                  ) : (
                    <>
                      {" "}
                      turun {Math.abs(dashboard.growth_percentage).toFixed(1)} %
                      dibanding bulan lalu
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dashboard.sales_overview}>
                  <defs>
                    <linearGradient
                      id="salesGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#71717a" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#71717a" }}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#16a34a"
                    strokeWidth={4}
                    fill="url(#salesGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-green-600 via-emerald-500 to-green-700 p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Order Performance</h2>
              </div>
              <div className="rounded-2xl bg-white/10 px-4 py-2 backdrop-blur">
                <p className="text-xs text-green-100">Total Orders</p>
                <h3 className="text-2xl font-bold">{dashboard.total_orders}</h3>
              </div>
            </div>
            <div className="mt-8 space-y-6">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-green-300"></span>
                    <span className="font-medium">Completed</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {dashboard.completed_orders} Orders
                    </p>
                    <p className="text-xs text-green-100">
                      {dashboard.completed_percentage}%
                    </p>
                  </div>
                </div>

                <div className="h-2 rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-green-300 transition-all duration-500"
                    style={{
                      width: `${dashboard.completed_percentage}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-sky-300"></span>
                    <span className="font-medium">Shipped</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {dashboard.shipped_orders} Orders
                    </p>
                    <p className="text-xs text-green-100">
                      {dashboard.shipped_percentage}%
                    </p>
                  </div>
                </div>

                <div className="h-2 rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-sky-300 transition-all duration-500"
                    style={{
                      width: `${dashboard.shipped_percentage}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-blue-300"></span>
                    <span className="font-medium">Processed</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {dashboard.processed_orders} Orders
                    </p>
                    <p className="text-xs text-green-100">
                      {dashboard.processed_percentage}%
                    </p>
                  </div>
                </div>

                <div className="h-2 rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-blue-300 transition-all duration-500"
                    style={{
                      width: `${dashboard.processed_percentage}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-yellow-300"></span>
                    <span className="font-medium">Pending</span>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      {dashboard.pending_orders} Orders
                    </p>
                    <p className="text-xs text-green-100">
                      {dashboard.pending_percentage}%
                    </p>
                  </div>
                </div>

                <div className="h-2 rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-yellow-300 transition-all duration-500"
                    style={{
                      width: `${dashboard.pending_percentage}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-lg shadow-zinc-200/50">
          <div className="flex items-center justify-between border-b border-zinc-100 bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 px-6 py-5">
            <div>
              <h2 className="text-xl font-bold text-white">Recent Orders</h2>
              <p className="mt-1 text-sm text-green-100">
                Latest transactions from your store
              </p>
            </div>
            <Link
              href="/seller/orders"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-white/20"
            >
              View All
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-50">
                <tr className="text-left text-xs tracking-wider text-zinc-500 uppercase">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.order_id}
                    className="border-b border-zinc-100 transition duration-300 hover:bg-green-50"
                  >
                    <td className="px-6 py-5 font-semibold text-zinc-700">
                      {order.order_id}
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-medium text-zinc-800">
                        {order.customer}
                      </p>
                    </td>
                    <td className="px-6 py-5 text-zinc-600">
                      {order.products.map((product, index) => (
                        <p key={index}>{product}</p>
                      ))}
                    </td>
                    <td className="px-6 py-5 font-semibold text-green-600">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(order.subtotal)}
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-4 py-2 text-xs font-semibold ${
                          statusStyles[
                            order.status as keyof typeof statusStyles
                          ]
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SellerLayout>
    </RoleGuard>
  );
}
