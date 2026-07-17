"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { notificationConfig } from "../notifications.config";
import { markNotificationRead } from "../notifications.api";
import type { Notification } from "../notifications.types";

interface NotificationItemProps {
  notification: Notification;
}

export default function NotificationItem({
  notification,
}: NotificationItemProps) {
  const router = useRouter();
  const { user } = useAuth();

  const config =
    notificationConfig[
      notification.notification_type as keyof typeof notificationConfig
    ];

  const Icon = config.icon;

  const href =
    user?.role === "seller"
      ? `/seller/orders/${notification.seller_order}`
      : `/orders/${notification.order}`;

  async function handleClick() {
    try {
      if (!notification.is_read) {
        await markNotificationRead(notification.id);
      }

      router.push(href);
    } catch (error) {
      console.error("Gagal membuka notifikasi:", error);
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`flex w-full cursor-pointer gap-3 border-b px-4 py-3 text-left transition hover:bg-zinc-50 ${
        !notification.is_read ? "bg-green-50" : "bg-white"
      }`}
    >
      <div className="mt-1">
        <Icon className={`h-5 w-5 ${config.iconClassName}`} />
      </div>

      <div className="flex-1">
        <p className="font-medium text-zinc-800">{notification.title}</p>
        <p className="mt-1 text-sm text-zinc-600">{notification.message}</p>
        <p className="mt-2 text-xs text-zinc-400">
          {new Date(notification.created_at).toLocaleString("id-ID")}
        </p>
      </div>
    </button>
  );
}
