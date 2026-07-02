"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProfileSectionHeading from "@/components/profile/ProfileSectionHeading";
import { normalizeTags } from "@/components/profile/ProfileDetailBlocks";

function formatCertYear(value) {
  if (!value) return "—";
  const normalized = String(value).trim();
  const yearMatch = normalized.match(/\d{4}/);
  return yearMatch ? yearMatch[0] : normalized;
}

function getCertMeta(cert) {
  const issuer =
    cert?.organization ||
    cert?.issuer ||
    cert?.provider ||
    cert?.issued_by ||
    "Issuer";

  const year = formatCertYear(
    cert?.start_date || cert?.issue_date || cert?.end_date || cert?.year,
  );

  return `${issuer} · ${year}`;
}

function getCertInitials(name) {
  if (!name) return "C";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function getCertColor(name) {
  let hash = 0;
  const value = name || "Cert";

  for (let index = 0; index < value.length; index += 1) {
    hash = value.charCodeAt(index) + ((hash << 5) - hash);
  }

  const hues = [210, 250, 145, 15, 355];
  const hue = hues[Math.abs(hash) % hues.length];
  return `hsl(${hue} 68% 92%)`;
}

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M5.25 3.5H10.5V8.75M10.5 3.5L3.5 10.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CertificationCard({ cert }) {
  const [showSkills, setShowSkills] = useState(false);
  const title = cert?.title || cert?.name || "Certification";
  const meta = getCertMeta(cert);
  const skills = normalizeTags(cert?.skills);
  const hasSkills = skills.length > 0;
  const link =
    cert?.link ||
    cert?.credential_url ||
    cert?.url ||
    cert?.certificate_link;
  const logoSrc = cert?.logo || cert?.issuer_logo || cert?.image;
  const issuerName =
    cert?.organization || cert?.issuer || cert?.provider || title;

  return (
    <article
      className={`profile-cert-card ${showSkills ? "is-expanded" : ""}`}
    >
      <div className="profile-cert-card-top">
        <div
          className="profile-cert-logo"
          style={{ background: getCertColor(issuerName) }}
        >
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt=""
              width={40}
              height={40}
              className="profile-cert-logo-img"
            />
          ) : (
            <span>{getCertInitials(issuerName)}</span>
          )}
        </div>

        <div className="profile-cert-copy">
          <h3 className="profile-cert-title">{title}</h3>
          <p className="profile-cert-meta">{meta}</p>
          {link ? (
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-cert-credential-link"
            >
              View credential
            </Link>
          ) : null}
        </div>

        {hasSkills ? (
          <button
            type="button"
            className="profile-cert-view-btn"
            onClick={() => setShowSkills((open) => !open)}
            aria-expanded={showSkills}
            aria-label={showSkills ? "Hide skills" : "View skills"}
          >
            <ExternalLinkIcon />
            View
          </button>
        ) : link ? (
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="profile-cert-view-btn"
          >
            <ExternalLinkIcon />
            View
          </Link>
        ) : null}
      </div>

      {showSkills && hasSkills ? (
        <div className="profile-cert-skills">
          <h4 className="profile-detail-block-label">Skills:</h4>
          <div className="profile-detail-block-tags">
            {skills.map((skill) => (
              <span key={skill} className="profile-detail-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}

export default function ProfileCertifications({ talent }) {
  const certifications = Array.isArray(talent?.certifications)
    ? talent.certifications
    : [];
  const [isExpanded, setIsExpanded] = useState(true);
  const certMeta = `${certifications.length} certification${
    certifications.length === 1 ? "" : "s"
  }`;

  return (
    <section
      className={`profile-certifications-section ${isExpanded ? "is-expanded" : "is-collapsed"}`}
    >
      <ProfileSectionHeading
        number="06"
        title="Certifications"
        meta={certifications.length ? certMeta : null}
        collapsible={certifications.length > 0}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded((open) => !open)}
      />

      {isExpanded ? (
        certifications.length ? (
          <div className="profile-cert-grid">
            {certifications.map((cert, index) => (
              <CertificationCard
                key={`${cert?.title || cert?.name || "cert"}-${index}`}
                cert={cert}
              />
            ))}
          </div>
        ) : (
          <p className="profile-empty-inline">No certifications added yet.</p>
        )
      ) : null}
    </section>
  );
}
