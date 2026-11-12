import React from "react";
import { SignatureLogo } from "./SignatureLogo.tsx";
import { SERVICES, INSTAGRAM_URL, INSTAGRAM_HANDLE } from "../constants/brand.ts";
import { Instagram, ArrowUpRight } from "lucide-react";
import { useBookingModal } from "../context/BookingModalContext.tsx";

export const Footer: React.FC = () => {
  const { openBookingModal } = useBookingModal();
  return (
    <footer className="relative bg-[#040405] text-[#C7C7C7] pt-20 pb-12 px-6 lg:px-12 border-t border-[#D6A447]/20 overflow-hidden">
      {/* Decorative Hairline Glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D6A447]/40 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Main Footer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          {/* Brand Info & Statement */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <a href="#" className="inline-block mb-6" aria-label="Signature Duct Cleaning">
                <SignatureLogo size="md" />
              </a>

              <p className="text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed max-w-sm mb-6">
                Engineered ventilation decontamination, dryer vent hazard mitigation, and architectural HVAC purification tailored for luxury residences and discerning property owners.
              </p>
            </div>

            {/* Instagram Primary Contact Connection */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#71717A] block mb-2">
                Primary Inquiries &amp; Consultations
              </span>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-wider uppercase text-white hover:text-[#D6A447] transition-colors group"
              >
                <div className="w-7 h-7 rounded-full bg-[#111116] border border-[#D6A447]/40 flex items-center justify-center group-hover:border-[#D6A447]">
                  <Instagram className="w-3.5 h-3.5 text-[#D6A447]" />
                </div>
                <span>{INSTAGRAM_HANDLE}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#D6A447] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* All 5 Services Links */}
          <div className="md:col-span-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D6A447] font-semibold block mb-6">
              Services &amp; Specializations
            </span>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="text-xs sm:text-sm text-[#A1A1AA] hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="font-mono text-[11px] text-[#52525B] group-hover:text-[#D6A447] transition-colors">
                      {s.number}
                    </span>
                    <span className="uppercase tracking-wider">{s.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation & Tagline */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D6A447] font-semibold block mb-6">
                Navigation
              </span>
              <ul className="space-y-2.5 text-xs uppercase tracking-wider text-[#A1A1AA]">
                <li><a href="#hero" className="hover:text-white transition-colors">Top of Page</a></li>
                <li>
                  <button
                    onClick={() => openBookingModal()}
                    className="text-[#D6A447] hover:text-white transition-colors font-semibold cursor-pointer text-left"
                  >
                    Book Appointment
                  </button>
                </li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#showcase" className="hover:text-white transition-colors">Purification Journey</a></li>
                <li><a href="#standards" className="hover:text-white transition-colors">The Signature Standard</a></li>
                <li><a href="#reviews" className="hover:text-white transition-colors">Client Reviews</a></li>
                <li><a href="#process" className="hover:text-white transition-colors">Our Process</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">Frequently Asked Questions</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Tagline Banner (Required: CLEANER AIR. HEALTHIER SPACES. A BRIGHTER TOMORROW.) */}
        <div className="py-10 text-center border-b border-white/5">
          <p className="text-xs sm:text-sm md:text-base font-display font-bold tracking-[0.35em] uppercase gold-shimmer-text">
            CLEANER AIR. HEALTHIER SPACES. A BRIGHTER TOMORROW.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717A] font-mono">
          <p>© {new Date().getFullYear()} Signature Duct Cleaning. All rights reserved.</p>
          <div className="flex items-center gap-4 sm:gap-6 uppercase tracking-wider text-[11px] sm:text-xs">
            <a
              href="#/privacy-policy"
              className="text-[#A1A1AA] hover:text-[#D6A447] transition-colors focus-visible:outline-none focus-visible:text-[#D6A447]"
            >
              Privacy Policy
            </a>
            <span aria-hidden="true" className="text-[#D6A447]/60 select-none">·</span>
            <a
              href="#/terms-and-conditions"
              className="text-[#A1A1AA] hover:text-[#D6A447] transition-colors focus-visible:outline-none focus-visible:text-[#D6A447]"
            >
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
