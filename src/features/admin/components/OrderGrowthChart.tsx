"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AdminDashboardData } from "../hooks/useAdminDashboard";

type Props = {
  dashboard: AdminDashboardData | null;
  loading: boolean;
};

const formatCompactValue = (value: number) => {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }

  return value.toString();
};

const formatFullValue = (value: number) => {
  return value.toLocaleString("id-ID");
};

export default function OrderGrowthChart({ dashboard, loading }: Props) {
  const data = dashboard?.order_growth ?? [];

  const totalOrders = data.reduce((total, item) => total + item.orders, 0);

  const latestOrders = data[data.length - 1]?.orders ?? 0;
  const previousOrders = data[data.length - 2]?.orders ?? 0;

  const growth =
    previousOrders > 0
      ? ((latestOrders - previousOrders) / previousOrders) * 100
      : 0;

  return (
    <section className="group relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-emerald-200/80 hover:shadow-xl hover:shadow-emerald-950/[0.04]">
      <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-emerald-500/[0.06] blur-3xl transition-all duration-500 group-hover:bg-emerald-500/[0.1]" />

      <div className="relative">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  d="M4 19V5M4 19h16M7 15l3-4 3 2 5-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div>
              <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
                Order Growth
              </h2>

              <p className="mt-1 text-sm leading-5 text-zinc-500">
                Perkembangan jumlah order selama 7 bulan terakhir
              </p>
            </div>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/70 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/40" />
            <span className="text-xs font-semibold text-emerald-700">
              Orders
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-4 border-b border-zinc-100 pb-5">
          <div>
            <p className="text-xs font-medium tracking-wider text-zinc-400 uppercase">
              Total Periode
            </p>

            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-zinc-900">
                {loading ? "..." : formatFullValue(totalOrders)}
              </span>

              <span className="text-xs font-medium text-zinc-400">orders</span>
            </div>
          </div>

          <div className="h-9 w-px bg-zinc-100" />

          <div>
            <p className="text-xs font-medium tracking-wider text-zinc-400 uppercase">
              Bulan Terakhir
            </p>

            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-zinc-900">
                {loading ? "..." : formatFullValue(latestOrders)}
              </span>

              <span
                className={`text-xs font-semibold ${
                  growth >= 0 ? "text-emerald-600" : "text-red-500"
                }`}
              >
                {loading
                  ? "..."
                  : `${growth >= 0 ? "+" : ""}${growth.toFixed(1)}%`}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 h-[300px] w-full sm:h-[320px]">
          {loading ? (
            <div className="flex h-full flex-col items-center justify-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-200 border-t-emerald-500" />

              <span className="text-xs font-medium text-zinc-400">
                Memuat data...
              </span>
            </div>
          ) : data.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-50 text-zinc-300">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path
                    d="M4 19V5M4 19h16M7 15l3-4 3 2 5-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <p className="mt-3 text-sm font-medium text-zinc-500">
                Belum ada data order
              </p>

              <p className="mt-1 text-xs text-zinc-400">
                Data akan muncul setelah terdapat order.
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{
                  top: 12,
                  right: 8,
                  left: -18,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="orderGrowthPremiumGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.22} />

                    <stop offset="65%" stopColor="#10b981" stopOpacity={0.07} />

                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  stroke="#f4f4f5"
                  strokeDasharray="4 5"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#a1a1aa",
                    fontSize: 11,
                    fontWeight: 500,
                  }}
                  dy={12}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#a1a1aa",
                    fontSize: 11,
                    fontWeight: 500,
                  }}
                  tickFormatter={(value) => formatCompactValue(Number(value))}
                  width={45}
                />

                <Tooltip
                  cursor={{
                    stroke: "#d4d4d8",
                    strokeWidth: 1,
                    strokeDasharray: "4 4",
                  }}
                  contentStyle={{
                    borderRadius: "16px",
                    border: "1px solid #e4e4e7",
                    backgroundColor: "rgba(255, 255, 255, 0.96)",
                    boxShadow: "0 18px 45px rgba(24, 24, 27, 0.10)",
                    padding: "12px 14px",
                  }}
                  labelStyle={{
                    color: "#18181b",
                    fontSize: 12,
                    fontWeight: 700,
                    marginBottom: 7,
                  }}
                  itemStyle={{
                    color: "#059669",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                  formatter={(value) => [
                    formatFullValue(Number(value)),
                    "Orders",
                  ]}
                />

                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#orderGrowthPremiumGradient)"
                  activeDot={{
                    r: 7,
                    strokeWidth: 3,
                    stroke: "#ffffff",
                    fill: "#10b981",
                  }}
                  dot={{
                    r: 3.5,
                    fill: "#ffffff",
                    stroke: "#10b981",
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {!loading && data.length > 0 && (
          <div className="mt-2 flex items-center justify-between border-t border-zinc-100 pt-4">
            <p className="text-xs text-zinc-400">
              Data berdasarkan order yang tercatat
            </p>

            <p className="text-xs font-medium text-zinc-500">
              {data.length} bulan
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
