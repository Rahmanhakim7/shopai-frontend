"use client";

import { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import {
  getNotifications,
  markAllNotificationsRead,
} from "../notifications.api";
import type { Notification } from "../notifications.types";

export default function NotificationPageContent() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      const data = await getNotifications();
      setNotifications(data.notifications);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleMarkAllRead() {
    try {
      await markAllNotificationsRead();

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          is_read: true,
        })),
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-5">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Semua Notifikasi</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Seluruh aktivitas pesanan akan muncul di sini.
          </p>
        </div>
        <button
          onClick={handleMarkAllRead}
          className="rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
        >
          Tandai Semua Dibaca
        </button>
      </div>

      {loading ? (
        <div className="p-10 text-center text-zinc-500">
          Memuat notifikasi...
        </div>
      ) : notifications.length === 0 ? (
        <div className="p-10 text-center text-zinc-500">
          Belum ada notifikasi.
        </div>
      ) : (
        notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))
      )}
    </div>
  );
}
