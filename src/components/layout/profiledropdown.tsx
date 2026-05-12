"use client";
import { useState } from "react";
export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
        S
      </button>
      {open && (
        <div className="absolute right-0 mt-3 w-52 bg-white border rounded-2xl shadow-xl p-2 z-50">
          <div className="px-3 py-2 border-b">
            <h3 className="font-semibold text-zinc-800">
              Seller Account
            </h3>
            <p className="text-sm text-zinc-500">
              seller@gmail.com
            </p>
          </div>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-100 transition">
            Profile
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-100 transition">
            Settings
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 transition">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}