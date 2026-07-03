import { normalizeSkillsCategories } from "@/components/SkillCategories";

const PROFICIENCY_ROWS = [
  { id: "expert", label: "Expert", aliases: ["expert"] },
  { id: "intermediate", label: "Strong", aliases: ["strong", "intermediate"] },
  { id: "beginner", label: "Competitive", aliases: ["competitive", "beginner"] },
];

const PROFICIENCY_ALIASES = {
  expert: "expert",
  intermediate: "intermediate",
  strong: "intermediate",
  beginner: "beginner",
  competitive: "beginner",
};

function toSkillLabel(item) {
  if (typeof item === "string") return item.trim();
  return (item?.skill || item?.name || "").trim();
}

function parseCategoriesInput(categories) {
  if (categories == null) return null;
  if (typeof categories === "string") {
    try {
      return JSON.parse(categories);
    } catch {
      return null;
    }
  }
  return categories;
}

function resolveProficiencyBucket(item, levelOverride = null) {
  if (levelOverride) return levelOverride;

  if (typeof item === "string") {
    return PROFICIENCY_ALIASES[item.toLowerCase()] || "beginner";
  }

  const raw = String(
    item?.level ??
      item?.proficiency ??
      item?.experience ??
      item?.difficulty ??
      "beginner",
  )
    .toLowerCase()
    .trim();

  return PROFICIENCY_ALIASES[raw] || "beginner";
}

function pushUnique(list, label) {
  if (!label) return;
  if (!list.some((item) => item.toLowerCase() === label.toLowerCase())) {
    list.push(label);
  }
}

function addSkillToGroup(groups, item, levelOverride = null) {
  const label = toSkillLabel(item);
  if (!label) return;

  const bucket = resolveProficiencyBucket(item, levelOverride);
  pushUnique(groups[bucket], label);
}

function isProficiencyBucketKey(key) {
  return PROFICIENCY_ROWS.some((entry) =>
    entry.aliases.includes(String(key).toLowerCase()),
  );
}

function groupSkillsByProficiency(categories) {
  const groups = {
    expert: [],
    intermediate: [],
    beginner: [],
  };

  const parsed = parseCategoriesInput(categories);
  if (!parsed) return groups;

  if (typeof parsed === "object" && !Array.isArray(parsed)) {
    const values = Object.values(parsed);
    const isSkillLevelMap =
      values.length > 0 &&
      values.every(
        (value) =>
          typeof value === "string" ||
          typeof value === "number" ||
          value == null,
      );

    if (isSkillLevelMap) {
      Object.entries(parsed).forEach(([skill, level]) => {
        addSkillToGroup(groups, skill, resolveProficiencyBucket(level));
      });
      return groups;
    }

    Object.entries(parsed).forEach(([key, value]) => {
      const proficiencyRow = PROFICIENCY_ROWS.find((entry) =>
        entry.aliases.includes(String(key).toLowerCase()),
      );

      if (proficiencyRow && Array.isArray(value)) {
        value.forEach((item) => addSkillToGroup(groups, item, proficiencyRow.id));
        return;
      }

      if (Array.isArray(value) && !isProficiencyBucketKey(key)) {
        value.forEach((item) => addSkillToGroup(groups, item));
        return;
      }

      if (Array.isArray(value)) {
        value.forEach((item) => addSkillToGroup(groups, item));
      }
    });

    if (groups.expert.length || groups.intermediate.length || groups.beginner.length) {
      return groups;
    }
  }

  normalizeSkillsCategories(parsed).forEach((item) => {
    addSkillToGroup(groups, item);
  });

  return groups;
}

export default function ProfileSkillsByLevel({ categories }) {
  const groups = groupSkillsByProficiency(categories);
  const rows = PROFICIENCY_ROWS.map((row) => ({
    ...row,
    skills: groups[row.id],
  })).filter((row) => row.skills.length > 0);

  if (!rows.length) {
    return <p className="profile-empty-inline">No skills added yet.</p>;
  }

  return (
    <div className="profile-skills-detail-grid">
      {rows.map((row) => (
        <div key={row.id} className="profile-skills-row">
          <span className="profile-skills-label">{row.label}</span>
          <div className="profile-skills-tags">
            {row.skills.map((skill) => (
              <span key={`${row.id}-${skill}`} className="profile-skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
