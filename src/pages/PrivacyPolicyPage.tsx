import React, { useEffect } from "react";
import { ArrowLeft, Shield, Lock, FileText, Mail, Instagram, CheckCircle2 } from "lucide-react";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "../constants/brand.ts";
import { useBookingModal } from "../context/BookingModalContext.tsx";

export const PrivacyPolicyPage: React.FC = () => {
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
            <Shield className="w-3.5 h-3.5" />
            <span>Legal Documentation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-white mb-4">
            PRIVACY <span className="gold-shimmer-text">POLICY</span>
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
              <span>Information We Collect</span>
            </h2>
            <p className="mb-4">
              Signature Duct Cleaning collects customer information voluntarily provided through our online appointment booking form and direct customer correspondence. This information is strictly required to evaluate your residential service inquiry and dispatch technicians.
            </p>
            <p className="mb-3 font-medium text-white text-xs uppercase tracking-wider font-mono">
              Information collected through our booking form includes:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#A1A1AA] pl-4 border-l border-[#D6A447]/30 mb-4">
              <li><strong className="text-white">Full Name:</strong> To identify the client and property contact.</li>
              <li><strong className="text-white">Telephone Number:</strong> To confirm appointments, provide technician arrival updates, and discuss service details.</li>
              <li><strong className="text-white">Email Address:</strong> To deliver automatic booking request acknowledgements, dispatch updates, and direct service correspondence.</li>
              <li><strong className="text-white">Physical Service Address:</strong> (Street address and ZIP code) to route dispatch and determine service viability.</li>
              <li><strong className="text-white">Selected Services:</strong> (Air duct cleaning, dryer vent clearing, chimney sweeping, HVAC cleaning, attic insulation) to assign proper equipment.</li>
              <li><strong className="text-white">Preferred Date &amp; Time Window:</strong> To schedule dispatch routing.</li>
              <li><strong className="text-white">Additional Notes:</strong> Any customer-provided details regarding pet safety, gate codes, parking, or system symptoms.</li>
            </ul>
            <p className="text-xs text-[#71717A]">
              We also collect standard technical log data (such as browser type and timestamp) necessary for the basic operation and security of our web application.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-[#09090D] border border-white/5 rounded-sm p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-2.5">
              <span className="font-mono text-xs text-[#D6A447]">02.</span>
              <span>How We Use Your Information</span>
            </h2>
            <p className="mb-4">
              Your information is utilized solely for legitimate operational purposes directly related to residential HVAC and ventilation cleaning services. Specifically, we use your data to:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xs flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D6A447] shrink-0 mt-0.5" />
                <span>Process and log your appointment requests.</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xs flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D6A447] shrink-0 mt-0.5" />
                <span>Contact you via phone or SMS for schedule confirmation.</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xs flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D6A447] shrink-0 mt-0.5" />
                <span>Dispatch certified technicians to your address.</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xs flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D6A447] shrink-0 mt-0.5" />
                <span>Coordinate direct Instagram DM communication when initiated.</span>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-[#09090D] border border-white/5 rounded-sm p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-2.5">
              <span className="font-mono text-xs text-[#D6A447]">03.</span>
              <span>Data Storage &amp; Protection</span>
            </h2>
            <p className="mb-4">
              Booking requests submitted through our website are transmitted directly to our secure operational dispatch records. We employ standard technical safeguards:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#A1A1AA] pl-4 border-l border-[#D6A447]/30 mb-4">
              <li>Access to client records is restricted exclusively to authorized operational personnel responsible for scheduling and service dispatch.</li>
              <li>Customer data is stored within our protected database environment and not exposed to the public internet.</li>
              <li>We do not store payment card credentials or sensitive financial data on this website.</li>
            </ul>
            <p className="text-xs text-[#71717A]">
              Note: While we maintain diligent industry-standard precautions, no electronic data transmission or digital storage system can be guaranteed 100% impenetrable.
            </p>
          </section>

          {/* Section 4 */}
          <section className="bg-[#09090D] border border-white/5 rounded-sm p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-2.5">
              <span className="font-mono text-xs text-[#D6A447]">04.</span>
              <span>Third-Party Disclosures</span>
            </h2>
            <p className="mb-3">
              <strong className="text-white">We do not sell, rent, lease, or trade your personal information</strong> to third-party marketing firms, data brokers, or advertising networks under any circumstances.
            </p>
            <p className="text-xs sm:text-sm text-[#A1A1AA]">
              We only share information with third-party service providers (such as cloud hosting providers and network infrastructure) strictly to the extent necessary to deliver and operate our web application. In rare circumstances, we may disclose information if required by valid legal process or to protect safety.
            </p>
          </section>

          {/* Section 5 */}
          <section className="bg-[#09090D] border border-white/5 rounded-sm p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-2.5">
              <span className="font-mono text-xs text-[#D6A447]">05.</span>
              <span>Your Privacy Rights</span>
            </h2>
            <p className="mb-4">
              You retain full control over the personal information you share with us. You have the right to:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#A1A1AA] pl-4 border-l border-[#D6A447]/30 mb-4">
              <li>Request a review of the personal data we hold associated with your name or phone number.</li>
              <li>Request the correction or update of any inaccurate contact information.</li>
              <li>Request the complete deletion of your booking history and contact record from our active dispatch database.</li>
              <li>Opt out of future non-essential communication at any time.</li>
            </ul>
          </section>

          {/* Section 6: Contact */}
          <section className="bg-gradient-to-b from-[#111116] to-[#09090C] border border-[#D6A447]/30 rounded-sm p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide text-white mb-3 flex items-center gap-2.5">
              <span className="font-mono text-xs text-[#D6A447]">06.</span>
              <span>Privacy Inquiries &amp; Contact</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A1AA] mb-6">
              If you have any questions or wish to exercise your data rights, please contact our privacy coordinator directly:
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
