"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SectionLabel from "./SectionLabel";

const TESTIMONIALS = [
  {
    before:
      "It feels less like a marketplace and more like a ",
    emphasis: "private network",
    after:
      ". The quality bar is what keeps me coming back as a hiring manager — and as a friend.",
    name: "PRIYA RAMAN",
    role: "HEAD OF PRODUCT, COBALT.IO",
    since: "CLIENT SINCE 2024",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=720&h=720&fit=crop&crop=faces",
  },
  {
    before: "We stopped treating hiring like a scroll and started treating it like ",
    emphasis: "curation",
    after:
      ". Covental shortlists feel intentional — every intro has context behind it.",
    name: "MARCUS CHEN",
    role: "VP ENGINEERING, HELIOS LABS",
    since: "CLIENT SINCE 2023",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=720&h=720&fit=crop&crop=faces",
  },
  {
    before: "The trial period removed the usual risk. We found a fractional lead who felt like part of the ",
    emphasis: "core team",
    after: " from week one — not a contractor on the side.",
    name: "ELENA VARGAS",
    role: "COO, NORTHWIND",
    since: "CLIENT SINCE 2024",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=720&h=720&fit=crop&crop=faces",
  },
  {
    before: "As talent, I finally get projects that match my rate and stack — not a flood of ",
    emphasis: "mismatched bids",
    after: ". The human matcher makes all the difference.",
    name: "JAMES OKON",
    role: "STAFF DESIGNER, INDEPENDENT",
    since: "TALENT SINCE 2023",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=720&h=720&fit=crop&crop=faces",
  },
];

const SLIDE_MS = 6500;

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const slide = TESTIMONIALS[active];

  const goTo = useCallback((index) => {
    setActive((index + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % TESTIMONIALS.length);
    }, SLIDE_MS);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <section className="landing-testimonials-section">
      <div className="landing-container">
        <div className="landing-testimonial-layout">
          <div className="landing-testimonial-copy">
            <SectionLabel className="landing-testimonials-label mb-6">
              (07) — In their words
            </SectionLabel>

            <AnimatePresence mode="wait">
              <motion.div
                key={slide.name}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <blockquote className="landing-testimonial-quote">
                  <span className="landing-testimonial-quote-mark">&ldquo;</span>
                  {slide.before}
                  <em>{slide.emphasis}</em>
                  {slide.after}
                  <span className="landing-testimonial-quote-mark">&rdquo;</span>
                </blockquote>

                <p className="landing-testimonial-meta">
                  {slide.name} | {slide.role} | {slide.since}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="landing-testimonial-visual hidden lg:flex">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.image}
                className="landing-testimonial-portrait"
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <Image
                  src={slide.image}
                  alt=""
                  width={720}
                  height={720}
                  className="landing-testimonial-portrait-image"
                  sizes="(min-width: 1024px) 360px, 72vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="landing-testimonial-dots" role="tablist" aria-label="Testimonials">
          {TESTIMONIALS.map((item, index) => (
            <button
              key={item.name}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`Show testimonial ${index + 1}`}
              className={`landing-testimonial-dot${
                index === active ? " is-active" : ""
              }`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
