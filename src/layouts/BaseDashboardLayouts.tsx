"use client";
import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";

type MenuItem =  ({
    name: string; 
    href: string; 
});

type BaseDashboardLayoutProps = {
    children: React.ReactNode;
    title: string;
    sidebarTitle: string;
    menus: MenuItem[];
};

export default function BaseDashboardLayout({
    children,
    title,
    sidebarTitle,
    menus
}: BaseDashboardLayoutProps) {
    return (
      <div className="flex min-h-screen bg-zinc-100">
        <Sidebar
          title={sidebarTitle}
          menus={menus}
        />
        <div className="flex-1 flex flex-col">
          <Navbar title={title} />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    );
}