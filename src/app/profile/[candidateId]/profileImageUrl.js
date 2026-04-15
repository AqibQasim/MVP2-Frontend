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

const FALLBACK_AVATAR = "/avatars/avatar-2.png";

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

export function candidateProfileImageUrl(profileImage) {
  if (profileImage == null || profileImage === "") return FALLBACK_AVATAR;
  const path = String(profileImage).trim();
  if (!path) return FALLBACK_AVATAR;
  if (/^https?:\/\//i.test(path)) return path;
  const origin = getApiOriginForStaticFiles();
  if (!origin) return FALLBACK_AVATAR;
  return path.startsWith("/") ? `${origin}${path}` : `${origin}/${path}`;
}
