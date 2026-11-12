import React from "react";
import { ServiceItem } from "../constants/brand.ts";
import { INSTAGRAM_URL } from "../constants/brand.ts";
import { X, Instagram, CheckCircle2, Shield, ArrowUpRight } from "lucide-react";
import { useBookingModal } from "../context/BookingModalContext.tsx";

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose }) => {
  const { openBookingModal } = useBookingModal();
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-12">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#050505]/85 backdrop-blur-xl transition-opacity animate-fade-in"
      />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0A0A0E] border border-[#D6A447]/30 rounded-sm shadow-[0_25px_60px_rgba(0,0,0,0.95)] p-6 sm:p-8 lg:p-10 text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#C7C7C7] hover:text-[#D6A447] hover:bg-white/5 rounded-full transition-colors"
          aria-label="Close details"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header with Number & Title */}
        <div className="flex items-center gap-4 mb-3">
          <span className="font-mono text-xs tracking-[0.3em] text-[#D6A447] font-semibold">
            {service.number} // SIGNATURE PROTOCOL
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-[#D6A447]/30 to-transparent" />
        </div>

        <h2 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight uppercase mb-6">
          {service.title}
        </h2>

        {/* Service Hero Image & Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-7 relative overflow-hidden rounded-sm border border-[#D6A447]/20 aspect-video">
            <img
              src={service.image}
              alt={service.imageAlt || `${service.title} — Professional Cleaning Services USA`}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.08]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] tracking-[0.2em] uppercase text-[#D6A447] bg-[#050505]/70 backdrop-blur-md px-3 py-1.5 border border-[#D6A447]/20">
              <span>Verified Clean Standard</span>
              <span>100% HEPA Extraction</span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between">
            <p className="text-sm sm:text-base text-[#C7C7C7] font-light leading-relaxed mb-6">
              {service.fullDesc}
            </p>

            <div className="bg-[#121217] p-4 border border-white/5 rounded-sm">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D6A447] block mb-2 font-semibold">
                Execution Method
              </span>
              <p className="text-xs text-[#A1A1AA] leading-normal">
                {service.processDetail}
              </p>
            </div>
          </div>
        </div>

        {/* Highlights & Engineering Specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pt-6 border-t border-[#D6A447]/15">
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D6A447] mb-4 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" />
              Service Key Highlights
            </h3>
            <ul className="space-y-3">
              {service.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#E4E4E7]">
                  <CheckCircle2 className="w-4 h-4 text-[#D6A447] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D6A447] mb-4">
              Operational Standards
            </h3>
            <div className="space-y-3">
              {service.specs.map((s, i) => (
                <div key={i} className="p-3 bg-[#111116] border border-white/5 flex flex-col justify-between">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#71717A]">
                    {s.label}
                  </span>
                  <span className="text-xs sm:text-sm text-[#F3F4F6] font-medium mt-1">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="pt-6 border-t border-[#D6A447]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#A1A1AA] text-center sm:text-left">
            <span>Direct booking requests &amp; custom scheduling available below.</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                openBookingModal(service.title);
              }}
              className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold tracking-[0.18em] uppercase text-[#050505] bg-gradient-to-r from-[#D6A447] via-[#F4E2B5] to-[#D6A447] hover:from-[#E2BA59] hover:via-[#FFF] hover:to-[#E2BA59] rounded-sm transition-all duration-300 shadow-[0_0_20px_rgba(214,164,71,0.4)] flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>SCHEDULE THIS SERVICE</span>
              <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-3.5 text-xs font-medium tracking-[0.16em] uppercase text-[#C7C7C7] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm transition-colors flex items-center justify-center gap-2"
            >
              <Instagram className="w-3.5 h-3.5 text-[#D6A447]" />
              <span>DM on Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
