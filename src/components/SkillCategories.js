import Capsule from "./Capsule";

const PROFICIENCY_LEVELS = {
  expert: "Expert",
  intermediate: "Strong",
  strong: "Strong",
  beginner: "Competitive",
  competitive: "Competitive",
};

/** API may send an array, a keyed map of arrays, a skill→level map, or a single row object. */
export function normalizeSkillsCategories(categories) {
  if (categories == null) return [];
  if (Array.isArray(categories)) return categories;
  if (typeof categories === "string") {
    try {
      return normalizeSkillsCategories(JSON.parse(categories));
    } catch {
      return [];
    }
  }
  if (typeof categories !== "object") return [];

  const values = Object.values(categories);
  if (values.length && values.every((v) => Array.isArray(v))) {
    return values.flat();
  }
  if (categories.skill != null || categories.name != null) {
    return [categories];
  }
  if (
    values.length > 0 &&
    values.every(
      (v) =>
        typeof v === "string" ||
        typeof v === "number" ||
        v == null,
    )
  ) {
    return Object.entries(categories).map(([skill, level]) => ({
      skill,
      level: level != null ? String(level) : null,
    }));
  }
  return [];
}

function SkillCategories({ categories = null, emptyMessage = "No skills added yet." }) {
  const skillsData = normalizeSkillsCategories(categories);

  if (!skillsData.length) {
    return (
      <Capsule className="w-full h-auto flex !justify-start !py-10 !px-10">
        <p className="text-grey-primary-shade-30">{emptyMessage}</p>
      </Capsule>
    );
  }

  return (
    <Capsule className="w-full h-auto flex !justify-start !py-8 !px-8">
      <div className="w-full">
        <div className="grid grid-cols-2 gap-x-16 gap-y-3">
          {skillsData.map((item, index) => {
            const label =
              typeof item === "string"
                ? item
                : item?.skill ?? item?.name ?? "";
            const level =
              typeof item === "string" ? null : item?.level ?? null;
            const proficiencyLabel = level
              ? PROFICIENCY_LEVELS[String(level).toLowerCase()] || "Competitive"
              : "Competitive";
            const isExpert = String(level || "").toLowerCase() === "expert";

            if (!label) return null;

            return (
              <div 
                key={index}
                className="flex items-center justify-between py-2"
              >
                <Capsule className=" font-normal border flex items-center gap-2">
                  {isExpert && <span className="text-yellow-500">⭐</span>}
                  <span>{label}</span>
                </Capsule>
                <Capsule className=" font-normal border">
                  {proficiencyLabel}
                </Capsule>
              </div>
            );
          })}
        </div>
      </div>
    </Capsule>
  );
}

export default SkillCategories;
