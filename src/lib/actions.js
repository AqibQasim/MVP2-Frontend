"use server";

// Server Actions
export async function createAJobAction(formData) {
  const client_id = formData.get("client_id");
  const position = formData.get("position");
  const description = formData.get("description");
  const experience = formData.get("experience");
  const commitment = formData.get("commitment");
  const project_length = Number(formData.get("project_length")); // Convert to number
  const job_type = formData.get("job_type");
  const start_date = formData.get("start_date");
  const workday_overlap = Number(formData.get("workday_overlap")); // Convert to number
  const skills = formData.getAll("skills");
  const location = formData.get("location");
  const is_test_required = formData.get("is_test_required") === "true";
  const applied_customers_count = 0; // default to 0
  const application_questions = formData.getAll("application_questions");

  // Validate required fields
  if (!client_id || client_id.trim() === "") {
    throw new Error("Client Id is required.");
  }

  if (!position || position.trim() === "") {
    throw new Error("Job title is required.");
  }

  if (!description || description.trim() === "") {
    throw new Error("Description is required.");
  }

  if (
    !experience ||
    !["beginner", "intermediate", "expert"].includes(experience)
  ) {
    throw new Error("Valid experience level is required.");
  }

  if (!commitment || !["full-time", "part-time"].includes(commitment.trim())) {
    throw new Error("Valid commitment is required.");
  }

  if (!project_length || isNaN(project_length) || project_length <= 0) {
    throw new Error("Project length is required and must be a valid number.");
  }

  if (!job_type || !["remote", "on-site", "hybrid"].includes(job_type)) {
    throw new Error("Valid job type is required.");
  }

  if (!start_date || isNaN(new Date(start_date))) {
    throw new Error("A valid desired start date is required.");
  }

  if (!workday_overlap || isNaN(workday_overlap) || workday_overlap <= 0) {
    throw new Error("Workday overlap is required and must be a valid number.");
  }

  if (!location || location.trim() === "") {
    throw new Error("Location is required.");
  }

  if (skills.length === 0 || skills.some((skill) => skill.trim() === "")) {
    throw new Error("At least one valid skill is required.");
  }

  if (
    application_questions.length === 0 ||
    application_questions.some((q) => q.trim() === "")
  ) {
    throw new Error("At least one valid application question is required.");
  }

  // Prepare job data
  const createJobData = {
    client_id,
    position,
    description,
    experience,
    commitment,
    project_length: `${project_length} Month`,
    job_type,
    start_date,
    workday_overlap: `${workday_overlap} Hours`,
    skills,
    location,
    is_test_required,
    applied_customers_count,
    application_questions,
    status: "active",
  };

  // Add logic to dispatch the job data or handle it accordingly
  console.log("Job data prepared for dispatch:", createJobData);
}
