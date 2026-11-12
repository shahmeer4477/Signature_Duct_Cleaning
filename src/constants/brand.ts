export const INSTAGRAM_URL = "https://www.instagram.com/signature_ductcleaning?dlrf=NnhxY3Z1dGZlNnp2";
export const INSTAGRAM_HANDLE = "@signature_ductcleaning";

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  highlights: string[];
  specs: {
    label: string;
    value: string;
  }[];
  processDetail: string;
  imageAlt?: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "air-duct-cleaning",
    number: "01",
    title: "AIR DUCT CLEANING",
    shortDesc: "Complete mechanical decontamination of supply, return, and branch ductwork to restore pure airflow.",
    fullDesc: "Our high-precision source-removal duct decontamination utilizes negative air pressure displacement combined with pneumatic rotary agitation. We extract accumulated micro-allergens, airborne particulates, drywall dust, and biological debris across every linear foot of your ventilation conduits.",
    image: "/src/assets/images/service_air_duct_clean_branded_1794326494355.jpg",
    imageAlt: "Professional Air Duct Cleaning — Source-removal negative air pressure displacement and ductwork sanitization in residential and commercial properties across the United States",
    highlights: [
      "Negative-air source containment extraction",
      "Rotary brush & pneumatic agitation passes",
      "Plenum chamber sanitization & register detailing",
      "Immediate reduction in circulating micro-particulates"
    ],
    specs: [
      { label: "Pressure Flow", value: "High-Volume Vacuum Displacement" },
      { label: "Filtration", value: "Multi-Stage HEPA 99.97% Standard" },
      { label: "Target", value: "Supply, Return & Branch Run Ducts" }
    ],
    processDetail: "Sealing of registers, pneumatic air-whip sweeping, and total particulate extraction without dispersing dust into living quarters."
  },
  {
    id: "dryer-vent-cleaning",
    number: "02",
    title: "DRYER VENT CLEANING",
    shortDesc: "Total lint and thermal obstruction removal to optimize appliance efficiency and mitigate fire hazards.",
    fullDesc: "Dryer exhaust ducts accumulate high-density combustible lint fibers and condensed moisture. Our specialized deep-bore line clearing clears the entire exhaust run from the dryer transition collar through the exterior wall or roof damper.",
    image: "/src/assets/images/service_dryer_vent_clean_branded_1794326513518.jpg",
    imageAlt: "Professional Dryer Vent Cleaning — Lint extraction, thermal obstruction removal, and fire hazard prevention for residential laundry exhausts",
    highlights: [
      "Full-length line blockage & lint evacuation",
      "Exterior damper flap inspection and seal check",
      "Airflow backpressure measurement verification",
      "Accelerated drying cycles and reduced thermal wear"
    ],
    specs: [
      { label: "Safety Impact", value: "Critical Fire Prevention" },
      { label: "Efficiency", value: "Up to 30% Faster Cycle Times" },
      { label: "Reach", value: "Full Wall/Ceiling/Roof Exhaust Runs" }
    ],
    processDetail: "Pneumatic reverse-blow snake extraction ensuring zero residual constriction along transition joints."
  },
  {
    id: "chimney-cleaning",
    number: "03",
    title: "CHIMNEY CLEANING",
    shortDesc: "Surgical creosote, soot, and draft blockage clearing for safe, efficient hearth ventilation.",
    fullDesc: "Fireplace flues accumulate flammable glaze, creosote deposits, and combustible soot over seasons of burning. Our chimney sweeping service utilizes heavy-gauge poly-flue brushes and sealed negative-pressure HEPA vacuums to protect your living room.",
    image: "/src/assets/images/service_chimney_clean_branded_1794326539045.jpg",
    imageAlt: "Professional Chimney Cleaning Services — Creosote, soot, and draft blockage sweeping with dust-sealed room containment",
    highlights: [
      "Stage 1, 2, and 3 creosote assessment and sweeping",
      "Smoke chamber, smoke shelf, and damper detailing",
      "Full living space containment with dustless capture",
      "Flue draft verification and cap blockage clearing"
    ],
    specs: [
      { label: "Containment", value: "Hermetic Living Room Sealing" },
      { label: "Flue Types", value: "Masonry, Metal Pre-Fab & Linear Fireplaces" },
      { label: "Hazard Clearance", value: "Creosote & Draft Obstruction Removal" }
    ],
    processDetail: "Sealed floor containment followed by progressive flue brushing from top-cap down through firebox."
  },
  {
    id: "hvac-system-cleaning",
    number: "04",
    title: "HVAC SYSTEM CLEANING",
    shortDesc: "Comprehensive deep-cleaning of evaporator coils, blower fan assemblies, and central air handlers.",
    fullDesc: "Dust, mold spores, and bio-film build up on damp evaporator coils and blower squirrel-cage fans, restricting thermal heat transfer and forcing compressors to overwork. We chemically foam-clean coils and balance the blower unit.",
    image: "/src/assets/images/service_hvac_system_clean_branded_1794326559603.jpg",
    imageAlt: "Professional HVAC Cleaning Services — Evaporator coil antimicrobial cleaning, blower fan motor detailing, and central air handler care",
    highlights: [
      "Evaporator coil antimicrobial foam treatment",
      "Blower wheel motor and housing detailing",
      "Condensate drain line clearing & pan sterilization",
      "Restored thermodynamic exchange efficiency"
    ],
    specs: [
      { label: "Components", value: "Coil, Blower Fan, Drain Pan, Air Handler" },
      { label: "Chemistry", value: "Non-Toxic, Biodegradable Coil Formulations" },
      { label: "Energy Impact", value: "Reduced Compressor Electrical Strain" }
    ],
    processDetail: "Disassembly of cabinet access panels, precision spray extraction of coils, and sanitization of air-handling assemblies."
  },
  {
    id: "attic-insulation",
    number: "05",
    title: "ATTIC INSULATION",
    shortDesc: "Architectural thermal barrier optimization, damaged insulation extraction, and fresh blown thermal fill.",
    fullDesc: "A compromised attic insulation layer causes rapid thermal loss in winter and radiant heat soak in summer, driving HVAC utility costs up while allowing dust and pests into ceiling voids. We extract contaminated material and lay fresh high-R-value coverage.",
    image: "/src/assets/images/service_attic_insulation_branded_1794326579650.jpg",
    imageAlt: "Professional Attic Insulation Services — Thermal barrier extraction, structural ceiling air sealing, and premium blown insulation installation",
    highlights: [
      "Removal of degraded or pest-compromised insulation",
      "Attic floor air sealing around light cans & plumbing chases",
      "Even blown thermal blanket to target R-value",
      "Significant stabilization of residential zone temperatures"
    ],
    specs: [
      { label: "Material", value: "Premium Blown Fiberglass & Cellulose" },
      { label: "Efficiency", value: "Year-Round Thermal Envelope Sealing" },
      { label: "Air Sealing", value: "Ceiling Penetration Polyurethane Foam" }
    ],
    processDetail: "High-power extraction removal of old media, airtight ceiling penetration caulking, and calibrated volumetric blown installation."
  }
];

export const BRAND_VALUES = [
  {
    title: "Professional Service",
    description: "Trained technicians equipped with specialized high-pressure agitation tools and industrial HEPA vacuum equipment.",
    accent: "White-Glove Delivery"
  },
  {
    title: "Attention to Detail",
    description: "Every individual supply register, return grille, and hidden plenum connection is methodically inspected and cleared.",
    accent: "Zero Oversight"
  },
  {
    title: "Cleaner Indoor Air",
    description: "Drastically reduce circulating fine airborne dust, pet dander, pollens, and microscopic soot particles in your residence.",
    accent: "Purity You Can Feel"
  },
  {
    title: "Customer-Focused Approach",
    description: "Transparent visual communication through Instagram with direct before-and-after photographic documentation of our work.",
    accent: "Direct Communication"
  },
  {
    title: "Quality Workmanship",
    description: "Clean protective tarps, floor runners, corner protectors, and sealed containment to respect and preserve your interior.",
    accent: "Pristine Care"
  },
  {
    title: "Healthier Living Spaces",
    description: "Optimizing the fundamental air circulation of your home creates an energizing sanctuary for breathing and restful sleep.",
    accent: "Living Sanctuary"
  }
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "CONNECT WITH US",
    description: "Reach out directly via Instagram Direct Message. Share your home layout, service goals, and preferred schedule.",
    detail: "Fast, personal correspondence with no automated phone menus."
  },
  {
    number: "02",
    title: "UNDERSTAND YOUR NEEDS",
    description: "We review your ventilation architecture, previous cleaning history, and specific symptom concerns (dust buildup, airflow restriction, dryer warnings).",
    detail: "Customized service scope tailored strictly to your residence."
  },
  {
    number: "03",
    title: "PROFESSIONAL CLEANING",
    description: "Our crew arrives with high-powered negative pressure systems, rotary agitation brushes, and comprehensive surface protection.",
    detail: "Surgical execution with zero mess left in your home."
  },
  {
    number: "04",
    title: "ENJOY A CLEANER SPACE",
    description: "Experience immediate improvements in indoor air crispness, balanced register airflow, and peace of mind.",
    detail: "Breathe the Signature standard every single day."
  }
];

export const FAQS = [
  {
    question: "What is air duct cleaning?",
    answer: "Air duct cleaning is the comprehensive mechanical decontamination of your home's forced-air heating and cooling system components. This includes the supply and return air ducts and registers, grilles, diffusers, and plenum chambers. Using high-powered negative air pressure equipment paired with pneumatic rotary whips, accumulated dust, pet hair, allergen particulates, and construction debris are thoroughly dislodged and evacuated into high-filtration containment units without escaping into your rooms."
  },
  {
    question: "Why is dryer vent cleaning important?",
    answer: "Dryer vent cleaning is a critical safety and efficiency service. Over regular laundry cycles, highly flammable clothing lint bypasses the lint trap and coats the interior walls of the exhaust pipe. Over time, restricted exhaust airflow causes extreme heat buildup, significantly increasing the risk of structural dryer fires. Regular vent cleaning eliminates this fire hazard, decreases drying time by up to 30%, and lowers utility bills."
  },
  {
    question: "How often should air ducts be cleaned?",
    answer: "For most residential homes, a comprehensive air duct cleaning is recommended every 3 to 5 years. However, homes with indoor pets, recent remodeling or construction, residents with allergies or asthma, or homes where noticeable dust plumes emerge from registers benefit from inspections every 2 to 3 years."
  },
  {
    question: "What does HVAC cleaning involve?",
    answer: "HVAC cleaning goes beyond the ductwork to service the central mechanical air handler unit. This involves precision cleaning of the indoor evaporator coils, which gather moist dirt and fungal film, cleaning the blower motor fan blades, sterilizing the condensate drip pan, and unclogging the drain line to restore optimal thermodynamic heat transfer."
  },
  {
    question: "Why is attic insulation important?",
    answer: "Attic insulation forms the primary thermal barrier between your conditioned living spaces and extreme outdoor weather. Degraded, compacted, or moisture-damaged insulation allows heat to transfer freely, forcing your HVAC compressor and furnace to run constantly. Modern, properly calibrated blown insulation stabilizes indoor temperatures, seals air bypasses, and protects indoor air purity."
  },
  {
    question: "How can customers connect with Signature Duct Cleaning?",
    answer: "Booking your Signature service is simple. First, visit our website and click Book Now to complete our appointment booking form. Enter your name, phone number, service address, preferred cleaning service, date, time, and any additional notes. Once submitted, our team will review your request and contact you to confirm your appointment.\n\nYou can also connect with us directly through Instagram at @signature_ductcleaning for questions, service inquiries, and further assistance."
  }
];
