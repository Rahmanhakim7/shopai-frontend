import { paymentStatusConfig } from "../order.config";
type Props = {
  status: string;
};

export default function PaymentStatusBadge({ status }: Props) {
  const payment = paymentStatusConfig[
    status as keyof typeof paymentStatusConfig
  ] ?? {
    text: status,
    color: "bg-zinc-400",
    className: "bg-zinc-100 text-zinc-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${payment.className}`}
    >
      <span className={`h-4 w-4 shrink-0 rounded-full ${payment.color}`} />
      {payment.text}
    </span>
  );
}
