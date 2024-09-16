"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createJob } from "./data-service";

export async function createAJobAction(formData) {
  const client_id = formData.get("client_id");
  const position = formData.get("position");
  const description = formData.get("description");
  const experience = formData.get("experience");
  const commitment = formData.get("commitment");
  const project_length = Number(formData.get("project_length"));
  const job_type = formData.get("job_type");
  const start_date = formData.get("start_date");
  const workday_overlap = Number(formData.get("workday_overlap"));
  const skills = formData.getAll("skills");
  const location = formData.get("location");
  const is_test_required = formData.get("is_test_required") === "true";
  const applied_customers_count = 0; // default to 0
  const status = "active"; // default to active
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
    position,
    client_id,
    skills,
    job_type,
    description,
    status,
    applied_customers_count,
    application_questions,
    start_date,
    location,
    project_length: `${project_length} Month`,
    is_test_required,
    experience,
    workday_overlap: `${workday_overlap} Hours`,
  };
  // commitment is not accepted
  // commitment,

  console.log("Job data prepared for dispatch:", createJobData);

  const { error } = await createJob(createJobData);

  if (error) {
    throw new Error(error);
  }

  revalidatePath(`/client/${createJobData.client_id}`);
  revalidatePath("/admin/jobs");
  redirect("/admin/clients");
}
