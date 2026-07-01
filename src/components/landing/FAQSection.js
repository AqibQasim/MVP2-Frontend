"use client";

import { useState } from "react";
import LandingButton from "./LandingButton";
import SectionLabel from "./SectionLabel";

const FAQ_ITEMS = [
  {
    q: "Who can apply as talent?",
    a: "Independent designers, engineers, product managers, strategists, and brand operators with 5+ years of senior experience. We assess for craft, communication, and reliability — not just a portfolio.",
  },
  {
    q: "How long does vetting take?",
    a: "Most applications are reviewed within 5–7 business days. You'll hear from a real person — never an automated rejection.",
  },
  {
    q: "What does Covental cost clients?",
    a: "Clients pay a transparent engagement fee on top of talent rates. No hidden markups, no bidding wars — pricing is clear before you commit.",
  },
  {
    q: "Can I browse talent profiles?",
    a: "Covental is match-first, not browse-first. Clients receive curated shortlists tailored to each brief rather than scrolling unlimited profiles.",
  },
  {
    q: "What if a match isn't right?",
    a: "Every engagement starts with a risk-free trial period. If it's not the right fit, we'll rematch at no additional cost.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section id="notes" className="landing-faq-section">
      <div className="landing-container">
        <div className="landing-faq-layout">
          <div className="landing-faq-intro">
            <SectionLabel className="mb-4">(08) — Notes</SectionLabel>
            <h2 className="landing-faq-headline">
              <span className="landing-faq-headline-line">Questions,</span>
              <span className="landing-faq-headline-line landing-faq-headline-accent">
                answered.
              </span>
            </h2>
          </div>

          <ul className="landing-faq-list">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <li key={item.q} className="landing-faq-item">
                  <button
                    type="button"
                    className="landing-faq-trigger"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="landing-faq-num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="landing-faq-question">{item.q}</span>
                    <span className="landing-faq-toggle" aria-hidden>
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="landing-faq-answer">
                      <div className="landing-faq-mark-wrap">
                        <img
                          src="/coventall-orengle-logo.png"
                          alt=""
                          className="landing-faq-mark"
                        />
                      </div>
                      <div className="landing-faq-answer-divider" aria-hidden />
                      <p>{item.a}</p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="landing-faq-cta">
            <LandingButton href="/talent-signup" variant="dark">
              Ask questions
            </LandingButton>
          </div>
        </div>
      </div>
    </section>
  );
}
