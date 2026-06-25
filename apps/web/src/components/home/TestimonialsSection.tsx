"use client";

import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

const TESTIMONIALS = [
  {
    quote: "My daughter finally understood what a loop does — she explained it using a Scratch cat animation she built herself.",
    name: "Parent in Dhaka",
    detail: "Child age 9 · Track 2",
    rating: 5,
  },
  {
    quote: "The Bangla instruction option made all the difference. Sessions feel like play, not homework — but she's learning real skills.",
    name: "Parent in Chittagong",
    detail: "Child age 7 · Track 1",
    rating: 5,
  },
  {
    quote: "We booked the trial first. After one class we knew the pace was right — he kept working on his project for hours after class ended.",
    name: "Parent in Sylhet",
    detail: "Child age 11 · Track 2",
    rating: 5,
  },
  {
    quote: "Small group size matters. The instructor actually noticed when my child was stuck and guided them through the next step patiently.",
    name: "Parent in Rajshahi",
    detail: "Child age 13 · Track 3",
    rating: 5,
  },
] as const;

export function TestimonialsSection() {
  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="testimonials-heading">
      <div className="site-container">
        <SectionHeader
          id="testimonials-heading"
          eyebrow="Family stories"
          title={
            <>
              Loved by{" "}
              <span className="gradient-text">parents & kids</span>
            </>
          }
          description="Real feedback from families exploring BrainStack — placeholder stories while we collect more."
          align="center"
        />

        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2" stagger={0.1}>
          {TESTIMONIALS.map((item) => (
            <StaggerItem key={item.name}>
              <GlassCard className="flex h-full flex-col p-7 sm:p-8">
                <div aria-hidden="true" className="flex gap-0.5 text-brand-yellow">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-content-muted">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-brand text-sm font-bold text-white">
                    {item.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-content">
                      {item.name}
                    </p>
                    <p className="text-xs text-content-faint">{item.detail}</p>
                  </div>
                </figcaption>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
