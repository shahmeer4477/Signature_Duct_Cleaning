import React, { useState, useEffect } from "react";
import { SignatureLogo } from "./SignatureLogo.tsx";
import { Calendar, Menu, X, ArrowRight, Instagram } from "lucide-react";
import { INSTAGRAM_URL } from "../constants/brand.ts";
import { useBookingModal } from "../context/BookingModalContext.tsx";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openBookingModal } = useBookingModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Showcase", href: "#showcase" },
    { name: "Reviews", href: "#reviews" },
    { name: "Process", href: "#process" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#050505]/90 backdrop-blur-md border-b border-[#D6A447]/20 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.85)]"
            : "bg-gradient-to-b from-[#050505]/90 via-[#050505]/40 to-transparent py-5 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark / emblem */}
          <a
            href="#"
            className="flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D6A447]"
            aria-label="Signature Duct Cleaning Home"
          >
            <SignatureLogo size="sm" />
          </a>

          {/* Zone 2: Clean single-line navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-xs lg:text-sm font-medium tracking-[0.16em] uppercase text-[#C7C7C7]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative py-1 whitespace-nowrap shrink-0 hover:text-white transition-colors duration-200 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-[#D6A447] to-[#F9E7BA] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <button
              onClick={() => openBookingModal()}
              className="relative py-1 whitespace-nowrap shrink-0 text-[#D6A447] hover:text-white transition-colors duration-200 group font-semibold cursor-pointer"
            >
              Book Service
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-[#D6A447] to-[#F9E7BA]" />
            </button>
          </nav>

          {/* Zone 3: 1 PRIMARY ACTION — "BOOK NOW" Prominent Gold Button */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => openBookingModal()}
              className="relative inline-flex items-center gap-2.5 px-6 py-2.5 text-xs font-bold tracking-[0.18em] uppercase text-[#050505] bg-gradient-to-r from-[#D6A447] via-[#F4E2B5] to-[#D6A447] hover:from-[#E2BA59] hover:via-[#FFF] hover:to-[#E2BA59] rounded-sm transition-all duration-300 shadow-[0_0_20px_rgba(214,164,71,0.4)] hover:shadow-[0_0_30px_rgba(214,164,71,0.7)] whitespace-nowrap shrink-0 group active:scale-[0.98] cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#050505] group-hover:scale-110 transition-transform" />
              <span>BOOK NOW</span>
              <ArrowRight className="w-3 h-3 text-[#050505] group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#C7C7C7] hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-xl md:hidden pt-24 px-8 pb-12 flex flex-col justify-between border-b border-[#D6A447]/20">
          <nav className="flex flex-col gap-5 text-base font-medium tracking-[0.2em] uppercase text-[#C7C7C7]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 hover:text-[#D6A447] transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-[#D6A447] text-xs">→</span>
              </a>
            ))}
          </nav>

          <div className="pt-8 border-t border-[#D6A447]/20 flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C7C7C7]/60">
              Immediate Scheduling
            </span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal();
              }}
              className="flex items-center justify-center gap-3 px-6 py-4 text-xs font-bold tracking-[0.2em] uppercase text-[#050505] bg-gradient-to-r from-[#D6A447] via-[#F4E2B5] to-[#D6A447] rounded-sm shadow-[0_0_20px_rgba(214,164,71,0.5)] cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#050505]" />
              <span>BOOK APPOINTMENT NOW</span>
            </button>

            <div className="flex items-center justify-center gap-2 pt-2 text-xs text-[#71717A]">
              <span>Secondary:</span>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D6A447] hover:underline flex items-center gap-1"
              >
                <Instagram className="w-3 h-3" />
                <span>Instagram Profile</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

