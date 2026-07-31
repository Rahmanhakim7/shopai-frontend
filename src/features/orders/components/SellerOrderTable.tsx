import Link from "next/link";
import SellerStatusBadge from "./SellerStatusBadge";
import type { Order } from "../order.types";
import { formatCurrency, formatDate } from "../order.utils";

type SellerOrderTableProps = {
  orders: Order[];
};

export default function SellerOrderTable({ orders }: SellerOrderTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-md">
      <table className="min-w-full">
        <thead className="bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600">
          <tr>
            <th className="px-6 py-4 text-center text-xs font-bold tracking-wider text-white uppercase">
              Pesanan
            </th>
            <th className="px-6 py-4 text-center text-xs font-bold tracking-wider text-white uppercase">
              Pembeli
            </th>
            <th className="px-6 py-4 text-center text-xs font-bold tracking-wider text-white uppercase">
              Produk
            </th>
            <th className="px-6 py-4 text-center text-xs font-bold tracking-wider text-white uppercase">
              Total
            </th>
            <th className="px-6 py-4 text-center text-xs font-bold tracking-wider text-white uppercase">
              Status
            </th>
            <th className="px-6 py-4 text-center text-xs font-bold tracking-wider text-white uppercase">
              Tanggal
            </th>
            <th className="px-6 py-4 text-center text-xs font-bold tracking-wider text-white uppercase">
              Aksi
            </th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b border-zinc-100 transition-all duration-200 hover:bg-green-50"
            >
              <td className="px-6 py-4 font-semibold text-zinc-900">
                #{order.id}
              </td>

              <td className="px-6 py-4 text-zinc-700">{order.buyer_name}</td>

              <td className="px-6 py-4 text-zinc-700">
                {order.items.length} Produk
              </td>

              <td className="px-6 py-4 font-bold text-emerald-600">
                {formatCurrency(order.subtotal)}
              </td>

              <td className="px-6 py-4">
                <SellerStatusBadge status={order.status} />
              </td>

              <td className="px-6 py-4 text-zinc-500">
                {formatDate(order.created_at)}
              </td>

              <td className="px-6 py-4 text-center">
                <Link
                  href={`/seller/orders/${order.id}`}
                  className="inline-flex items-center rounded-lg border border-green-600 px-4 py-2 text-sm font-semibold text-green-600 transition-all duration-200 hover:bg-green-600 hover:text-white"
                >
                  Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
