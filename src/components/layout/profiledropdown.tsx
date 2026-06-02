"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    router.push("/login");
  };
  return (
    <div className="relative">
      <Button
        onClick={() => setOpen(!open)}
        variant="success"
        size="sm"
        className="w-10 h-10 rounded-full p-0"
      >
        S
      </Button>
      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-white border border-zinc-200 rounded-2xl shadow-xl p-2 z-50">
          <div className="px-3 py-2 border-b border-zinc-100">
            <h3 className="font-semibold text-zinc-800">
              Seller Account
            </h3>
            <p className="text-sm text-zinc-500">
              seller@gmail.com
            </p>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <Button
              variant="secondary"
              className="w-full justify-start"
            >
              Profile
            </Button>
            <Button
              variant="secondary"
              className="w-full justify-start">
              Settings
            </Button>
            <Button
              variant="danger"
              className="w-full justify-start" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}