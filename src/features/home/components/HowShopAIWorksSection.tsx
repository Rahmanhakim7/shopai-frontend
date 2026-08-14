"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Heart,
  MapPin,
  PackageCheck,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";

type Step = {
  id: number;
  number: string;
  title: string;
  description: string;
  icon: typeof Search;
};

const steps: Step[] = [
  {
    id: 0,
    number: "01",
    title: "Temukan",
    description:
      "Jelajahi berbagai produk dari penjual terpercaya dan temukan apa yang sedang kamu cari.",
    icon: Search,
  },
  {
    id: 1,
    number: "02",
    title: "Pilih",
    description:
      "Lihat detail produk, bandingkan pilihan, lalu pilih produk yang paling sesuai dengan kebutuhanmu.",
    icon: ShoppingBag,
  },
  {
    id: 2,
    number: "03",
    title: "Nikmati",
    description:
      "Selesaikan pesanan dengan aman dan pantau perjalanan pesananmu hingga sampai.",
    icon: CheckCircle2,
  },
];


const sparkConfig = [
  {
    top: "8%",
    left: "8%",
    size: 17,
    depth: 18,
    delay: 0,
    type: "spark",
  },
  {
    top: "13%",
    right: "10%",
    size: 14,
    depth: 30,
    delay: 0.8,
    type: "spark",
  },
  {
    top: "42%",
    left: "3%",
    size: 12,
    depth: 12,
    delay: 1.4,
    type: "dot",
  },
  {
    top: "47%",
    right: "5%",
    size: 20,
    depth: 35,
    delay: 0.4,
    type: "spark",
  },
  {
    bottom: "18%",
    left: "11%",
    size: 13,
    depth: 24,
    delay: 1.8,
    type: "plus",
  },
  {
    bottom: "10%",
    right: "12%",
    size: 16,
    depth: 28,
    delay: 1,
    type: "spark",
  },
];


export default function HowShopAIWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, {
    stiffness: 70,
    damping: 22,
    mass: 0.6,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 70,
    damping: 22,
    mass: 0.6,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const active = steps[activeStep];

  return (
    <section className="relative overflow-hidden bg-zinc-50 py-10 lg:py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[450px] w-[450px] rounded-full bg-emerald-100/50 blur-3xl" />
        <div className="absolute right-[-180px] bottom-[-180px] h-[500px] w-[500px] rounded-full bg-lime-100/40 blur-3xl" />
        <div className="absolute top-[30%] left-[12%] h-1.5 w-1.5 rounded-full bg-emerald-400/40" />
        <div className="absolute top-[20%] right-[20%] h-2 w-2 rounded-full bg-lime-400/40" />
      </div>
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
        {sparkConfig.map((spark, index) => {
          const x = useTransform(smoothX, (value) => value * spark.depth);
          const y = useTransform(smoothY, (value) => value * spark.depth);
          return (
            <motion.div
              key={index}
              style={{
                top: spark.top,
                right: spark.right,
                bottom: spark.bottom,
                left: spark.left,
                x,
                y,
              }}
              className="absolute"
            >
              {spark.type === "spark" && (
                <motion.div
                  animate={{
                    opacity: [0.25, 0.75, 0.25],
                    scale: [0.85, 1.1, 0.85],
                    rotate: [0, 20, 0],
                  }}
                  transition={{
                    duration: 3.5 + index * 0.4,
                    delay: spark.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles
                    size={spark.size}
                    strokeWidth={1.4}
                    className="text-emerald-400/60"
                  />
                </motion.div>
              )}
              {spark.type === "plus" && (
                <motion.div
                  animate={{
                    opacity: [0.2, 0.65, 0.2],
                    scale: [0.8, 1.15, 0.8],
                    rotate: [0, 90, 0],
                  }}
                  transition={{
                    duration: 4,
                    delay: spark.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span
                    style={{
                      fontSize: spark.size,
                    }}
                    className="block font-light text-emerald-400/50"
                  >
                    +
                  </span>
                </motion.div>
              )}
              {spark.type === "dot" && (
                <motion.div
                  animate={{
                    opacity: [0.2, 0.7, 0.2],
                    scale: [0.7, 1.2, 0.7],
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3,
                    delay: spark.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    width: spark.size / 3,
                    height: spark.size / 3,
                  }}
                  className="rounded-full bg-lime-400/60"
                />
              )}
            </motion.div>
          );
        })}
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="mt-1 text-4xl leading-[1.05] font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-[60px]">
            Belanja jadi <span className="text-emerald-600">lebih mudah.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-zinc-500 sm:text-lg">
            Temukan produk, pilih yang sesuai, lalu nikmati pengalaman belanja
            yang sederhana dalam satu platform.
          </p>
        </motion.div>
        <div className="relative mx-auto mt-20 max-w-5xl">
          <div className="absolute top-[36px] right-[16%] left-[16%] hidden h-px bg-zinc-200 lg:block">
            <motion.div
              className="h-full bg-emerald-400"
              animate={{
                width:
                  activeStep === 0 ? "0%" : activeStep === 1 ? "50%" : "100%",
              }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>

          <div className="grid grid-cols-3 gap-3 lg:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className="group relative cursor-pointer text-center outline-none"
                >

                  <div className="relative z-10 mx-auto flex h-[74px] w-[74px] items-center justify-center rounded-full">
                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 1 : 0.7,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="absolute inset-0 rounded-full bg-emerald-200/60 blur-xl"
                    />

                    <motion.div
                      animate={{
                        scale: isActive ? 1 : 0.92,
                        borderColor: isActive
                          ? "rgb(167 243 208)"
                          : "rgb(228 228 231)",
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="relative flex h-[74px] w-[74px] items-center justify-center rounded-full border bg-white shadow-sm"
                    >
                      <motion.div
                        animate={{
                          backgroundColor: isActive
                            ? "rgb(236 253 245)"
                            : "rgb(250 250 250)",
                          color: isActive
                            ? "rgb(5 150 105)"
                            : "rgb(161 161 170)",
                        }}
                        className="flex h-12 w-12 items-center justify-center rounded-full"
                      >
                        <Icon size={22} strokeWidth={1.8} />
                      </motion.div>
                      <motion.span
                        animate={{
                          backgroundColor: isActive
                            ? "rgb(5 150 105)"
                            : "rgb(228 228 231)",
                          color: isActive ? "white" : "rgb(113 113 122)",
                        }}
                        className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold shadow-sm"
                      >
                        {step.number}
                      </motion.span>
                    </motion.div>
                  </div>
                  <div className="mt-5">
                    <motion.h3
                      animate={{
                        color: isActive ? "rgb(5 150 105)" : "rgb(24 24 27)",
                        y: isActive ? -2 : 0,
                      }}
                      className="text-base font-bold sm:text-lg"
                    >
                      {step.title}
                    </motion.h3>

                    <p
                      className={`mx-auto mt-3 max-w-[250px] text-[10px] leading-5 transition-colors duration-300 sm:text-xs ${
                        isActive ? "text-zinc-600" : "text-zinc-400"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <motion.div
          key={activeStep}
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className="mt-14 flex items-center justify-center gap-3"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <p className="text-xs font-semibold tracking-[0.15em] text-emerald-600 uppercase">
            Langkah {active.number} — {active.title}
          </p>
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </motion.div>
        <div className="relative mx-auto mt-8 max-w-5xl">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-900 p-4 shadow-2xl shadow-emerald-200/40 sm:p-6 lg:p-8">
            <div className="pointer-events-none absolute -top-32 right-[-5%] h-96 w-96 rounded-full bg-lime-300/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-[-180px] left-[15%] h-[400px] w-[400px] rounded-full bg-emerald-400/20 blur-3xl" />
            <motion.div
              style={{
                x: useTransform(smoothX, (value) => value * 12),
                y: useTransform(smoothY, (value) => value * 8),
              }}
              className="pointer-events-none absolute top-8 right-8 h-24 w-24 rounded-full border border-white/10"
            />

            <motion.div
              style={{
                x: useTransform(smoothX, (value) => value * -15),
                y: useTransform(smoothY, (value) => value * -10),
              }}
              className="pointer-events-none absolute right-20 bottom-10 h-32 w-32 rounded-full border border-lime-300/10"
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{
                  opacity: 0,
                  x: 45,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: -45,
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                {activeStep === 0 && <DiscoverVisual />}
                {activeStep === 1 && <ChooseVisual />}
                {activeStep === 2 && <EnjoyVisual />}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {steps.map((step, index) => (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(index)}
                aria-label={`Buka langkah ${step.title}`}
                className="cursor-pointer p-1"
              >
                <motion.div
                  animate={{
                    width: activeStep === index ? 28 : 7,
                    opacity: activeStep === index ? 1 : 0.35,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="h-1.5 rounded-full bg-emerald-500"
                />
              </button>
            ))}
          </div>
        </div>
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mx-auto mt-14 flex max-w-2xl items-center justify-center gap-3 text-center"
        >
        </motion.div>
      </div>
    </section>
  );
}
function DiscoverVisual() {
  return (
    <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl">
      <div className="flex h-14 items-center border-b border-zinc-100 px-5 sm:px-7">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
        </div>
        <div className="mx-auto hidden h-8 w-64 items-center justify-center rounded-lg bg-zinc-50 sm:flex">
          <span className="text-[10px] text-zinc-400">shopai.com</span>
        </div>
        <div className="h-7 w-7 rounded-full bg-emerald-50" />
      </div>
      <div className="grid min-h-[330px] lg:grid-cols-[0.85fr_1.15fr]">
        <div className="hidden border-r border-zinc-100 bg-zinc-50/70 p-8 lg:block">
          <div className="mt-12">
            <p className="text-xs font-medium text-zinc-400">TEMUKAN</p>
            <h3 className="mt-3 text-3xl leading-tight font-bold text-zinc-900">
              Temukan produk
              <br />
              favoritmu.
            </h3>
            <p className="mt-4 max-w-xs text-xs leading-5 text-zinc-400">
              Jelajahi berbagai produk dari penjual terpercaya dalam satu
              marketplace.
            </p>
          </div>
          <div className="mt-8 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100">
              <Sparkles size={15} className="text-emerald-600" />
            </div>

            <span className="text-xs font-semibold text-zinc-600">
              Belanja lebih cerdas
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-7 lg:p-8">
          <div className="flex gap-2">
            <div className="flex h-10 flex-1 items-center rounded-xl bg-zinc-50 px-4">
              <Search size={15} className="text-zinc-300" />

              <span className="ml-2 text-[11px] text-zinc-400">
                Cari produk...
              </span>
            </div>

            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600">
              <Search size={16} className="text-white" />
            </button>
          </div>

          <div className="mt-7 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-medium tracking-wider text-emerald-500 uppercase">
                Rekomendasi
              </p>

              <h4 className="mt-1 text-lg font-bold text-zinc-900">
                Pilihan untukmu
              </h4>
            </div>

            <span className="text-[10px] text-zinc-400">24 produk</span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <ProductCard
              category="Aksesori"
              name="Tas Harian"
              price="Rp 249K"
              rating="4.9"
              background="from-emerald-50 to-emerald-100"
              icon="bag"
            />

            <ProductCard
              category="Elektronik"
              name="Perangkat Pintar"
              price="Rp 899K"
              rating="4.8"
              background="from-lime-50 to-lime-100"
            />

            <ProductCard
              category="Gaya Hidup"
              name="Kebutuhan Harian"
              price="Rp 159K"
              rating="4.9"
              background="from-zinc-50 to-zinc-100"
            />
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-5">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100">
                <Check size={13} className="text-emerald-600" />
              </div>

              <span className="text-[10px] text-zinc-500">Pembayaran aman</span>
            </div>

            <button className="flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-[10px] font-semibold text-white">
              Lanjutkan
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   02 — PILIH
============================================================ */

function ChooseVisual() {
  return (
    <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl">
      <div className="flex h-14 items-center border-b border-zinc-100 px-5 sm:px-7">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
        </div>

        <div className="mx-auto hidden h-8 w-64 items-center justify-center rounded-lg bg-zinc-50 sm:flex">
          <span className="text-[10px] text-zinc-400">shopai.com/product</span>
        </div>

        <div className="h-7 w-7 rounded-full bg-emerald-50" />
      </div>

      <div className="grid min-h-[330px] lg:grid-cols-2">
        <div className="border-r border-zinc-100 p-6 sm:p-8">
          <div className="relative flex h-[230px] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 to-lime-50">
            <div className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
              <Heart size={16} className="text-zinc-400" />
            </div>

            <div className="flex h-32 w-36 rotate-[-5deg] items-center justify-center rounded-[2rem] bg-white shadow-xl">
              <ShoppingBag
                size={55}
                strokeWidth={1.2}
                className="text-emerald-500"
              />
            </div>

            <div className="absolute bottom-4 left-4 rounded-xl bg-white px-3 py-2 shadow-sm">
              <div className="flex items-center gap-1">
                <Star size={11} className="fill-amber-400 text-amber-400" />

                <span className="text-[10px] font-bold text-zinc-700">4.9</span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-[10px] text-zinc-400">Aksesori</p>

            <h3 className="mt-1 text-xl font-bold text-zinc-900">
              Tas Harian Premium
            </h3>

            <p className="mt-2 text-xs leading-5 text-zinc-400">
              Desain modern dengan material berkualitas untuk menemani aktivitas
              sehari-hari.
            </p>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-bold text-emerald-600">
                Rp 249.000
              </span>

              <span className="text-[10px] text-zinc-400">Stok tersedia</span>
            </div>
          </div>
        </div>

        <div className="bg-zinc-50/70 p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-medium tracking-wider text-emerald-500 uppercase">
                PILIHANMU
              </p>

              <h3 className="mt-1 text-lg font-bold text-zinc-900">
                Siap untuk dibeli
              </h3>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100">
              <Check size={17} className="text-emerald-600" />
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                  <ShoppingBag size={18} className="text-emerald-500" />
                </div>

                <div>
                  <p className="text-xs font-bold text-zinc-800">
                    Tas Harian Premium
                  </p>

                  <p className="mt-1 text-[10px] text-zinc-400">1 produk</p>
                </div>
              </div>

              <span className="text-xs font-bold text-zinc-800">Rp 249K</span>
            </div>

            <div className="rounded-2xl bg-white p-4">
              <div className="flex justify-between">
                <span className="text-[10px] text-zinc-400">Subtotal</span>

                <span className="text-xs font-semibold text-zinc-700">
                  Rp 249.000
                </span>
              </div>

              <div className="mt-3 flex justify-between">
                <span className="text-[10px] text-zinc-400">Pengiriman</span>

                <span className="text-xs font-semibold text-emerald-600">
                  Gratis
                </span>
              </div>

              <div className="mt-4 border-t border-zinc-100 pt-4">
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-zinc-800">Total</span>

                  <span className="text-sm font-bold text-emerald-600">
                    Rp 249.000
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-xs font-bold text-white shadow-lg shadow-emerald-200">
            Lanjut ke pembayaran
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   03 — NIKMATI
============================================================ */

function EnjoyVisual() {
  return (
    <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl">
      <div className="flex h-14 items-center border-b border-zinc-100 px-5 sm:px-7">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
        </div>

        <div className="mx-auto hidden h-8 w-64 items-center justify-center rounded-lg bg-zinc-50 sm:flex">
          <span className="text-[10px] text-zinc-400">shopai.com/orders</span>
        </div>

        <div className="h-7 w-7 rounded-full bg-emerald-50" />
      </div>

      <div className="min-h-[330px] bg-zinc-50/60 p-6 sm:p-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{
              scale: 0.7,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.5,
              delay: 0.15,
            }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100"
          >
            <CheckCircle2
              size={31}
              className="text-emerald-600"
              strokeWidth={1.8}
            />
          </motion.div>

          <p className="mt-4 text-[10px] font-semibold tracking-wider text-emerald-500 uppercase">
            PESANAN BERHASIL
          </p>

          <h3 className="mt-1 text-2xl font-bold text-zinc-900">
            Pesananmu sedang dalam perjalanan.
          </h3>

          <p className="mt-2 text-xs text-zinc-400">
            Terima kasih sudah berbelanja bersama ShopAI.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-3xl rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-zinc-400">Nomor pesanan</p>

              <p className="mt-1 text-xs font-bold text-zinc-800">#SA-240826</p>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

              <span className="text-[9px] font-semibold text-emerald-600">
                Sedang dikirim
              </span>
            </div>
          </div>

          <div className="relative mt-8">
            <div className="absolute top-4 right-8 left-8 h-1 rounded-full bg-zinc-100" />

            <div className="absolute top-4 right-1/2 left-8 h-1 rounded-full bg-emerald-500" />

            <div className="relative grid grid-cols-4">
              <TrackingStep icon={Check} title="Pesanan" active />

              <TrackingStep icon={PackageCheck} title="Diproses" active />

              <TrackingStep icon={Truck} title="Dikirim" active />

              <TrackingStep icon={MapPin} title="Selesai" />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-5 flex max-w-3xl items-center justify-between rounded-2xl bg-white px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
              <Sparkles size={17} className="text-emerald-500" />
            </div>

            <div>
              <p className="text-xs font-bold text-zinc-800">Semua siap.</p>

              <p className="mt-0.5 text-[10px] text-zinc-400">
                Tinggal tunggu pesanan sampai.
              </p>
            </div>
          </div>

          <button className="flex items-center gap-2 rounded-xl border border-zinc-100 px-3 py-2 text-[10px] font-semibold text-zinc-600">
            Lihat pesanan
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PRODUCT CARD
============================================================ */

function ProductCard({
  category,
  name,
  price,
  rating,
  background,
  icon,
}: {
  category: string;
  name: string;
  price: string;
  rating: string;
  background: string;
  icon?: "bag";
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-100 bg-white">
      <div
        className={`relative h-28 overflow-hidden bg-gradient-to-br ${background}`}
      >
        {icon === "bag" ? (
          <div className="absolute top-4 left-4 flex h-9 w-9 rotate-[-8deg] items-center justify-center rounded-lg bg-white shadow-sm">
            <ShoppingBag size={17} className="text-emerald-500" />
          </div>
        ) : (
          <div className="absolute top-5 left-1/2 flex h-12 w-16 -translate-x-1/2 items-center justify-center rounded-xl bg-white shadow-sm">
            <Sparkles size={17} className="text-zinc-300" />
          </div>
        )}

        <button className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm">
          <Heart size={13} className="text-zinc-400" />
        </button>
      </div>

      <div className="p-3">
        <p className="text-[9px] text-zinc-400">{category}</p>

        <p className="mt-1 text-xs font-bold text-zinc-800">{name}</p>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-[10px] font-bold text-emerald-600">
            {price}
          </span>

          <div className="flex items-center gap-1">
            <Star size={10} className="fill-amber-400 text-amber-400" />

            <span className="text-[9px] text-zinc-400">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   TRACKING STEP
============================================================ */

function TrackingStep({
  icon: Icon,
  title,
  active = false,
}: {
  icon: typeof Check;
  title: string;
  active?: boolean;
}) {
  return (
    <div className="relative flex flex-col items-center">
      <div
        className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${
          active
            ? "bg-emerald-500 text-white"
            : "border border-zinc-200 bg-white text-zinc-300"
        }`}
      >
        <Icon size={13} />
      </div>

      <p
        className={`mt-2 text-[9px] font-semibold ${
          active ? "text-zinc-700" : "text-zinc-400"
        }`}
      >
        {title}
      </p>
    </div>
  );
}
