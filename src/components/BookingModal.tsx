import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  FileText,
  Check,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Shield,
  ArrowRight,
  RotateCcw,
  Instagram,
  Mail,
} from "lucide-react";
import { useBookingModal, SubmittedBookingInfo } from "../context/BookingModalContext.tsx";
import { INSTAGRAM_URL } from "../constants/brand.ts";
import { sendBookingEmail } from "../utils/emailjsService.ts";

const AVAILABLE_SERVICES = [
  {
    id: "Air Duct Cleaning",
    title: "Air Duct Cleaning",
    desc: "Negative air displacement & rotary agitation for supply and return runs.",
    icon: "01",
  },
  {
    id: "Dryer Vent Cleaning",
    title: "Dryer Vent Cleaning",
    desc: "Critical lint evacuation and thermal obstruction clearance to prevent fire hazard.",
    icon: "02",
  },
  {
    id: "Chimney Cleaning",
    title: "Chimney Cleaning",
    desc: "Soot & creosote removal with dust-sealed room containment.",
    icon: "03",
  },
  {
    id: "HVAC Cleaning",
    title: "HVAC Cleaning",
    desc: "Coil sanitization, blower fan balancing, and drain line sterilization.",
    icon: "04",
  },
  {
    id: "Attic Insulation",
    title: "Attic Insulation",
    desc: "Thermal barrier extraction, structural air sealing, and premium blown fill.",
    icon: "05",
  },
];

export const BookingModal: React.FC = () => {
  const {
    isOpen,
    closeBookingModal,
    selectedServices,
    toggleService,
    resetServiceSelections,
    activeSelectedServices,
    submittedBooking,
    setSubmittedBooking,
    clearSubmittedBooking,
  } = useBookingModal();

  // Form State (persists during interactions)
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");

  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [notes, setNotes] = useState("");

  // Status & Validation State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Minimum date is today
  const todayStr = new Date().toISOString().split("T")[0];

  // Track open timestamp, pointer origin, and active submission lock
  const openedAtRef = useRef<number>(0);
  const pointerDownInsideDialogRef = useRef<boolean>(false);
  const submittingRef = useRef<boolean>(false);
  const closeModalRef = useRef(closeBookingModal);

  useEffect(() => {
    closeModalRef.current = closeBookingModal;
  }, [closeBookingModal]);

  // Independent Service toggle handler — toggles ONLY the specific service clicked
  const handleToggleService = (serviceId: string) => {
    toggleService(serviceId);
    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: "" }));
    }
  };

  // Handle ESC key and lock background scroll cleanly while modal is open
  useEffect(() => {
    if (!isOpen) return;

    openedAtRef.current = performance.now();
    pointerDownInsideDialogRef.current = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModalRef.current();
      }
    };

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [isOpen]);

  if (!isOpen || typeof document === "undefined") return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target !== e.currentTarget) return;
    if (pointerDownInsideDialogRef.current) {
      pointerDownInsideDialogRef.current = false;
      return;
    }
    // Guard against immediate/ghost clicks triggered in the same interaction that opened the modal
    if (performance.now() - openedAtRef.current < 200) return;
    closeBookingModal();
  };

  // Phone input formatting
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    let formatted = raw;
    if (raw.length > 3 && raw.length <= 6) {
      formatted = `(${raw.slice(0, 3)}) ${raw.slice(3)}`;
    } else if (raw.length > 6) {
      formatted = `(${raw.slice(0, 3)}) ${raw.slice(3, 6)}-${raw.slice(6, 10)}`;
    }
    setPhone(formatted);
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (phoneDigits.length < 10) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!street.trim()) newErrors.street = "Street address is required.";
    if (!zip.trim()) newErrors.zip = "ZIP code is required.";

    if (activeSelectedServices.length === 0) {
      newErrors.services = "Please select at least one service.";
    }

    if (!preferredDate) {
      newErrors.preferredDate = "Please choose a preferred appointment date.";
    } else {
      const selected = new Date(preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        newErrors.preferredDate = "Appointment date cannot be in the past.";
      }
    }

    if (!preferredTime.trim()) {
      newErrors.preferredTime = "Preferred time is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current || isSubmitting) {
      return;
    }

    setErrorMessage(null);

    if (!validateForm()) {
      const scrollableContainer = document.getElementById("booking-modal-scroll");
      if (scrollableContainer) {
        scrollableContainer.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);

    try {
      const trimmedName = fullName.trim();
      const trimmedPhone = phone.trim();
      const trimmedEmail = email.trim();
      const trimmedStreet = street.trim();
      const trimmedZip = zip.trim();
      const trimmedTime = preferredTime.trim();
      const trimmedNotes = notes.trim();
      const selectedList = [...activeSelectedServices];

      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const dateCode = new Date().toISOString().slice(2, 10).replace(/-/g, "");
      const fallbackBookingId = `SIG-${dateCode}-${randomSuffix}`;

      let recordedBooking: SubmittedBookingInfo = {
        id: fallbackBookingId,
        fullName: trimmedName,
        phone: trimmedPhone,
        customer_email: trimmedEmail,
        email: trimmedEmail,
        address: {
          street: trimmedStreet,
          zip: trimmedZip,
        },
        services: selectedList,
        preferredDate,
        preferredTime: trimmedTime,
        notes: trimmedNotes,
        status: "PENDING",
        createdAt: new Date().toISOString(),
      };

      // Dispatch booking inquiry + attached customer auto-reply via EmailJS
      await sendBookingEmail({
        bookingId: recordedBooking.id,
        fullName: trimmedName,
        phone: trimmedPhone,
        customer_email: trimmedEmail,
        street: trimmedStreet,
        zip: trimmedZip,
        services: selectedList,
        preferredDate,
        preferredTime: trimmedTime,
        notes: trimmedNotes,
      });

      // Best-effort backend persistence when Express API is available; safely ignore HTML/404 on static hosts (e.g. Netlify)
      try {
        const res = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: trimmedName,
            phone: trimmedPhone,
            customer_email: trimmedEmail,
            email: trimmedEmail,
            address: {
              street: trimmedStreet,
              zip: trimmedZip,
            },
            services: selectedList,
            preferredDate,
            preferredTime: trimmedTime,
            notes: trimmedNotes,
          }),
        });

        const contentType = res.headers.get("content-type") || "";
        if (res.ok && contentType.includes("application/json")) {
          const data = await res.json();
          if (data?.booking) {
            recordedBooking = data.booking;
          }
        }
      } catch {
        // Static hosting (Netlify) does not expose /api/bookings; EmailJS confirmation already succeeded
      }

      // Transition to confirmation screen ONLY after EmailJS confirms success
      setSubmittedBooking(recordedBooking);
    } catch (err: unknown) {
      console.error("Booking error:", err);
      const rawMessage =
        err instanceof Error
          ? err.message
          : typeof err === "object" && err !== null && "text" in err
            ? String((err as { text?: unknown }).text || "")
            : "";

      const cleanMessage =
        !rawMessage ||
        rawMessage.trim().startsWith("<") ||
        rawMessage.toLowerCase().includes("<!doctype") ||
        rawMessage.toLowerCase().includes("unexpected token")
          ? "Unable to submit your booking request right now. Please try again in a moment."
          : rawMessage;

      setErrorMessage(cleanMessage);
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  // Reset form to book another
  const handleReset = () => {
    setFullName("");
    setPhone("");
    setEmail("");
    setStreet("");
    setZip("");
    resetServiceSelections();
    setPreferredDate("");
    setPreferredTime("");
    setNotes("");
    setSubmittedBooking(null);
    setErrors({});
    setErrorMessage(null);
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 lg:p-10 select-auto animate-fade-in"
    >
      {/* Backdrop with blur & guarded click-outside close */}
      <div
        onPointerDown={(e) => {
          if (e.target === e.currentTarget) {
            pointerDownInsideDialogRef.current = false;
          }
        }}
        onClick={handleBackdropClick}
        className="absolute inset-0 bg-[#050505]/85 backdrop-blur-md transition-opacity"
      />

      {/* Luxury Cinematic Modal Container */}
      <div
        id="booking-modal-scroll"
        onPointerDown={() => {
          pointerDownInsideDialogRef.current = true;
        }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-gradient-to-b from-[#0D0D12] via-[#09090C] to-[#07070A] border border-[#D6A447]/35 rounded-xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] text-white p-6 sm:p-10 lg:p-12 transition-all duration-300"
      >
        {/* Top Gold Shimmer Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D6A447] to-transparent shadow-[0_0_15px_rgba(214,164,71,0.6)]" />

        {/* Close (X) Button */}
        <button
          type="button"
          onClick={closeBookingModal}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 text-[#C7C7C7] hover:text-[#D6A447] hover:bg-white/5 rounded-full transition-colors z-20"
          aria-label="Close booking modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 pr-8 sm:pr-0">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.35em] text-[#D6A447] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Priority Service Scheduling</span>
          </div>

          <h2
            id="booking-modal-title"
            className="text-2xl sm:text-4xl font-display font-extrabold uppercase tracking-tight text-white mb-2"
          >
            BOOK YOUR <span className="gold-shimmer-text">SIGNATURE SERVICE</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#C7C7C7] font-light leading-relaxed">
            Ready for cleaner air and a healthier space? Schedule your preferred service with Signature Duct Cleaning.
          </p>
        </div>

        {submittedBooking ? (
          /* SUCCESS CONFIRMATION SCREEN */
          <div className="text-center py-6 max-w-2xl mx-auto animate-fade-in">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#D6A447]/10 border-2 border-[#D6A447] flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(214,164,71,0.4)]">
              <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11 text-[#D6A447]" />
            </div>

            <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#D6A447] block mb-2">
              Reference ID: {submittedBooking.id}
            </span>

            <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-white mb-3">
              YOUR BOOKING REQUEST HAS BEEN RECEIVED!
            </h3>

            <p className="text-xs sm:text-sm text-[#D4D4D8] font-light leading-relaxed mb-6">
              Our team will review your request and contact you to confirm your appointment.
            </p>

            {/* Summary Box */}
            <div className="bg-[#121217] border border-white/10 rounded-sm p-5 text-left mb-6 space-y-2.5 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-[#71717A] uppercase tracking-wider">Client Name</span>
                <span className="text-white font-medium">{submittedBooking.fullName}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-[#71717A] uppercase tracking-wider">Contact Phone</span>
                <span className="text-white font-medium">{submittedBooking.phone}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-[#71717A] uppercase tracking-wider">Email Address</span>
                <span className="text-white font-medium">
                  {submittedBooking.customer_email || submittedBooking.email}
                </span>
              </div>
              <div className="flex justify-between items-start pb-2 border-b border-white/5">
                <span className="text-[#71717A] uppercase tracking-wider">Service Location</span>
                <span className="text-white font-medium text-right max-w-xs">
                  {submittedBooking.address.street}, {submittedBooking.address.zip}
                </span>
              </div>
              <div className="flex justify-between items-start pb-2 border-b border-white/5">
                <span className="text-[#71717A] uppercase tracking-wider">Selected Services</span>
                <span className="text-[#D6A447] font-medium text-right">
                  {submittedBooking.services.join(", ")}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-[#71717A] uppercase tracking-wider">Preferred Window</span>
                <span className="text-white font-medium">
                  {submittedBooking.preferredDate} · {submittedBooking.preferredTime}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#71717A] uppercase tracking-wider">Status</span>
                <span className="px-2.5 py-0.5 rounded-xs text-[10px] font-mono tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  {submittedBooking.status} (AWAITING DISPATCH CONFIRMATION)
                </span>
              </div>
            </div>

            {/* STEP 2: CONNECT WITH US (Only shown after successful booking submission) */}
            <div className="mb-6 p-6 sm:p-7 bg-[#0A0A0E] border border-[#D6A447]/60 rounded-sm text-left shadow-[0_10px_30px_rgba(214,164,71,0.15)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D6A447]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-[#D6A447] tracking-[0.25em] uppercase">
                  STEP 02 // CUSTOMER JOURNEY
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Unlocked Next Step
                </span>
              </div>
              <h4 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide text-white mb-2">
                CONNECT WITH US
              </h4>
              <p className="text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed mb-4">
                Reach out directly via Instagram Direct Message. Share your home layout, service goals, and preferred schedule.
              </p>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xs mb-4">
                <p className="text-[11px] text-[#C7C7C7] leading-relaxed flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D6A447] shrink-0 mt-0.5" />
                  <span>Fast, personal correspondence with no automated phone menus.</span>
                </p>
              </div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:brightness-110 rounded-xs transition-all shadow-[0_0_20px_rgba(253,29,29,0.3)]"
              >
                <Instagram className="w-4 h-4" />
                <span>Message Dispatch on Instagram (@signature_ductcleaning)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-3 text-xs font-semibold tracking-[0.16em] uppercase text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D6A447]/50 rounded-sm transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Submit Another Request</span>
              </button>

              <button
                type="button"
                onClick={closeBookingModal}
                className="w-full sm:w-auto px-6 py-3 text-xs font-bold tracking-[0.16em] uppercase text-[#050505] bg-gradient-to-r from-[#D6A447] to-[#F4E2B5] hover:brightness-110 rounded-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(214,164,71,0.3)]"
              >
                <span>Done / Close Window</span>
              </button>
            </div>
          </div>
        ) : (
          /* ACTIVE BOOKING FORM */
          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            {/* Error banner if submission failed */}
            {errorMessage && (
              <div className="p-4 bg-red-950/40 border border-red-500/40 rounded-sm flex items-start gap-3 text-red-200 text-xs sm:text-sm animate-fade-in">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block mb-0.5">Submission Error</span>
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}

            {/* STEP 1: CLIENT CONTACT */}
            <div>
              <div className="flex items-center gap-3 mb-4 pb-2 border-b border-white/5">
                <span className="font-mono text-xs font-semibold text-[#D6A447] tracking-[0.2em]">
                  STEP 01
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-[#A1A1AA]">
                  Client Information &amp; Direct Contact
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-[0.16em] text-[#C7C7C7] mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#D6A447]" />
                      Full Name <span className="text-[#D6A447]">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) {
                        setErrors((prev) => ({ ...prev, fullName: "" }));
                      }
                    }}
                    placeholder="e.g. Sterling Montgomery"
                    className={`w-full px-4 py-3 bg-[#09090D] border rounded-sm text-sm text-white placeholder-[#52525B] focus:outline-none transition-all duration-300 ${
                      errors.fullName
                        ? "border-red-500/80 focus:border-red-500"
                        : "border-white/10 hover:border-white/20 focus:border-[#D6A447] focus:ring-1 focus:ring-[#D6A447]/30"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-[11px] text-red-400 font-light flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-[0.16em] text-[#C7C7C7] mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#D6A447]" />
                      Phone Number <span className="text-[#D6A447]">*</span>
                    </span>
                    <span className="text-[10px] text-[#71717A] font-mono">10 Digits</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="(555) 000-0000"
                    className={`w-full px-4 py-3 bg-[#09090D] border rounded-sm text-sm text-white placeholder-[#52525B] focus:outline-none transition-all duration-300 ${
                      errors.phone
                        ? "border-red-500/80 focus:border-red-500"
                        : "border-white/10 hover:border-white/20 focus:border-[#D6A447] focus:ring-1 focus:ring-[#D6A447]/30"
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-[11px] text-red-400 font-light flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-[0.16em] text-[#C7C7C7] mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#D6A447]" />
                      EMAIL ADDRESS <span className="text-[#D6A447]">*</span>
                    </span>
                    <span className="text-[10px] text-[#71717A] font-mono">Auto-Reply</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) {
                        setErrors((prev) => ({ ...prev, email: "" }));
                      }
                    }}
                    placeholder="Enter your email address"
                    className={`w-full px-4 py-3 bg-[#09090D] border rounded-sm text-sm text-white placeholder-[#52525B] focus:outline-none transition-all duration-300 ${
                      errors.email
                        ? "border-red-500/80 focus:border-red-500"
                        : "border-white/10 hover:border-white/20 focus:border-[#D6A447] focus:ring-1 focus:ring-[#D6A447]/30"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-[11px] text-red-400 font-light flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* STEP 2: SERVICE LOCATION */}
            <div>
              <div className="flex items-center gap-3 mb-4 pb-2 border-b border-white/5">
                <span className="font-mono text-xs font-semibold text-[#D6A447] tracking-[0.2em]">
                  STEP 02
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-[#A1A1AA]">
                  Service Residence Address
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Street Address */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium uppercase tracking-[0.16em] text-[#C7C7C7] mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D6A447]" />
                    Street Address <span className="text-[#D6A447]">*</span>
                  </label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => {
                      setStreet(e.target.value);
                      if (errors.street) {
                        setErrors((prev) => ({ ...prev, street: "" }));
                      }
                    }}
                    placeholder="e.g. 1040 Fifth Avenue, Residence 8A"
                    className={`w-full px-4 py-3 bg-[#09090D] border rounded-sm text-sm text-white placeholder-[#52525B] focus:outline-none transition-all duration-300 ${
                      errors.street
                        ? "border-red-500/80 focus:border-red-500"
                        : "border-white/10 hover:border-white/20 focus:border-[#D6A447] focus:ring-1 focus:ring-[#D6A447]/30"
                    }`}
                  />
                  {errors.street && (
                    <p className="mt-1 text-[11px] text-red-400 font-light flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.street}
                    </p>
                  )}
                </div>

                {/* ZIP Code */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-[0.16em] text-[#C7C7C7] mb-1.5 flex items-center justify-between">
                    <span>
                      ZIP Code <span className="text-[#D6A447]">*</span>
                    </span>
                    <span className="text-[10px] text-[#71717A] font-mono">Postal</span>
                  </label>
                  <input
                    type="text"
                    value={zip}
                    onChange={(e) => {
                      setZip(e.target.value);
                      if (errors.zip) {
                        setErrors((prev) => ({ ...prev, zip: "" }));
                      }
                    }}
                    placeholder="e.g. 10028"
                    className={`w-full px-4 py-3 bg-[#09090D] border rounded-sm text-sm text-white placeholder-[#52525B] focus:outline-none transition-all duration-300 ${
                      errors.zip
                        ? "border-red-500/80 focus:border-red-500"
                        : "border-white/10 hover:border-white/20 focus:border-[#D6A447] focus:ring-1 focus:ring-[#D6A447]/30"
                    }`}
                  />
                  {errors.zip && (
                    <p className="mt-1 text-[11px] text-red-400 font-light flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.zip}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* STEP 3: SELECT SERVICES */}
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold text-[#D6A447] tracking-[0.2em]">
                    STEP 03
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#A1A1AA]">
                    Select Required Services <span className="text-[#D6A447]">*</span>
                  </span>
                </div>
                <span className="text-xs font-mono text-[#D6A447]">
                  {activeSelectedServices.length} Selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {AVAILABLE_SERVICES.map((s) => {
                  const isSelected = Boolean(selectedServices[s.id]);
                  return (
                    <div
                      key={s.id}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                          e.preventDefault();
                          handleToggleService(s.id);
                        }
                      }}
                      onClick={() => handleToggleService(s.id)}
                      className={`group relative p-3.5 rounded-sm border cursor-pointer select-none transition-all duration-300 flex flex-col justify-between ${
                        isSelected
                          ? "bg-[#111116] border-[#D6A447] shadow-[0_0_15px_rgba(214,164,71,0.2)]"
                          : "bg-[#09090D] border-white/10 hover:border-[#D6A447]/40 hover:bg-[#0E0E12]"
                      }`}
                    >
                      {/* Independent Checkbox Input for native form semantics & screen readers */}
                      <input
                        type="checkbox"
                        id={`service-checkbox-${s.id.toLowerCase().replace(/\s+/g, "-")}`}
                        name={`service-${s.id}`}
                        checked={isSelected}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => handleToggleService(s.id)}
                        className="sr-only"
                        aria-label={`Select ${s.title}`}
                      />

                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span
                          className={`font-mono text-xs font-bold transition-colors ${
                            isSelected ? "text-[#D6A447]" : "text-[#52525B]"
                          }`}
                        >
                          {s.icon}
                        </span>
                        <div
                          className={`w-4 h-4 rounded-xs border flex items-center justify-center transition-all ${
                            isSelected
                              ? "bg-[#D6A447] border-[#D6A447] text-[#050505] shadow-[0_0_8px_rgba(214,164,71,0.5)]"
                              : "border-white/20 group-hover:border-[#D6A447]/60"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-white mb-0.5">
                          {s.title}
                        </h4>
                        <p className="text-[11px] text-[#8E8E93] font-light leading-snug">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {errors.services && (
                <p className="mt-1.5 text-xs text-red-400 font-light flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.services}
                </p>
              )}
            </div>

            {/* STEP 4: PREFERRED DATE & TIME */}
            <div>
              <div className="flex items-center gap-3 mb-4 pb-2 border-b border-white/5">
                <span className="font-mono text-xs font-semibold text-[#D6A447] tracking-[0.2em]">
                  STEP 04
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-[#A1A1AA]">
                  Preferred Appointment Window
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Date Picker */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-[0.16em] text-[#C7C7C7] mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D6A447]" />
                    Preferred Date <span className="text-[#D6A447]">*</span>
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={preferredDate}
                    onChange={(e) => {
                      setPreferredDate(e.target.value);
                      if (errors.preferredDate) {
                        setErrors((prev) => ({ ...prev, preferredDate: "" }));
                      }
                    }}
                    className={`w-full px-3.5 py-3 bg-[#09090D] border rounded-sm text-xs sm:text-sm text-white focus:outline-none transition-all duration-300 [color-scheme:dark] ${
                      errors.preferredDate
                        ? "border-red-500/80 focus:border-red-500"
                        : "border-white/10 hover:border-white/20 focus:border-[#D6A447]"
                    }`}
                  />
                  {errors.preferredDate && (
                    <p className="mt-1 text-[11px] text-red-400 font-light flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.preferredDate}
                    </p>
                  )}
                </div>

                {/* Customer-controlled Preferred Time Input */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-[0.16em] text-[#C7C7C7] mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D6A447]" />
                    PREFERRED TIME <span className="text-[#D6A447]">*</span>
                  </label>
                  <input
                    type="text"
                    value={preferredTime}
                    onChange={(e) => {
                      setPreferredTime(e.target.value);
                      if (errors.preferredTime) {
                        setErrors((prev) => ({ ...prev, preferredTime: "" }));
                      }
                    }}
                    placeholder="Enter your desired time (e.g. 10:30 AM)"
                    className={`w-full px-3.5 py-3 bg-[#09090D] border rounded-sm text-xs sm:text-sm text-white placeholder-[#52525B] focus:outline-none transition-all duration-300 ${
                      errors.preferredTime
                        ? "border-red-500/80 focus:border-red-500"
                        : "border-white/10 hover:border-white/20 focus:border-[#D6A447] focus:ring-1 focus:ring-[#D6A447]/30"
                    }`}
                  />
                  {errors.preferredTime && (
                    <p className="mt-1 text-[11px] text-red-400 font-light flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.preferredTime}
                    </p>
                  )}
                </div>
              </div>

              <p className="mt-2 text-[10px] text-[#71717A] font-mono">
                * Note: Preferred appointment times are subject to company review. Our team will contact you to confirm final scheduling.
              </p>
            </div>

            {/* STEP 5: ADDITIONAL NOTES */}
            <div>
              <div className="flex items-center gap-3 mb-3 pb-2 border-b border-white/5">
                <span className="font-mono text-xs font-semibold text-[#D6A447] tracking-[0.2em]">
                  STEP 05
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-[#A1A1AA]">
                  Additional Notes (Optional)
                </span>
              </div>

              <label className="block text-xs font-medium uppercase tracking-[0.16em] text-[#C7C7C7] mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#D6A447]" />
                Cleaning Requirements / Access Details
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tell us anything important about your cleaning requirements..."
                className="w-full px-4 py-2.5 bg-[#09090D] border border-white/10 hover:border-white/20 focus:border-[#D6A447] rounded-sm text-xs sm:text-sm text-white placeholder-[#52525B] focus:outline-none transition-all duration-300 resize-y"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-2 border-t border-[#D6A447]/20">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-8 text-xs sm:text-sm font-bold tracking-[0.22em] uppercase text-[#050505] bg-gradient-to-r from-[#D6A447] via-[#F4E2B5] to-[#D6A447] hover:from-[#E2BA59] hover:via-[#FFF] hover:to-[#E2BA59] rounded-sm transition-all duration-300 shadow-[0_0_30px_rgba(214,164,71,0.45)] hover:shadow-[0_0_50px_rgba(214,164,71,0.75)] flex items-center justify-center gap-3 active:scale-[0.99] ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 text-[#050505] animate-spin" />
                    <span>TRANSMITTING BOOKING REQUEST...</span>
                  </>
                ) : (
                  <>
                    <span>SUBMIT BOOKING REQUEST</span>
                    <ArrowRight className="w-4 h-4 text-[#050505]" />
                  </>
                )}
              </button>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-[10px] text-[#71717A] font-mono">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-[#D6A447]" />
                  Direct Dispatch Encryption
                </span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
};
