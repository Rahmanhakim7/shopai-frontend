import {
  CircleCheckBig,
  CircleX,
  ListFilter,
  Package,
  Truck,
  Wallet,
} from "lucide-react";
import type { OrderTab } from "../hooks/useOrder";

interface OrderFiltersProps {
  activeTab: OrderTab;
  setActiveTab: (tab: OrderTab) => void;
  getTabCount: (key: OrderTab) => number;
}

const tabs = [
  {
    key: "all" as const,
    label: "Semua",
    icon: ListFilter,
  },
  {
    key: "pending_payment" as const,
    label: "Belum Bayar",
    icon: Wallet,
  },
  {
    key: "processing" as const,
    label: "Diproses",
    icon: Package,
  },
  {
    key: "shipping" as const,
    label: "Dikirim",
    icon: Truck,
  },
  {
    key: "completed" as const,
    label: "Selesai",
    icon: CircleCheckBig,
  },
  {
    key: "cancelled" as const,
    label: "Batal",
    icon: CircleX,
  },
];

export default function OrderFilters({
  activeTab,
  setActiveTab,
  getTabCount,
}: OrderFiltersProps) {
  return (
    <div className="mt-6 overflow-x-auto pb-1">
      <div className="flex min-w-max items-center justify-center gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const count = getTabCount(tab.key);

          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`group flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-green-600 text-white shadow-sm"
                  : "text-gray-500 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              <Icon
                className={`h-4 w-4 ${
                  activeTab === tab.key
                    ? "text-white"
                    : "text-gray-400 group-hover:text-green-600"
                }`}
              />

              <span>{tab.label}</span>

              <span
                className={`min-w-6 rounded-full px-1.5 py-0.5 text-center text-xs font-semibold ${
                  activeTab === tab.key
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-500 group-hover:bg-green-100 group-hover:text-green-700"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
