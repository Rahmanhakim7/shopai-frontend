"use client";

import {
  Bar,
  BarChart,
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

export default function UserGrowthChart({ dashboard, loading }: Props) {
  const data = dashboard?.user_growth ?? [];

  const totalBuyers = data.reduce((total, item) => total + item.buyers, 0);

  const totalSellers = data.reduce((total, item) => total + item.sellers, 0);

  const latestBuyers = data[data.length - 1]?.buyers ?? 0;
  const latestSellers = data[data.length - 1]?.sellers ?? 0;

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
                  d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div>
              <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
                User Growth
              </h2>

              <p className="mt-1 text-sm leading-5 text-zinc-500">
                Perkembangan pembeli dan penjual selama 7 bulan terakhir
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/70 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/40" />

              <span className="text-xs font-semibold text-emerald-700">
                Buyers
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-zinc-400" />

              <span className="text-xs font-semibold text-zinc-600">
                Sellers
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 divide-x divide-zinc-100 border-b border-zinc-100 pb-5">
          <div className="pr-5">
            <p className="text-xs font-medium tracking-wider text-zinc-400 uppercase">
              Buyers
            </p>

            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-zinc-900">
                {loading ? "..." : formatFullValue(latestBuyers)}
              </span>

              <span className="text-xs font-medium text-zinc-400">
                terakhir
              </span>
            </div>

            <p className="mt-1 text-xs text-zinc-400">
              {loading
                ? "..."
                : `${formatFullValue(totalBuyers)} total periode`}
            </p>
          </div>

          <div className="pl-5">
            <p className="text-xs font-medium tracking-wider text-zinc-400 uppercase">
              Sellers
            </p>

            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-zinc-900">
                {loading ? "..." : formatFullValue(latestSellers)}
              </span>

              <span className="text-xs font-medium text-zinc-400">
                terakhir
              </span>
            </div>

            <p className="mt-1 text-xs text-zinc-400">
              {loading
                ? "..."
                : `${formatFullValue(totalSellers)} total periode`}
            </p>
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
                    d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <p className="mt-3 text-sm font-medium text-zinc-500">
                Belum ada data pengguna
              </p>

              <p className="mt-1 text-xs text-zinc-400">
                Data akan muncul setelah terdapat pengguna.
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 12,
                  right: 8,
                  left: -18,
                  bottom: 0,
                }}
                barGap={7}
              >
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
                    fill: "rgba(16, 185, 129, 0.035)",
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
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                  formatter={(value, name) => [
                    formatFullValue(Number(value)),
                    name === "buyers" ? "Buyers" : "Sellers",
                  ]}
                />

                <Bar
                  dataKey="buyers"
                  name="buyers"
                  fill="#10b981"
                  radius={[7, 7, 2, 2]}
                  maxBarSize={34}
                />

                <Bar
                  dataKey="sellers"
                  name="sellers"
                  fill="#d4d4d8"
                  radius={[7, 7, 2, 2]}
                  maxBarSize={34}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {!loading && data.length > 0 && (
          <div className="mt-2 flex items-center justify-between border-t border-zinc-100 pt-4">
            <p className="text-xs text-zinc-400">
              Data berdasarkan pengguna yang terdaftar
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
