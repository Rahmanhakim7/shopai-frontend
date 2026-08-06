"use client";

import BuyerLayout from "@/layouts/buyerlayouts";
import RoleGuard from "@/components/guards/RoleGuard";
import { useCheckout } from "@/features/orders/checkout/hooks/useCheckout";
import CheckoutSellerCard from "@/features/orders/checkout/components/CheckoutSellerCard";
import CheckoutSummary from "@/features/orders/checkout/components/CheckoutSummary";
import { ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  const {
    loading,
    submitting,
    groupedItems,
    grandTotal,
    totalItems,
    handleCreateOrder,
  } = useCheckout();

  if (loading) {
    return (
      <RoleGuard role="buyer">
        <BuyerLayout>
          <div className="flex min-h-[70vh] items-center justify-center">
            <p>Loading...</p>
          </div>
        </BuyerLayout>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard role="buyer">
      <BuyerLayout>
        <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-green-600 to-lime-500 shadow-xl">
              <div className="flex items-center justify-between p-8">
                <div className="flex items-center gap-5">
                  <div className="rounded-2xl bg-white/20 p-4 backdrop-blur">
                    <ShoppingBag className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white">Checkout</h1>
                    <p className="mt-2 text-sm text-green-100">
                      Pastikan semua produk sudah benar sebelum membuat pesanan.
                    </p>
                  </div>
                </div>
                <div className="hidden rounded-2xl bg-white/10 px-5 py-4 text-right backdrop-blur lg:block">
                  <p className="text-sm text-green-100">Total Produk</p>
                  <p className="mt-1 text-3xl font-bold text-white">
                    {totalItems}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                {Object.entries(groupedItems).map(([sellerName, items]) => (
                  <CheckoutSellerCard
                    key={sellerName}
                    sellerName={sellerName}
                    items={items}
                  />
                ))}
              </div>
              <CheckoutSummary
                totalItems={totalItems}
                grandTotal={grandTotal}
                submitting={submitting}
                onCheckout={handleCreateOrder}
              />
            </div>
          </div>
        </div>
      </BuyerLayout>
    </RoleGuard>
  );
}
