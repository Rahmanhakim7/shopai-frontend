"use client";
import Link from "next/link";
export default function GuestNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/">
          <h1 className="text-2xl font-bold text-green-600">ShopAI</h1>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-600 transition hover:text-green-600"
          >
            Home
          </Link>

          <Link
            href="/shop"
            className="text-sm font-medium text-zinc-600 transition hover:text-green-600"
          >
            Shop
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-xl px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
