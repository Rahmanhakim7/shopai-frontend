export interface CheckoutItem {
  product_id: number;
  quantity: number;
  name: string;
  price: number;
  image: string | null;
  seller_name: string;
  cart_item_id?: number;
}

export type CheckoutGroup = Record<string, CheckoutItem[]>;
