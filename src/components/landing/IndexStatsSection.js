"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import SectionLabel from "./SectionLabel";

const STATS = [
  {
    value: 3,
    suffix: "%",
    label: "Acceptance rate",
    sub: "Of all applicants",
  },
  {
    value: 48,
    suffix: "h",
    label: "Median match time",
    sub: "Brief → shortlist",
  },
  {
    value: 97,
    suffix: "%",
    label: "Engagement success",
    sub: "Trials → contracts",
  },
  {
    value: 60,
    suffix: "+",
    label: "Countries",
    sub: "Talent represented",
  },
];

function useCountUp(target, active, duration = 1600) {
  const [count, setCount] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }

    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    let start = null;
    let rafId = 0;

    const tick = (timestamp) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [active, target, duration, prefersReducedMotion]);

  return count;
}

function IndexStat({ stat, active, delay }) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!active) {
      setStarted(false);
      return;
    }

    const timer = window.setTimeout(() => setStarted(true), delay);
    return () => window.clearTimeout(timer);
  }, [active, delay]);

  const count = useCountUp(stat.value, started);

  return (
    <div className="landing-index-stat">
      <p className="landing-index-value">
        <span className="landing-index-number">{count}</span>
        <span className="landing-index-suffix">{stat.suffix}</span>
      </p>
      <p className="landing-index-title">{stat.label}</p>
      <p className="landing-index-sub">{stat.sub}</p>
    </div>
  );
}

export default function IndexStatsSection() {
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.35 });

  return (
    <section id="index" className="landing-index-section">
      <div className="landing-container">
        <div className="landing-index-header">
          <SectionLabel>(05) — The Index</SectionLabel>
          <SectionLabel className="landing-index-date">As of Q2 2026</SectionLabel>
        </div>

        <div ref={gridRef} className="landing-index-grid">
          {STATS.map((stat, index) => (
            <IndexStat
              key={stat.label}
              stat={stat}
              active={isInView}
              delay={index * 120}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
