/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { BookingModalProvider } from "./context/BookingModalContext.tsx";
import { BookingModal } from "./components/BookingModal.tsx";
import { LuxuryLoader } from "./components/LuxuryLoader.tsx";
import { CustomCursor } from "./components/CustomCursor.tsx";
import { Navbar } from "./components/Navbar.tsx";
import { HeroSection } from "./components/HeroSection.tsx";
import { ServicesSection } from "./components/ServicesSection.tsx";
import { CinematicShowcase } from "./components/CinematicShowcase.tsx";
import { WhySignature } from "./components/WhySignature.tsx";
import { ReviewsSection } from "./components/ReviewsSection.tsx";
import { ProcessTimeline } from "./components/ProcessTimeline.tsx";
import { FaqSection } from "./components/FaqSection.tsx";
import { CtaSection } from "./components/CtaSection.tsx";
import { Footer } from "./components/Footer.tsx";
import { FloatingInstagramButton } from "./components/FloatingInstagramButton.tsx";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage.tsx";
import { TermsConditionsPage } from "./pages/TermsConditionsPage.tsx";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentHash, setCurrentHash] = useState<string>(() => {
    return typeof window !== "undefined" ? window.location.hash || "" : "";
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || "";
      setCurrentHash(hash);
      window.scrollTo({ top: 0, behavior: "smooth" });

      if (hash.includes("privacy-policy")) {
        document.title = "Privacy Policy | Signature Duct Cleaning USA";
      } else if (hash.includes("terms-and-conditions")) {
        document.title = "Terms & Conditions | Signature Duct Cleaning USA";
      } else {
        document.title = "Signature Duct Cleaning | Air Duct, Dryer Vent & HVAC Cleaning USA";
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const isPrivacyPolicy = currentHash.includes("privacy-policy");
  const isTermsConditions = currentHash.includes("terms-and-conditions");

  return (
    <BookingModalProvider>
      <div className="min-h-screen bg-[#050505] text-[#F3F4F6] selection:bg-[#D6A447]/30 selection:text-white relative">
        {/* Luxury Loader on initial load */}
        {loading && <LuxuryLoader onComplete={() => setLoading(false)} />}

        {/* Desktop Custom Cursor */}
        <CustomCursor />

        {/* Primary Top Bar Navbar */}
        <Navbar />

        {/* Dynamic Route View */}
        {isPrivacyPolicy ? (
          <main className="relative z-10">
            <PrivacyPolicyPage />
          </main>
        ) : isTermsConditions ? (
          <main className="relative z-10">
            <TermsConditionsPage />
          </main>
        ) : (
          <main className="relative z-10">
            {/* 1. Cinematic Hero Section */}
            <HeroSection />

            {/* 2. Experimental Services Section (5 Unique Presentations) */}
            <ServicesSection />

            {/* 3. Cinematic Service Showcase (The Purification Journey) */}
            <CinematicShowcase />

            {/* 4. Brand Storytelling: Why Signature Duct Cleaning? */}
            <WhySignature />

            {/* 5. Verified Client Reviews Section */}
            <ReviewsSection />

            {/* 6. Operational Blueprint: How Our Process Works */}
            <ProcessTimeline />

            {/* 7. Interactive FAQ Accordion */}
            <FaqSection />

            {/* 8. Premium Full-Width CTA Section */}
            <CtaSection />
          </main>
        )}

        {/* 10. Unconventional Luxury Footer */}
        <Footer />

        {/* Redesigned Small Circular Instagram Button */}
        <FloatingInstagramButton />

        {/* Global Popup Booking Modal (Used by all booking buttons) */}
        <BookingModal />
      </div>
    </BookingModalProvider>
  );
}
