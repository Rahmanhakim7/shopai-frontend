const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export function validateProfileImage(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return "Format gambar harus JPG, PNG, atau WEBP";
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return "Ukuran gambar maksimal 2MB";
  }
  return null;
}
