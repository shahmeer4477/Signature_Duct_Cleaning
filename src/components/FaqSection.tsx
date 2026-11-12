import React, { useState } from "react";
import { FAQS, INSTAGRAM_URL } from "../constants/brand.ts";
import { Plus, Minus, HelpCircle, Instagram, ArrowUpRight } from "lucide-react";
import { useBookingModal } from "../context/BookingModalContext.tsx";

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { openBookingModal } = useBookingModal();

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-28 px-6 lg:px-12 bg-[#050505] overflow-hidden border-t border-[#D6A447]/15">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#D6A447] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Clarity &amp; Transparency</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-white mb-4">
            FREQUENTLY ASKED <span className="gold-shimmer-text">QUESTIONS.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA] font-light">
            Essential facts on duct hygiene, fire hazard mitigation, and connecting with our team.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`transition-all duration-300 rounded-sm border ${
                  isOpen
                    ? "bg-[#0B0B0F] border-[#D6A447]/60 shadow-[0_10px_25px_rgba(214,164,71,0.1)]"
                    : "bg-[#070709] border-white/5 hover:border-[#D6A447]/30 hover:bg-[#09090C]"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D6A447]"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-xs font-semibold text-[#D6A447]">
                      0{index + 1}
                    </span>
                    <span className="text-base sm:text-lg font-display font-bold uppercase tracking-wide text-white">
                      {faq.question}
                    </span>
                  </span>

                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? "bg-[#D6A447] text-[#050505] border-[#D6A447]"
                        : "border-white/10 text-[#A1A1AA] hover:text-white"
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-white/5 animate-fade-in">
                    {index === 5 ? (
                      <div className="text-sm text-[#C7C7C7] font-light leading-relaxed pl-8 space-y-3">
                        <p>
                          Booking your Signature service is simple. First, visit our website and click{" "}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openBookingModal();
                            }}
                            className="inline-flex items-center font-semibold text-[#D6A447] hover:text-[#F4E2B5] underline underline-offset-4 cursor-pointer transition-colors"
                          >
                            Book Now
                          </button>{" "}
                          to complete our appointment booking form. Enter your name, phone number, service address, preferred cleaning service, date, time, and any additional notes. Once submitted, our team will review your request and contact you to confirm your appointment.
                        </p>
                        <p>
                          You can also connect with us directly through Instagram at{" "}
                          <a
                            href={INSTAGRAM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center font-semibold text-[#D6A447] hover:text-[#F4E2B5] underline underline-offset-4 transition-colors"
                          >
                            @signature_ductcleaning
                          </a>{" "}
                          for questions, service inquiries, and further assistance.
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-[#C7C7C7] font-light leading-relaxed pl-8">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 text-center p-6 bg-[#08080B] border border-white/5 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-display font-bold uppercase text-white">
              Have a question specific to your home layout?
            </h4>
            <p className="text-xs text-[#A1A1AA] font-light">
              Send us a photo of your registers or unit directly on Instagram.
            </p>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-xs font-bold tracking-[0.16em] uppercase text-[#050505] bg-gradient-to-r from-[#D6A447] to-[#F4E2B5] hover:brightness-110 rounded-xs transition-all flex items-center gap-2 shrink-0"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>Ask on Instagram</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
};
