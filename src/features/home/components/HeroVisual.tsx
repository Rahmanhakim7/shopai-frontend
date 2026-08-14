"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import { CheckCircle2, Plus, Sparkles } from "lucide-react";
import { useEffect } from "react";

const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    x: 80,
  },
  show: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const floatingImageVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.9,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.9,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HeroVisual() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 20,
    mass: 0.5,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 20,
    mass: 0.5,
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

  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block">
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="absolute top-[12%] left-[55%] z-20"
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0,
            rotate: -45,
          }}
          animate={{
            opacity: [0, 1, 0.7],
            scale: [0, 1.2, 1],
            rotate: 0,
          }}
          transition={{
            duration: 1,
            delay: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Sparkles size={30} strokeWidth={1.5} className="text-lime-300/75" />
        </motion.div>
      </motion.div>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.35, 1, 0.35],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[48%] right-[7%] z-20"
      >
        <Sparkles size={24} strokeWidth={1.5} className="text-white/45" />
      </motion.div>
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[29%] left-[52%] z-20"
      >
        <Plus size={19} strokeWidth={1.5} className="text-white/35" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -8, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[3%] bottom-[31%] z-20"
      >
        <Plus size={16} strokeWidth={1.5} className="text-lime-300/45" />
      </motion.div>
      <motion.div
        variants={floatingImageVariants}
        initial="hidden"
        animate="show"
        style={{
          x: useSpring(mouseX, {
            stiffness: 50,
            damping: 20,
          }),
        }}
        className="absolute right-[8%] bottom-[-2%] z-10 xl:right-[9%]"
      >
        <motion.div
          animate={{
            y: [0, -8, 0],
            rotate: [0, 1, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/home/kardus.png"
            alt=""
            width={512}
            height={308}
            className="w-[250px] xl:w-[290px]"
          />
        </motion.div>
      </motion.div>
      <motion.div
        variants={floatingImageVariants}
        initial="hidden"
        animate="show"
        transition={{
          delay: 0.25,
        }}
        className="absolute right-[26%] bottom-[3%] z-[15] xl:right-[26%]"
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, -1, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/home/tas.png"
            alt=""
            width={512}
            height={308}
            className="w-[220px] xl:w-[260px]"
          />
        </motion.div>
      </motion.div>
      <motion.div
        variants={floatingImageVariants}
        initial="hidden"
        animate="show"
        transition={{
          delay: 0.4,
        }}
        className="absolute top-[40%] right-[22%] z-10 xl:right-[22%]"
      >
        <motion.div
          animate={{
            y: [0, -12, 0],
            rotate: [0, 1.5, 0],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/home/keranjang.png"
            alt=""
            width={512}
            height={308}
            className="w-[340px] xl:w-[390px]"
          />
        </motion.div>
      </motion.div>
      <motion.div
        variants={imageVariants}
        initial="hidden"
        animate="show"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="absolute top-[2%] right-[-1%] z-30"
      >
        <motion.div
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/home/handphone.png"
            alt="ShopAI application"
            width={412}
            height={208}
            priority
            className="w-[520px] xl:w-[600px]"
          />
        </motion.div>
      </motion.div>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="show"
        transition={{
          delay: 1.1,
        }}
        className="absolute top-[25%] right-[29%] z-40 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-xl backdrop-blur-sm"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
          <Sparkles size={21} className="text-emerald-500" />
        </div>

        <div>
          <p className="text-sm font-bold text-gray-900">Easy Shopping</p>

          <p className="text-xs text-gray-500">Simple & convenient</p>
        </div>
      </motion.div>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="show"
        transition={{
          delay: 1.35,
        }}
        className="absolute right-[6%] bottom-[18%] z-40 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-xl backdrop-blur-sm"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
          <CheckCircle2 size={21} className="text-emerald-500" />
        </div>

        <div>
          <p className="text-sm font-bold text-gray-900">Order Confirmed</p>

          <p className="text-xs text-gray-500">Your order is on the way</p>
        </div>
      </motion.div>
    </div>
  );
}
