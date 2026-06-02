"use client";

import Link from "next/link";
import { ShoppingCart, Package, User } from "lucide-react";
import ProfileDropdown from "@/components/layout/profiledropdown";

export default function BuyerNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Link href="/">
            <h1 className="text-2xl font-bold text-green-600">
              ShopAI
            </h1>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-zinc-600 transition hover:text-green-600">
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-zinc-600 transition hover:text-green-600">
              Shop
            </Link>
            <Link
              href="/buyer/orders"
              className="text-sm font-medium text-zinc-600 transition hover:text-green-600">
              Orders
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/buyer/cart"
            className="relative rounded-xl p-2 transition hover:bg-zinc-100">
            <ShoppingCart
              size={22}
              className="text-zinc-700"
            />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold text-white">
              2
            </span>
          </Link>

          <Link
            href="/buyer/orders"
            className="rounded-xl p-2 transition hover:bg-zinc-100">
            <Package
              size={22}
              className="text-zinc-700"
            />
          </Link>
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}