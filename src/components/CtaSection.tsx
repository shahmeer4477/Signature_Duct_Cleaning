import React from "react";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "../constants/brand.ts";
import { Instagram, ArrowUpRight, Sparkles } from "lucide-react";
import { useBookingModal } from "../context/BookingModalContext.tsx";

export const CtaSection: React.FC = () => {
  const { openBookingModal } = useBookingModal();

  return (
    <section className="relative py-32 px-6 lg:px-12 bg-[#050505] overflow-hidden border-t border-[#D6A447]/20">
      {/* Background Architectural Glow & Image Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_luxury_penthouse_1794245179401.jpg"
          alt="Healthier indoor living environment through professional air duct and HVAC cleaning across the USA — Signature Duct Cleaning"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter brightness-[0.25] contrast-[1.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/85 to-[#050505]" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#050505]/70 to-[#050505]" />
      </div>

      {/* Decorative Gold Radial Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#D6A447]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Top Tagline */}
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.35em] text-[#D6A447] mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Elevate Your Indoor Atmosphere</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-white mb-6 leading-[1.08] text-balance">
          YOUR SPACE DESERVES <br className="hidden sm:inline" />
          <span className="gold-shimmer-text">THE SIGNATURE STANDARD.</span>
        </h2>

        {/* Supporting text */}
        <p className="text-sm sm:text-base md:text-lg text-[#C7C7C7] font-light max-w-xl mx-auto leading-relaxed mb-10 text-balance">
          Take the first step toward cleaner air and healthier living spaces.
        </p>

        {/* CTA Buttons: Primary Booking + Secondary Instagram */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <button
            onClick={() => openBookingModal()}
            className="w-full sm:w-auto px-10 py-5 text-xs sm:text-sm font-bold tracking-[0.22em] uppercase text-[#050505] bg-gradient-to-r from-[#D6A447] via-[#F4E2B5] to-[#D6A447] hover:from-[#E2BA59] hover:via-[#FFF] hover:to-[#E2BA59] rounded-sm transition-all duration-300 shadow-[0_0_35px_rgba(214,164,71,0.5)] hover:shadow-[0_0_55px_rgba(214,164,71,0.8)] flex items-center justify-center gap-3.5 group active:scale-[0.98] cursor-pointer"
          >
            <span>BOOK YOUR SIGNATURE SERVICE</span>
            <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
          </button>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-5 text-xs font-semibold tracking-[0.2em] uppercase text-white bg-[#0D0D11] hover:bg-[#14141A] border border-[#D6A447]/40 hover:border-[#D6A447] rounded-sm transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <Instagram className="w-4 h-4 text-[#D6A447]" />
            <span>Connect on Instagram</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#D6A447] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Direct handle link */}
        <span className="mt-6 text-xs font-mono tracking-widest text-[#71717A]">
          Direct inquiries available via Instagram {INSTAGRAM_HANDLE}
        </span>
      </div>
    </section>
  );
};
