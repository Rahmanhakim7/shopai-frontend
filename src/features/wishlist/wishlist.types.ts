export interface WishlistItem {
  id: number;
  product_id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  seller_name: string;
}

export interface WishlistResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: WishlistItem[];
}