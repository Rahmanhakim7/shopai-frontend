"use client";
import Link from "next/link";
import type { Notification } from "../notifications.types";
import NotificationItem from "./NotificationItem";
import { useAuth } from "@/context/AuthContext";

interface NotificationDropdownProps {
  notifications: Notification[];
}

export default function NotificationDropdown({
  notifications,
}: NotificationDropdownProps) {
  const { user } = useAuth();

  const href =
    user?.role === "seller" ? "/seller/notifications" : "/notifications";
  return (
    <div className="absolute top-14 right-0 z-50 w-96 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl">
      <div className="border-b border-zinc-200 px-4 py-3">
        <h3 className="text-base font-semibold text-zinc-800">Notifikasi</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-sm text-zinc-500">
            Belum ada notifikasi.
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))
        )}
      </div>
      <div className="border-t border-zinc-200 p-3">
        <Link
          href={href}
          className="block rounded-xl py-2 text-center text-sm font-medium text-green-600 transition hover:bg-green-50"
        >
          Lihat Semua
        </Link>
      </div>
    </div>
  );
}
