"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import Button from "@/components/ui/Button";
import BuyerLayout from "@/layouts/buyerlayouts";
import Reveal from "@/components/animations/Reveal";

export default function HomePage() {
  return (
    <BuyerLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-100" />
        <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-green-300/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center rounded-full bg-green-100/80 px-4 py-1.5 text-xs font-medium text-green-700 backdrop-blur-sm">
              ✨ Marketplace Platform
            </div>
            <h1 className="max-w-xl text-5xl leading-tight font-bold md:text-6xl">
              Modern Marketplace
              <span className="text-green-600"> Platform </span>
              For Everyone
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-600">
              Platform marketplace modern untuk buyer, seller, dan admin dengan
              dashboard cepat, aman, dan mudah digunakan.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/register">
                <Button variant="success" size="md">
                  Get Started
                </Button>
              </Link>
              <Link href="/shop">
                <Button variant="secondary" size="md">
                  Explore Platform
                </Button>
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-4">
              <div className="rounded-3xl bg-white/80 p-5 shadow-lg shadow-green-100 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-green-600">10K+</h3>
                <p className="mt-1 text-xs text-zinc-500">Products</p>
              </div>

              <div className="rounded-3xl bg-white/80 p-5 shadow-lg shadow-green-100 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-green-600">5K+</h3>
                <p className="mt-1 text-xs text-zinc-500">Active Users</p>
              </div>

              <div className="rounded-3xl bg-white/80 p-5 shadow-lg shadow-green-100 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-green-600">99%</h3>
                <p className="mt-1 text-xs text-zinc-500">
                  Secure Transactions
                </p>
              </div>
            </div>
          </div>
          <motion.div
            className="relative"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="absolute -top-8 -right-8 h-40 w-40 rounded-full bg-green-300/30 blur-3xl" />
            <div className="relative overflow-hidden rounded-[32px] bg-white/90 shadow-2xl ring-1 shadow-green-100 ring-white/50 backdrop-blur-sm">
              <Image
                src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop"
                alt="Marketplace"
                width={1200}
                height={700}
                className="h-[360px] w-full object-cover"
                unoptimized
              />

              <div className="grid grid-cols-3 gap-4 p-6">
                <div className="rounded-2xl bg-gradient-to-br from-white to-green-50 p-4 shadow-md transition hover:shadow-lg">
                  <p className="text-xs text-zinc-500">Revenue</p>
                  <h3 className="mt-1 text-lg font-bold">$12.4K</h3>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-white to-green-50 p-4 shadow-md transition hover:shadow-lg">
                  <p className="text-xs text-zinc-500">Orders</p>
                  <h3 className="mt-1 text-lg font-bold">1.2K</h3>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-white to-green-50 p-4 shadow-md transition hover:shadow-lg">
                  <p className="text-xs text-zinc-500">Users</p>
                  <h3 className="mt-1 text-lg font-bold">890</h3>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <section id="features" className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 text-center">
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
            Features
          </span>

          <h2 className="mt-5 text-4xl font-bold">
            Powerful Features For Modern Marketplace
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-zinc-500">
            Semua kebutuhan marketplace modern dalam satu platform yang cepat,
            aman, dan mudah digunakan.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              icon: "🔒",
              title: "Secure Transactions",
              desc: "Transaksi aman dan terpercaya dengan sistem keamanan modern.",
            },
            {
              icon: "📦",
              title: "Easy Product Management",
              desc: "Kelola produk, stok, dan kategori dengan mudah.",
            },
            {
              icon: "📊",
              title: "Real-Time Dashboard",
              desc: "Pantau performa marketplace secara realtime.",
            },
          ].map((feature, index) => (
            <Reveal key={index} delay={index * 0.15}>
              <div
                className="group relative overflow-hidden rounded-[32px] bg-white/80 p-8 shadow-lg shadow-green-100 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-green-200/20 blur-3xl transition-all duration-300 group-hover:bg-green-300/30" />

                <div className="relative">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-100 to-green-200 text-2xl shadow-md">
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-semibold text-zinc-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 leading-relaxed text-zinc-500">
                    {feature.desc}
                  </p>

                  <div className="mt-6 flex items-center text-sm font-medium text-green-600">
                    Learn More →
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section
        id="about"
        className="relative overflow-hidden bg-gradient-to-b from-white to-green-50 py-24"
      >
        <div className="absolute top-20 left-0 h-72 w-72 rounded-full bg-green-200/20 blur-3xl" />

        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-emerald-200/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
          <div className="relative">
            <div className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-green-300/20 blur-3xl" />

            <div className="overflow-hidden rounded-[32px] bg-white p-3 shadow-2xl shadow-green-100">
              <Image
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop"
                alt="Marketplace"
                width={1000}
                height={700}
                className="rounded-[24px] object-cover"
                unoptimized
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              Tentang ShopAI
            </span>

            <h2 className="mt-5 text-4xl leading-tight font-bold">
              Marketplace Modern untuk
              <span className="text-green-600"> Semua Kebutuhan </span>
            </h2>

            <p className="mt-6 text-base leading-relaxed text-zinc-600">
              ShopAI menghadirkan pengalaman belanja online yang mudah, aman,
              dan nyaman. Temukan berbagai produk dari berbagai penjual dalam
              satu platform yang dirancang untuk membantu pembeli dan penjual
              terhubung dengan lebih baik.
            </p>

            {/* Benefits */}
            <div className="mt-10 space-y-5">
              <div className="rounded-3xl bg-white/80 p-5 shadow-lg shadow-green-100 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-xl">
                    ⚡
                  </div>

                  <div>
                    <h3 className="font-semibold text-zinc-900">
                      Proses Cepat
                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">
                      Cari produk, lakukan pemesanan, dan selesaikan transaksi
                      dengan lebih mudah dan efisien.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white/80 p-5 shadow-lg shadow-green-100 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-xl">
                    🛍️
                  </div>

                  <div>
                    <h3 className="font-semibold text-zinc-900">
                      Pilihan Produk Beragam
                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">
                      Jelajahi berbagai kategori produk dari banyak penjual
                      dalam satu tempat yang praktis.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white/80 p-5 shadow-lg shadow-green-100 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-xl">
                    🤝
                  </div>

                  <div>
                    <h3 className="font-semibold text-zinc-900">
                      Aman dan Terpercaya
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500">
                      Mendukung pengalaman bertransaksi yang aman, transparan,
                      dan nyaman bagi semua pengguna.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer
        id="contact"
        className="relative overflow-hidden bg-gradient-to-b from-white to-green-50"
      >
        {/* CTA */}
        <div className="mx-auto max-w-7xl px-6 pt-24">
          <div className="rounded-[32px] bg-gradient-to-r from-green-600 to-emerald-600 p-10 text-white shadow-2xl">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div>
                <h2 className="text-3xl font-bold">
                  Mulai Jelajahi Produk Favoritmu
                </h2>

                <p className="mt-2 text-green-100">
                  Temukan berbagai produk menarik dari penjual terpercaya dalam
                  satu platform.
                </p>
              </div>

              <Link href="/shop">
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-green-50"
                >
                  Belanja Sekarang
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mx-auto mt-20 grid max-w-7xl grid-cols-1 gap-10 px-6 pb-12 md:grid-cols-4">
          <div>
            <h2 className="text-3xl font-bold text-green-600">ShopAI</h2>

            <p className="mt-4 leading-relaxed text-zinc-500">
              Platform marketplace yang membantu pembeli menemukan produk
              terbaik dan mendukung penjual menjangkau lebih banyak pelanggan.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-zinc-900">Navigasi</h3>

            <ul className="space-y-3 text-zinc-500">
              <li>
                <Link href="/">Beranda</Link>
              </li>

              <li>
                <Link href="/shop">Produk</Link>
              </li>

              <li>
                <a href="#about">Tentang</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-zinc-900">Bantuan</h3>

            <ul className="space-y-3 text-zinc-500">
              <li>Pusat Bantuan</li>
              <li>Kebijakan Privasi</li>
              <li>Syarat & Ketentuan</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-zinc-900">Hubungi Kami</h3>

            <ul className="space-y-3 text-zinc-500">
              <li>support@shopai.com</li>
              <li>+62 812 3456 7890</li>
              <li>Indonesia</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-200 py-6 text-center text-sm text-zinc-500">
          © 2026 ShopAI. Semua hak dilindungi.
        </div>
      </footer>
    </BuyerLayout>
  );
}
