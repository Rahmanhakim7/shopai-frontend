import Link from "next/link";
import PaymentStatusBadge from "@/features/orders/components/PaymentStatusBadge";
import SellerStatusBadge from "@/features/orders/components/SellerStatusBadge";
import PayButton from "@/components/payments/PayButton";
import type { Order } from "../order.types";

interface OrderCardProps {
  order: Order;
  onPaymentSuccess: () => Promise<void>;
}

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(n);

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function OrderCard({ order, onPaymentSuccess }: OrderCardProps) {
  const totalProducts = order.seller_orders.reduce(
    (acc, seller) => acc + seller.items.length,
    0,
  );

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-green-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg lg:flex-row lg:justify-between">
      <div className="flex-1">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-bold">Order #{order.id}</h2>

            <p className="text-sm text-gray-500">
              {formatDate(order.created_at)}
            </p>

            <div className="mt-2">
              <PaymentStatusBadge status={order.payment_status} />
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">{totalProducts} produk</div>

        <div className="mt-2 text-lg font-bold text-green-600">
          {formatCurrency(order.total_amount)}
        </div>

        <div className="mt-4 flex flex-wrap gap-1">
          <Link
            href={`/orders/${order.id}`}
            className="rounded-lg bg-green-600 px-4 py-1 font-semibold text-white transition-colors hover:bg-green-700"
          >
            Lihat Detail
          </Link>

          {order.payment_status === "pending" && (
            <PayButton
              orderId={order.id}
              onPaymentSuccess={onPaymentSuccess}
              className="min-w-[140px] !bg-green-600 !px-4 !py-1 !text-white hover:!bg-green-700"
            />
          )}
        </div>
      </div>

      <div className="flex flex-col flex-wrap gap-2">
        {order.seller_orders.map((sellerOrder) => (
          <div
            key={sellerOrder.id}
            className="rounded-lg border border-zinc-200 p-3"
          >
            <p className="text-sm font-semibold text-zinc-900">
              {sellerOrder.seller_name}
            </p>

            <div className="mt-2">
              <SellerStatusBadge status={sellerOrder.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
