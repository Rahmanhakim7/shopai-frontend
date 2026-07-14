"use client";

import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import ProfileDropdown from "@/components/layout/profiledropdown";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import api from "@/lib/api";

type CartItem = {
  cart_item_id: number;
  product_id: number;
  quantity: number;
};

type CartSeller = {
  seller_id: number;
  seller_name: string;
  items: CartItem[];
};

type CartResponse = {
  seller_groups: CartSeller[];
};

export default function BuyerNavbar() {
  const pathname = usePathname();
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const fetchCounts = async () => {
    try {
      const wishlistResponse = await api.get("/wishlist/");
      setWishlistCount(wishlistResponse.data.length);
      const cartResponse = await api.get<CartResponse>("/cart/");
      const totalCart = cartResponse.data.seller_groups.reduce(
        (total, seller) =>
          total + seller.items.reduce((sum, item) => sum + item.quantity, 0),
        0,
      );
      setCartCount(totalCart);
    } catch (err) {
      console.error("Failed fetch navbar count", err);
    }
  };

  useEffect(() => {
    const loadFetchCounts = async () => fetchCounts();
    loadFetchCounts();
  }, []);

  const navItems = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/products",
      label: "Shop",
    },
    {
      href: "/orders",
      label: "Orders",
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-green-100 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600 font-bold text-white shadow-sm">
              S
            </div>

            <h1 className="text-xl font-bold text-zinc-800">
              Shop<span className="text-green-600">AI</span>
            </h1>
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-green-100 text-green-700"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-green-600"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="relative rounded-xl p-2.5 transition-all duration-200 hover:scale-105 hover:bg-green-50"
          >
            <ShoppingCart size={22} className="text-zinc-700" />

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold text-white shadow">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            href="/wishlist"
            className="relative rounded-xl p-2.5 transition-all duration-200 hover:scale-105 hover:bg-red-50"
          >
            <Heart size={22} className="text-zinc-700" />

            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow">
                {wishlistCount}
              </span>
            )}
          </Link>

          <div className="ml-1">
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}
