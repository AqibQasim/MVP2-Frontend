"use client";

import { useState } from "react";
import ProfileSectionHeading from "@/components/profile/ProfileSectionHeading";
import ProfileSkillsByLevel from "@/components/profile/ProfileSkillsByLevel";

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
          <ProfileSkillsByLevel categories={skillCategoryData} />
        ) : (
          <p className="profile-empty-inline">No skills added yet.</p>
        )
      ) : null}
    </section>
  );
}
