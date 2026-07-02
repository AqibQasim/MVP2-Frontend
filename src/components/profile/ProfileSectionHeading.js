"use client";

import {
  ProfileSectionChevronDown,
  ProfileSectionChevronUp,
} from "@/components/profile/ProfileSectionIcons";

export default function ProfileSectionHeading({
  number,
  title,
  meta = null,
  collapsible = false,
  isExpanded = true,
  onToggle,
}) {
  const showActions = Boolean(meta) || collapsible;

  return (
    <div
      className={`profile-section-heading ${showActions ? "profile-section-heading--split" : ""}`}
    >
      <div className="profile-section-heading-main">
        <div className="profile-section-heading-rule" aria-hidden />
        <div className="profile-section-heading-row">
          <span className="profile-section-number">{number}</span>
          <h2 className="profile-section-title">{title}</h2>
        </div>
      </div>

      {showActions ? (
        <div className="profile-section-heading-actions">
          {meta ? <span className="profile-section-meta">{meta}</span> : null}
          {collapsible ? (
            <button
              type="button"
              className="profile-section-toggle"
              onClick={onToggle}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? `Collapse ${title}` : `Expand ${title}`}
            >
              {isExpanded ? <ProfileSectionChevronUp /> : <ProfileSectionChevronDown />}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
