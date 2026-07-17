"use client";

import SellerLayout from "@/layouts/sellerlayouts";
import RoleGuard from "@/components/guards/RoleGuard";

import NotificationPageContent from "@/features/notifications/components/NotificationPageContent";

export default function SellerNotificationsPage() {
  return (
    <RoleGuard role="seller">
      <SellerLayout sidebarTitle="Notifications">
        <div className="p-6">
          <NotificationPageContent />
        </div>
      </SellerLayout>
    </RoleGuard>
  );
}
