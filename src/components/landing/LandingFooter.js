"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const TALENT_LINKS = [
  { label: "Apply", href: "/talent-signup" },
  { label: "Vetting", href: "#process" },
  { label: "Resources", href: "#notes" },
  { label: "Community", href: "#" },
];

const CLIENT_LINKS = [
  { label: "Hire", href: "/company-signup" },
  { label: "Pricing", href: "#" },
  { label: "Enterprise", href: "#" },
  { label: "Case notes", href: "#" },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "#" },
  { label: "Press", href: "#" },
  { label: "Contact", href: "#" },
];

const LEGAL_LINKS = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Security", href: "#" },
  { label: "Status", href: "#", showStatusDot: true },
];

function FooterLinkList({ title, links }) {
  return (
    <div className="landing-footer-link-col">
      <p className="landing-footer-col-label">{title}</p>
      <ul className="landing-footer-link-list">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="landing-footer-link">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function LandingFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    setSubscribed(true);
  };

  return (
    <footer className="landing-footer">
      <div className="landing-container">
        <div className="landing-footer-top">
          <div className="landing-footer-newsletter">
            <p className="landing-footer-col-label">Newsletter</p>
            <h2 className="landing-footer-headline">
              <span className="landing-footer-headline-line">
                Field notes from the index —
              </span>
              <span className="landing-footer-headline-line">
                monthly, never spammy.
              </span>
            </h2>
            {subscribed ? (
              <div
                className="landing-footer-form landing-footer-form--subscribed"
                role="status"
              >
                <span className="landing-footer-subscribed">Subscribed</span>
              </div>
            ) : (
              <form className="landing-footer-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="you@studio.com"
                  className="landing-footer-input"
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="landing-footer-submit">
                  Subscribe
                  <Image
                    src="/icons/right-arrow.svg"
                    alt=""
                    width={14}
                    height={14}
                    className="landing-footer-submit-arrow"
                  />
                </button>
              </form>
            )}
          </div>

          <div className="landing-footer-links">
            <FooterLinkList title="Talent" links={TALENT_LINKS} />
            <FooterLinkList title="Clients" links={CLIENT_LINKS} />
            <FooterLinkList title="Company" links={COMPANY_LINKS} />
          </div>
        </div>
      </div>

      <div className="landing-footer-brand">
        <div className="landing-footer-brand-inner">
          <Image
            src="/covental-blue-logo.svg"
            alt="Covental"
            width={1192}
            height={321}
            className="landing-footer-brand-logo"
            priority={false}
          />
        </div>
      </div>

      <div className="landing-container">
        <div className="landing-footer-legal">
          <p className="landing-footer-legal-copy">
            © 2026 Covental Index — Lisbon
          </p>
          <nav className="landing-footer-legal-nav" aria-label="Legal">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className="landing-footer-legal-link">
                {link.label}
                {link.showStatusDot && (
                  <span className="landing-footer-status-dot" aria-hidden />
                )}
              </Link>
            ))}
          </nav>
          <p className="landing-footer-systems">
            <span className="landing-footer-systems-dot" aria-hidden />
            All systems nominal
          </p>
        </div>
      </div>
    </footer>
  );
}
