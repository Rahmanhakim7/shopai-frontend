"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { LucideIcon } from "lucide-react";

type MenuItem = {
  name: string;
  href: string;
  icon: LucideIcon;
};

type SidebarProps = {
  title: string;
  menus: MenuItem[];
};

export default function Sidebar({ menus, title }: SidebarProps) {
  const pathname = usePathname();
  return (
    <aside className="fixed top-0 left-0 hidden h-screen w-72 flex-col border-r border-zinc-100 bg-gradient-to-b from-white to-green-50/40 p-6 md:flex">
      <div className="mb-10 flex items-center gap-4">
        <div className="rounded-2xl bg-green-100 p-2 shadow-sm">
          <Image src="/log.png" alt="Logo" width={50} height={50} />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-green-600">{title}</h1>
        </div>
      </div>
      <nav className="space-y-3">
        {menus.map((menu, index) => {
          const isActive = pathname === menu.href;
          const Icon = menu.icon;
          return (
            <Link
              key={index}
              href={menu.href}
              className={`group flex items-center gap-3 rounded-2xl px-4 py-3 font-medium transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg shadow-green-200"
                  : "text-zinc-700 hover:translate-x-1 hover:bg-white hover:text-green-600 hover:shadow-md"
              }`}
            >
              <Icon
                size={20}
                className={`transition-transform duration-300 ${
                  isActive ? "scale-110" : "group-hover:scale-110"
                }`}
              />
              <span>{menu.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 p-4 text-white shadow-lg">
        <p className="font-semibold"> ShopAI </p>
        <p className="mt-1 text-xs text-green-100">
          Grow your business with confidence
        </p>
      </div>
    </aside>
  );
}
