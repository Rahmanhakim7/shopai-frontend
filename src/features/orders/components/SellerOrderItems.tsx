import Image from "next/image";
import { OrderItem } from "../order.types";

const MEDIA_URL = process.env.NEXT_PUBLIC_API_URL;
type Props = {
  items: OrderItem[];
};

export default function SellerOrderItems({ items }: Props) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);

  return (
    <div className="lg:col-span-5">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-bold">Produk Pesanan</h2>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b pb-4 last:border-0"
            >
              <Image
                src={
                  item.product_image
                    ? item.product_image.startsWith("http")
                      ? item.product_image
                      : `${MEDIA_URL}${item.product_image}`
                    : "/no-image.png"
                }
                alt={item.product_name}
                width={80}
                height={80}
                className="rounded-xl object-cover"
                unoptimized
              />

              <div className="flex-1">
                <h3 className="font-semibold text-zinc-900">
                  {item.product_name}
                </h3>

                <p className="mt-1 text-sm text-zinc-500">
                  Qty : {item.quantity}
                </p>

                <p className="text-sm text-zinc-500">
                  {formatCurrency(item.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
