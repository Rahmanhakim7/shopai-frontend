import { Order } from "../order.types";
import PaymentStatusBadge from "./PaymentStatusBadge";
import SellerStatusBadge from "./SellerStatusBadge";

type Props = {
  order: Order;
};

export default function OrderInfo({ order }: Props) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-bold text-zinc-900">
        Informasi Pesanan
      </h2>

      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        <div className="space-y-6">
          <div>
            <p className="text-sm text-zinc-500">Pembeli</p>
            <p className="mt-1 font-semibold text-zinc-900">
              {order.buyer_name}
            </p>
          </div>

          <div>
            <p className="text-sm text-zinc-500">Status Pembayaran</p>

            <div className="mt-2">
              <PaymentStatusBadge status={order.payment_status} />
            </div>
          </div>

          <div>
            <p className="text-sm text-zinc-500">Status Pesanan</p>

            <div className="mt-2">
              <SellerStatusBadge status={order.status} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-zinc-500">Tanggal</p>

            <p className="mt-1 font-medium text-zinc-900">
              {formatDate(order.created_at)}
            </p>
          </div>

          <div>
            <p className="text-sm text-zinc-500">Total</p>

            <p className="mt-1 text-2xl font-bold text-green-600">
              {formatCurrency(order.subtotal)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
