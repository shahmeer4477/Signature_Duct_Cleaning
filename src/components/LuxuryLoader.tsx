import React, { useEffect, useState } from "react";
import { SignatureLogo } from "./SignatureLogo.tsx";

interface LuxuryLoaderProps {
  onComplete: () => void;
}

export const LuxuryLoader: React.FC<LuxuryLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsFading(true);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] transition-opacity duration-700 ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background radial gold glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#D6A447]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Centerpiece Logo */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <SignatureLogo size="xl" className="mb-6" />

        <div className="mt-2 flex flex-col items-center">

          {/* Luxury Hairline Gold Progress Bar */}
          <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[#D6A447] via-[#F4E2B5] to-[#D6A447] transition-all duration-150 ease-out shadow-[0_0_12px_rgba(214,164,71,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="font-mono text-[10px] tracking-widest text-[#71717A] mt-3">
            {progress}%
          </span>
        </div>
      </div>

      {/* Quick Skip Option */}
      <button
        onClick={() => {
          setIsFading(true);
          setTimeout(onComplete, 200);
        }}
        className="absolute bottom-10 text-[11px] font-mono uppercase tracking-[0.25em] text-[#71717A] hover:text-[#D6A447] transition-colors"
      >
        Skip Intro →
      </button>
    </div>
  );
};
