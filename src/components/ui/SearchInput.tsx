"use client";
import { Search } from "lucide-react";

type SearchInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};
export default function SearchInput({
  value,
  onChange,
  placeholder = "Cari...",
}: SearchInputProps) {
  return (
    <div className="relative w-full md:max-w-lg">
      <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-transparent bg-green-50 py-3 pr-4 pl-12 text-sm text-gray-700 shadow-sm transition-all outline-none placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-100"
      />
    </div>
  );
}
