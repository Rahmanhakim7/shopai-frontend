"use client";

import {
  Package,
  ShoppingCart,
  Store,
  Users,
} from "lucide-react";

import AdminLayout from "@/layouts/adminlayouts";
import RoleGuard from "@/components/guards/RoleGuard";
import AdminDashboardHero from "@/features/admin/dashboard/AdminDashboardHero";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "1,248",
      description: "All registered users",
      icon: Users,
    },
    {
      title: "Total Sellers",
      value: "128",
      description: "Active sellers",
      icon: Store,
    },
    {
      title: "Total Products",
      value: "3,842",
      description: "Listed products",
      icon: Package,
    },
    {
      title: "Total Orders",
      value: "8,921",
      description: "Marketplace orders",
      icon: ShoppingCart,
    },
  ];

  return (
    <RoleGuard role="admin">
      <AdminLayout sidebarTitle="Dashboard">
        <div className="space-y-8">
          <AdminDashboardHero />
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/5"
                >
                  <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-emerald-50 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-zinc-500">
                          {stat.title}
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900">
                          {stat.value}
                        </h2>
                      </div>

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                        <Icon size={21} strokeWidth={2} />
                      </div>
                    </div>
                    <div className="mt-5 border-t border-zinc-100 pt-4">
                      <p className="text-xs font-medium text-zinc-400">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      </AdminLayout>
    </RoleGuard>
  );
}
