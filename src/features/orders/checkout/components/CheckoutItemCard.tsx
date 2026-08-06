"use client";

import Image from "next/image";
import { Package } from "lucide-react";

import type { CheckoutItem } from "../checkout.types";
import { formatCurrency } from "@/utils/currency";
import { getImageUrl } from "@/utils/image";

type CheckoutItemCardProps = {
  item: CheckoutItem;
};

export default function CheckoutItemCard({ item }: CheckoutItemCardProps) {
  return (
    <div className="mb-2 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center gap-4">
        <Image
          src={getImageUrl(item.image)}
          alt={item.name}
          width={80}
          height={80}
          className="rounded-xl border border-gray-200 object-cover"
          unoptimized
        />

        <div className="flex flex-1 flex-col">
          <h3 className="line-clamp-2 text-base font-semibold text-gray-800">
            {item.name}
          </h3>

          <p className="mt-1 text-sm font-medium text-gray-500">
            {formatCurrency(item.price)}
          </p>

          <div className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
            <Package className="h-4 w-4" />
            <span>Qty {item.quantity}</span>
          </div>
        </div>

        <div className="rounded-xl bg-green-50 px-4 py-3 text-right">
          <p className="text-xs text-gray-500">Subtotal</p>

          <p className="text-lg font-bold text-green-600">
            {formatCurrency(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}
