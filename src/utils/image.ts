const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const getImageUrl = (image?: string): string => {
  if (!image) {
    return "/images/no-image.png";
  }

  return image.startsWith("http")
    ? image
    : `${API_URL}${image}`;
};