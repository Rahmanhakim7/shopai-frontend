"use client";

import { useMemo, useState } from "react";
import type { CartSeller } from "../cart.types";

export function useCartSelection(cart: CartSeller[]) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const selectAll = useMemo(() => {
    return (
      cart.length > 0 &&
      cart
        .flatMap((seller) => seller.items.map((item) => item.cart_item_id))
        .every((id) => selectedItems.includes(id))
    );
  }, [cart, selectedItems]);

  const selectedSellers = useMemo(() => {
    return cart.reduce<number[]>((acc, seller, index) => {
      const ids = seller.items.map((item) => item.cart_item_id);

      if (ids.length > 0 && ids.every((id) => selectedItems.includes(id))) {
        acc.push(index);
      }

      return acc;
    }, []);
  }, [cart, selectedItems]);

  const grandTotal = useMemo(() => {
    return cart.reduce((total, seller) => {
      return (
        total +
        seller.items.reduce((subtotal, item) => {
          if (!selectedItems.includes(item.cart_item_id)) {
            return subtotal;
          }

          return subtotal + item.subtotal;
        }, 0)
      );
    }, 0);
  }, [cart, selectedItems]);

  const toggleItem = (id: number): void => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  const toggleSeller = (sellerIndex: number): void => {
    const seller = cart[sellerIndex];

    const ids = seller.items.map((item) => item.cart_item_id);

    const isSelected =
      ids.length > 0 && ids.every((id) => selectedItems.includes(id));

    if (isSelected) {
      setSelectedItems((prev) => prev.filter((id) => !ids.includes(id)));
    } else {
      setSelectedItems((prev) => [...new Set([...prev, ...ids])]);
    }
  };

  const toggleAll = (): void => {
    if (selectAll) {
      setSelectedItems([]);
      return;
    }

    const ids = cart.flatMap((seller) =>
      seller.items.map((item) => item.cart_item_id),
    );

    setSelectedItems(ids);
  };

  return {
    selectedItems,
    setSelectedItems,
    selectAll,
    selectedSellers,
    grandTotal,
    toggleItem,
    toggleSeller,
    toggleAll,
  };
}
