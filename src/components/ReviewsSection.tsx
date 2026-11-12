import React from "react";
import { CLIENT_REVIEWS, CustomerReview } from "../data/reviews.ts";
import { Star, Sparkles, Quote, CheckCircle2, Shield } from "lucide-react";

export const ReviewsSection: React.FC = () => {
  const featuredReview = CLIENT_REVIEWS.find((r) => r.isFeatured) || CLIENT_REVIEWS[0];
  const secondaryReviews = CLIENT_REVIEWS.filter((r) => r.id !== featuredReview.id);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < rating
                ? "text-[#D6A447] fill-[#D6A447]"
                : "text-white/20 fill-transparent"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section
      id="reviews"
      className="relative py-28 px-6 lg:px-12 bg-[#050505] overflow-hidden border-t border-[#D6A447]/15"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-[#D6A447]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#D6A447_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.35em] text-[#D6A447] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Testimonials</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold uppercase tracking-tight text-white mb-4 leading-none">
            WHAT OUR <span className="gold-shimmer-text">CLIENTS SAY.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#C7C7C7] font-light leading-relaxed max-w-2xl mx-auto">
            Real experiences. Genuine feedback. The Signature standard of service.
          </p>
        </div>

        {/* Editorial Layout: Large Featured Review + Distinct Companion Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* 1. Large Featured Testimonial (Oversized Marquee Presentation) */}
          <div className="lg:col-span-7 relative bg-gradient-to-b from-[#0E0E14] via-[#0A0A0E] to-[#07070A] border border-[#D6A447]/35 rounded-xl p-8 sm:p-12 lg:p-14 flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.9)] group hover:border-[#D6A447]/60 transition-all duration-500">
            {/* Top Gold Shimmer Beam */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D6A447] to-transparent shadow-[0_0_15px_rgba(214,164,71,0.6)]" />

            <div>
              {/* Top Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#D6A447]/10 border border-[#D6A447]/30 flex items-center justify-center">
                    <Quote className="w-4 h-4 text-[#D6A447]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#D6A447] block font-semibold">
                      Featured Project Review
                    </span>
                    <span className="text-xs text-[#A1A1AA] font-mono">
                      {featuredReview.serviceReceived}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {renderStars(featuredReview.rating)}
                </div>
              </div>

              {/* Quote Headline / Note if present */}
              {featuredReview.editorialNote && (
                <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/5 rounded-xs text-[11px] font-mono text-[#D6A447] uppercase tracking-wider">
                  <Shield className="w-3 h-3 text-[#D6A447]" />
                  <span>{featuredReview.editorialNote}</span>
                </div>
              )}

              {/* Main Testimonial Body */}
              <p className="text-base sm:text-lg lg:text-xl text-[#F3F4F6] font-light leading-relaxed mb-10 italic">
                "{featuredReview.quote}"
              </p>
            </div>

            {/* Author Footer */}
            <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-base sm:text-lg font-display font-bold uppercase tracking-wide text-white group-hover:text-[#D6A447] transition-colors">
                  {featuredReview.clientName}
                </h3>
                <span className="text-xs text-[#8E8E93] font-mono">
                  {featuredReview.location}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#71717A]">
                <CheckCircle2 className="w-4 h-4 text-[#D6A447]" />
                <span>Verified Client · {featuredReview.date}</span>
              </div>
            </div>
          </div>

          {/* 2. Side Stack: Smaller Review Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {secondaryReviews.slice(0, 2).map((review, idx) => (
              <div
                key={review.id}
                className="relative bg-gradient-to-b from-[#0C0C11] to-[#07070A] border border-white/10 hover:border-[#D6A447]/40 rounded-xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.8)] group flex-1"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/5">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-[#D6A447] block">
                        {review.serviceReceived}
                      </span>
                      <span className="text-[11px] text-[#71717A] font-mono">
                        {review.location}
                      </span>
                    </div>
                    {renderStars(review.rating)}
                  </div>

                  {/* Body */}
                  <p className="text-xs sm:text-sm text-[#D4D4D8] font-light leading-relaxed italic mb-6">
                    "{review.quote}"
                  </p>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <h4 className="font-display font-bold uppercase tracking-wider text-white group-hover:text-[#D6A447] transition-colors">
                    {review.clientName}
                  </h4>
                  <span className="text-[11px] font-mono text-[#71717A]">
                    {review.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Third Secondary Review (Wide Bottom Banner Style) */}
        {secondaryReviews.length > 2 && (
          <div className="relative bg-gradient-to-r from-[#0C0C11] via-[#0E0E14] to-[#0C0C11] border border-white/10 hover:border-[#D6A447]/30 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#D6A447]">
                  {secondaryReviews[2].serviceReceived}
                </span>
                <span className="text-white/20">·</span>
                <span className="text-xs text-[#8E8E93] font-mono">
                  {secondaryReviews[2].location}
                </span>
                <span className="text-white/20">·</span>
                {renderStars(secondaryReviews[2].rating)}
              </div>
              <p className="text-xs sm:text-sm text-[#D4D4D8] font-light leading-relaxed italic max-w-4xl">
                "{secondaryReviews[2].quote}"
              </p>
            </div>

            <div className="shrink-0 text-left md:text-right border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
              <h4 className="font-display font-bold uppercase tracking-wider text-white">
                {secondaryReviews[2].clientName}
              </h4>
              <span className="text-[11px] font-mono text-[#71717A] block">
                {secondaryReviews[2].date}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
