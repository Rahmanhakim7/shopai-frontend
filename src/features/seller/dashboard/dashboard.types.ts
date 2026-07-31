export type SalesOverview = {
  month: string;
  sales: number;
};

export type DashboardData = {
  total_products: number;
  total_orders: number;
  revenue: number;
  total_customers: number;
  completed_orders: number;
  shipped_orders: number;
  processed_orders: number;
  pending_orders: number;
  completed_percentage: number;
  shipped_percentage: number;
  processed_percentage: number;
  pending_percentage: number;
  sales_overview: SalesOverview[];
  growth_percentage: number;
  period: number;
};

export type RecentOrder = {
  order_id: number;
  customer: string;
  products: string[];
  subtotal: number;
  status: string;
  status_label: string;
};

export const initialDashboard: DashboardData = {
  total_products: 0,
  total_orders: 0,
  revenue: 0,
  total_customers: 0,
  completed_orders: 0,
  shipped_orders: 0,
  processed_orders: 0,
  pending_orders: 0,
  completed_percentage: 0,
  shipped_percentage: 0,
  processed_percentage: 0,
  pending_percentage: 0,
  sales_overview: [],
  growth_percentage: 0,
  period: 0,
};
