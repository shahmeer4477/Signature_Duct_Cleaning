import React, { useState } from "react";
import { SERVICES, ServiceItem, INSTAGRAM_URL } from "../constants/brand.ts";
import { ServiceDetailModal } from "./ServiceDetailModal.tsx";
import { Instagram, ArrowUpRight, Maximize2, Sparkles, Check } from "lucide-react";
import { useBookingModal } from "../context/BookingModalContext.tsx";

export const ServicesSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const { selectSingleService } = useBookingModal();

  const activeService = SERVICES[activeTab];

  return (
    <section id="services" className="relative py-28 px-6 lg:px-12 bg-[#050505] overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#D6A447]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#D6A447]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-[#D6A447]/15 pb-8">
          <div>
            <div className="flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-[#D6A447] mb-3">
              <span className="w-6 h-[1.5px] bg-[#D6A447]" />
              <span>Engineered Decontamination Protocols</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold uppercase tracking-tight text-white leading-none">
              OUR EXPERT <span className="gold-shimmer-text">SERVICES.</span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed">
            Five precision disciplines dedicated to structural airflow clearance, mechanical safety, and immaculate indoor air purity.
          </p>
        </div>

        {/* Feature Presentation: Interactive Stage with Cinema Screen + Dynamic Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-stretch">
          {/* Left Column: Interactive Service Selector Strip (Asymmetrical) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            {SERVICES.map((service, index) => {
              const isActive = activeTab === index;
              return (
                <div
                  key={service.id}
                  onClick={() => {
                    setActiveTab(index);
                    selectSingleService(service.title, true);
                  }}
                  onMouseEnter={() => {
                    setActiveTab(index);
                    setHoveredCard(service.id);
                  }}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group relative p-5 transition-all duration-300 cursor-pointer rounded-sm border ${
                    isActive
                      ? "bg-[#0E0E12] border-[#D6A447]/60 shadow-[0_0_25px_rgba(214,164,71,0.18)]"
                      : "bg-[#08080A] border-white/5 hover:border-[#D6A447]/30 hover:bg-[#0C0C0F]"
                  }`}
                >
                  {/* Active Indicator Accent Line */}
                  <div
                    className={`absolute top-0 bottom-0 left-0 w-[3px] transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-b from-[#F4E2B5] via-[#D6A447] to-[#996F1D] opacity-100"
                        : "bg-transparent opacity-0 group-hover:opacity-40 group-hover:bg-[#D6A447]"
                    }`}
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-mono text-sm tracking-widest font-bold transition-colors ${
                          isActive ? "text-[#D6A447]" : "text-[#71717A] group-hover:text-[#A1A1AA]"
                        }`}
                      >
                        {service.number}
                      </span>
                      <div>
                        <h3
                          className={`text-sm sm:text-base font-display font-bold uppercase tracking-wider transition-colors ${
                            isActive ? "text-white" : "text-[#C7C7C7] group-hover:text-white"
                          }`}
                        >
                          {service.title}
                        </h3>
                        <p className="text-xs text-[#71717A] line-clamp-1 mt-1 font-light">
                          {service.shortDesc}
                        </p>
                      </div>
                    </div>

                    <ArrowUpRight
                      className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                        isActive
                          ? "text-[#D6A447] translate-x-0.5 -translate-y-0.5"
                          : "text-[#52525B] group-hover:text-[#C7C7C7]"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Oversized Cinematic Showcase Screen for the Active Service */}
          <div className="lg:col-span-7 relative bg-[#09090C] border border-[#D6A447]/30 rounded-sm overflow-hidden flex flex-col justify-between group min-h-[460px]">
            {/* Background Image with Cinematic Pan */}
            <div className="absolute inset-0 z-0">
              <img
                src={activeService.image}
                alt={activeService.imageAlt || `${activeService.title} — Professional Cleaning Service USA`}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-[0.55] contrast-[1.12] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#070709] via-transparent to-transparent" />
            </div>

            {/* Corner Precision Badges */}
            <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#D6A447] bg-[#050505]/70 backdrop-blur-md px-3 py-1.5 border border-[#D6A447]/30">
                <Sparkles className="w-3.5 h-3.5 text-[#D6A447]" />
                <span>PROTOCOL {activeService.number}</span>
              </div>

              <button
                onClick={() => setSelectedService(activeService)}
                className="flex items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase text-white bg-black/60 hover:bg-[#D6A447] hover:text-[#050505] backdrop-blur-md px-3.5 py-1.5 border border-white/10 hover:border-[#D6A447] transition-all duration-300 rounded-xs"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>SPEC SHEET</span>
              </button>
            </div>

            {/* Content Bottom Panel */}
            <div className="relative z-10 p-6 sm:p-8 mt-auto">
              <h3 className="text-2xl sm:text-4xl font-display font-extrabold uppercase tracking-tight text-white mb-3">
                {activeService.title}
              </h3>
              <p className="text-sm sm:text-base text-[#D4D4D8] font-light leading-relaxed max-w-xl mb-6">
                {activeService.fullDesc}
              </p>

              {/* Quick Key Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                {activeService.highlights.slice(0, 2).map((h, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-[#E4E4E7]">
                    <div className="w-4 h-4 rounded-full bg-[#D6A447]/15 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D6A447]" />
                    </div>
                    <span className="truncate">{h}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons: Booking is Primary */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => selectSingleService(activeService.title, true)}
                  className="px-6 py-3 text-xs font-bold tracking-[0.18em] uppercase text-[#050505] bg-gradient-to-r from-[#D6A447] via-[#F4E2B5] to-[#D6A447] hover:from-[#E2BA59] hover:via-[#FFF] hover:to-[#E2BA59] rounded-sm transition-all duration-300 shadow-[0_0_20px_rgba(214,164,71,0.4)] flex items-center gap-2 group active:scale-[0.98] cursor-pointer"
                >
                  <span>Book This Service</span>
                  <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
                </button>

                <button
                  onClick={() => setSelectedService(activeService)}
                  className="px-5 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-white bg-[#14141A] hover:bg-[#1E1E26] border border-[#D6A447]/50 hover:border-[#D6A447] rounded-sm transition-all duration-300 flex items-center gap-2"
                >
                  <span>Explore Details</span>
                  <Maximize2 className="w-3.5 h-3.5 text-[#D6A447]" />
                </button>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-[#C7C7C7] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm transition-colors flex items-center justify-center"
                  title="Connect on Instagram"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#D6A447]" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Asymmetrical Floating Showcase Grid for all 5 services */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#A1A1AA]">
              Complete Service Portfolio (Click any to inspect)
            </span>
            <span className="text-xs text-[#D6A447] font-mono">05 Specialized Divisions</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((item, idx) => {
              const isLarge = idx === 0 || idx === 3;
              return (
                <div
                  key={item.id}
                  onClick={() => selectSingleService(item.title, true)}
                  className={`group relative bg-[#09090D] border border-white/5 hover:border-[#D6A447]/40 rounded-sm overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-[0_15px_35px_rgba(214,164,71,0.12)] flex flex-col justify-between ${
                    isLarge ? "lg:col-span-2" : "lg:col-span-1"
                  }`}
                >
                  {/* Image area */}
                  <div className="relative h-56 sm:h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.imageAlt || `${item.title} — Professional Cleaning Service USA`}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter brightness-[0.6] group-hover:brightness-[0.8] group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090D] via-transparent to-black/30" />
                    <div className="absolute top-4 left-4 font-mono text-xs font-bold tracking-widest text-[#D6A447] bg-[#050505]/75 px-2.5 py-1 border border-[#D6A447]/20">
                      {item.number}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h4 className="text-lg font-display font-bold uppercase tracking-wider text-white group-hover:text-[#D6A447] transition-colors mb-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#A1A1AA] font-light leading-relaxed mb-4">
                        {item.shortDesc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                      <span className="text-[11px] uppercase tracking-[0.2em] text-[#C7C7C7] group-hover:text-white transition-colors">
                        Book Service
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#D6A447] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
};
