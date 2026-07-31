import { LucideIcon } from "lucide-react";
import clsx from "clsx";

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
};

export default function StatsCard({
  title,
  value,
  icon: Icon,
  iconBgColor,
  iconColor,
}: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500">{title}</p>

          <h2 className="mt-3 text-3xl font-bold text-zinc-800">{value}</h2>
        </div>

        <div className={clsx("rounded-xl p-3", iconBgColor)}>
          <Icon className={clsx("h-6 w-6", iconColor)} />
        </div>
      </div>
    </div>
  );
}
