export interface CartItem {
  cart_item_id: number;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
  subtotal: number;
}

export interface CartSeller {
  seller_id: number;
  seller_name: string;
  items: CartItem[];
  seller_total: number;
}