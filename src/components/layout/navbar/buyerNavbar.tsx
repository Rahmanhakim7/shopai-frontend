"use client";

import Link from "next/link";
import { ShoppingCart, Heart, Bell } from "lucide-react";
import ProfileDropdown from "@/components/layout/profiledropdown";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NotificationDropdown from "@/features/notifications/components/NotificationDropdown";
import type { Notification } from "@/features/notifications/notifications.types";
import { getNotifications } from "@/features/notifications/notifications.api";
import api from "@/lib/api";
import Image from "next/image";

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

export default function BuyerNavbar() {
  const pathname = usePathname();

  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [openNotification, setOpenNotification] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchCounts = async () => {
    try {
      const wishlistResponse = await api.get("/wishlist/");
      setWishlistCount(wishlistResponse.data.count);
      const notificationResponse = await getNotifications();
      const cartResponse = await api.get<CartResponse>("/cart/");
      const totalCart = cartResponse.data.seller_groups.reduce(
        (total, seller) =>
          total + seller.items.reduce((sum, item) => sum + item.quantity, 0),
        0,
      );
      setCartCount(totalCart);
      setNotifications(notificationResponse.notifications);
      setUnreadCount(notificationResponse.unread_count);
    } catch (err) {
      console.error("Failed fetch navbar count", err);
    }
  };

  useEffect(() => {
    const loadFetchCounts = async () => {
      await fetchCounts();
    };

    loadFetchCounts();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/85 shadow-[0_4px_20px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
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
        <div className="flex items-center gap-1.5">
          <Link
            href="/cart"
            className="group relative rounded-xl p-2.5 transition-all duration-300 hover:bg-emerald-50"
          >
            <ShoppingCart
              size={21}
              strokeWidth={1.8}
              className="text-zinc-600 transition-colors duration-300 group-hover:text-emerald-600"
            />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-emerald-600 px-1 text-[9px] font-bold text-white shadow-sm ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            href="/wishlist"
            className="group relative rounded-xl p-2.5 transition-all duration-300 hover:bg-red-50"
          >
            <Heart
              size={21}
              strokeWidth={1.8}
              className="text-zinc-600 transition-colors duration-300 group-hover:text-red-500"
            />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white shadow-sm ring-2 ring-white">
                {wishlistCount}
              </span>
            )}
          </Link>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenNotification(!openNotification)}
              className="group relative cursor-pointer rounded-xl p-2.5 transition-all duration-300 hover:bg-emerald-50"
            >
              <Bell
                size={21}
                strokeWidth={1.8}
                className="text-zinc-600 transition-colors duration-300 group-hover:text-emerald-600"
              />

              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white shadow-sm ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>
            {openNotification && (
              <NotificationDropdown notifications={notifications} />
            )}
          </div>
          <div className="ml-2 border-l border-zinc-200 pl-3">
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}
