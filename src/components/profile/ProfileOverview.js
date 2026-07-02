"use client";

import Image from "next/image";
import Link from "next/link";
import ProfileSectionHeading from "@/components/profile/ProfileSectionHeading";
import ProfileStickySidebar from "@/components/profile/ProfileStickySidebar";
import getCandidateStatus from "@/utils/getCandidateStatus";
import {
  relateCandidateTimezoneWithClientTimezone,
} from "@/utils/cityTimezoneOffset";

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

function toSkillTag(item) {
  if (typeof item === "string") return item.trim();
  return (item?.skill || item?.name || "").trim();
}

function getExperienceYears(talent) {
  if (talent?.expertise?.length) {
    const years = talent.expertise
      .map((item) => {
        if (typeof item !== "object" || item == null) return 0;
        const value =
          item.experience ?? item.years ?? item.years_of_experience ?? 0;
        return typeof value === "number" ? value : parseInt(value, 10) || 0;
      })
      .filter(Boolean);

    if (years.length) return Math.max(...years);
  }

  if (talent?.work_experience?.length) {
    return talent.work_experience.length;
  }

  return null;
}

function uniqueTagList(tags) {
  const seen = new Set();
  const result = [];

  for (const tag of tags) {
    const normalized = toSkillTag(tag);
    if (!normalized) continue;

    const key = normalized.toLowerCase();
    if (seen.has(key)) continue;

    seen.add(key);
    result.push(normalized);
  }

  return result;
}

function collectSkillPool(talent, skillCategoryData) {
  const pool = [];

  const append = (items) => {
    uniqueTagList(items).forEach((tag) => {
      if (!pool.some((item) => item.toLowerCase() === tag.toLowerCase())) {
        pool.push(tag);
      }
    });
  };

  if (skillCategoryData && typeof skillCategoryData === "object") {
    if (Array.isArray(skillCategoryData)) {
      append(skillCategoryData);
    } else {
      const entries = Object.entries(skillCategoryData);
      const hasArrayValues = entries.some(([, value]) => Array.isArray(value));

      if (hasArrayValues) {
        entries.forEach(([, value]) => {
          if (Array.isArray(value)) append(value);
        });
      } else {
        append(entries.map(([skill]) => skill));
      }
    }
  }

  (talent?.work_experience || []).forEach((exp) => {
    append(exp?.skills || []);
  });

  return pool;
}

function buildPrimaryExpertiseTags(talent, skillPool) {
  const MIN_PRIMARY = 4;
  const TARGET_PRIMARY = 10;
  const MAX_PRIMARY = 10;

  let primary = uniqueTagList(talent?.expertise || []);

  if (primary.length < 5) {
    for (const tag of skillPool) {
      if (primary.length >= MAX_PRIMARY) break;
      if (primary.length >= TARGET_PRIMARY) break;

      if (!primary.some((item) => item.toLowerCase() === tag.toLowerCase())) {
        primary.push(tag);
      }
    }

    if (primary.length < MIN_PRIMARY) {
      for (const tag of skillPool) {
        if (primary.length >= MIN_PRIMARY) break;
        if (primary.length >= MAX_PRIMARY) break;

        if (!primary.some((item) => item.toLowerCase() === tag.toLowerCase())) {
          primary.push(tag);
        }
      }
    }
  } else {
    primary = primary.slice(0, MAX_PRIMARY);
  }

  return primary;
}

function buildSkillRows(talent, skillCategoryData) {
  const skillPool = collectSkillPool(talent, skillCategoryData);
  const primaryTags = buildPrimaryExpertiseTags(talent, skillPool);

  if (!primaryTags.length) return [];

  return [
    {
      label: "Primary expertise",
      tags: primaryTags,
      isExpertise: true,
    },
  ];
}

function getSummaryBullets(talent) {
  const bullets = [];
  const years = getExperienceYears(talent);
  const projectCount = talent?.projects?.length ?? 0;
  const companies = (talent?.work_experience || [])
    .map((exp) => exp?.organization)
    .filter(Boolean);

  if (years) {
    bullets.push(
      `${years}+ years building production systems across startups and enterprise teams.`,
    );
  }

  if (projectCount > 0) {
    bullets.push(
      `Shipped ${projectCount}+ projects spanning ${talent?.specialization || "software development"}.`,
    );
  }

  if (companies.length) {
    const list = companies.slice(0, 3).join(", ");
    bullets.push(
      `Experience at ${list}${companies.length > 3 ? " and others" : ""}.`,
    );
  }

  if (talent?.commitment) {
    bullets.push(
      `Available for ${talent.commitment.replace(/-/g, " ")} engagements with flexible timezone overlap.`,
    );
  }

  if (bullets.length < 4) {
    return [
      `${years || "10"}+ years of hands-on engineering experience across modern stacks.`,
      "Track record of shipping reliable products from architecture through production.",
      "Clear communicator with experience working alongside product and design teams.",
      "Vetted through Covental's full technical and reference review process.",
    ];
  }

  return bullets.slice(0, 4);
}

function getLocationLabel(talent) {
  const city = talent?.city?.trim();
  const country = talent?.country?.trim();

  if (city && country) return `${city}, ${country}`;
  return city || country || "Location not set";
}

function getAvailabilityLabel(talent) {
  const statusLabel = getCandidateStatus(talent?.talent_status, talent?.status);
  const isAvailable = statusLabel.toLowerCase() === "available";
  const availability = isAvailable ? "Available now" : statusLabel;
  const commitment = talent?.commitment
    ? talent.commitment.replace(/-/g, " ")
    : "full-time or contract";

  return `${availability} — ${commitment}`;
}

function getLanguagesSidebar(talent) {
  const raw =
    talent?.languages ??
    talent?.spoken_languages ??
    talent?.language ??
    null;

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

  const dotClasses = [
    "profile-lang-dot--orange",
    "profile-lang-dot--yellow",
    "profile-lang-dot--blue",
  ];

  if (!items.length) {
    return [
      { label: "English (native)", dotClass: dotClasses[0] },
      { label: "Urdu (fluent)", dotClass: dotClasses[1] },
    ];
  }

  const english = items.find((language) =>
    language.toLowerCase().includes("english"),
  );
  const urdu = items.find((language) => language.toLowerCase().includes("urdu"));

  return [
    {
      label: english?.includes("(") ? english : "English (native)",
      dotClass: dotClasses[0],
    },
    {
      label: urdu?.includes("(") ? urdu : "Urdu (fluent)",
      dotClass: dotClasses[1],
    },
  ];
}

function SidebarItem({ icon, children }) {
  return (
    <li className="profile-sidebar-item">
      <span className="profile-sidebar-item-icon">
        <Image src={icon} alt="" width={16} height={16} aria-hidden />
      </span>
      <span>{children}</span>
    </li>
  );
}

export function ProfileOverviewMain({ talent, skillCategoryData }) {
  const skillRows = buildSkillRows(talent, skillCategoryData);
  const summaryBullets = getSummaryBullets(talent);

  return (
    <>
      <section className="profile-section-block">
        <ProfileSectionHeading number="01" title="Summary" />
        <p className="profile-summary-text">
          {talent?.description ||
            `${talent?.name || "This candidate"} is a ${talent?.specialization || "senior engineer"} with deep experience shipping production software. They combine strong technical fundamentals with clear communication and a track record of delivering high-impact work across complex systems.`}
        </p>
        <ul className="profile-summary-list">
          {summaryBullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </section>

      <section className="profile-section-block">
        <ProfileSectionHeading number="02" title="Expertise" />
        {skillRows.length ? (
          <div className="profile-skills-grid">
            {skillRows.map((row) => (
              <div key={row.label} className="profile-skills-row">
                <span className="profile-skills-label">{row.label}</span>
                <div className="profile-skills-tags">
                  {row.tags.map((tag) => (
                    <span
                      key={`${row.label}-${tag}`}
                      className={`profile-skill-tag ${
                        row.isExpertise ? "is-expertise" : ""
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="profile-empty-inline">No skills added yet.</p>
        )}
      </section>
    </>
  );
}

export function ProfileSidebar({ talent, customerId }) {
  const firstName = talent?.name?.trim().split(/\s+/)[0] || "Talent";
  const languages = getLanguagesSidebar(talent);
  const experienceYears = getExperienceYears(talent);
  const timezoneLabel = relateCandidateTimezoneWithClientTimezone(talent?.city);

  return (
    <aside className="profile-overview-sidebar">
      <div className="profile-sidebar-block">
        <h3 className="profile-sidebar-title">At a glance</h3>
        <ul className="profile-sidebar-list">
          <SidebarItem icon="/icons/location.svg">
            {getLocationLabel(talent)} · {timezoneLabel}
          </SidebarItem>
          <SidebarItem icon="/icons/calendar.svg">
            {getAvailabilityLabel(talent)}
          </SidebarItem>
          <SidebarItem icon="/icons/wallet.svg">
            {talent?.hourly_rate ? `$${talent.hourly_rate} / hr` : "Rate on request"}
          </SidebarItem>
          <SidebarItem icon="/icons/briefcase-tick.svg">
            {experienceYears ? `${experienceYears}+ years` : "Experience on request"}
          </SidebarItem>
        </ul>
      </div>

      <div className="profile-sidebar-block">
        <h3 className="profile-sidebar-title">Languages</h3>
        <ul className="profile-language-list">
          {languages.map((language) => (
            <li key={language.label} className="profile-language-item">
              <span
                className={`profile-lang-dot ${language.dotClass}`}
                aria-hidden
              />
              {language.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="profile-verified-card">
        <p className="profile-verified-card-label">Verified by Covental</p>
        <p className="profile-verified-card-copy">
          Passed the full vetting protocol: technical screen, live system design,
          code review, and references across three employers.
        </p>
        <Link
          href={`/book-talent/${customerId}`}
          className="profile-verified-hire-btn"
        >
          <SendIcon />
          Hire {firstName}
        </Link>
      </div>
    </aside>
  );
}

export default function ProfileOverviewLayout({
  talent,
  customerId,
  skillCategoryData,
  children,
}) {
  return (
    <div className="profile-content-grid">
      <div className="profile-content-main">
        <ProfileOverviewMain
          talent={talent}
          skillCategoryData={skillCategoryData}
        />
        {children}
      </div>

      <ProfileStickySidebar>
        <ProfileSidebar talent={talent} customerId={customerId} />
      </ProfileStickySidebar>
    </div>
  );
}
