export interface OrderItem {
  id: number;
  product: number;
  product_name: string;
  product_image: string | null;
  quantity: number;
  price: number;
  subtotal: number;
  has_review: boolean;
  review_rating: number | null;
}

export interface SellerOrder {
  id: number;
  seller_name: string;
  status: string;
  subtotal: number;
  items: OrderItem[];
}

export interface Order {
  id: number;
  total_amount: number;
  payment_status: string;
  created_at: string;
  seller_orders: SellerOrder[];
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface CheckoutItem {
  product_id: number;
  quantity: number;
  name: string;
  price: number;
  image: string | null;
  seller_name: string;
}
