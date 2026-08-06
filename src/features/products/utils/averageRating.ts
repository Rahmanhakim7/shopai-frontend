import { Review } from "../types/product";

export const getAverageRating = (
  reviews: Review[]
) => {
  if (!reviews.length) return "0";

  return (
    reviews.reduce(
      (total, review) => total + review.rating,
      0
    ) / reviews.length
  ).toFixed(1);
};