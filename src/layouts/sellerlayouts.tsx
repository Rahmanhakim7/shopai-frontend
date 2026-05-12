"use client";
import BaseDashboardLayout from "./BaseDashboardLayouts";
import { sellerMenus } from "@/constants/menus";

type SellerLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export default function SellerLayout({
  children,
  title,
}: SellerLayoutProps) {
  return (
    <BaseDashboardLayout
      title={title}
      sidebarTitle="Seller Panel"
      menus={sellerMenus}
    >
      {children}
    </BaseDashboardLayout>
  );
}