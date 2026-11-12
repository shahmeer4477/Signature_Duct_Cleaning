import React from "react";
import { INSTAGRAM_URL } from "../constants/brand.ts";
import { Instagram } from "lucide-react";

export const FloatingInstagramButton: React.FC = () => {
  return (
    <aside
      aria-label="Instagram Profile"
      className="fixed bottom-5 right-5 z-40 select-none"
    >
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Signature Duct Cleaning Instagram"
        title="Visit our Instagram (@signature_ductcleaning)"
        className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#07070A]/90 backdrop-blur-md border border-[#D6A447]/40 text-[#D6A447] hover:text-white hover:border-[#D6A447] hover:bg-[#D6A447]/20 shadow-[0_4px_16px_rgba(0,0,0,0.6)] hover:shadow-[0_0_20px_rgba(214,164,71,0.35)] transition-all duration-300 active:scale-95 group"
      >
        <Instagram className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110" />
      </a>
    </aside>
  );
};
