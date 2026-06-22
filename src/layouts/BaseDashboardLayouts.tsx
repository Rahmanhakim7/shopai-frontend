"use client";

import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";
import { LucideIcon } from "lucide-react";

type MenuItem = {
  name: string;
  href: string;
  icon: LucideIcon;
};

type BaseDashboardLayoutProps = {
  children: React.ReactNode;
  sidebarTitle: string;
  menus: MenuItem[];
};

export default function BaseDashboardLayout({
  children,
  sidebarTitle,
  menus,
}: BaseDashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-zinc-100">
      <Sidebar title={sidebarTitle} menus={menus} />
      <div className="flex flex-1 flex-col">
        <Navbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
