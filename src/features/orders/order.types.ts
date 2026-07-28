export interface SellerOrderItem {
  id: number;
  quantity: number;
}

export interface SellerOrder {
  id: number;
  buyer_name: string;
  seller_name: string;
  status: string;
  subtotal: number;
  created_at: string;
  items: SellerOrderItem[];
}
