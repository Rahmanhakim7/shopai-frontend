"use client";

type Option = {
  label: string;
  value: string;
};

type SortDropdownProps = {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
};

export default function SortDropdown({
  value,
  options,
  onChange,
}: SortDropdownProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-2xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-green-300 hover:shadow-md focus:border-green-400 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
        <svg
          className="h-4 w-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
