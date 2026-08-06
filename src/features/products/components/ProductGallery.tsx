import Image from "next/image";

type ProductGalleryProps = {
  imageUrl: string;
  productName: string;
};

export default function ProductGallery({
  imageUrl,
  productName,
}: ProductGalleryProps) {
  return (
    <div className="group rounded-3xl border border-gray-200 bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative h-[520px] overflow-hidden rounded-2xl bg-gradient-to-t from-black/10 to-transparent">
        <Image
          src={imageUrl}
          alt={productName}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </div>
  );
}
