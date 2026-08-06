"use client";

import { Store } from "lucide-react";
import type { CheckoutItem } from "../checkout.types";
import { formatCurrency } from "@/utils/currency";
import CheckoutItemCard from "./CheckoutItemCard";
type CheckoutSellerCardProps = {
  sellerName: string;
  items: CheckoutItem[];
};

export default function CheckoutSellerCard({
  sellerName,
  items,
}: CheckoutSellerCardProps) {
  const sellerTotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 px-5 py-4">
        <div className="rounded-xl bg-green-100 p-2">
          <Store className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{sellerName}</h3>
        </div>
      </div>
      <div className="space-y-4 p-4">
        {items.map((item) => (
          <CheckoutItemCard
            key={`${item.product_id}-${item.cart_item_id ?? "buynow"}`}
            item={item}
          />
        ))}
        <div className="rounded-2xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="mt-1 font-semibold text-gray-800">
                Subtotal Seller
              </h4>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-500">Total</p>

              <p className="text-xl font-bold text-green-600">
                {formatCurrency(sellerTotal)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
