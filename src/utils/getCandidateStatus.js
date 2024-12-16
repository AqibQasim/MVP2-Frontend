export default function getCandidateStatus(talent_status, status) {
  return status === "active" && talent_status === "open"
    ? "Available"
    : status === "in-active"
      ? "Un-Available"
      : talent_status;
}
