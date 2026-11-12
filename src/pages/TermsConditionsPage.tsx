import React, { useEffect } from "react";
import { ArrowLeft, Scale, AlertCircle, CheckCircle2, Mail, Instagram, Shield } from "lucide-react";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "../constants/brand.ts";
import { useBookingModal } from "../context/BookingModalContext.tsx";

export const TermsConditionsPage: React.FC = () => {
  const { openBookingModal } = useBookingModal();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#E4E4E7] pt-32 pb-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D6A447]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Navigation Breadcrumb / Back Link */}
        <div className="mb-10">
          <a
            href="#/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#D6A447] hover:text-[#F4E2B5] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Homepage</span>
          </a>
        </div>

        {/* Page Header */}
        <div className="border-b border-[#D6A447]/20 pb-8 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#D6A447] mb-3">
            <Scale className="w-3.5 h-3.5" />
            <span>Service Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-white mb-4">
            TERMS &amp; <span className="gold-shimmer-text">CONDITIONS</span>
          </h1>
          <p className="text-xs sm:text-sm font-mono text-[#A1A1AA]">
            Effective Date: November 2026 · Signature Duct Cleaning
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-sm sm:text-base font-light leading-relaxed text-[#D4D4D8]">
          {/* Section 1 */}
          <section className="bg-[#09090D] border border-white/5 rounded-sm p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-2.5">
              <span className="font-mono text-xs text-[#D6A447]">01.</span>
              <span>Service Booking &amp; Appointment Requests</span>
            </h2>
            <p className="mb-4">
              When you submit a service request through our website, you are submitting an appointment preference for evaluation.
            </p>
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xs text-xs sm:text-sm text-amber-200 mb-4 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold mb-0.5 text-white">Pending Dispatch Approval Status:</strong>
                Online submissions do not constitute an automatic or legally binding confirmation. All requested appointments remain in <em>Pending Dispatch Approval</em> status until reviewed by our scheduling dispatch team.
              </div>
            </div>
            <p className="text-xs text-[#A1A1AA]">
              Confirmation is officially established only when our dispatch team contacts you via phone, text, or email with verified technician assignment details.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-[#09090D] border border-white/5 rounded-sm p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-2.5">
              <span className="font-mono text-xs text-[#D6A447]">02.</span>
              <span>Service Availability &amp; Geographic Coverage</span>
            </h2>
            <p className="mb-4">
              All services offered (including air duct cleaning, dryer vent clearance, chimney sweeping, HVAC coil maintenance, and attic insulation) are subject to geographic service territory constraints and technician availability.
            </p>
            <p className="text-xs sm:text-sm text-[#A1A1AA]">
              Signature Duct Cleaning reserves the right to decline or reschedule service requests that fall outside our primary operational territory or require specialized structural equipment beyond our operational scope.
            </p>
          </section>

          {/* Section 3 */}
          <section className="bg-[#09090D] border border-white/5 rounded-sm p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-2.5">
              <span className="font-mono text-xs text-[#D6A447]">03.</span>
              <span>Rescheduling &amp; Cancellations</span>
            </h2>
            <p className="mb-4">
              We understand that schedules change. To respect dispatch routing and technician availability, we request clients to provide advance notice:
            </p>
            <div className="p-4 bg-[#111116] border border-white/10 rounded-xs mb-4 text-xs sm:text-sm space-y-2">
              <p>
                <strong className="text-white">Notice Window:</strong> We kindly request at least <span className="text-[#D6A447] font-mono">[Editable Placeholder: 24 to 48 hours advance notice]</span> if you need to reschedule or cancel your confirmed appointment.
              </p>
              <p>
                <strong className="text-white">Cancellation Policy:</strong> <span className="text-[#A1A1AA]">[Editable Placeholder: Specific cancellation fee or policy to be determined by business operations; no automated fees are levied online without mutual agreement.]</span>
              </p>
            </div>
            <p className="text-xs text-[#71717A]">
              To reschedule or cancel, please contact dispatch directly by phone or via our verified Instagram channel.
            </p>
          </section>

          {/* Section 4 */}
          <section className="bg-[#09090D] border border-white/5 rounded-sm p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-2.5">
              <span className="font-mono text-xs text-[#D6A447]">04.</span>
              <span>Customer Responsibilities</span>
            </h2>
            <p className="mb-4">
              To ensure safe, thorough service delivery, the customer agrees to the following responsibilities:
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#A1A1AA] pl-4 border-l border-[#D6A447]/30">
              <li><strong className="text-white">Authorized Adult Present:</strong> An authorized homeowner or adult representative (age 18 or older) must be present throughout the scheduled service window.</li>
              <li><strong className="text-white">Accurate Information:</strong> The client is responsible for providing accurate property address, gate access codes, and contact phone numbers.</li>
              <li><strong className="text-white">Pet Safety:</strong> All household pets must be securely contained or housed away from active work zones, equipment hoses, and entry doors prior to technician arrival.</li>
              <li><strong className="text-white">Utility Access:</strong> The property must have functioning electrical power and adequate access to ventilation connections.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="bg-[#09090D] border border-white/5 rounded-sm p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-2.5">
              <span className="font-mono text-xs text-[#D6A447]">05.</span>
              <span>Service Access &amp; Property Conditions</span>
            </h2>
            <p className="mb-4">
              Technicians require unobstructed physical access to perform mechanical cleaning safely:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#A1A1AA] pl-4 border-l border-[#D6A447]/30 mb-4">
              <li>Furnace air handlers, return plenums, basement utility areas, attic access hatches, dryer rear connections, and fireplace hearths must be reasonably clear of personal storage and heavy obstacles.</li>
              <li><strong className="text-white">Pre-existing Damage Disclosure:</strong> The client agrees to disclose any known pre-existing duct deterioration, damaged flexible ductwork, loose registers, structural decay, active roof leaks, or environmental hazards (such as asbestos or mold) prior to the start of work.</li>
            </ul>
            <p className="text-xs text-[#71717A]">
              Technicians reserve the right to halt work if unsafe structural or biological hazards are discovered during inspection.
            </p>
          </section>

          {/* Section 6 */}
          <section className="bg-[#09090D] border border-white/5 rounded-sm p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-2.5">
              <span className="font-mono text-xs text-[#D6A447]">06.</span>
              <span>Estimates &amp; Payment Terms</span>
            </h2>
            <p className="mb-4">
              Transparency is our commitment. Online booking submissions do not require upfront credit card payment on this website.
            </p>
            <div className="p-4 bg-[#111116] border border-white/10 rounded-xs mb-4 text-xs sm:text-sm space-y-2">
              <p>
                <strong className="text-white">Pricing Scope:</strong> Estimates are based on residence size, number of HVAC units, total registers, and specific service protocols requested. Any adjustments due to unexpected system configuration are communicated prior to commencement.
              </p>
              <p>
                <strong className="text-white">Payment Due:</strong> Payment in full is due upon completion of services.
              </p>
              <p>
                <strong className="text-white">Accepted Methods:</strong> <span className="text-[#D6A447] font-mono">[Editable Placeholder: Cash, Major Credit/Debit Cards, Electronic Bank Transfer as confirmed with dispatch.]</span>
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="bg-[#09090D] border border-white/5 rounded-sm p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-2.5">
              <span className="font-mono text-xs text-[#D6A447]">07.</span>
              <span>Limitations of Service &amp; Liability</span>
            </h2>
            <p className="mb-4">
              Signature Duct Cleaning performs all work utilizing professional-grade negative pressure extraction, rotary agitation, and care. However:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#A1A1AA] pl-4 border-l border-[#D6A447]/30 mb-4">
              <li>We are not liable for pre-existing structural decay, dry rot, degraded brittle flex ductwork that deteriorates due to age, or unglued joints pre-dating our arrival.</li>
              <li>Mechanical cleaning is intended to remove debris and dust; it does not replace structural HVAC mechanical repair or resolve underlying mechanical compressor faults.</li>
              <li>In no event shall Signature Duct Cleaning be liable for indirect, incidental, or consequential damages beyond the direct cost of the service provided.</li>
            </ul>
          </section>

          {/* Section 8: Contact */}
          <section className="bg-gradient-to-b from-[#111116] to-[#09090C] border border-[#D6A447]/30 rounded-sm p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide text-white mb-3 flex items-center gap-2.5">
              <span className="font-mono text-xs text-[#D6A447]">08.</span>
              <span>Contact &amp; Agreement Questions</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A1AA] mb-6">
              For questions regarding these service terms, scheduling policies, or service agreements, please contact us directly:
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-mono">
              <a
                href="mailto:signatureductcleaning05@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 hover:border-[#D6A447] text-white rounded-xs transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#D6A447]" />
                <span>signatureductcleaning05@gmail.com</span>
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 hover:border-[#D6A447] text-white rounded-xs transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#D6A447]" />
                <span>{INSTAGRAM_HANDLE}</span>
              </a>
            </div>
          </section>
        </div>

        {/* Bottom Action Footer */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href="#/"
            className="text-xs font-mono uppercase tracking-[0.2em] text-[#C7C7C7] hover:text-[#D6A447] transition-colors"
          >
            ← Back to Homepage
          </a>

          <button
            onClick={() => openBookingModal()}
            className="px-6 py-2.5 text-xs font-bold tracking-[0.16em] uppercase text-[#050505] bg-gradient-to-r from-[#D6A447] to-[#F4E2B5] hover:brightness-110 rounded-xs transition-all shadow-[0_0_15px_rgba(214,164,71,0.25)]"
          >
            Schedule Service
          </button>
        </div>
      </div>
    </div>
  );
};
