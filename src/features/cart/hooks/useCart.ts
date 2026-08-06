"use client";
import { useCallback, useState } from "react";
import type { CartSeller } from "../cart.types";
import { getCart, removeCartItem, updateCartItemApi } from "../cart.api";

export function useCart() {
  const [cart, setCart] = useState<CartSeller[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchCart = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const sellerGroups = await getCart();
      setCart(sellerGroups);
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateItem = async (
    cartItemId: number,
    quantity: number,
  ): Promise<void> => {
    try {
      await updateCartItemApi(cartItemId, quantity);
      await fetchCart();
    } catch (error) {
      console.error("Failed to update cart item:", error);
    }
  };

  const removeItem = async (cartItemId: number): Promise<void> => {
    try {
      await removeCartItem(cartItemId);
      await fetchCart();
    } catch (error) {
      console.error("Failed to remove cart item:", error);
    }
  };
  
  return {
    cart,
    loading,
    fetchCart,
    updateItem,
    removeItem,
  };
}
