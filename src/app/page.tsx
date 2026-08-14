"use client";

import BuyerLayout from "@/layouts/buyerlayouts";

import HeroSection from "@/features/home/components/HeroElement";
import WhyShopAlSection from "@/features/home/components/WhyShopAISection";
import HowShopAIWorksSection from "@/features/home/components/HowShopAIWorksSection";
import FeaturedProductsSection from "@/features/home/components/FeaturedProductsSection";
import BuyerOrGuestGuard from "@/components/guards/BuyerOrGuestGuard";

export default function HomePage() {
  return (
    <BuyerOrGuestGuard>
      <BuyerLayout>
        <HeroSection />
        <WhyShopAlSection />
        <HowShopAIWorksSection />
        <FeaturedProductsSection />
      </BuyerLayout>
    </BuyerOrGuestGuard>
  );
}
