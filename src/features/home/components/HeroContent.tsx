"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, ShoppingBag, Users } from "lucide-react";

const stats = [
  {
    icon: ShoppingBag,
    value: "10K+",
    label: "Products",
  },
  {
    icon: Users,
    value: "5K+",
    label: "Active Users",
  },
  {
    icon: ShieldCheck,
    value: "99%",
    label: "Secure Transactions",
  },
];

const textContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const textItem = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HeroContent() {
  return (
    <motion.div
      variants={textContainer}
      initial="hidden"
      animate="show"
      className="absolute top-1/2 left-8 z-40 w-[46%] -translate-y-1/2 lg:left-12"
    >
      <motion.h1
        variants={textItem}
        className="text-5xl leading-[1.02] font-bold tracking-tight text-white sm:text-6xl lg:text-[64px] xl:text-[72px]"
      >
        Discover.
        <br />
        <span className="text-lime-300">Shop</span> smarter.
      </motion.h1>

      <motion.p
        variants={textItem}
        className="mt-6 max-w-[570px] text-base leading-7 text-white/90 lg:text-lg"
      >
        Temukan produk terbaik dari berbagai penjual terpercaya dalam satu
        marketplace yang modern, aman, dan mudah digunakan.
      </motion.p>

      <motion.div variants={textItem} className="mt-8 flex gap-5">
        <Link
          href="/products"
          className="group inline-flex h-[58px] items-center gap-3 rounded-xl bg-white px-7 font-semibold text-emerald-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          Explore Shop
          <ArrowRight
            size={22}
            strokeWidth={2.5}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>

        <Link
          href="/register"
          className="inline-flex h-[58px] items-center rounded-xl border border-white/80 px-7 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-emerald-700"
        >
          Get Started
        </Link>
      </motion.div>

      <motion.div variants={textItem} className="mt-8 flex items-center gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.7 + index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-center"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                  <Icon size={23} className="text-lime-300" />
                </div>

                <div>
                  <p className="text-xl font-bold text-white">{stat.value}</p>

                  <p className="text-sm text-white/70">{stat.label}</p>
                </div>
              </div>

              {index !== stats.length - 1 && (
                <div className="ml-4 h-9 w-px bg-white/20" />
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
