import type { CheckoutItem } from "../checkout/checkout.types";

const STORAGE_KEY = "checkout_data";
export function getCheckoutData(): CheckoutItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
export function clearCheckoutData() {
  localStorage.removeItem(STORAGE_KEY);
}
