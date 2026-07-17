import api from "@/lib/api";
import type { Notification, NotificationResponse } from "./notifications.types";

export async function getNotifications(): Promise<NotificationResponse> {
  const response = await api.get<NotificationResponse>("/notifications/");
  return response.data;
}

export async function markNotificationRead(id: number): Promise<Notification> {
  const response = await api.patch<Notification>(`/notifications/${id}/read/`);
  return response.data;
}

export async function markAllNotificationsRead(): Promise<void> {
  await api.patch("/notifications/read-all/");
}
