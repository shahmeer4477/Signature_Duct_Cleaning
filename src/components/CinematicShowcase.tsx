import React, { useState } from "react";
import { INSTAGRAM_URL } from "../constants/brand.ts";
import { ArrowRight, Instagram, Wind, Activity, CheckCircle } from "lucide-react";

interface ShowcaseChapter {
  id: string;
  numeral: string;
  tagline: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  details: { label: string; val: string }[];
  accentColor: string;
}

const CHAPTERS: ShowcaseChapter[] = [
  {
    id: "intrusion",
    numeral: "I",
    tagline: "The Hidden Intrusion",
    title: "WHAT LIES INSIDE UNSEEN CONDUITS",
    description:
      "Modern forced-air systems circulate up to seven times their internal volume daily. Over months and years, fine silica drywall dust, pet dander, microscopic mold spores, and heavy particulate settle along the internal perimeter walls, creating an invisible reservoir of contamination.",
    image: "/src/assets/images/dirty_air_duct_interior_1794327696269.jpg",
    imageAlt: "Inspection of contaminated residential air duct interior with dust buildup before professional air duct cleaning",
    details: [
      { label: "Circulation Rate", val: "Continuous 24/7 Recirculation" },
      { label: "Micro-Debris", val: "Fine Particulate & Dander" },
      { label: "Airway Impact", val: "Restricted Duct Flow & Allergen Buildup" },
    ],
    accentColor: "#996F1D",
  },
  {
    id: "extraction",
    numeral: "II",
    tagline: "Pneumatic Agitation & Source Removal",
    title: "THE POWER OF NEGATIVE AIR DISPLACEMENT",
    description:
      "Unlike surface-level dusting or chemical masking, the Signature methodology employs surgical negative pressure source extraction. Powerful negative airflow units seal the duct system while flexible pneumatic whips sweep every internal corner, evacuating particulate directly into sealed multi-stage HEPA containment.",
    image: "/src/assets/images/negative_air_clean_setup_1794327964895.jpg",
    imageAlt: "Professional negative air displacement duct cleaning equipment and HEPA extraction setup",
    details: [
      { label: "Extraction Physics", val: "Negative Air Agitation Dynamics" },
      { label: "Containment", val: "Multi-Stage Sealed HEPA Unit" },
      { label: "Living Area Security", val: "Zero Secondary Dispersion" },
    ],
    accentColor: "#D6A447",
  },
  {
    id: "purity",
    numeral: "III",
    tagline: "The Signature Atmosphere",
    title: "CRYSTALLINE INDOOR AIR ARCHITECTURE",
    description:
      "With supply lines, return plenums, and mechanical blower coils stripped of restrictive grime, your residence breathes as intended. Balanced static pressure reduces motor strain, decreases utility consumption, and fills every living room and bedroom with crisp, restorative air.",
    image: "/src/assets/images/crystalline_air_architecture_1794327939594.jpg",
    imageAlt: "Immaculate residential indoor air quality and purified airflow following Signature duct cleaning",
    details: [
      { label: "Air Crispness", val: "Noticeably Lighter & Cleaner Sensation" },
      { label: "HVAC Efficiency", val: "Restored Thermodynamic Air Exchange" },
      { label: "Thermal Envelope", val: "Balanced Temperature Distribution" },
    ],
    accentColor: "#F4E2B5",
  },
];

export const CinematicShowcase: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState(0);
  const current = CHAPTERS[activeChapter];

  return (
    <section id="showcase" className="relative py-28 px-6 lg:px-12 bg-[#060608] overflow-hidden border-t border-b border-[#D6A447]/15">
      {/* Background glow matching active chapter */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25 transition-all duration-1000"
        style={{
          background: `radial-gradient(1000px circle at 50% 50%, ${current.accentColor}22, transparent 75%)`,
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Editorial Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#D6A447] mb-2">
              <Activity className="w-3.5 h-3.5" />
              <span>Cinematic Breakdown</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-white">
              THE PURIFICATION <span className="gold-shimmer-text">JOURNEY.</span>
            </h2>
          </div>

          {/* Chapter Selector Stepper */}
          <div className="flex items-center gap-2 bg-[#0C0C10] p-1.5 border border-white/5 rounded-sm">
            {CHAPTERS.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => setActiveChapter(idx)}
                className={`px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 rounded-xs flex items-center gap-2 ${
                  activeChapter === idx
                    ? "bg-[#D6A447] text-[#050505] font-bold shadow-[0_0_15px_rgba(214,164,71,0.4)]"
                    : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
                }`}
              >
                <span>CH {c.numeral}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cinematic Main Stage Canvas */}
        <div className="relative bg-[#09090C] border border-[#D6A447]/30 rounded-sm overflow-hidden min-h-[580px] flex flex-col lg:flex-row">
          {/* Visual Side */}
          <div className="lg:w-7/12 relative min-h-[340px] lg:min-h-full overflow-hidden">
            <img
              key={current.image}
              src={current.image}
              alt={current.imageAlt || `${current.title} — Signature Duct Cleaning Showcase`}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-[0.6] contrast-[1.1] transition-transform duration-1000 animate-fade-in"
            />
            {/* Scrims */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090C] via-transparent to-transparent lg:hidden" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#09090C] hidden lg:block" />

            {/* Floating Chapter Watermark */}
            <div className="absolute top-6 left-6 font-display font-black text-6xl sm:text-8xl text-white/5 select-none pointer-events-none">
              {current.numeral}
            </div>

            {/* Bottom Status Tag */}
            <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-[#050505]/80 backdrop-blur-md px-4 py-2 border border-[#D6A447]/30 text-xs">
              <Wind className="w-4 h-4 text-[#D6A447] animate-pulse" />
              <span className="font-mono text-white tracking-widest uppercase">
                {current.tagline}
              </span>
            </div>
          </div>

          {/* Narrative Side */}
          <div className="lg:w-5/12 p-8 sm:p-12 flex flex-col justify-between bg-gradient-to-b from-[#0B0B0F] to-[#070709] border-t lg:border-t-0 lg:border-l border-white/5">
            <div>
              <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#D6A447] mb-4">
                <span>Phase {current.numeral} / 03</span>
                <span className="w-12 h-[1px] bg-[#D6A447]/40" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white mb-6 leading-snug">
                {current.title}
              </h3>

              <p className="text-sm text-[#C7C7C7] font-light leading-relaxed mb-8">
                {current.description}
              </p>

              {/* Data Specifications List */}
              <div className="space-y-3.5 mb-8">
                {current.details.map((d, i) => (
                  <div key={i} className="flex items-center justify-between text-xs py-2 border-b border-white/5">
                    <span className="text-[#71717A] tracking-wider uppercase">{d.label}</span>
                    <span className="text-white font-medium flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#D6A447]" />
                      {d.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step Controls & CTAs */}
            <div className="pt-6 border-t border-[#D6A447]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => setActiveChapter((prev) => (prev + 1) % CHAPTERS.length)}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold tracking-[0.16em] uppercase text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D6A447]/50 rounded-xs transition-colors flex items-center justify-center gap-2 group"
              >
                <span>Next Chapter</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D6A447] group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold tracking-[0.16em] uppercase text-[#050505] bg-gradient-to-r from-[#D6A447] to-[#F4E2B5] hover:brightness-110 rounded-xs transition-all flex items-center justify-center gap-2"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>DM Inquiries</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
