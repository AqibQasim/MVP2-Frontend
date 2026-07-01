"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import LandingButton from "./LandingButton";

const NAV_ITEMS = [
  { label: "Talent", href: "#talent" },
  { label: "Clients", href: "#clients" },
  { label: "Process", href: "#process" },
  { label: "Index", href: "#index" },
  { label: "Notes", href: "#notes" },
];

function MenuIcon() {
  return (
    <span className="landing-header-menu-icon" aria-hidden>
      <span />
      <span />
      <span />
    </span>
  );
}

function CloseIcon() {
  return (
    <span className="landing-header-close-icon" aria-hidden>
      <span />
      <span />
    </span>
  );
}

export default function LandingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    html.classList.add("landing-menu-open");
    body.classList.add("landing-menu-open");
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    window.addEventListener("keydown", onKeyDown);

    return () => {
      html.classList.remove("landing-menu-open");
      body.classList.remove("landing-menu-open");
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const mobileMenu = (
    <div
      id="landing-mobile-nav"
      className={`landing-header-mobile-panel ${menuOpen ? "is-open" : ""}`}
      aria-hidden={!menuOpen}
    >
      <button
        type="button"
        className="landing-header-mobile-backdrop"
        aria-label="Close menu"
        onClick={closeMenu}
      />
      <div className="landing-header-mobile-drawer">
        <button
          type="button"
          className="landing-header-close-btn"
          aria-label="Close menu"
          onClick={closeMenu}
        >
          <CloseIcon />
        </button>
        <div className="landing-header-mobile-inner">
          <nav className="landing-header-mobile-nav" aria-label="Mobile">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="landing-header-mobile-link"
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="landing-header-mobile-actions">
            <LandingButton
              href="/talent-login"
              variant="outline"
              className="w-full justify-center"
              onClick={closeMenu}
            >
              Sign in
            </LandingButton>
            <LandingButton
              href="/talent-signup"
              className="w-full justify-center"
              onClick={closeMenu}
            >
              Request invite
            </LandingButton>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header
        className={`landing-header sticky top-0 z-50 border-b border-transparent bg-[var(--landing-bg)]/30 backdrop-blur-[6px] ${menuOpen ? "landing-header--menu-open" : ""}`}
      >
        <div className="landing-container relative z-[1] flex items-center justify-between gap-4 py-5 lg:py-6">
          <Link href="/" className="shrink-0" onClick={closeMenu}>
            <Image src="/logo.svg" width={173} height={47} alt="Covental" priority />
          </Link>

          <nav
            className="landing-header-nav hidden items-center gap-1 rounded-full border border-white/80 bg-white/50 px-2 py-2 shadow-[0_4px_24px_rgba(197,163,239,0.06)] backdrop-blur-md lg:flex"
            aria-label="Main"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full px-4 py-1.5 text-sm text-[var(--landing-text-muted)] transition-colors hover:bg-[var(--landing-bg-elevated)] hover:text-[var(--landing-navy)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LandingButton href="/talent-login" variant="outline" className="!px-5">
              Sign in
            </LandingButton>
            <LandingButton href="/talent-signup" className="!px-5">
              Request invite
            </LandingButton>
          </div>

          <button
            type="button"
            className={`landing-header-menu-btn lg:hidden ${menuOpen ? "is-hidden" : ""}`}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="landing-mobile-nav"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </header>

      {mounted ? createPortal(mobileMenu, document.body) : null}
    </>
  );
}
