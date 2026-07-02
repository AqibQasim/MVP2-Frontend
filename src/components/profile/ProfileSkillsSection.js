"use client";

import { useState } from "react";
import ProfileSectionHeading from "@/components/profile/ProfileSectionHeading";
import SkillCategories from "@/components/SkillCategories";

export default function ProfileSkillsSection({ skillCategoryData }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasSkills = Boolean(skillCategoryData);

  return (
    <section
      className={`profile-skills-section ${isExpanded ? "is-expanded" : "is-collapsed"}`}
    >
      <ProfileSectionHeading
        number="07"
        title="Skills"
        collapsible={hasSkills}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded((open) => !open)}
      />

      {isExpanded ? (
        hasSkills ? (
          <div className="profile-skills-panel">
            <SkillCategories categories={skillCategoryData} />
          </div>
        ) : (
          <p className="profile-empty-inline">No skills added yet.</p>
        )
      ) : null}
    </section>
  );
}
