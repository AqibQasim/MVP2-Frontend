"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function LiveMatchesTicker({ rows }) {
  const prefersReducedMotion = useReducedMotion();
  const loopRows = [...rows, ...rows];

  return (
    <div className="landing-live-matches-viewport relative">
      <motion.div
        className="landing-live-matches-track divide-y divide-[var(--landing-border)]"
        animate={
          prefersReducedMotion
            ? undefined
            : { y: ["0%", "-50%"] }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                y: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 18,
                  ease: "linear",
                },
              }
        }
      >
        {loopRows.map((row, i) => (
          <div
            key={`${row.title}-${i}`}
            className="landing-live-matches-row grid grid-cols-12 items-center gap-2 px-6 lg:px-8"
          >
            <span className="col-span-1 text-[var(--landing-text-subtle)]">
              №{row.num}
            </span>
            <span className="col-span-5 landing-display text-base font-medium italic md:text-lg">
              {row.title}
            </span>
            <span className="col-span-3 hidden uppercase tracking-wide text-[var(--landing-text-muted)] md:block">
              {row.org}
            </span>
            <span className="col-span-2 hidden text-[var(--landing-text-muted)] md:block">
              {row.location}
            </span>
            <span className="col-span-1 text-right landing-display text-2xl font-medium text-[var(--landing-accent-blue)] md:col-span-1">
              {row.match}
            </span>
          </div>
        ))}
      </motion.div>

      <div
        className="landing-live-matches-fade landing-live-matches-fade-top"
        aria-hidden
      />
      <div
        className="landing-live-matches-fade landing-live-matches-fade-bottom"
        aria-hidden
      />
    </div>
  );
}
