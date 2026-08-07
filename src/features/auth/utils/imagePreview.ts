export function createImagePreview(file: File): string {
  return URL.createObjectURL(file);
}

export function revokeImagePreview(preview: string | null): void {
  if (preview?.startsWith("blob:")) {
    URL.revokeObjectURL(preview);
  }
}
