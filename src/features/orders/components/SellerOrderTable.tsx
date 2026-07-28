import Link from "next/link";
import SellerStatusBadge from "./SellerStatusBadge";
import type { SellerOrder } from "../order.types";
import { formatCurrency, formatDate } from "../order.utils";

type SellerOrderTableProps = {
  orders: SellerOrder[];
};

export default function SellerOrderTable({ orders }: SellerOrderTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-zinc-100">
            <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-600">
              Order
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-600">
              Pembeli
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-600">
              Produk
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-600">
              Total
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-600">
              Status
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-600">
              Tanggal
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-zinc-600">
              Aksi
            </th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b border-zinc-100 transition hover:bg-zinc-50"
            >
              <td className="px-6 py-4 font-semibold text-zinc-900">
                #{order.id}
              </td>

              <td className="px-6 py-4 text-zinc-700">{order.buyer_name}</td>

              <td className="px-6 py-4 text-zinc-700">
                {order.items.length} Produk
              </td>

              <td className="px-6 py-4 font-semibold text-green-600">
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
                  className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-green-700"
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
