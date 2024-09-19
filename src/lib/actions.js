"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createJob, referCandidate } from "./data-service";

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
    return { error: "Client Id is required." };
  }
  if (!position || position.trim() === "") {
    return { error: "Job title is required." };
  }
  if (!description || description.trim() === "") {
    return { error: "Description is required." };
  }
  if (
    !experience ||
    !["beginner", "intermediate", "expert"].includes(experience)
  ) {
    return { error: "Valid experience level is required." };
  }
  if (!commitment || !["full-time", "part-time"].includes(commitment.trim())) {
    return { error: "Valid commitment is required." };
  }
  if (!project_length || isNaN(project_length) || project_length <= 0) {
    return { error: "Project length is required and must be a valid number." };
  }
  if (!job_type || !["remote", "on-site", "hybrid"].includes(job_type)) {
    return { error: "Valid job type is required." };
  }
  if (!start_date || isNaN(new Date(start_date))) {
    return { error: "A valid desired start date is required." };
  }
  if (!workday_overlap || isNaN(workday_overlap) || workday_overlap <= 0) {
    return { error: "Workday overlap is required and must be a valid number." };
  }
  if (!location || location.trim() === "") {
    return { error: "Location is required." };
  }
  if (skills.length === 0 || skills.some((skill) => skill.trim() === "")) {
    return { error: "At least one valid skill is required." };
  }
  if (
    application_questions.length === 0 ||
    application_questions.some((q) => q.trim() === "")
  ) {
    return { error: "At least one valid application question is required." };
  }

  // Prepare job data
  const createJobData = {
    position,
    client_id,
    skills,
    job_type,
    description,
    commitment,
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
  console.log("Job data prepared for dispatch:", createJobData);

  const { error } = await createJob(createJobData);
  console.log("error while creating: ", error);

  if (error) {
    return { error };
  }

  revalidatePath(`/client/${createJobData.client_id}`);
  revalidatePath("/admin/jobs");
  return { message: "Candidate successfully referred to the client." };

  // redirect("/admin/clients");
}

export async function referCandidateToClientAction(params, closeModal) {
  const { client_id, customer_id, job_posting_id } = params;
  console.log("Params in refer Candidate to client Action: ", params);
  if (!client_id) return { error: "Client id is required" };
  if (!customer_id) return { error: "Candidate id is required" };
  if (!job_posting_id) return { error: "Job id is required" };

  const { error, data } = await referCandidate({
    client_id,
    customer_id,
    job_posting_id,
  });

  if (error) {
    return { error };
  }

  revalidatePath(`/client/${client_id}/recommended`);
  revalidatePath("/admin/candidates");
  return { message: "Candidate successfully referred to the client." };
  // redirect("/admin/candidates");
}
