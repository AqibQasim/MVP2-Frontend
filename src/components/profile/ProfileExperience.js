"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import ProfileSectionHeading from "@/components/profile/ProfileSectionHeading";
import ProfileDetailBlocks, {
  hasProfileDetailContent,
} from "@/components/profile/ProfileDetailBlocks";
import {
  ProfileSectionChevronDown,
  ProfileSectionChevronUp,
} from "@/components/profile/ProfileSectionIcons";

const INITIAL_VISIBLE = 3;

function formatExperienceDate(value) {
  if (!value) return null;
  const normalized = String(value).trim();
  if (/present|current|now/i.test(normalized)) return "Present";
  const yearMatch = normalized.match(/\d{4}/);
  return yearMatch ? yearMatch[0] : normalized;
}

function formatDateRange(startDate, endDate) {
  const start = formatExperienceDate(startDate) || "—";
  const end = formatExperienceDate(endDate) || "Present";
  return `${start} — ${end}`;
}

function getExperienceLocation(exp, talent) {
  const raw =
    exp?.location ||
    exp?.city ||
    [exp?.city, exp?.country].filter(Boolean).join(", ") ||
    [talent?.city, talent?.country].filter(Boolean).join(", ");

  return raw?.trim() || null;
}

function getCompanyInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function getCompanyColor(name) {
  let hash = 0;
  const value = name || "Company";

  for (let index = 0; index < value.length; index += 1) {
    hash = value.charCodeAt(index) + ((hash << 5) - hash);
  }

  const hues = [225, 245, 205, 15, 330];
  const hue = hues[Math.abs(hash) % hues.length];
  return `hsl(${hue} 68% 92%)`;
}

function ExperienceItem({ exp, talent, isLast }) {
  const location = getExperienceLocation(exp, talent);
  const organization = exp?.organization || "Company";
  const logoSrc = exp?.logo || exp?.company_logo || exp?.organization_logo;
  const hasDetails = hasProfileDetailContent(exp);

  return (
    <article className={`profile-experience-item ${isLast ? "is-last" : ""}`}>
      <div className="profile-experience-date">
        {formatDateRange(exp?.start_date, exp?.end_date)}
      </div>

      <div className="profile-experience-marker" aria-hidden>
        <span className="profile-experience-node" />
      </div>

      <div className="profile-experience-content">
        <div className="profile-experience-head">
          <div
            className="profile-experience-logo"
            style={{ background: getCompanyColor(organization) }}
          >
            {logoSrc ? (
              <Image
                src={logoSrc}
                alt=""
                width={40}
                height={40}
                className="profile-experience-logo-img"
              />
            ) : (
              <span>{getCompanyInitials(organization)}</span>
            )}
          </div>

          <div className="profile-experience-head-copy">
            <h3 className="profile-experience-role">
              <span className="profile-experience-job">
                {exp?.job_title || "Role"}
              </span>
              <span className="profile-experience-sep" aria-hidden>
                ·
              </span>
              <span className="profile-experience-company">{organization}</span>
            </h3>

            {location ? (
              <p className="profile-experience-location">
                <Image
                  src="/icons/location.svg"
                  alt=""
                  width={14}
                  height={14}
                  aria-hidden
                />
                {location}
              </p>
            ) : null}
          </div>
        </div>

        {hasDetails ? (
          <div className="profile-experience-details">
            <ProfileDetailBlocks item={exp} />
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function ProfileExperience({ talent }) {
  const experiences = useMemo(
    () => (Array.isArray(talent?.work_experience) ? talent.work_experience : []),
    [talent?.work_experience],
  );
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const visibleExperiences = showAll
    ? experiences
    : experiences.slice(0, INITIAL_VISIBLE);
  const hiddenCount = Math.max(experiences.length - INITIAL_VISIBLE, 0);
  const roleLabel = `${experiences.length} role${experiences.length === 1 ? "" : "s"}`;

  if (!experiences.length) {
    return (
      <section className="profile-experience-section">
        <ProfileSectionHeading number="03" title="Experience" meta="0 roles" />
        <p className="profile-empty-inline">No work experience added yet.</p>
      </section>
    );
  }

  return (
    <section
      className={`profile-experience-section ${isExpanded ? "is-expanded" : "is-collapsed"}`}
    >
      <ProfileSectionHeading
        number="03"
        title="Experience"
        meta={roleLabel}
        collapsible
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded((open) => !open)}
      />

      {isExpanded ? (
        <>
          <div className="profile-experience-list">
            {visibleExperiences.map((exp, index) => (
              <ExperienceItem
                key={`${exp?.organization || "company"}-${exp?.job_title || "role"}-${index}`}
                exp={exp}
                talent={talent}
                isLast={index === visibleExperiences.length - 1}
              />
            ))}
          </div>

          {hiddenCount > 0 ? (
            <button
              type="button"
              className="profile-experience-more-btn"
              onClick={() => setShowAll((open) => !open)}
              aria-expanded={showAll}
            >
              {showAll ? <ProfileSectionChevronUp /> : <ProfileSectionChevronDown />}
              {showAll
                ? "Show less"
                : `View ${hiddenCount} more experience${hiddenCount === 1 ? "" : "s"}`}
            </button>
          ) : null}
        </>
      ) : null}
    </section>
  );
}
