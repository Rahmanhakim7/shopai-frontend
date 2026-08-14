import {
  ArrowRight,
  CheckCircle2,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
} from "lucide-react";
import { motion } from "motion/react";

export default function WhyShopAlSection() {
  return (
    <section className="relative overflow-hidden bg-white py-10 lg:py-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-32 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl" />
        <div className="absolute right-[-120px] bottom-10 h-80 w-80 rounded-full bg-lime-100/40 blur-3xl" />
        <div className="absolute top-[45%] left-[48%] h-2 w-2 rounded-full bg-emerald-400/40" />
        <div className="absolute top-[30%] right-[20%] h-2 w-2 rounded-full bg-lime-400/50" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-4xl leading-[1.05] font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl"
          >
            Semua yang kamu butuhkan untuk{" "}
            <span className="text-emerald-600">belanja lebih cerdas.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl text-base leading-7 text-zinc-500 sm:text-lg"
          >
            Pengalaman belanja yang lebih sederhana, aman, dan nyaman. Temukan
            produk terbaik dari berbagai penjual terpercaya dalam satu platform.
          </motion.p>
        </div>

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="group rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-xl hover:shadow-emerald-100/40"
            >
              <div className="flex gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                  <Search size={25} />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-zinc-900">
                        Belanja Lebih Mudah
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-zinc-500">
                        Temukan produk yang kamu cari dengan cepat melalui
                        pengalaman belanja yang sederhana dan intuitif.
                      </p>
                    </div>

                    <ArrowRight
                      size={20}
                      className="mt-1 shrink-0 text-zinc-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="group rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-xl hover:shadow-emerald-100/40"
            >
              <div className="flex gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                  <ShieldCheck size={25} />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-zinc-900">
                        Transaksi Aman
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-zinc-500">
                        Bertransaksi dengan lebih tenang melalui sistem yang
                        dirancang untuk menjaga keamanan setiap pesanan.
                      </p>
                    </div>

                    <ArrowRight
                      size={20}
                      className="mt-1 shrink-0 text-zinc-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="group rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-xl hover:shadow-emerald-100/40"
            >
              <div className="flex gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                  <Store size={25} />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-zinc-900">
                        Penjual Terpercaya
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-zinc-500">
                        Jelajahi berbagai produk dari penjual terpercaya dan
                        temukan pilihan yang sesuai kebutuhanmu.
                      </p>
                    </div>

                    <ArrowRight
                      size={20}
                      className="mt-1 shrink-0 text-zinc-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            {/* Main visual */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-800 p-8 shadow-2xl shadow-emerald-200/50 sm:p-10 lg:p-12">
              {/* Glow */}
              <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-lime-300/20 blur-3xl" />

              <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />

              {/* Decorative circles */}
              <div className="absolute top-8 right-8 h-20 w-20 rounded-full border border-white/10" />

              <div className="absolute right-16 bottom-12 h-28 w-28 rounded-full border border-lime-300/10" />

              {/* Visual content */}
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/60">
                      Pengalaman ShopAI
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                      Belanja dengan percaya diri.
                    </h3>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
                    <Sparkles size={23} className="text-lime-300" />
                  </div>
                </div>

                {/* Fake product interface */}
                <div className="mt-10 rounded-3xl bg-white/10 p-4 backdrop-blur-md">
                  <div className="rounded-2xl bg-white p-5 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-zinc-400">
                          Produk Pilihan
                        </p>

                        <p className="mt-1 text-lg font-bold text-zinc-900">
                          Temukan produk favoritmu
                        </p>
                      </div>

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
                        <Search size={17} className="text-emerald-600" />
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-3">
                      <div className="h-24 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100" />
                      <div className="h-24 rounded-2xl bg-gradient-to-br from-lime-50 to-lime-100" />
                      <div className="h-24 rounded-2xl bg-gradient-to-br from-zinc-50 to-zinc-100" />
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <div>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className="text-xs text-amber-400">
                              ★
                            </span>
                          ))}
                        </div>

                        <p className="mt-1 text-xs text-zinc-400">
                          Dipercaya oleh ribuan pembeli
                        </p>
                      </div>

                      <CheckCircle2 size={24} className="text-emerald-500" />
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -right-3 bottom-8 rounded-2xl bg-white px-4 py-3 shadow-xl sm:-right-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
                      <CheckCircle2 size={19} className="text-emerald-500" />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-zinc-900">Aman</p>

                      <p className="text-[10px] text-zinc-400">
                        Pengalaman belanja
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
