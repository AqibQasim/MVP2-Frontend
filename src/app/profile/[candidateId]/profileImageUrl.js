/**
 * Profile page only: backend static files live at /uploads/... on the API host,
 * not under /v1. Prefer NEXT_PUBLIC_API_ORIGIN, else NEXT_PUBLIC_STATIC_URL,
 * else strip /v1 from NEXT_PUBLIC_API_REMOTE_URL.
 */
function getApiOriginForStaticFiles() {
  const dedicated = process.env.NEXT_PUBLIC_API_ORIGIN?.trim();
  if (dedicated) return dedicated.replace(/\/$/, "");

  const staticUrl = process.env.NEXT_PUBLIC_STATIC_URL?.trim();
  if (staticUrl) return staticUrl.replace(/\/$/, "");

  const apiRemote = process.env.NEXT_PUBLIC_API_REMOTE_URL?.trim();
  if (apiRemote) {
    return apiRemote.replace(/\/v1\/?$/i, "").replace(/\/$/, "");
  }
  return "";
}

export const PROFILE_DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=626&h=620&fit=crop&crop=faces";

const PLACEHOLDER_IMAGE_PATTERN =
  /\/avatars\/avatar-|\.svg($|\?)|dicebear|memoji|ui-avatars|placeholder/i;

function isPlaceholderProfileImage(path) {
  if (!path) return true;
  return PLACEHOLDER_IMAGE_PATTERN.test(String(path));
}

function getDefaultProfileAvatar(customerId) {
  const pool = [
    PROFILE_DEFAULT_AVATAR,
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=626&h=620&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=626&h=620&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=626&h=620&fit=crop&crop=faces",
  ];

  if (!customerId) return PROFILE_DEFAULT_AVATAR;

  const hash = String(customerId)
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return pool[hash % pool.length];
}

/** Handles root, nested customer, and camelCase API shapes. */
export function pickProfileImagePath(talent) {
  if (!talent || typeof talent !== "object") return null;
  const c = talent.customer;
  return (
    talent.profile_image ??
    talent.profileImage ??
    c?.profile_image ??
    c?.profileImage ??
    null
  );
}

export function candidateProfileImageUrl(profileImage, customerId) {
  const fallback = getDefaultProfileAvatar(customerId);

  if (profileImage == null || profileImage === "") return fallback;
  const path = String(profileImage).trim();
  if (!path || isPlaceholderProfileImage(path)) return fallback;
  if (/^https?:\/\//i.test(path)) return path;
  const origin = getApiOriginForStaticFiles();
  if (!origin) return fallback;
  return path.startsWith("/") ? `${origin}${path}` : `${origin}/${path}`;
}
