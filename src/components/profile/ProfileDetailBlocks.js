function toLabel(item) {
  if (typeof item === "string") return item.trim();
  return (item?.skill || item?.name || item?.label || "").trim();
}

export function normalizeTags(raw) {
  if (!raw) return [];

  if (Array.isArray(raw)) {
    return raw.map(toLabel).filter(Boolean);
  }

  if (typeof raw === "string") {
    return raw
      .split(/[,;|]/)
      .map((part) => part.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeDescriptionItems(item) {
  if (Array.isArray(item?.description)) {
    return item.description.map((entry) => String(entry).trim()).filter(Boolean);
  }

  if (typeof item?.description === "string" && item.description.trim()) {
    return [item.description.trim()];
  }

  if (Array.isArray(item?.tasks) && item.tasks.length) {
    return item.tasks.map((entry) => String(entry).trim()).filter(Boolean);
  }

  return [];
}

export function hasProfileDetailContent(item) {
  return (
    normalizeDescriptionItems(item).length > 0 ||
    normalizeTags(item?.industries).length > 0 ||
    normalizeTags(item?.skills).length > 0
  );
}

export default function ProfileDetailBlocks({ item }) {
  const descriptionItems = normalizeDescriptionItems(item);
  const industries = normalizeTags(item?.industries);
  const skills = normalizeTags(item?.skills);

  if (!descriptionItems.length && !industries.length && !skills.length) {
    return null;
  }

  return (
    <div className="profile-detail-blocks">
      {descriptionItems.length ? (
        <div className="profile-detail-block">
          <h4 className="profile-detail-block-label">Description:</h4>
          {descriptionItems.map((paragraph, index) => (
            <p key={`${index}-${paragraph.slice(0, 24)}`} className="profile-detail-block-text">
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}

      {industries.length ? (
        <div className="profile-detail-block">
          <h4 className="profile-detail-block-label">Industries:</h4>
          <div className="profile-detail-block-tags">
            {industries.map((industry) => (
              <span key={industry} className="profile-detail-tag">
                {industry}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {skills.length ? (
        <div className="profile-detail-block">
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
  );
}
