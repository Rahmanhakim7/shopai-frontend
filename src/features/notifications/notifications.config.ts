import {
  ShoppingBag,
  CircleDollarSign,
  PackageCheck,
  Truck,
  CircleCheckBig,
  CircleX,
} from "lucide-react";

export const notificationConfig = {
  new_order: {
    icon: ShoppingBag,
    iconClassName: "text-blue-600",
  },

  payment_success: {
    icon: CircleDollarSign,
    iconClassName: "text-emerald-600",
  },

  order_processed: {
    icon: PackageCheck,
    iconClassName: "text-yellow-600",
  },

  order_shipped: {
    icon: Truck,
    iconClassName: "text-indigo-600",
  },

  order_completed: {
    icon: CircleCheckBig,
    iconClassName: "text-green-600",
  },

  order_cancelled: {
    icon: CircleX,
    iconClassName: "text-red-600",
  },
} as const;
