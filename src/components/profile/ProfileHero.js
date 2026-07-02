"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import getCandidateStatus from "@/utils/getCandidateStatus";
import {
  relateCandidateTimezoneWithClientTimezone,
} from "@/utils/cityTimezoneOffset";
import { PROFILE_DEFAULT_AVATAR } from "@/app/profile/[candidateId]/profileImageUrl";

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M14.5 1.5L7.25 8.75M14.5 1.5L10.25 14.5L7.25 8.75M14.5 1.5L1.5 5.75L7.25 8.75"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M3.5 10.5L10.5 3.5M10.5 3.5H5.25M10.5 3.5V8.75"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="profile-action-btn-icon"
    >
      <path
        d="M13.5 8C13.5 10.49 11.26 12.5 8.5 12.5C7.78 12.5 7.09 12.33 6.48 12.04L3 13.5L4.46 10.02C4.17 9.41 4 8.72 4 8C4 5.51 6.01 3.5 8.5 3.5C11.26 3.5 13.5 5.51 13.5 8Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="profile-action-btn-icon"
    >
      <path
        d="M8 1.5L9.05 5.05L12.6 6.1L9.05 7.15L8 10.7L6.95 7.15L3.4 6.1L6.95 5.05L8 1.5Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <circle cx="12.25" cy="2.75" r="0.9" fill="currentColor" />
    </svg>
  );
}

function VettedSparkleIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="profile-vetted-icon"
    >
      <path
        d="M7 1.25L7.95 4.45L11.15 5.4L7.95 6.35L7 9.55L6.05 6.35L2.85 5.4L6.05 4.45L7 1.25Z"
        fill="#F5A623"
      />
      <circle cx="10.75" cy="2.25" r="0.85" fill="#F5A623" />
      <circle cx="3.15" cy="11.1" r="0.65" fill="#F5A623" />
    </svg>
  );
}

function getExperienceDisplay(talent) {
  if (talent?.expertise?.length) {
    const years = talent.expertise
      .map((item) => {
        if (typeof item !== "object" || item == null) return 0;
        const value =
          item.experience ?? item.years ?? item.years_of_experience ?? 0;
        return typeof value === "number" ? value : parseInt(value, 10) || 0;
      })
      .filter(Boolean);

    if (years.length) {
      const max = Math.max(...years);
      return { value: `${max}+`, suffix: "years" };
    }
  }

  if (talent?.work_experience?.length) {
    return {
      value: `${talent.work_experience.length}+`,
      suffix: "roles",
    };
  }

  return { value: "—", suffix: null };
}

function getTierLabel(indexScore) {
  if (indexScore >= 9) return "TIER 1";
  if (indexScore >= 8) return "TIER 2";
  if (indexScore > 0) return "TIER 3";
  return "TIER 1";
}

function getSuccessRateLabel(indexScore) {
  if (indexScore >= 9) return "100%";
  if (indexScore >= 8) return "98%";
  if (indexScore >= 7) return "97%";
  if (indexScore > 0) return "95%";
  return "97%";
}

function getLanguageLabel(talent) {
  const raw =
    talent?.languages ??
    talent?.language ??
    talent?.spoken_languages ??
    null;

  if (!raw) {
    return "2 languages";
  }

  let items = [];

  if (Array.isArray(raw)) {
    items = raw
      .map((entry) =>
        typeof entry === "string"
          ? entry
          : entry?.name || entry?.language || "",
      )
      .filter(Boolean);
  } else if (typeof raw === "string" && raw.trim()) {
    items = raw.split(/[,;|]/).map((part) => part.trim()).filter(Boolean);
  }

  if (!items.length) {
    return "2 languages";
  }

  const count = ["english", "urdu"].filter((language) =>
    items.some((item) => item.toLowerCase().includes(language)),
  ).length;

  const languageCount = count || 2;
  return `${languageCount} language${languageCount === 1 ? "" : "s"}`;
}

function getLocationLabel(talent) {
  const city = talent?.city?.trim();
  const country = talent?.country?.trim();

  if (city && country) return `${city}, ${country}`;
  return city || country || "Location not set";
}

function StatItem({ label, value, valueSuffix, iconSrc, iconClass }) {
  return (
    <div className="profile-stat">
      <div className="profile-stat-head">
        <span className="profile-stat-label">{label}</span>
        <span className={`profile-stat-icon ${iconClass}`}>
          <Image src={iconSrc} alt="" width={16} height={16} aria-hidden />
        </span>
      </div>
      <p className="profile-stat-value">
        <span className="profile-stat-value-main">{value}</span>
        {valueSuffix ? (
          <span className="profile-stat-value-suffix">{valueSuffix}</span>
        ) : null}
      </p>
    </div>
  );
}

export default function ProfileHero({
  talent,
  customerId,
  profileImageUrl,
  indexScore,
  onDownloadCv,
}) {
  const statusLabel = getCandidateStatus(talent?.talent_status, talent?.status);
  const isAvailable = statusLabel.toLowerCase() === "available";
  const availabilityText = isAvailable ? "Available now" : statusLabel;
  const firstName = talent?.name?.trim().split(/\s+/)[0] || "Talent";
  const specializationCategory =
    talent?.specialization?.split(/[\s,/|-]+/)[0] || "Talent";
  const languageLabel = getLanguageLabel(talent);
  const timezoneLabel = relateCandidateTimezoneWithClientTimezone(talent?.city);
  const successRate = getSuccessRateLabel(indexScore);
  const projectsCount = talent?.projects?.length ?? 0;
  const experienceDisplay = getExperienceDisplay(talent);
  const [imgSrc, setImgSrc] = useState(profileImageUrl);

  useEffect(() => {
    setImgSrc(profileImageUrl);
  }, [profileImageUrl]);

  return (
    <section className="profile-hero">
      <nav className="profile-breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden>&gt;</span>
        <span>Candidates</span>
        <span aria-hidden>&gt;</span>
        <span>{specializationCategory}</span>
        <span aria-hidden>&gt;</span>
        <span className="profile-breadcrumbs-current">{talent?.name}</span>
      </nav>

      <div className="profile-hero-block">
        <div className="profile-hero-layout">
          <div className="profile-hero-media">
            <div className="profile-hero-photo">
              <span className="profile-vetted-badge">
                <VettedSparkleIcon />
                VETTED
              </span>
              <Image
                src={imgSrc || PROFILE_DEFAULT_AVATAR}
                alt={talent?.name || "Candidate"}
                fill
                className="profile-hero-photo-img"
                sizes="313px"
                priority
                onError={() => setImgSrc(PROFILE_DEFAULT_AVATAR)}
              />
            </div>

            <div className="profile-hero-badges">
              <span
                className={`profile-avail-badge ${isAvailable ? "is-available" : ""}`}
              >
                <span className="profile-avail-dot" aria-hidden />
                {availabilityText}
              </span>
              <span className="profile-rate-badge">
                ${talent?.hourly_rate}/hr
              </span>
            </div>
          </div>

          <div className="profile-hero-info">
            <p className="profile-verified-tier">
              <span className="profile-verified-dot" aria-hidden />
              Covental verified · {getTierLabel(indexScore)}
            </p>

            <h1 className="profile-hero-name">{talent?.name}</h1>

            {talent?.specialization ? (
              <p className="profile-hero-title">{talent.specialization}</p>
            ) : null}

            <ul className="profile-hero-meta">
              <li>
                <Image src="/icons/location.svg" alt="" width={18} height={18} />
                {getLocationLabel(talent)}
              </li>
              <li>
                <Image src="/icons/calendar.svg" alt="" width={18} height={18} />
                {timezoneLabel}
              </li>
              <li>
                <Image src="/icons/language.svg" alt="" width={18} height={18} />
                {languageLabel}
              </li>
            </ul>

            <div className="profile-hero-actions">
              <Link
                href={`/book-talent/${customerId}`}
                className="profile-action-btn profile-action-btn--primary"
              >
                <SendIcon />
                <span>Hire {firstName}</span>
                <ArrowUpRightIcon />
              </Link>

              {talent?.email ? (
                <a
                  href={`mailto:${talent.email}`}
                  className="profile-action-btn profile-action-btn--secondary"
                >
                  <MessageIcon />
                  <span>Message</span>
                </a>
              ) : (
                <button
                  type="button"
                  className="profile-action-btn profile-action-btn--secondary"
                  disabled
                >
                  <MessageIcon />
                  <span>Message</span>
                </button>
              )}

              <button
                type="button"
                className="profile-action-btn profile-action-btn--secondary"
                onClick={onDownloadCv}
                aria-label="View AI verdict"
              >
                <SparkleIcon />
                <span>View AI verdict</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-stats-bar">
        <StatItem
          label="Experience"
          value={experienceDisplay.value}
          valueSuffix={experienceDisplay.suffix}
          iconSrc="/icons/briefcase-tick.svg"
          iconClass="profile-stat-icon--blue"
        />
        <StatItem
          label="Projects shipped"
          value={String(projectsCount)}
          iconSrc="/icons/sparkle.svg"
          iconClass="profile-stat-icon--orange"
        />
        <StatItem
          label="Success rate"
          value={successRate}
          iconSrc="/icons/star.svg"
          iconClass="profile-stat-icon--blue"
        />
        <StatItem
          label="Rate"
          value={talent?.hourly_rate ? `$${talent.hourly_rate}` : "—"}
          valueSuffix={talent?.hourly_rate ? "/ hr" : null}
          iconSrc="/icons/wallet.svg"
          iconClass="profile-stat-icon--blue"
        />
      </div>
    </section>
  );
}
