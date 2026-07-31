import type { DashboardData } from "../dashboard.types";

type OrderPerformanceProps = {
  dashboard: DashboardData;
};

export default function OrderPerformance({ dashboard }: OrderPerformanceProps) {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-green-600 via-emerald-500 to-green-700 p-6 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Performa Pesanan</h2>
        </div>

        <div className="rounded-2xl bg-white/10 px-4 py-2 backdrop-blur">
          <p className="text-xs text-green-100">Total Pesanan</p>

          <h3 className="text-2xl font-bold">{dashboard.total_orders}</h3>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <PerformanceItem
          label="Selesai"
          count={dashboard.completed_orders}
          percentage={dashboard.completed_percentage}
          color="bg-green-300"
        />

        <PerformanceItem
          label="Dikirim"
          count={dashboard.shipped_orders}
          percentage={dashboard.shipped_percentage}
          color="bg-sky-300"
        />

        <PerformanceItem
          label="Diproses"
          count={dashboard.processed_orders}
          percentage={dashboard.processed_percentage}
          color="bg-blue-300"
        />

        <PerformanceItem
          label="Menunggu"
          count={dashboard.pending_orders}
          percentage={dashboard.pending_percentage}
          color="bg-yellow-300"
        />
      </div>
    </div>
  );
}

type PerformanceItemProps = {
  label: string;
  count: number;
  percentage: number;
  color: string;
};

function PerformanceItem({
  label,
  count,
  percentage,
  color,
}: PerformanceItemProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${color}`} />

          <span className="font-medium">{label}</span>
        </div>

        <div className="text-right">
          <p className="font-semibold">{count} Pesanan</p>

          <p className="text-xs text-green-100">{percentage}%</p>
        </div>
      </div>

      <div className="h-2 rounded-full bg-white/20">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}
