import React, { useState } from "react";
import { PROCESS_STEPS, INSTAGRAM_URL } from "../constants/brand.ts";
import { Instagram, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useBookingModal } from "../context/BookingModalContext.tsx";

export const ProcessTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const { openBookingModal, submittedBooking } = useBookingModal();

  // The other 3 standard process steps preserved exactly as approved
  const otherSteps = [
    {
      title: "UNDERSTAND YOUR NEEDS",
      description: "We review your ventilation architecture, previous cleaning history, and specific symptom concerns (dust buildup, airflow restriction, dryer warnings).",
      detail: "Customized service scope tailored strictly to your residence.",
    },
    {
      title: "PROFESSIONAL CLEANING",
      description: "Our crew arrives with high-powered negative pressure systems, rotary agitation brushes, and comprehensive surface protection.",
      detail: "Surgical execution with zero mess left in your home.",
    },
    {
      title: "ENJOY A CLEANER SPACE",
      description: "Experience immediate improvements in indoor air crispness, balanced register airflow, and peace of mind.",
      detail: "Breathe the Signature standard every single day.",
    },
  ];

  // The existing approved "CONNECT WITH US" step
  const connectWithUsStep = {
    title: "CONNECT WITH US",
    description: "Reach out directly via Instagram Direct Message. Share your home layout, service goals, and preferred schedule.",
    detail: "Fast, personal correspondence with no automated phone menus.",
  };

  return (
    <section id="process" className="relative py-28 px-6 lg:px-12 bg-[#060608] overflow-hidden">
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#D6A447]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 border-b border-[#D6A447]/15 pb-8">
          <div>
            <div className="flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-[#D6A447] mb-3">
              <span className="w-6 h-[1.5px] bg-[#D6A447]" />
              <span>Operational Blueprint</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-white">
              HOW OUR PROCESS <span className="gold-shimmer-text">WORKS.</span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed">
            {submittedBooking
              ? "Booking request recorded. Connect with our team to coordinate schedule and review tailored ventilation protocols."
              : "Step 01 begins with your online appointment request, followed by direct personalized dispatch communication."}
          </p>
        </div>

        {/* Connected Visual Pipeline Pathway */}
        <div className="relative">
          {/* Horizontal Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-14 left-12 right-12 h-[2px] bg-gradient-to-r from-[#D6A447]/20 via-[#D6A447] to-[#D6A447]/20 z-0" />

          {/* Dynamic Process Steps Grid */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 ${
              submittedBooking ? "lg:grid-cols-5" : "lg:grid-cols-4"
            } gap-6 sm:gap-8 relative z-10`}
          >
            {/* STEP 1: BOOKING FORM CARD */}
            <div
              onMouseEnter={() => setActiveStep(0)}
              onClick={() => openBookingModal()}
              className={`group relative p-6 sm:p-8 bg-gradient-to-b from-[#0A0A0E] to-[#050507] border rounded-sm transition-all duration-500 cursor-pointer flex flex-col justify-between ${
                activeStep === 0 || submittedBooking
                  ? "border-[#D6A447] shadow-[0_15px_35px_rgba(214,164,71,0.2)] -translate-y-1"
                  : "border-white/5 hover:border-[#D6A447]/40"
              }`}
            >
              {/* Top Step Number Ring */}
              <div className="flex items-center justify-between mb-8">
                <div
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono text-sm font-bold transition-all duration-300 ${
                    submittedBooking
                      ? "bg-emerald-500 text-[#050505] border-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                      : activeStep === 0
                      ? "bg-[#D6A447] text-[#050505] border-[#F4E2B5] shadow-[0_0_15px_rgba(214,164,71,0.6)]"
                      : "bg-[#050505] text-[#D6A447] border-[#D6A447]/40 group-hover:border-[#D6A447]"
                  }`}
                >
                  {submittedBooking ? "✓" : "01"}
                </div>

                <span className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#D6A447]">
                  {submittedBooking ? "PHASE 01 // COMPLETED" : "PHASE 01 // STEP 1"}
                </span>
              </div>

              {/* Title & Description */}
              <div className="mb-6">
                <h3 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide text-white group-hover:text-[#D6A447] transition-colors mb-3">
                  {submittedBooking ? "BOOKING SUBMITTED" : "BOOKING FORM"}
                </h3>

                {submittedBooking ? (
                  <div className="space-y-2 mb-4">
                    <p className="text-xs text-[#E4E4E7] font-light leading-relaxed">
                      Request logged for <span className="font-medium text-white">{submittedBooking.fullName}</span>.
                    </p>
                    <p className="text-xs text-[#A1A1AA] font-light">
                      Date: <span className="text-[#D6A447]">{submittedBooking.preferredDate}</span> ({submittedBooking.preferredTime})
                    </p>
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed mb-4">
                    Select your preferred services, service address, and appointment window in our online booking portal.
                  </p>
                )}

                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xs">
                  <p className="text-[11px] text-[#C7C7C7] leading-relaxed flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D6A447] shrink-0 mt-0.5" />
                    <span>
                      {submittedBooking
                        ? `Ref #${submittedBooking.id} · Awaiting Dispatch Confirmation`
                        : "Click to open form — zero upfront payment required."}
                    </span>
                  </p>
                </div>

                {/* Direct Action Button */}
                <div className="mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openBookingModal();
                    }}
                    className="w-full py-2.5 px-3 text-[11px] font-bold tracking-wider uppercase text-[#050505] bg-gradient-to-r from-[#D6A447] to-[#F4E2B5] hover:brightness-110 rounded-xs transition-all flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(214,164,71,0.25)]"
                  >
                    <span>{submittedBooking ? "View Booking Details" : "Book An Appointment"}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Step Action Marker */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#52525B]">
                <span className="font-mono text-[10px] tracking-widest uppercase">
                  {submittedBooking ? "Pending Dispatch Review" : "Initial Booking Step"}
                </span>
                <ShieldCheck className="w-4 h-4 text-[#D6A447]/40 group-hover:text-[#D6A447]" />
              </div>
            </div>

            {/* STEP 2: CONNECT WITH US CARD (Only displayed after booking form has been submitted!) */}
            {submittedBooking && (
              <div
                onMouseEnter={() => setActiveStep(1)}
                className={`group relative p-6 sm:p-8 bg-gradient-to-b from-[#0E0E14] to-[#07070B] border border-[#D6A447] rounded-sm transition-all duration-500 cursor-pointer flex flex-col justify-between shadow-[0_15px_35px_rgba(214,164,71,0.25)] -translate-y-1 animate-fade-in`}
              >
                {/* Top Step Number Ring */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono text-sm font-bold bg-[#D6A447] text-[#050505] border-[#F4E2B5] shadow-[0_0_15px_rgba(214,164,71,0.6)]">
                    02
                  </div>

                  <span className="text-[10px] tracking-[0.25em] uppercase text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    PHASE 02 // UNLOCKED
                  </span>
                </div>

                {/* Title & Description */}
                <div className="mb-6">
                  <h3 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide text-white group-hover:text-[#D6A447] transition-colors mb-3">
                    {connectWithUsStep.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed mb-4">
                    {connectWithUsStep.description}
                  </p>

                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xs mb-4">
                    <p className="text-[11px] text-[#C7C7C7] leading-relaxed flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D6A447] shrink-0 mt-0.5" />
                      <span>{connectWithUsStep.detail}</span>
                    </p>
                  </div>

                  {/* Instagram Button */}
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full py-2.5 px-3 text-[11px] font-bold tracking-wider uppercase text-white bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:brightness-110 rounded-xs transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(253,29,29,0.3)]"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Message On Instagram</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>

                {/* Step Action Marker */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#52525B]">
                  <span className="font-mono text-[10px] tracking-widest uppercase">
                    Direct Correspondence
                  </span>
                  <ShieldCheck className="w-4 h-4 text-[#D6A447]" />
                </div>
              </div>
            )}

            {/* REMAINING EXISTING APPROVED PROCESS CARDS */}
            {otherSteps.map((step, idx) => {
              const displayIndex = submittedBooking ? idx + 2 : idx + 1;
              const stepNumber = displayIndex < 10 ? `0${displayIndex + 1}` : `${displayIndex + 1}`;
              const isCurrent = activeStep === displayIndex;

              return (
                <div
                  key={step.title}
                  onMouseEnter={() => setActiveStep(displayIndex)}
                  className={`group relative p-6 sm:p-8 bg-gradient-to-b from-[#0A0A0E] to-[#050507] border rounded-sm transition-all duration-500 cursor-pointer flex flex-col justify-between ${
                    isCurrent
                      ? "border-[#D6A447] shadow-[0_15px_35px_rgba(214,164,71,0.2)] -translate-y-1"
                      : "border-white/5 hover:border-[#D6A447]/40"
                  }`}
                >
                  {/* Top Step Number Ring */}
                  <div className="flex items-center justify-between mb-8">
                    <div
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono text-sm font-bold transition-all duration-300 ${
                        isCurrent
                          ? "bg-[#D6A447] text-[#050505] border-[#F4E2B5] shadow-[0_0_15px_rgba(214,164,71,0.6)]"
                          : "bg-[#050505] text-[#D6A447] border-[#D6A447]/40 group-hover:border-[#D6A447]"
                      }`}
                    >
                      {stepNumber}
                    </div>

                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#71717A] font-mono">
                      PHASE {stepNumber}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="mb-6">
                    <h3 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide text-white group-hover:text-[#D6A447] transition-colors mb-3">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed mb-4">
                      {step.description}
                    </p>

                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xs">
                      <p className="text-[11px] text-[#C7C7C7] leading-relaxed flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D6A447] shrink-0 mt-0.5" />
                        <span>{step.detail}</span>
                      </p>
                    </div>
                  </div>

                  {/* Step Action Marker */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#52525B]">
                    <span className="font-mono text-[10px] tracking-widest uppercase">
                      {idx === otherSteps.length - 1 ? "Complete Purity" : "Signature Step"}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-[#D6A447]/40 group-hover:text-[#D6A447]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Callout Bar */}
        <div className="mt-16 p-8 bg-[#09090D] border border-[#D6A447]/20 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#D6A447]/15 border border-[#D6A447]/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#D6A447]" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-display font-bold uppercase text-white">
                {submittedBooking
                  ? `Booking Ref #${submittedBooking.id} Pending Approval`
                  : "Step 01: Complete Your Booking Form"}
              </h4>
              <p className="text-xs text-[#A1A1AA]">
                {submittedBooking
                  ? "Your appointment request has been recorded. Connect with dispatch on Instagram to finalize scheduling."
                  : "Submit your preferred appointment request online to unlock direct dispatch correspondence."}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => openBookingModal()}
              className="px-6 py-3 text-xs font-bold tracking-[0.16em] uppercase text-[#050505] bg-gradient-to-r from-[#D6A447] to-[#F4E2B5] hover:brightness-110 rounded-xs transition-all flex items-center justify-center gap-2 group shadow-[0_0_15px_rgba(214,164,71,0.3)] cursor-pointer"
            >
              <span>{submittedBooking ? "View Submitted Booking" : "Schedule Preferred Time"}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#050505] group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-[#A1A1AA] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xs transition-colors flex items-center justify-center"
              title="Message on Instagram"
            >
              <Instagram className="w-4 h-4 text-[#D6A447]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
