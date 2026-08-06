"use client";

import { Store } from "lucide-react";
import SelectionCheckbox from "./SelectionCheckbox";
import CartItemCard from "./CartItemCard";
import type { CartSeller } from "../cart.types";

type CartSellerCardProps = {
  seller: CartSeller;
  sellerIndex: number;
  selectedItems: number[];
  selectedSellers: number[];

  onToggleSeller: (sellerIndex: number) => void;
  onToggleItem: (cartItemId: number) => void;

  onIncrease: (cartItemId: number, quantity: number) => void;
  onDecrease: (cartItemId: number, quantity: number) => void;

  onRemove: (cartItemId: number) => Promise<void> | void;
};

export default function CartSellerCard({
  seller,
  sellerIndex,
  selectedItems,
  selectedSellers,
  onToggleSeller,
  onToggleItem,
  onIncrease,
  onDecrease,
  onRemove,
}: CartSellerCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-3 bg-green-200/40 px-4 py-3">
        <SelectionCheckbox
          checked={selectedSellers.includes(sellerIndex)}
          onClick={() => onToggleSeller(sellerIndex)}
        />

        <div className="flex items-center gap-2 font-medium text-gray-700">
          <Store className="h-5 w-5 text-green-600" />
          <span>{seller.seller_name}</span>
        </div>
      </div>

      <div className="space-y-2 p-3">
        {seller.items.map((item) => (
          <CartItemCard
            key={item.cart_item_id}
            item={item}
            checked={selectedItems.includes(item.cart_item_id)}
            onToggle={() => onToggleItem(item.cart_item_id)}
            onDecrease={() => onDecrease(item.cart_item_id, item.quantity)}
            onIncrease={() => onIncrease(item.cart_item_id, item.quantity)}
            onRemove={() => onRemove(item.cart_item_id)}
          />
        ))}
      </div>
    </div>
  );
}
