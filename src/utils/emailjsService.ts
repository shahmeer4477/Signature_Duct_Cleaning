import emailjs from "@emailjs/browser";

/**
 * Signature Duct Cleaning — EmailJS Integration Configuration
 *
 * Configured with user-provided credentials:
 * - Service ID: service_7hstt7l
 * - Contact Template ID: template_f6wqk8r
 * - Public Key: _HvbQ5I_dZNFjJq-9
 *
 * The automatic customer reply is attached to this Contact Template in EmailJS,
 * so only ONE send operation is performed.
 */
export const EMAILJS_CONFIG = {
  SERVICE_ID:
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_EMAILJS_SERVICE_ID?.trim()) ||
    "service_7hstt7l",
  TEMPLATE_ID:
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_EMAILJS_TEMPLATE_ID?.trim()) ||
    "template_f6wqk8r",
  PUBLIC_KEY:
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_EMAILJS_PUBLIC_KEY?.trim()) ||
    "_HvbQ5I_dZNFjJq-9",
};

export interface BookingEmailData {
  bookingId: string;
  fullName: string;
  phone: string;
  customer_email: string;
  street: string;
  zip: string;
  services: string[];
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

/**
 * Builds the template parameters for EmailJS Contact Template.
 *
 * Exact user mappings:
 * - Full Name → "customer name"
 * - Customer Email → "email"
 * - Phone Number → "phone number"
 * - Street Address → "street address"
 * - ZIP Code → "ZIP code"
 * - Selected Services → "selected services" (every selected service included)
 * - Preferred Date → "preferred date"
 * - Preferred Time → "preferred time"
 * - Additional Notes → "additional notes"
 *
 * Also includes standard snake_case and camelCase aliases (including reply_to)
 * to guarantee matching regardless of the exact tag syntax in the template.
 */
export function buildContactTemplateParams(
  booking: BookingEmailData
): Record<string, unknown> {
  const selectedServicesText =
    Array.isArray(booking.services) && booking.services.length > 0
      ? booking.services.join(", ")
      : "Air Duct Cleaning";

  const notesText = booking.notes?.trim()
    ? booking.notes.trim()
    : "None provided";

  const customerEmail = booking.customer_email.trim();

  return {
    // 1. EXACT FIELD NAMES SPECIFIED BY USER
    "customer name": booking.fullName,
    email: customerEmail,
    "phone number": booking.phone,
    "street address": booking.street,
    "ZIP code": booking.zip,
    "selected services": selectedServicesText,
    "preferred date": booking.preferredDate,
    "preferred time": booking.preferredTime,
    "additional notes": notesText,

    // 2. Snake_case, Reply-To, and common aliases for comprehensive template compatibility
    customer_name: booking.fullName,
    full_name: booking.fullName,
    name: booking.fullName,

    customer_email: customerEmail,
    to_email: customerEmail, // Used by attached auto-reply recipient
    recipient_email: customerEmail,
    reply_to: customerEmail,
    replyTo: customerEmail,
    user_email: customerEmail,

    phone_number: booking.phone,
    phone: booking.phone,

    street_address: booking.street,
    street: booking.street,

    zip_code: booking.zip,
    zip: booking.zip,
    "zip code": booking.zip,

    selected_services: selectedServicesText,
    services: selectedServicesText,

    preferred_date: booking.preferredDate,
    date: booking.preferredDate,

    preferred_time: booking.preferredTime,
    time: booking.preferredTime,

    additional_notes: notesText,
    notes: notesText,
    message: notesText,

    // Booking identification & status
    booking_id: booking.bookingId,
    status: "PENDING",
    submission_date: new Date().toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "short",
    }),
  };
}

function formatEmailJsError(err: unknown): string {
  if (!err || typeof err !== "object") {
    return "Unable to send your booking request right now. Please try again shortly.";
  }

  const record = err as { status?: number; text?: string; message?: string };
  const rawMessage = record.text || record.message || "";

  // Never expose raw HTML error pages or JSON parser noise to the user
  if (
    !rawMessage ||
    rawMessage.trim().startsWith("<") ||
    rawMessage.toLowerCase().includes("<!doctype") ||
    rawMessage.toLowerCase().includes("unexpected token")
  ) {
    return "Unable to reach the booking email service right now. Please check your internet connection and try again.";
  }

  if (record.status === 400 || record.status === 401 || record.status === 403) {
    return `Booking email service rejected the request (${rawMessage}). Please verify EmailJS service configuration.`;
  }

  if (record.status === 429) {
    return "Too many booking requests were sent in a short time. Please wait a moment and try again.";
  }

  return rawMessage;
}

/**
 * Sends booking information using the configured EmailJS Service and Contact Template.
 *
 * Performs exactly ONE send operation:
 * - Triggers the business notification
 * - Triggers the attached Auto Reply configuration in EmailJS to the customer's email
 * - Does NOT invoke a second separate auto-reply template
 */
export async function sendBookingEmail(
  booking: BookingEmailData
): Promise<{ success: boolean; status: number; text: string }> {
  const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } = EMAILJS_CONFIG;

  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error(
      "Booking email service is not configured. Missing EmailJS credentials."
    );
  }

  // Initialize EmailJS v5 with the Public Key
  emailjs.init({ publicKey: PUBLIC_KEY });

  const templateParams = buildContactTemplateParams(booking);

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      { publicKey: PUBLIC_KEY }
    );

    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.text || "EmailJS returned a non-success status.");
    }

    return {
      success: true,
      status: response.status,
      text: response.text,
    };
  } catch (err) {
    throw new Error(formatEmailJsError(err));
  }
}
