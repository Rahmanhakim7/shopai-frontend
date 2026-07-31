import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { DashboardData } from "../dashboard.types";
import { formatCurrency } from "@/utils/currency";

type SalesOverviewChartProps = {
  dashboard: DashboardData;
  isGrowth: boolean;
};

export default function SalesOverviewChart({
  dashboard,
  isGrowth,
}: SalesOverviewChartProps) {
  return (
    <div className="rounded-3xl bg-white p-7 shadow-lg shadow-green-100/40 xl:col-span-2">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-800">
            Ringkasan Penjualan
          </h2>

          <p className="text-sm text-zinc-500">{dashboard.period}</p>
        </div>

        <div className="text-right">
          <p className="text-sm text-zinc-500">Total Pendapatan</p>

          <h3 className="text-3xl font-bold text-green-600">
            {formatCurrency(dashboard.revenue)}
          </h3>

          <div className="mt-2 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            {isGrowth ? (
              <>
                Naik {dashboard.growth_percentage.toFixed(1)}% dibanding bulan
                lalu
              </>
            ) : (
              <>
                Turun {Math.abs(dashboard.growth_percentage).toFixed(1)}%
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
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
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
  );
}
