"use client";

import { useRef } from "react";
import Image from "next/image";
import SectionLabel from "./SectionLabel";

const CARDS = [
  {
    tag: "DESIGN",
    title: "A fractional design lead for a Series B fintech",
    name: "MAYA L.",
    company: "NORTHWIND",
    score: "96",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=640&h=860&fit=crop&crop=faces",
  },
  {
    tag: "DESIGN",
    title: "A fractional design lead for a Series B fintech",
    name: "JAMES R.",
    company: "HELIOS LABS",
    score: "94",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=640&h=860&fit=crop&crop=faces",
  },
  {
    tag: "DESIGN",
    title: "A fractional design lead for a Series B fintech",
    name: "ALEX M.",
    company: "COBALT.IO",
    score: "92",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=640&h=860&fit=crop&crop=faces",
  },
  {
    tag: "DESIGN",
    title: "A fractional design lead for a Series B fintech",
    name: "NOAH P.",
    company: "ATLAS STUDIO",
    score: "89",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=640&h=860&fit=crop&crop=faces",
  },
];

function scrollCarousel(track, direction) {
  if (!track) return;
  const card = track.querySelector(".landing-recent-card");
  const gap = parseFloat(getComputedStyle(track).gap) || 16;
  const amount = (card?.offsetWidth ?? 320) + gap;
  track.scrollBy({ left: direction * amount, behavior: "smooth" });
}

export default function RecentMatchesSection() {
  const trackRef = useRef(null);

  return (
    <section className="landing-recent-section">
      <div className="landing-container">
        <div className="landing-recent-header">
          <div className="landing-recent-header-copy">
            <SectionLabel className="mb-4">(06) — Recent matches</SectionLabel>
            <h2 className="landing-recent-headline">
              <span className="landing-recent-headline-line">
                Field notes from
              </span>
              <span className="landing-recent-headline-line landing-recent-headline-accent">
                the index.
              </span>
            </h2>
          </div>
          <div className="landing-recent-nav">
            <button
              type="button"
              className="landing-recent-nav-btn"
              aria-label="Previous matches"
              onClick={() => scrollCarousel(trackRef.current, -1)}
            >
              <Image
                src="/icons/chevron-left.svg"
                alt=""
                width={10}
                height={9}
                aria-hidden
              />
            </button>
            <button
              type="button"
              className="landing-recent-nav-btn"
              aria-label="Next matches"
              onClick={() => scrollCarousel(trackRef.current, 1)}
            >
              <Image
                src="/icons/chevron-right.svg"
                alt=""
                width={10}
                height={9}
                aria-hidden
              />
            </button>
          </div>
        </div>

        <div ref={trackRef} className="landing-recent-track">
          {CARDS.map((card) => (
            <article key={card.name} className="landing-recent-card">
              <Image
                src={card.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 320px, 78vw"
                className="object-cover"
              />
              <div className="landing-recent-card-overlay" aria-hidden />
              <span className="landing-recent-tag">{card.tag}</span>
              <div className="landing-recent-card-body">
                <p className="landing-recent-card-title">{card.title}</p>
                <div className="landing-recent-card-divider" aria-hidden />
                <div className="landing-recent-card-footer">
                  <p className="landing-recent-card-meta">
                    {card.name} • {card.company}
                  </p>
                  <p className="landing-recent-card-score">{card.score}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
