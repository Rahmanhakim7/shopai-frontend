"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
type MenuItem = {
    name: string;
    href: string;
}
type SidebarProps = {
    title: string;
    menus: MenuItem[];
}
export default function Sidebar({ 
  menus, title,
}: SidebarProps) {
  const pathname = usePathname();
    return (
    <aside className="hidden md:flex w-64 min-h-screen bg-white border-r flex-col p-5">
      <div className="flex items-center gap-3 mb-10">
        <Image
          src="/log.png"
          alt="Logo"
          width={60}
          height={60}
        />
        <h1 className="text-2xl font-bold text-green-600">
          {title}
        </h1>
      </div>
      <nav className="space-y-2">
        {menus.map((menu, index) => {
          const isActive = pathname === menu.href;
          return (
            <Link
              key={index}
              href={menu.href}
              className={`block px-4 py-3 rounded-xl transition font-medium ${
                isActive
                  ? "bg-green-600 text-white"
                  : "text-zinc-700 hover:bg-green-50 hover:text-green-600"
              }`}
            >
              {menu.name}
            </Link>
          );
        })}
      </nav>
    </aside> 
    )
}