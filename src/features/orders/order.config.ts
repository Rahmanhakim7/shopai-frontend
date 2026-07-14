import { Clock3, Package, Truck, CircleCheckBig, XCircle } from "lucide-react";

export const sellerStatusConfig = {
  pending: {
    text: "Menunggu Diproses",
    icon: Clock3,
    iconClassName: "h-4 w-4",
    badgeClassName: "bg-yellow-100 text-yellow-700",
  },
  processed: {
    text: "Sedang Diproses",
    icon: Package,
    iconClassName: "h-5 w-5",
    badgeClassName: "bg-blue-100 text-blue-700",
  },
  shipped: {
    text: "Sedang Dikirim",
    icon: Truck,
    iconClassName: "h-5 w-5",
    badgeClassName: "bg-purple-100 text-purple-700",
  },
  completed: {
    text: "Selesai",
    icon: CircleCheckBig,
    iconClassName: "h-5 w-5",
    badgeClassName: "bg-green-100 text-green-700",
  },
  cancelled: {
    text: "Pesanan Dibatalkan",
    icon: XCircle,
    iconClassName: "h-5 w-5",
    badgeClassName: "bg-red-100 text-red-700",
  },
} as const;

export const paymentStatusConfig = {
  pending: {
    text: "Menunggu Pembayaran",
    color: "bg-yellow-500",
    className: "bg-yellow-100 text-yellow-700",
  },
  paid: {
    text: "Sudah Dibayar",
    color: "bg-green-500",
    className: "bg-green-100 text-green-700",
  },
  failed: {
    text: "Pembayaran Gagal",
    color: "bg-red-500",
    className: "bg-red-100 text-red-700",
  },
  expired: {
    text: "Pembayaran Kedaluwarsa",
    color: "bg-gray-400",
    className: "bg-gray-100 text-gray-700",
  },
  cancelled: {
    text: "Pembayaran Dibatalkan",
    color: "bg-red-500",
    className: "bg-red-100 text-red-700",
  },
} as const;
