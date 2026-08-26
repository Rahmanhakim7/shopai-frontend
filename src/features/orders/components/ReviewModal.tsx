"use client";

import Image from "next/image";
import type { OrderItem } from "../order.types";

const MEDIA_URL = process.env.NEXT_PUBLIC_API_URL;

type ReviewModalProps = {
  item: OrderItem | null;
  rating: number;
  comment: string;
  submitting: boolean;
  setRating: (rating: number) => void;
  setComment: (comment: string) => void;
  onClose: () => void;
  onSubmit: () => Promise<void>;
};

export default function ReviewModal({
  item,
  rating,
  comment,
  submitting,
  setRating,
  setComment,
  onClose,
  onSubmit,
}: ReviewModalProps) {
  if (!item) return null;

  const imageUrl = item.product_image
    ? item.product_image.startsWith("http")
      ? item.product_image
      : `${MEDIA_URL}${item.product_image}`
    : "/no-image.png";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="border-b border-zinc-100 px-6 py-5">
          <h2 className="text-xl font-bold text-zinc-900">Beri Ulasan</h2>

          <p className="mt-1 text-sm text-zinc-500">
            Bagikan pengalaman kamu tentang produk ini.
          </p>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 rounded-xl border border-zinc-200 p-3">
            <Image
              src={imageUrl}
              alt={item.product_name}
              width={60}
              height={60}
              className="h-[60px] w-[60px] rounded-lg object-cover"
              unoptimized
            />

            <div className="min-w-0">
              <p className="line-clamp-2 font-medium text-zinc-900">
                {item.product_name}
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                {item.quantity} produk
              </p>
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-sm font-medium text-zinc-700">
              Bagaimana kualitas produk ini?
            </p>

            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-3xl leading-none transition-transform hover:scale-110"
                  aria-label={`Rating ${star}`}
                >
                  <span
                    className={
                      star <= rating ? "text-amber-400" : "text-zinc-300"
                    }
                  >
                    ★
                  </span>
                </button>
              ))}
            </div>

            {rating > 0 && (
              <p className="mt-2 text-sm text-zinc-500">
                Kamu memberikan rating {rating} dari 5
              </p>
            )}
          </div>

          <div className="mt-5">
            <label
              htmlFor="review-comment"
              className="mb-2 block text-sm font-medium text-zinc-700"
            >
              Ulasan
            </label>

            <textarea
              id="review-comment"
              rows={4}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Bagikan pengalaman kamu tentang produk ini..."
              className="w-full resize-none rounded-xl border border-zinc-200 p-3 text-sm text-zinc-900 transition outline-none placeholder:text-zinc-400 focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-600 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Batal
            </button>

            <button
              type="button"
              onClick={onSubmit}
              disabled={!rating || submitting}
              className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Mengirim..." : "Kirim Ulasan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
