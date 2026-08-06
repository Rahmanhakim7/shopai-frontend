"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import SelectionCheckbox from "./SelectionCheckbox";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "@/utils/currency";
import { getImageUrl } from "@/utils/image";
import type { CartItem } from "../cart.types";

type CartItemCardProps = {
  item: CartItem;
  checked: boolean;
  onToggle: () => void;
  onDecrease: () => void;
  onIncrease: () => void;
  onRemove: () => void;
};

export default function CartItemCard({
  item,
  checked,
  onToggle,
  onDecrease,
  onIncrease,
  onRemove,
}: CartItemCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-50 bg-white p-4 shadow-sm">
      <SelectionCheckbox checked={checked} onClick={onToggle} />

      <Image
        src={getImageUrl(item.image)}
        alt={item.name}
        width={64}
        height={64}
        className="rounded object-cover"
        unoptimized
      />

      <div className="flex-1">
        <p className="font-medium">{item.name}</p>

        <p className="text-sm text-gray-500">{formatCurrency(item.price)}</p>

        <div className="mt-2 flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="h-8 w-8 p-0"
            disabled={item.quantity <= 1}
            onClick={onDecrease}
          >
            <Minus className="mx-auto h-4 w-4" />
          </Button>

          <span className="min-w-[30px] text-center font-medium">
            {item.quantity}
          </span>

          <Button
            variant="secondary"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onIncrease}
          >
            <Plus className="mx-auto h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="ml-auto flex min-w-[120px] flex-col items-end">
        <div className="text-lg font-semibold text-green-600">
          {formatCurrency(item.subtotal)}
        </div>

        <Button variant="danger" size="sm" className="mt-2" onClick={onRemove}>
          <Trash2 className="mr-1 h-4 w-4" />
          Hapus
        </Button>
      </div>
    </div>
  );
}
