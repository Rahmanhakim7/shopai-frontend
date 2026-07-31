// SellerOrderActions.tsx

import { Order } from "../order.types";

type Props = {
  order: Order;
  updating: boolean;
  onProcess: () => void;
  onShip: () => void;
};

export default function SellerOrderActions({
  order,
  updating,
  onProcess,
  onShip,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-bold text-zinc-900">
        Aksi Pesanan
      </h2>

      {order.payment_status !== "paid" && (
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
          <p className="font-semibold text-yellow-700">
            Menunggu Pembayaran
          </p>

          <p className="mt-1 text-sm text-yellow-600">
            Seller belum dapat memproses pesanan sebelum pembayaran berhasil.
          </p>
        </div>
      )}

      {order.payment_status === "paid" &&
        order.status === "pending" && (
          <button
            onClick={onProcess}
            disabled={updating}
            className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-300"
          >
            {updating ? "Memproses..." : "Proses Pesanan"}
          </button>
        )}

      {order.status === "processed" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="font-semibold text-blue-700">
              Pesanan Siap Dikirim
            </p>

            <p className="mt-1 text-sm text-blue-600">
              Produk sudah selesai diproses. Silakan kirim pesanan kepada
              pembeli.
            </p>
          </div>

          <button
            onClick={onShip}
            disabled={updating}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {updating ? "Mengirim..." : "Kirim Pesanan"}
          </button>
        </div>
      )}

      {order.status === "shipped" && (
        <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
          <p className="font-semibold text-purple-700">
            Pesanan Sedang Dikirim
          </p>

          <p className="mt-1 text-sm text-purple-600">
            Menunggu pembeli mengonfirmasi bahwa pesanan telah diterima.
          </p>
        </div>
      )}

      {order.status === "completed" && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
          <p className="font-semibold text-green-700">
            Pesanan Selesai
          </p>

          <p className="mt-1 text-sm text-green-600">
            Transaksi telah selesai.
          </p>
        </div>
      )}
    </div>
  );
}