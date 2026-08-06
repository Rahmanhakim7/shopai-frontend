"use client";

import { CreditCard, Package, Wallet } from "lucide-react";
import Button from "@/components/ui/Button";
import { formatCurrency } from "@/utils/currency";

type CheckoutSummaryProps = {
  totalItems: number;
  grandTotal: number;
  submitting: boolean;
  onCheckout: () => void;
};

export default function CheckoutSummary({
  totalItems,
  grandTotal,
  submitting,
  onCheckout,
}: CheckoutSummaryProps) {
  return (
    <div className="sticky top-6 h-fit overflow-hidden rounded-3xl bg-white shadow-lg">
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-5 text-white">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white/20 p-2">
            <CreditCard className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Ringkasan Pesanan</h2>
            <p className="text-sm text-green-100">
              Pastikan pesanan sudah sesuai.
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-5 p-5">
        <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-2">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <span className="font-medium text-gray-700">Total Item</span>
          </div>
          <span className="text-lg font-bold text-gray-800">{totalItems}</span>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-yellow-100 p-2">
              <Wallet className="h-5 w-5 text-yellow-600" />
            </div>
            <span className="font-medium text-gray-700">Total Belanja</span>
          </div>
          <span className="font-semibold text-gray-800">
            {formatCurrency(grandTotal)}
          </span>
        </div>
        <div className="rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mt-1 text-base font-semibold text-gray-800">
                Total Pembayaran
              </h3>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(grandTotal)}
            </p>
          </div>
        </div>
        <Button
          variant="success"
          className="h-12 w-full rounded-xl text-base font-semibold shadow-md transition hover:shadow-lg"
          onClick={onCheckout}
          disabled={submitting}
        >
          {submitting ? "Memproses..." : "Buat Pesanan"}
        </Button>
      </div>
    </div>
  );
}
