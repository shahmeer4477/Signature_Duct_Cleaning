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
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_EMAILJS_SERVICE_ID) ||
    "service_7hstt7l",
  TEMPLATE_ID:
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_EMAILJS_TEMPLATE_ID) ||
    "template_f6wqk8r",
  PUBLIC_KEY:
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_EMAILJS_PUBLIC_KEY) ||
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
 * Also includes standard snake_case and camelCase aliases to guarantee matching
 * regardless of the exact tag syntax in the user's template.
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

  return {
    // 1. EXACT FIELD NAMES SPECIFIED BY USER
    "customer name": booking.fullName,
    email: booking.customer_email,
    "phone number": booking.phone,
    "street address": booking.street,
    "ZIP code": booking.zip,
    "selected services": selectedServicesText,
    "preferred date": booking.preferredDate,
    "preferred time": booking.preferredTime,
    "additional notes": notesText,

    // 2. Snake_case and common aliases for comprehensive template compatibility
    customer_name: booking.fullName,
    full_name: booking.fullName,
    name: booking.fullName,

    customer_email: booking.customer_email,
    to_email: booking.customer_email, // Used by attached auto-reply recipient
    recipient_email: booking.customer_email,
    reply_to: booking.customer_email,

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
  // Initialize EmailJS with the Public Key
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

  const templateParams = buildContactTemplateParams(booking);

  console.log(
    "[EmailJS] Executing single Contact Template dispatch (with attached auto-reply):",
    {
      serviceId: EMAILJS_CONFIG.SERVICE_ID,
      templateId: EMAILJS_CONFIG.TEMPLATE_ID,
      customer_email: booking.customer_email,
      templateParams,
    }
  );

  const response = await emailjs.send(
    EMAILJS_CONFIG.SERVICE_ID,
    EMAILJS_CONFIG.TEMPLATE_ID,
    templateParams,
    EMAILJS_CONFIG.PUBLIC_KEY
  );

  console.log("[EmailJS] Email sent successfully:", response);
  return {
    success: true,
    status: response.status,
    text: response.text,
  };
}
