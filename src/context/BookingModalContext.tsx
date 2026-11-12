import React, { createContext, useContext, useState, ReactNode } from "react";

export interface SubmittedBookingInfo {
  id: string;
  fullName: string;
  phone: string;
  customer_email: string;
  email?: string;
  address: {
    street: string;
    zip: string;
    city?: string;
    state?: string;
  };
  services: string[];
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: string;
  createdAt: string;
}

export const CANONICAL_SERVICES = [
  "Air Duct Cleaning",
  "Dryer Vent Cleaning",
  "Chimney Cleaning",
  "HVAC Cleaning",
  "Attic Insulation",
] as const;

export type CanonicalServiceType = (typeof CANONICAL_SERVICES)[number];

// Default selection on website load: Air Duct Cleaning checked by default
export const DEFAULT_SERVICE_SELECTION: Record<string, boolean> = {
  "Air Duct Cleaning": true,
  "Dryer Vent Cleaning": false,
  "Chimney Cleaning": false,
  "HVAC Cleaning": false,
  "Attic Insulation": false,
};

/**
 * Normalizes any service title or identifier from anywhere in the app
 * to one of the 5 canonical booking form keys.
 */
export function normalizeServiceKey(raw?: string | null): string | null {
  if (!raw) return null;
  const lower = raw.toLowerCase().trim();
  if (lower.includes("duct")) return "Air Duct Cleaning";
  if (lower.includes("dryer")) return "Dryer Vent Cleaning";
  if (lower.includes("chimney")) return "Chimney Cleaning";
  if (lower.includes("hvac")) return "HVAC Cleaning";
  if (lower.includes("attic") || lower.includes("insulation")) return "Attic Insulation";
  return null;
}

interface BookingModalContextType {
  isOpen: boolean;
  openBookingModal: (serviceId?: string) => void;
  closeBookingModal: () => void;
  // Shared booking-services state synchronized between Services section & Booking form
  selectedServices: Record<string, boolean>;
  setSelectedServices: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  selectSingleService: (serviceIdentifier: string, openModal?: boolean) => void;
  toggleService: (serviceKey: string) => void;
  resetServiceSelections: () => void;
  activeSelectedServices: string[];
  // Submitted booking records
  submittedBooking: SubmittedBookingInfo | null;
  setSubmittedBooking: (booking: SubmittedBookingInfo | null) => void;
  clearSubmittedBooking: () => void;
}

const BookingModalContext = createContext<BookingModalContextType | undefined>(
  undefined
);

const LOCAL_STORAGE_KEY = "signature_submitted_booking";

export const BookingModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Shared booking-services state initialized with Air Duct Cleaning selected by default
  const [selectedServices, setSelectedServices] = useState<
    Record<string, boolean>
  >(() => ({ ...DEFAULT_SERVICE_SELECTION }));

  const [submittedBooking, setSubmittedBookingState] =
    useState<SubmittedBookingInfo | null>(() => {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        return saved ? JSON.parse(saved) : null;
      } catch {
        return null;
      }
    });

  const setSubmittedBooking = (booking: SubmittedBookingInfo | null) => {
    setSubmittedBookingState(booking);
    try {
      if (booking) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(booking));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    } catch {
      // Safe fallback if storage unavailable
    }
  };

  const clearSubmittedBooking = () => {
    setSubmittedBooking(null);
  };

  // Derive genuinely active selected services list
  const activeSelectedServices = CANONICAL_SERVICES.filter(
    (id) => Boolean(selectedServices[id])
  );

  // Select a single service exclusively and optionally open/focus the booking popup
  const selectSingleService = (serviceIdentifier: string, openModal = true) => {
    const canonical = normalizeServiceKey(serviceIdentifier);
    if (canonical) {
      setSelectedServices({
        "Air Duct Cleaning": canonical === "Air Duct Cleaning",
        "Dryer Vent Cleaning": canonical === "Dryer Vent Cleaning",
        "Chimney Cleaning": canonical === "Chimney Cleaning",
        "HVAC Cleaning": canonical === "HVAC Cleaning",
        "Attic Insulation": canonical === "Attic Insulation",
      });
    }
    if (openModal) {
      setIsOpen(true);
    }
  };

  // Independent service checkbox toggle
  const toggleService = (serviceKey: string) => {
    setSelectedServices((prev) => ({
      ...prev,
      [serviceKey]: !prev[serviceKey],
    }));
  };

  // Reset to default selection (Air Duct Cleaning checked)
  const resetServiceSelections = () => {
    setSelectedServices({ ...DEFAULT_SERVICE_SELECTION });
  };

  const openBookingModal = (serviceId?: string) => {
    if (serviceId) {
      selectSingleService(serviceId, true);
    } else {
      setIsOpen(true);
    }
  };

  const closeBookingModal = () => {
    setIsOpen(false);
  };

  return (
    <BookingModalContext.Provider
      value={{
        isOpen,
        openBookingModal,
        closeBookingModal,
        selectedServices,
        setSelectedServices,
        selectSingleService,
        toggleService,
        resetServiceSelections,
        activeSelectedServices,
        submittedBooking,
        setSubmittedBooking,
        clearSubmittedBooking,
      }}
    >
      {children}
    </BookingModalContext.Provider>
  );
};

export const useBookingModal = (): BookingModalContextType => {
  const context = useContext(BookingModalContext);
  if (!context) {
    throw new Error(
      "useBookingModal must be used within a BookingModalProvider"
    );
  }
  return context;
};
