"use client";

import { useEffect } from "react";
import { fraunces, plusJakartaSans } from "@/fonts/font-styles";
import "@/styles/landing.css";
import "@/styles/candidate-profile.css";

export default function ProfileLayout({ children }) {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const main = body.querySelector("main");

    html.classList.add("landing-scroll-mode");
    body.classList.add("landing-scroll-mode");
    main?.classList.add("landing-scroll-mode");

    return () => {
      html.classList.remove("landing-scroll-mode");
      body.classList.remove("landing-scroll-mode");
      main?.classList.remove("landing-scroll-mode");
    };
  }, []);

  return (
    <div
      className={`landing-page profile-layout relative w-full max-w-none ${plusJakartaSans.variable} ${fraunces.variable}`}
    >
      {children}
    </div>
  );
}
