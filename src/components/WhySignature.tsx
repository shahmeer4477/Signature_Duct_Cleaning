import React from "react";
import { BRAND_VALUES, INSTAGRAM_URL } from "../constants/brand.ts";
import { Instagram, ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";

export const WhySignature: React.FC = () => {
  return (
    <section id="standards" className="relative py-28 px-6 lg:px-12 bg-[#050505] overflow-hidden">
      {/* Subtle architectural lighting lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-[#D6A447]/25 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Brand Storytelling Header */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-[#D6A447] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Founding Philosophy</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold uppercase tracking-tight text-white leading-[1.08] mb-6">
            NOT JUST CLEANING. <br />
            <span className="gold-shimmer-text">A SIGNATURE STANDARD.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#A1A1AA] font-light leading-relaxed">
            Indoor ventilation should never be an afterthought. We approach ductwork and ventilation
            with the precision, respect, and meticulous execution of high-end architectural craft.
          </p>
        </div>

        {/* 6 Core Brand Values: Architectural Editorial Grid (NOT generic icon cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BRAND_VALUES.map((val, idx) => (
            <div
              key={val.title}
              className="group relative p-8 bg-gradient-to-b from-[#0A0A0E] to-[#060608] border border-white/5 hover:border-[#D6A447]/40 rounded-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex flex-col justify-between"
            >
              {/* Subtle gold top hairline on hover */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D6A447] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div>
                {/* Index & Pillar Accent */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                  <span className="font-mono text-xs tracking-widest text-[#D6A447] font-semibold">
                    PILLAR 0{idx + 1}
                  </span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#71717A] group-hover:text-[#F4E2B5] transition-colors">
                    {val.accent}
                  </span>
                </div>

                {/* Value Title */}
                <h3 className="text-xl font-display font-bold uppercase tracking-wide text-white group-hover:text-[#D6A447] transition-colors mb-4">
                  {val.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed">
                  {val.description}
                </p>
              </div>

              {/* Bottom Subtle Status Mark */}
              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-[#52525B]">
                <span className="tracking-widest uppercase text-[10px]">Verified Standard</span>
                <ShieldCheck className="w-4 h-4 text-[#D6A447]/60 group-hover:text-[#D6A447] transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Storytelling Proof Box */}
        <div className="mt-16 p-8 lg:p-12 bg-gradient-to-r from-[#0C0C10] via-[#0E0E14] to-[#0C0C10] border border-[#D6A447]/20 rounded-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#D6A447] block mb-2">
              Transparent Visual Accountability
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-tight text-white mb-2">
              Every Duct Inspected. Every Detail Documented.
            </h3>
            <p className="text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed">
              We document our before-and-after work directly on Instagram so homeowners and property managers can visually verify the spotless cleanliness of their HVAC conduits.
            </p>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full lg:w-auto px-8 py-4 text-xs font-bold tracking-[0.18em] uppercase text-[#050505] bg-gradient-to-r from-[#D6A447] via-[#F4E2B5] to-[#D6A447] hover:brightness-110 rounded-sm transition-all shadow-[0_0_20px_rgba(214,164,71,0.3)] flex items-center justify-center gap-3 shrink-0 group"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow Our Projects</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
