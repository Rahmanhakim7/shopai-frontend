const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getImageUrl = (image?: string | null): string => {
  if (!image) {
    return "/images/no-image.png";
  }

  if (image.startsWith("http://res.cloudinary.com")) {
    return image.replace("http://", "https://");
  }

  if (image.startsWith("image/upload/")) {
    return `https://res.cloudinary.com/kxaypleu/${image}`;
  }

  return image.startsWith("http") ? image : `${API_URL}${image}`;
};
