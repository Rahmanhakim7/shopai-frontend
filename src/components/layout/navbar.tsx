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
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/85 shadow-[0_4px_20px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-end px-6">
        <div className="flex items-center gap-1.5">
          <Link
            href="/seller/products"
            className="group rounded-xl p-2.5 transition-all duration-300 hover:bg-emerald-50"
          >
            <ShoppingBag
              size={21}
              strokeWidth={1.8}
              className="text-zinc-600 transition-colors duration-300 group-hover:text-emerald-600"
            />
          </Link>
          <Link
            href="/seller/orders"
            className="group rounded-xl p-2.5 transition-all duration-300 hover:bg-emerald-50"
          >
            <Package
              size={21}
              strokeWidth={1.8}
              className="text-zinc-600 transition-colors duration-300 group-hover:text-emerald-600"
            />
          </Link>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenNotification(!openNotification)}
              className="group relative cursor-pointer rounded-xl p-2.5 transition-all duration-300 hover:bg-emerald-50"
            >
              <Bell
                size={21}
                strokeWidth={1.8}
                className="text-zinc-600 transition-colors duration-300 group-hover:text-emerald-600"
              />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white shadow-sm ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>
            {openNotification && (
              <NotificationDropdown notifications={notifications} />
            )}
          </div>
          <div className="ml-2 border-l border-zinc-200 pl-3">
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}
