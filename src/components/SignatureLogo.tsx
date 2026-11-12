import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  alt?: string;
  variant?: string; // Kept for backwards compatibility
}

// Official Signature Duct Cleaning uploaded company logo
const OFFICIAL_LOGO_SRC = "/signature-logo.jpeg";

export const SignatureLogo: React.FC<LogoProps> = ({
  size = "md",
  className = "",
  alt = "Signature Duct Cleaning — Professional Air Duct, Dryer Vent & HVAC Cleaning USA",
}) => {
  // Height scales tailored for each placement to maintain pristine clarity and original aspect ratio
  const sizeClasses = {
    sm: "h-11 sm:h-13 w-auto max-w-[190px]", // Navbar: clear, perfectly proportioned, no distortion
    md: "h-16 sm:h-20 w-auto max-w-[220px]", // Footer: prominent, elegant
    lg: "h-32 sm:h-44 w-auto max-w-[320px]", // Hero: grand centerpiece
    xl: "h-40 sm:h-52 w-auto max-w-[380px]", // Loading Screen: full cinematic reveal
  };

  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      <img
        src={OFFICIAL_LOGO_SRC}
        alt={alt}
        className={`object-contain transition-transform duration-300 hover:scale-[1.02] filter drop-shadow-[0_4px_20px_rgba(214,164,71,0.15)] ${sizeClasses[size]}`}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};
