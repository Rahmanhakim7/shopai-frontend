"use client";

import { useAuth } from "@/hooks/useAuth";
import BuyerNavbar from "@/components/layout/navbar/buyerNavbar";
import GuestNavbar from "@/components/layout/navbar/guestNavbar";

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useAuth();
  return (
      <div className="min-h-screen bg-zinc-50">
        {token ? <BuyerNavbar /> : <GuestNavbar />}
        <main>{children}</main>
      </div>
  );
}
