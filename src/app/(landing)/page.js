"use client";

import { useEffect } from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import HeroSection from "@/components/landing/HeroSection";
import LiveMatchesSection from "@/components/landing/LiveMatchesSection";
import ManifestoSection from "@/components/landing/ManifestoSection";
import ProcessSection from "@/components/landing/ProcessSection";
import IndexStatsSection from "@/components/landing/IndexStatsSection";
import FilterSection from "@/components/landing/FilterSection";
import RecentMatchesSection from "@/components/landing/RecentMatchesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import JoinCTASection from "@/components/landing/JoinCTASection";
import LandingFooter from "@/components/landing/LandingFooter";

export default function LandingPage() {
  useEffect(() => {
    document.title = "Covental | The talent network";
  }, []);

  return (
    <>
      <div className="landing-hero-shell relative overflow-x-clip">
        <div className="landing-header-glow" aria-hidden />
        <LandingHeader />
        <HeroSection />
      </div>
      <main>
        <LiveMatchesSection />
        <ManifestoSection />
        <ProcessSection />
        <IndexStatsSection />
        <FilterSection />
        <RecentMatchesSection />
        <TestimonialsSection />
        <FAQSection />
        <JoinCTASection />
      </main>
      <LandingFooter />
    </>
  );
}
