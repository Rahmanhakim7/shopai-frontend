import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Receipt,
  User,
} from "lucide-react";

export const sellerMenus = [
  {
    name: "Dashboard",
    href: "/seller/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    href: "/seller/products",
    icon: ShoppingBag,
  },
  {
    name: "orders",
    href: "/seller/orders",
    icon: Package,
  },
  {
    name: "transactions",
    href: "/seller/transactions",
    icon: Receipt,
  },
];

export const adminMenus = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    name: "Users",
    href: "/admin/users",
  },
  {
    name: "categories",
    href: "/admin/categories",
  },
];

export const buyerMenus = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Orders",
    href: "/orders",
  },
];
