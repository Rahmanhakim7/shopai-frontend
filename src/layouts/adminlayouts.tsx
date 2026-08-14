import BaseDashboardLayout from "./BaseDashboardLayouts";
import { adminMenus } from "@/constants/menus";

type AdminLayoutProps = {
  children: React.ReactNode;
  sidebarTitle: string;
};

export default function AdminLayout({
  children,
  sidebarTitle,
}: AdminLayoutProps) {
  return (
    <BaseDashboardLayout sidebarTitle={sidebarTitle} menus={adminMenus}>
      {children}
    </BaseDashboardLayout>
  );
}
