import { Star } from "lucide-react";
import { Review } from "../types/product";

type ProductReviewCardProps = {
  review: Review;
};

export default function ProductReviewCard({ review }: ProductReviewCardProps) {
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 font-bold text-white shadow-md">
            {review.buyer_username.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {review.buyer_username}
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              {new Date(review.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-2 shadow-sm">
          {Array.from({ length: review.rating }).map((_, index) => (
            <Star
              key={index}
              className="h-4 w-4 fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>
      </div>

      <div className="mt-5 flex-1 border-t border-gray-100 pt-4">
        <div className="max-h-32 overflow-y-auto pr-2">
          <p className="text-justify leading-8 text-gray-600">
            {review.comment}
          </p>
        </div>
      </div>
    </div>
  );
}
