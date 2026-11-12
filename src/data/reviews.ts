export interface CustomerReview {
  id: string;
  clientName: string;
  location: string;
  rating: number; // 1 to 5 stars
  serviceReceived: string;
  date: string;
  quote: string;
  isFeatured?: boolean;
  editorialNote?: string;
}

/**
 * CLIENT REVIEWS DATA STORE
 *
 * Business Owner Note:
 * Update this file to insert your authentic, verified client testimonials and ratings.
 * Each review will automatically render in the luxury editorial showcase.
 */
export const CLIENT_REVIEWS: CustomerReview[] = [
  {
    id: "rev-01",
    clientName: "David M.",
    location: "Oakridge Estate",
    rating: 5,
    serviceReceived: "Air Duct & HVAC System Cleaning",
    date: "November 2026",
    isFeatured: true,
    editorialNote: "Complete HVAC Plenum & Multi-Zone Air Duct Decontamination",
    quote:
      "Signature Duct Cleaning sets a standard far beyond any typical service company. Their crew arrived with surgical containment gear, protected every surface of our hardwood floors, and showed before-and-after camera footage inside our supply lines. The air in our home feels noticeably lighter and crisper. Truly top-tier workmanship.",
  },
  {
    id: "rev-02",
    clientName: "Elena R.",
    location: "Bridlewood Residence",
    rating: 5,
    serviceReceived: "Dryer Vent Cleaning & Inspection",
    date: "October 2026",
    editorialNote: "Thermal Obstruction Clearance",
    quote:
      "Our dryer was taking two full cycles to dry blankets and was overheating the laundry closet. Signature cleared a heavy compaction of trapped lint all the way to the roof exhaust. Our drying time dropped immediately back to normal. Prompt, polite, and spotless cleanup.",
  },
  {
    id: "rev-03",
    clientName: "Marcus T.",
    location: "Highland Park Villa",
    rating: 5,
    serviceReceived: "Chimney Cleaning & Flue Clearance",
    date: "October 2026",
    editorialNote: "Masonry Hearth & Flue Creosote Extraction",
    quote:
      "Having a modern black steel hearth, I was concerned about soot getting into the living room. Signature's hermetic vacuum seal kept the room entirely dust-free while removing three seasons of soot. Exceptional professionalism.",
  },
  {
    id: "rev-04",
    clientName: "Sophia K.",
    location: "Lakeside Penthouse",
    rating: 5,
    serviceReceived: "Attic Insulation & Air Sealing",
    date: "September 2026",
    editorialNote: "Thermal Envelope Stabilization",
    quote:
      "After remodeling, we needed old insulation removed and fresh blown fill installed. The temperature consistency across our upper floor stabilized immediately, and our HVAC unit isn't running constantly anymore. Highest recommendation.",
  },
];
