"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight, Star, Store } from "lucide-react";
import { useEffect, useState } from "react";

import { getProducts } from "@/features/products/product.api";
import type { Product } from "@/features/products/types/product";
import { getImageUrl } from "@/utils/image";
import { formatCurrency } from "@/utils/currency";

type ProductCardProps = {
  product: Product;
  index: number;
};

function ProductCard({ product, index }: ProductCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [1.5, -1.5]), {
    stiffness: 100,
    damping: 24,
    mass: 0.3,
  });

  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-1.5, 1.5]), {
    stiffness: 100,
    damping: 24,
    mass: 0.3,
  });

  const imageX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-1.5, 1.5]), {
    stiffness: 80,
    damping: 24,
    mass: 0.3,
  });

  const imageY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-1.5, 1.5]), {
    stiffness: 80,
    damping: 24,
    mass: 0.3,
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    mouseX.set(x / rect.width - 0.5);
    mouseY.set(y / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 16,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-40px",
      }}
      transition={{
        duration: 0.5,
        delay: (index % 4) * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-[48vw] max-w-[205px] min-w-[175px] shrink-0 sm:w-[29vw] sm:max-w-[220px] md:w-[22vw] md:max-w-[235px] lg:w-[17.5vw] lg:max-w-[245px]"
      style={{
        perspective: 1200,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          y: -4,
        }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="group overflow-hidden rounded-[22px] border border-zinc-200/80 bg-white shadow-[0_3px_12px_rgba(0,0,0,0.05)] transition-all duration-500 hover:border-zinc-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.10)]"
      >
        <Link href={`/products/${product.id}`} className="block">
          <div
            className="relative aspect-[1.08/1] overflow-hidden bg-zinc-100"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              style={{
                x: imageX,
                y: imageY,
                translateZ: 8,
              }}
              className="absolute inset-[-3px] transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            >
              <Image
                src={getImageUrl(product.image)}
                alt={product.name}
                fill
                sizes="
                  (max-width: 640px) 48vw,
                  (max-width: 768px) 29vw,
                  (max-width: 1024px) 22vw,
                  18vw
                "
                unoptimized
                className="object-cover"
              />
            </motion.div>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="absolute top-3 left-3 z-10">
              {product.condition}
            </div>

            <div className="absolute right-3 bottom-3 left-3 z-10 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="flex items-center gap-2 rounded-xl border border-white/50 bg-white/85 px-2.5 py-2 shadow-md backdrop-blur-md">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                  <Store size={12} className="text-emerald-600" />
                </div>

                <span className="truncate text-[9px] font-medium text-zinc-600">
                  {product.seller_name}
                </span>
              </div>
            </div>
          </div>
        </Link>

        <div className="px-3.5 pt-3 pb-3.5">
          <Link href={`/products/${product.id}`}>
            <h3 className="line-clamp-2 min-h-[36px] text-[13px] leading-[18px] font-semibold text-zinc-800 transition-colors duration-300 group-hover:text-emerald-700">
              {product.name}
            </h3>
          </Link>

          <div className="mt-2.5 flex items-center justify-between gap-2">
            <p className="text-[14px] font-bold tracking-tight text-zinc-900">
              {formatCurrency(product.price)}
            </p>

            <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-1 text-[8px] font-medium text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-100">
              {product.stock}
            </span>
          </div>

          <div className="mt-1.5 flex items-center gap-1.5">
            <div className="flex items-center gap-1">
              <Star
                size={11}
                fill="currentColor"
                strokeWidth={0}
                className="text-amber-400"
              />

              <span className="text-[10px] font-semibold text-zinc-600">
                {product.average_rating.toFixed(1)}
              </span>
            </div>

            <span className="h-1 w-1 rounded-full bg-zinc-300" />

            <span className="text-[9px] text-zinc-400">
              {product.review_count} ulasan
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FeaturedProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts({
          page_size: 16,
        });

        setProducts(data.results ?? []);
      } catch (error) {
        console.error("Failed to fetch featured products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mb-7 flex flex-col gap-4 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <motion.h2
              initial={{
                opacity: 0,
                y: 14,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
              }}
              className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl lg:text-4xl"
            >
              Temukan sesuatu yang{" "}
              <span className="text-emerald-600">cocok untukmu.</span>
            </motion.h2>

            <motion.p
              initial={{
                opacity: 0,
                y: 14,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: 0.05,
              }}
              className="mt-3 max-w-lg text-sm leading-6 text-zinc-500 sm:mt-4 sm:text-base sm:leading-7"
            >
              Jelajahi pilihan produk menarik dari berbagai seller yang mungkin
              sesuai dengan kebutuhanmu.
            </motion.p>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              x: 15,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
            >
              Lihat semua produk
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
        {loading ? (
          <div className="flex gap-4 overflow-hidden sm:gap-5">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="w-[48vw] max-w-[205px] min-w-[175px] shrink-0 sm:w-[29vw] sm:max-w-[220px] md:w-[22vw] md:max-w-[235px] lg:w-[17.5vw] lg:max-w-[245px]"
              >
                <div className="aspect-[1.18/1] animate-pulse rounded-2xl bg-zinc-100" />

                <div className="mt-3 h-3 w-1/2 animate-pulse rounded-full bg-zinc-100" />

                <div className="mt-2 h-4 w-4/5 animate-pulse rounded-full bg-zinc-100" />

                <div className="mt-2 h-3 w-1/3 animate-pulse rounded-full bg-zinc-100" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-200 bg-zinc-50/50 px-6 py-16 text-center">
            <p className="text-sm text-zinc-500">
              Belum ada produk yang tersedia.
            </p>
          </div>
        ) : (
          <div className="relative">
            <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-20 w-6 bg-gradient-to-r from-white to-transparent sm:w-10" />
            <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-20 w-6 bg-gradient-to-l from-white to-transparent sm:w-10" />

            <div className="overflow-hidden py-4">
              <motion.div
                className="flex w-max"
                animate={{
                  x: ["0%", "-50%"],
                }}
                transition={{
                  duration: 45,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                <div className="flex gap-4 pr-4 sm:gap-5 sm:pr-5">
                  {products.map((product, index) => (
                    <ProductCard
                      key={`first-${product.id}`}
                      product={product}
                      index={index}
                    />
                  ))}
                </div>
                <div className="flex gap-4 pr-4 sm:gap-5 sm:pr-5">
                  {products.map((product, index) => (
                    <ProductCard
                      key={`second-${product.id}`}
                      product={product}
                      index={index + products.length}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}
        {!loading && products.length > 1 && (
          <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-zinc-400 sm:hidden">
            <span>Produk bergerak otomatis</span>

            <ArrowRight size={12} />
          </div>
        )}
      </div>
    </section>
  );
}
