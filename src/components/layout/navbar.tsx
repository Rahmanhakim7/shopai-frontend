"use client";

import Link from "next/link";
import { Bell, Package, ShoppingBag } from "lucide-react";
import ProfileDropdown from "@/components/layout/profiledropdown";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-end px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/seller/products"
            className="rounded-2xl p-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-50 hover:text-green-600"
          >
            <ShoppingBag size={22} className="text-zinc-700" />
          </Link>
          <Link
            href="/seller/orders"
            className="relative rounded-2xl p-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-50 hover:text-green-600"
          >
            <Package size={22} className="text-zinc-700" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold text-white">
              3
            </span>
          </Link>
          <button className="rounded-2xl p-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-50 hover:text-green-600">
            <Bell size={22} className="text-zinc-700" />
          </button>
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}
