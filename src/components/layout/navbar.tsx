"use client";

import Link from "next/link";
import { Bell, Package, ShoppingBag } from "lucide-react";
import ProfileDropdown from "@/components/layout/profiledropdown";
import { useState, useEffect } from "react";
import NotificationDropdown from "@/features/notifications/components/NotificationDropdown";
import { getNotifications } from "@/features/notifications/notifications.api";

import type { Notification } from "@/features/notifications/notifications.types";

export default function Navbar() {
  const [openNotification, setOpenNotification] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const data = await getNotifications();

        setNotifications(data.notifications);
        setUnreadCount(data.unread_count);
      } catch (error) {
        console.error(error);
      }
    }

    fetchNotifications();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-end px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/seller/products"
            className="rounded-2xl p-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-50 hover:text-green-600"
          >
            <ShoppingBag size={22} className="text-zinc-700" />
          </Link>
          <Link
            href="/seller/orders"
            className="relative rounded-2xl p-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-50 hover:text-green-600"
          >
            <Package size={22} className="text-zinc-700" />
          </Link>
          <div className="relative">
            <button
              onClick={() => setOpenNotification(!openNotification)}
              className="cursor-pointer rounded-2xl p-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-50"
            >
              <Bell size={22} className="text-zinc-700" />

              {unreadCount > 0 && (
                <span className="absolute top-px right-px flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {openNotification && (
              <NotificationDropdown notifications={notifications} />
            )}
          </div>
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}
