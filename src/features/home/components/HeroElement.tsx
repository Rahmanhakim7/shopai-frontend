"use client";

import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";  

export default function HeroSection() {
  return (
    <section className="relative min-h-[400px] overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-700 xl:min-h-[400px]">
      <div className="relative mx-auto h-[500px] max-w-[1440px] px-8 lg:px-12 xl:h-[550px]">
        <HeroContent />
        <HeroVisual />
      </div>
    </section>
  );
}