import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users
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
    name: "Orders",
    href: "/seller/orders",
    icon: Package,
  },
];

export const adminMenus = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users
  },
];