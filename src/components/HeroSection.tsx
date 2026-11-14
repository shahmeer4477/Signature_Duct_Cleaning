import React, { useState } from "react";
import { GoldParticlesCanvas } from "./GoldParticlesCanvas.tsx";
import { INSTAGRAM_URL } from "../constants/brand.ts";
import { Instagram, ArrowDown, Sparkles } from "lucide-react";
import { useBookingModal } from "../context/BookingModalContext.tsx";
import heroLuxuryPenthouse from "../assets/images/hero_luxury_penthouse_1794245179401.jpg";

export const HeroSection: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { openBookingModal } = useBookingModal();

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-[95vh] lg:min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 lg:px-12 overflow-hidden bg-[#050505]"
    >
      {/* Background Image with Cinematic Overlay & Parallax */}
      <div
        className="absolute inset-0 z-0 scale-105 transition-transform duration-1000 ease-out will-change-transform"
        style={{
          transform: `translate3d(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px, 0) scale(1.04)`,
        }}
      >
        <img
          src={heroLuxuryPenthouse}
          alt="Signature Duct Cleaning — Professional air duct, dryer vent, and HVAC cleaning for residential and commercial properties in the USA"
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.12]"
        />
        {/* Dark Architectural Gradients & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]/90" />
        <div
          className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-700"
          style={{
            background: `radial-gradient(800px circle at ${50 + mousePos.x}% ${40 + mousePos.y}%, rgba(214, 164, 71, 0.12), transparent 70%)`,
          }}
        />
      </div>

      {/* Floating Gold Dust Particles */}
      <GoldParticlesCanvas density={50} />

      {/* Architectural Fine Grid Accent Lines */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-15 bg-[radial-gradient(#D6A447_1px,transparent_1px)] [background-size:48px_48px]" />

      {/* Hero Centerpiece Content */}
      <div className="relative z-20 max-w-5xl mx-auto my-auto text-center flex flex-col items-center">
        {/* Official Company Logo in a Perfect Circular Frame */}
        <div className="mb-6 lg:mb-8 transition-transform duration-700 hover:scale-105">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-56 lg:h-56 rounded-full bg-[#020202] border border-[#D6A447]/70 shadow-[0_0_30px_rgba(214,164,71,0.22),0_0_60px_rgba(214,164,71,0.08)] p-3 sm:p-4 flex items-center justify-center overflow-hidden mx-auto group">
            {/* Thin inner gold hairline for refined luxury depth */}
            <div className="absolute inset-[3px] rounded-full border border-[#D6A447]/25 pointer-events-none" />
            <img
              src="/signature-logo.jpeg"
              alt="Signature Duct Cleaning — Air Duct, Dryer Vent &amp; HVAC Cleaning USA Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_4px_16px_rgba(214,164,71,0.2)] transition-transform duration-500 group-hover:scale-105"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>

        {/* Category Lead-in */}
        <div className="flex items-center gap-3 text-xs tracking-[0.35em] text-[#C7C7C7]/80 uppercase mb-4">
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#D6A447]" />
          <span>High-Precision Environmental Care</span>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#D6A447]" />
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[1.05] max-w-4xl text-balance mb-6">
          <span className="block font-display">THE ART OF</span>
          <span className="block font-display gold-shimmer-text drop-shadow-[0_4px_30px_rgba(214,164,71,0.3)]">
            CLEANER AIR.
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="text-base sm:text-lg md:text-xl text-[#C7C7C7] max-w-2xl font-light tracking-wide leading-relaxed mb-10 text-balance">
          Premium Air Duct, Dryer Vent &amp; HVAC Cleaning Solutions for Healthier Living.
        </p>

        {/* Premium CTA Buttons — Booking is Primary */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          {/* Primary CTA: Book Appointment */}
          <button
            onClick={() => openBookingModal()}
            className="w-full sm:w-auto px-9 py-4 text-xs font-bold tracking-[0.2em] uppercase text-[#050505] bg-gradient-to-r from-[#D6A447] via-[#F4E2B5] to-[#D6A447] hover:from-[#E2BA59] hover:via-[#FFF] hover:to-[#E2BA59] rounded-sm transition-all duration-300 shadow-[0_0_30px_rgba(214,164,71,0.5)] hover:shadow-[0_0_45px_rgba(214,164,71,0.8)] flex items-center justify-center gap-3 group active:scale-[0.98] cursor-pointer"
          >
            <span>BOOK AN APPOINTMENT</span>
            <span className="text-[#050505] text-sm group-hover:translate-x-1 transition-transform">→</span>
          </button>

          {/* Secondary CTA: Explore Our Services */}
          <a
            href="#services"
            className="w-full sm:w-auto px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase text-white bg-[#0D0D11] hover:bg-[#14141A] border border-[#D6A447]/40 hover:border-[#D6A447] rounded-sm transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.6)] hover:shadow-[0_0_25px_rgba(214,164,71,0.3)] flex items-center justify-center gap-3 group"
          >
            <span>EXPLORE OUR SERVICES</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#D6A447] group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Hero Bottom Architectural Strip: Unboxed Clean Metadata */}
      <div className="relative z-20 max-w-6xl mx-auto w-full pt-8 border-t border-[#D6A447]/20 flex flex-wrap items-center justify-between gap-6 text-xs text-[#C7C7C7]">
        <div className="flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-[#D6A447]" />
          <span className="tracking-[0.16em] uppercase text-white font-medium">Mechanical Purity Standard</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.2em] uppercase text-[#A1A1AA]">
          <span>Rotary Agitation Extraction</span>
          <span aria-hidden="true" className="text-[#D6A447]">·</span>
          <span>HEPA 99.97% Containment</span>
          <span aria-hidden="true" className="text-[#D6A447]">·</span>
          <span>Residential &amp; Luxury Estates</span>
        </div>
        <a
          href="#services"
          className="text-[11px] tracking-[0.2em] uppercase text-[#D6A447] hover:text-white transition-colors flex items-center gap-2 group"
        >
          <span>Scroll to explore</span>
          <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
        </a>
      </div>
    </section>
  );
};
