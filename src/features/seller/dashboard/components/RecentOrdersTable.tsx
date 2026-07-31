import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { RecentOrder } from "../dashboard.types";
import { formatCurrency } from "@/utils/currency";
import { sellerStatusConfig } from "@/features/orders/order.config";
type RecentOrdersTableProps = {
  recentOrders: RecentOrder[];
};

export default function RecentOrdersTable({
  recentOrders,
}: RecentOrdersTableProps) {
  return (
    <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-lg shadow-zinc-200/50">
      <div className="flex items-center justify-between border-b border-zinc-100 bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 px-6 py-5">
        <div>
          <h2 className="text-xl font-bold text-white">Pesanan Terbaru</h2>
          <p className="mt-1 text-sm text-green-100">
            Transaksi terbaru dari toko Anda
          </p>
        </div>

        <Link
          href="/seller/orders"
          className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-white/20"
        >
          Lihat Semua
          <ArrowRight size={16} />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-50">
            <tr className="text-left text-xs tracking-wider text-zinc-500 uppercase">
              <th className="px-6 py-4">ID Pesanan</th>
              <th className="px-6 py-4">Pelanggan</th>
              <th className="px-6 py-4">Produk</th>
              <th className="px-6 py-4">Subtotal</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => {
              const status =
                sellerStatusConfig[
                  order.status as keyof typeof sellerStatusConfig
                ];
              return (
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
                    {formatCurrency(order.subtotal)}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-4 py-2 text-xs font-semibold ${status.badgeClassName}`}
                    >
                      {status.text}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
