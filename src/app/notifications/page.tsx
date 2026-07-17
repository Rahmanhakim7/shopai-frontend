"use client";

import BuyerLayout from "@/layouts/buyerlayouts";
import RoleGuard from "@/components/guards/RoleGuard";

import NotificationPageContent from "@/features/notifications/components/NotificationPageContent";

export default function NotificationsPage() {
  return (
    <RoleGuard role="buyer">
      <BuyerLayout>
        <div className="mx-auto max-w-5xl px-6 py-8">
          <NotificationPageContent />
        </div>
      </BuyerLayout>
    </RoleGuard>
  );
}
