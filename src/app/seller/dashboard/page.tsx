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

const salesData = [
  { month: "Jan", sales: 2500 },
  { month: "Feb", sales: 3800 },
  { month: "Mar", sales: 4200 },
  { month: "Apr", sales: 3900 },
  { month: "May", sales: 5200 },
  { month: "Jun", sales: 6700 },
];
export default function SellerDashboard() {
  return (
    <SellerLayout sidebarTitle="Seller Dashboard">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">
                Total Products
              </p>
              <h2 className="mt-3 text-3xl font-bold text-zinc-800">120</h2>
            </div>
            <div className="rounded-xl bg-blue-100 p-3">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Total Orders</p>
              <h2 className="mt-3 text-3xl font-bold text-zinc-800">540</h2>
            </div>
            <div className="rounded-xl bg-green-100 p-3">
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Revenue</p>
              <h2 className="mt-3 text-3xl font-bold text-zinc-800">Rp 12M</h2>
            </div>

            <div className="rounded-xl bg-yellow-100 p-3">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Customers</p>
              <h2 className="mt-3 text-3xl font-bold text-zinc-800">320</h2>
            </div>

            <div className="rounded-xl bg-purple-100 p-3">
              <Users className="h-6 w-6 text-purple-600" />
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

              <p className="text-sm text-zinc-500">January 2026 - June 2026</p>
            </div>

            <div className="text-right">
              <p className="text-sm text-zinc-500">Total Revenue</p>

              <h3 className="text-3xl font-bold text-green-600">Rp 12.5M</h3>

              <div className="mt-2 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                ↑ 18.5% dibanding bulan lalu
              </div>
            </div>
          </div>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
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
          <h2 className="text-xl font-bold">Analytics</h2>

          <p className="mt-1 text-sm text-green-100">Order Performance</p>

          <div className="mt-10 text-center">
            <h1 className="text-6xl font-extrabold">80%</h1>

            <p className="mt-2 text-green-100">Completed Orders</p>
          </div>

          <div className="mt-10 space-y-5">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span>Sales</span>
                <span>60%</span>
              </div>

              <div className="h-2 rounded-full bg-white/20">
                <div className="h-2 w-[60%] rounded-full bg-white"></div>
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span>Orders</span>
                <span>25%</span>
              </div>

              <div className="h-2 rounded-full bg-white/20">
                <div className="h-2 w-[25%] rounded-full bg-white"></div>
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span>Returns</span>
                <span>15%</span>
              </div>

              <div className="h-2 rounded-full bg-white/20">
                <div className="h-2 w-[15%] rounded-full bg-white"></div>
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

          <button className="rounded-xl bg-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/30">
            View All
          </button>
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
              <tr className="border-b border-zinc-100 transition duration-300 hover:bg-green-50">
                <td className="px-6 py-5 font-semibold text-zinc-700">#1024</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                      R
                    </div>
                    <div>
                      <p className="font-medium text-zinc-800">Rahman</p>
                      <p className="text-xs text-zinc-500">Premium Customer</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-zinc-600">Gaming Mouse</td>
                <td className="px-6 py-5 font-semibold text-green-600">
                  Rp 250.000
                </td>
                <td className="px-6 py-5">
                  <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-semibold text-green-700">
                    Completed
                  </span>
                </td>
              </tr>

              <tr className="border-t transition duration-300 hover:bg-yellow-50">
                <td className="px-6 py-5 font-semibold text-zinc-700">#1025</td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 font-bold text-yellow-700">
                      B
                    </div>

                    <div>
                      <p className="font-medium text-zinc-800">Budi</p>
                      <p className="text-xs text-zinc-500">Regular Customer</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5 text-zinc-600">Mechanical Keyboard</td>

                <td className="px-6 py-5 font-semibold text-yellow-600">
                  Rp 850.000
                </td>

                <td className="px-6 py-5">
                  <span className="rounded-full bg-yellow-100 px-4 py-2 text-xs font-semibold text-yellow-700">
                    Pending
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </SellerLayout>
  );
}
