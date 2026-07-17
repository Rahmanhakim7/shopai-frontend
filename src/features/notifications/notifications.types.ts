export type NotificationType =
  | "new_order"
  | "payment_success"
  | "order_processed"
  | "order_shipped"
  | "order_completed"
  | "order_cancelled";

export interface Notification {
  id: number;
  order: number | null;
  seller_order: number | null;
  notification_type: NotificationType;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface NotificationResponse {
  unread_count: number;
  notifications: Notification[];
}
