"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProfileSectionHeading from "@/components/profile/ProfileSectionHeading";
import ProfileDetailBlocks from "@/components/profile/ProfileDetailBlocks";
import {
  ProfileSectionChevronDown,
  ProfileSectionChevronUp,
} from "@/components/profile/ProfileSectionIcons";

const INITIAL_VISIBLE = 4;

function toSkillLabel(item) {
  if (typeof item === "string") return item.trim();
  return (item?.skill || item?.name || "").trim();
}

function getProjectMeta(project) {
  const type =
    project?.project_type ||
    project?.type ||
    project?.category ||
    project?.industries?.[0] ||
    "Project";

  const language =
    project?.language ||
    project?.primary_language ||
    toSkillLabel(project?.skills?.[0]) ||
    "—";

  return `${type} · ${language}`;
}

function getProjectInitials(name) {
  if (!name) return "P";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function getProjectColor(name) {
  let hash = 0;
  const value = name || "Project";

  for (let index = 0; index < value.length; index += 1) {
    hash = value.charCodeAt(index) + ((hash << 5) - hash);
  }

  const hues = [355, 220, 250, 145, 25];
  const hue = hues[Math.abs(hash) % hues.length];
  return `hsl(${hue} 72% 92%)`;
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

function ProjectCard({ project }) {
  const title = project?.project_name || project?.name || "Untitled project";
  const meta = getProjectMeta(project);
  const logoSrc = project?.logo || project?.project_logo || project?.image;
  const link = project?.project_link || project?.link || project?.url;

  return (
    <article className="profile-project-card">
      <div className="profile-project-card-top">
        <div
          className="profile-project-icon"
          style={{ background: getProjectColor(title) }}
        >
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt=""
              width={48}
              height={48}
              className="profile-project-icon-img"
            />
          ) : (
            <span>{getProjectInitials(title)}</span>
          )}
        </div>

        <div className="profile-project-copy">
          <h3 className="profile-project-title">{title}</h3>
          <p className="profile-project-meta">{meta}</p>
        </div>

        {link ? (
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="profile-project-view-btn"
          >
            View
            <ExternalLinkIcon />
          </Link>
        ) : null}
      </div>

      <ProfileDetailBlocks item={project} />
    </article>
  );
}

export default function ProfileProjects({ talent }) {
  const projects = useMemo(
    () => (Array.isArray(talent?.projects) ? talent.projects : []),
    [talent?.projects],
  );
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll
    ? projects
    : projects.slice(0, INITIAL_VISIBLE);
  const hiddenCount = Math.max(projects.length - INITIAL_VISIBLE, 0);
  const metaLabel =
    projects.length > INITIAL_VISIBLE && !showAll
      ? `${INITIAL_VISIBLE} of ${projects.length} highlighted`
      : `${projects.length} project${projects.length === 1 ? "" : "s"}`;

  if (!projects.length) {
    return (
      <section className="profile-projects-section">
        <ProfileSectionHeading
          number="04"
          title="Notable projects"
          meta="0 projects"
        />
        <p className="profile-empty-inline">No projects added yet.</p>
      </section>
    );
  }

  return (
    <section
      className={`profile-projects-section ${isExpanded ? "is-expanded" : "is-collapsed"}`}
    >
      <ProfileSectionHeading
        number="04"
        title="Notable projects"
        meta={metaLabel}
        collapsible
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded((open) => !open)}
      />

      {isExpanded ? (
        <>
          <div className="profile-projects-list">
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={`${project?.project_name || project?.name || "project"}-${index}`}
                project={project}
              />
            ))}
          </div>

          {hiddenCount > 0 ? (
            <button
              type="button"
              className="profile-projects-more-btn"
              onClick={() => setShowAll((open) => !open)}
              aria-expanded={showAll}
            >
              {showAll ? <ProfileSectionChevronUp /> : <ProfileSectionChevronDown />}
              {showAll
                ? "Show less"
                : `View ${hiddenCount} more project${hiddenCount === 1 ? "" : "s"}`}
            </button>
          ) : null}
        </>
      ) : null}
    </section>
  );
}
