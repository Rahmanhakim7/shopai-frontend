"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import { getProfile } from "@/features/auth/profile";
import { UserProfile } from "@/types/auth";
import Image from "next/image";
import EditProfileModal from "@/components/auth/profile/EditProfileModal";

export default function ProfileDropdown() {
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const imageUrl = user?.profile_image
    ? `${process.env.NEXT_PUBLIC_API_URL}${user.profile_image}`
    : null;

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      setUser(response.data);
    } catch (error) {
      console.error("Gagal mengambil profile:", error);
    }
  };

  useEffect(() => {
    const loadFetchProfile = async () => fetchProfile();
    loadFetchProfile();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    router.push("/login");
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-3 py-2 transition-all duration-200 hover:border-green-500 hover:bg-green-50"
        >
          <div className="relative">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-green-600">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={user?.username ?? "Profile"}
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-bold text-white">
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>
            <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
          </div>
          <div className="hidden text-left md:block">
            <p className="text-sm leading-none font-semibold text-zinc-800">
              {user?.username || "Loading..."}
            </p>

            <p className="mt-1 text-xs text-zinc-500 capitalize">
              {user?.role || "User"}
            </p>
          </div>
          <ChevronDown
            size={16}
            className={`text-zinc-400 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
        {open && (
          <div className="absolute right-0 z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl">
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-5 text-white">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-green-600">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={user?.username ?? "Profile"}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-bold text-white">
                      {user?.username?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">
                    {user?.username || "Loading..."}
                  </h3>
                  <p className="text-sm text-green-100">
                    {user?.email || "Loading..."}
                  </p>
                  <span className="mt-1 inline-block rounded-full bg-white/20 px-2 py-1 text-xs capitalize">
                    {user?.role || "User"}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-2">
              <button
                onClick={() => {
                  setOpen(false);
                  setOpenEditProfile(true);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
              >
                <User size={18} />
                Profile
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  router.push("/settings");
                }}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
              >
                <Settings size={18} />
                Settings
              </button>
              <div className="my-2 border-t border-zinc-100" />
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
      <EditProfileModal
        open={openEditProfile}
        onClose={() => setOpenEditProfile(false)}
        user={user}
        onSuccess={fetchProfile}
      />
    </>
  );
}
