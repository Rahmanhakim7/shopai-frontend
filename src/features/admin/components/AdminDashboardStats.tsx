"use client";

import {
  Package,
  ShoppingCart,
  Store,
  Users,
  type LucideIcon,
} from "lucide-react";

import { AdminDashboardData } from "../hooks/useAdminDashboard";

type Stat = {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
};

type Props = {
  dashboard: AdminDashboardData | null;
  loading: boolean;
};

export default function AdminDashboardStats({ dashboard, loading }: Props) {
  const stats: Stat[] = [
    {
      title: "Total Users",
      value: dashboard?.total_users ?? 0,
      description: "All registered users",
      icon: Users,
    },
    {
      title: "Total Sellers",
      value: dashboard?.total_sellers ?? 0,
      description: "Active sellers",
      icon: Store,
    },
    {
      title: "Total Products",
      value: dashboard?.total_products ?? 0,
      description: "Listed products",
      icon: Package,
    },
    {
      title: "Total Orders",
      value: dashboard?.total_orders ?? 0,
      description: "Marketplace orders",
      icon: ShoppingCart,
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="group relative h-[178px] min-w-0 overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/[0.05]"
          >
            <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-emerald-500/[0.06] blur-3xl transition-all duration-500 group-hover:bg-emerald-500/[0.1]" />

            <div className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-emerald-500 transition-all duration-500 group-hover:w-full" />

            <div className="relative flex h-full flex-col justify-between p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold tracking-[0.08em] text-zinc-400 uppercase">
                    {stat.title}
                  </p>

                  <div className="mt-3 flex h-10 items-center">
                    <h2 className="text-[30px] leading-none font-bold tracking-[-0.04em] whitespace-nowrap text-zinc-900">
                      {loading ? "..." : stat.value.toLocaleString("id-ID")}
                    </h2>
                  </div>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white group-hover:ring-emerald-600">
                  <Icon size={20} strokeWidth={1.9} />
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-zinc-100 pt-3.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />

                <p className="truncate text-xs font-medium text-zinc-400">
                  {stat.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
