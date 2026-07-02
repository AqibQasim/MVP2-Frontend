"use client";

import { useState } from "react";
import ProfileSectionHeading from "@/components/profile/ProfileSectionHeading";
import { normalizeTags } from "@/components/profile/ProfileDetailBlocks";

function GraduationCapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M1.5 5.75L8 2.75L14.5 5.75L8 8.75L1.5 5.75Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 7.25V10.75C4 10.75 5.75 12.25 8 12.25C10.25 12.25 12 10.75 12 10.75V7.25"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 5.75V10.25"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatYearRange(startYear, endYear) {
  const start = startYear ? String(startYear).trim() : "—";
  const end = endYear ? String(endYear).trim() : "Present";
  return `${start} — ${end}`;
}

function getDegreeTitle(edu) {
  if (edu?.degree && edu?.majors) {
    return `${edu.degree}${edu.majors.startsWith(",") || edu.majors.startsWith(" in") ? "" : " "}${edu.majors}`;
  }

  return edu?.degree || edu?.majors || "Degree";
}

function getEducationDetail(edu) {
  if (edu?.description?.trim()) return edu.description.trim();
  if (edu?.thesis?.trim()) return edu.thesis.trim();
  if (edu?.degree && edu?.majors) return null;
  return edu?.majors?.trim() || null;
}

function EducationItem({ edu }) {
  const title = getDegreeTitle(edu);
  const institution = edu?.organization || edu?.institution || "Institution";
  const detail = getEducationDetail(edu);
  const skills = normalizeTags(edu?.skills);

  return (
    <article className="profile-education-item">
      <div className="profile-education-icon" aria-hidden>
        <GraduationCapIcon />
      </div>

      <div className="profile-education-date">
        {formatYearRange(edu?.start_year, edu?.end_year)}
      </div>

      <div className="profile-education-copy">
        <h3 className="profile-education-degree">{title}</h3>
        <p className="profile-education-institution">{institution}</p>
        {detail ? <p className="profile-education-detail">{detail}</p> : null}

        {skills.length ? (
          <div className="profile-education-skills">
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
      </div>
    </article>
  );
}

export default function ProfileEducation({ talent }) {
  const education = Array.isArray(talent?.education) ? talent.education : [];
  const [isExpanded, setIsExpanded] = useState(true);
  const educationMeta = `${education.length} degree${education.length === 1 ? "" : "s"}`;

  return (
    <section
      className={`profile-education-section ${isExpanded ? "is-expanded" : "is-collapsed"}`}
    >
      <ProfileSectionHeading
        number="05"
        title="Education"
        meta={education.length ? educationMeta : null}
        collapsible={education.length > 0}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded((open) => !open)}
      />

      {isExpanded ? (
        education.length ? (
          <div className="profile-education-list">
            {education.map((edu, index) => (
              <EducationItem
                key={`${edu?.organization || "school"}-${edu?.degree || "degree"}-${index}`}
                edu={edu}
              />
            ))}
          </div>
        ) : (
          <p className="profile-empty-inline">No education details added yet.</p>
        )
      ) : null}
    </section>
  );
}
