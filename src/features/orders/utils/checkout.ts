import { Product } from "@/types/product";
import { CheckoutItem } from "../order.types";

export const createCheckoutItem = (product: Product): CheckoutItem => ({
  product_id: product.id,
  quantity: 1,
  name: product.name,
  price: product.price,
  image: product.image,
  seller_name: product.seller_name ?? "",
});

export const saveCheckoutData = (items: CheckoutItem[]) => {
  localStorage.setItem("checkout_data", JSON.stringify(items));
};
