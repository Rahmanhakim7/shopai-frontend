import { Clock3 } from "lucide-react";
import { sellerStatusConfig } from "../order.config";

type Props = {
  status: string;
};

export default function SellerStatusBadge({ status }: Props) {
  const config =
    sellerStatusConfig[
      status as keyof typeof sellerStatusConfig
    ] ?? {
      text: status,
      icon: Clock3,
      iconClassName: "h-4 w-4",
      badgeClassName: "bg-zinc-100 text-zinc-700",
    };
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${config.badgeClassName}`}
    >
      <Icon className={config.iconClassName} />
      <span>{config.text}</span>
    </span>
  );
}