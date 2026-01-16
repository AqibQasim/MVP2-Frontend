import Capsule from "./Capsule";

const CATEGORY_CONFIG = [
  { label: "Libraries/APIs", matchKey: "librariesapis" },
  { label: "Tools", matchKey: "tools" },
  { label: "Languages", matchKey: "languages" },
  { label: "Frameworks", matchKey: "frameworks" },
  { label: "Paradigms", matchKey: "paradigms" },
  { label: "Platforms", matchKey: "platforms" },
  { label: "Storage", matchKey: "storage" },
  { label: "Industry Expertise", matchKey: "industryexpertise" },
  { label: "Other", matchKey: "other" },
];

const normalizeValue = (value) => {
  if (!value) return "";
  if (Array.isArray(value)) {
    return value
      .map((entry) => {
        if (!entry) return "";
        if (typeof entry === "string") return entry;
        if (typeof entry === "object") {
          return entry?.label || entry?.name || entry?.skill || "";
        }
        return `${entry}`;
      })
      .filter(Boolean)
      .join(", ");
  }
  if (typeof value === "object") {
    return Object.values(value)
      .flat()
      .map((entry) => {
        if (!entry) return "";
        if (typeof entry === "string") return entry;
        if (typeof entry === "object") {
          return entry?.label || entry?.name || entry?.skill || "";
        }
        return `${entry}`;
      })
      .filter(Boolean)
      .join(", ");
  }
  return `${value}`;
};

const normalizeDataKeys = (data) => {
  if (!data || typeof data !== "object") return {};
  return Object.entries(data).reduce((acc, [key, value]) => {
    const normalizedKey = key.toLowerCase().replace(/[^a-z]/g, "");
    acc[normalizedKey] = value;
    return acc;
  }, {});
};

function SkillCategories({ categories, emptyMessage = "No skills added yet." }) {
  const normalizedCategories = normalizeDataKeys(categories || {});
  const hasAnyValue = CATEGORY_CONFIG.some(
    ({ matchKey }) => normalizeValue(normalizedCategories[matchKey]).length,
  );

  if (!hasAnyValue) {
    return (
      <Capsule className="w-full h-auto flex !justify-start !py-10 !px-10">
        <p className="text-grey-primary-shade-30">{emptyMessage}</p>
      </Capsule>
    );
  }

  return (
    <Capsule className="w-full h-auto flex !justify-start !py-10 !px-10">
      <div className="w-full grid gap-6 md:grid-cols-1">
        {CATEGORY_CONFIG.map(({ label, matchKey }) => {
          const value = normalizeValue(normalizedCategories[matchKey]);
          return (
            <div key={matchKey} className="space-y-2 text-left">
              <div className="text-base font-semibold text-gray-900">
                {label}
              </div>
              <p className="text-grey-primary-shade-20">
                {value || "Not specified"}
              </p>
            </div>
          );
        })}
      </div>
    </Capsule>
  );
}

export default SkillCategories;

