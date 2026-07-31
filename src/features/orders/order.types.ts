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

export interface Order {
  id: number;
  buyer_name: string;
  seller_name: string;
  payment_status: string;
  status: string;
  subtotal: number;
  created_at: string;
  items: OrderItem[];
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
