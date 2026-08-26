"use client";

import AdminLayout from "@/layouts/adminlayouts";
import RoleGuard from "@/components/guards/RoleGuard";
import AdminUsersHero from "@/features/admin/components/AdminUsersHero";
import AdminUsersTable from "@/features/admin/components/AdminUsersTable";

export default function AdminUsersPage() {
  return (
    <RoleGuard role="admin">
      <AdminLayout sidebarTitle="Users">
        <div className="space-y-8">
          <AdminUsersHero />
          <AdminUsersTable />
        </div>
      </AdminLayout>
    </RoleGuard>
  );
}