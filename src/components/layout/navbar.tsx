"use client";
import ProfileDropdown from "./profiledropdown";
type NavbarProps = {
  title: string;
};
export default function Navbar({
  title,
}: NavbarProps) {
  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-end">
      <div className="flex items-center gap-4">
        <button className="text-zinc-600 hover:text-green-600">
          🔔
        </button>
        <ProfileDropdown />
      </div>
    </header>
  );
}