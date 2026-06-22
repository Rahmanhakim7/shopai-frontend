"use client";
import BaseDashboardLayout from "./BaseDashboardLayouts";
import { sellerMenus } from "@/constants/menus";

type SellerLayoutProps = {
  children: React.ReactNode;
  sidebarTitle: string;
};

export default function SellerLayout({
  children,
  sidebarTitle,
}: SellerLayoutProps) {
  return (
    <BaseDashboardLayout
      sidebarTitle={sidebarTitle}
      menus={sellerMenus}>
      {children}
    </BaseDashboardLayout>
  );
}