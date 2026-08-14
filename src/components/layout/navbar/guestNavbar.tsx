"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/products",
    label: "Shop",
  },
];

export default function GuestNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/85 shadow-[0_4px_20px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
        {/* Logo + Navigation */}
        <div className="flex items-center gap-10">
          <Link href="/" className="group flex items-center">
            <Image
              src="/log.png"
              alt="ShopAI"
              width={140}
              height={40}
              priority
              className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </Link>

          <nav className="hidden items-center gap-1 rounded-2xl bg-zinc-50/80 p-1 md:flex">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-white text-emerald-700 shadow-sm"
                      : "text-zinc-500 hover:bg-white/70 hover:text-emerald-600"
                  }`}
                >
                  {item.label}

                  {isActive && (
                    <span className="absolute right-1/2 bottom-1 h-0.5 w-4 translate-x-1/2 rounded-full bg-lime-400" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Auth Actions */}
        <div className="flex items-center gap-1.5">
          <Link
            href="/login"
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-600 transition-all duration-300 hover:bg-zinc-100 hover:text-zinc-900"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-emerald-700 hover:shadow-md"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
