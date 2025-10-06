"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { signIn, signOut } from "./auth";
import {
  candidateUpdateProfile,
  clientUpdateProfile,
  createJob,
  referCandidate,
} from "./data-service";

export async function signInAction(formData) {
  // localStorage.setItem("MVP_CLIENT_LOGGEDIN", true);
  const user_role = formData.get("user_role");
  const path = user_role === "client" ? "client" : "candidate";
  cookies().set({
    name: "user_role",
    value: user_role,
    maxAge: 60,
    path: "/",
    httpOnly: true,
  });

  await signIn("google", {
    redirectTo: `/${path}`,
    prompt: "select_account",
  });
}

export async function signOutAction(userRole) {
  cookies().delete({
    name: "user_role",
    value: userRole==="client"?userRole:"customer",
  });

  // cookies().delete({
  //   name:"authjs.callback-url"
  // });

  cookies().delete({
    name: "authjs.csrf-token",
  });

  cookies().delete({
    name: "authjs.session-token",
  });

  await signOut({ redirectTo: userRole === "client" ? "/company-login" : "/login" });
}

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
  const city = formData.get("city");
  const country = formData.get("country");
  console.log(`Location: ${city}, ${country}`);
  const is_test_required = formData.get("is_test_required") === "true";
  const applied_customers_count = 0; // default to 0
  const status = "active"; // default to active
  //const application_questions = formData.getAll("application_questions");

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
  if (
    //(job_type === "hybrid" || job_type === "on-site") &&
    !city ||
    city.trim() === ""
  ) {
    return { error: "City is required for hybrid and on-site jobs." };
  }
  if (
    //(job_type === "hybrid" || job_type === "on-site") &&
    !country ||
    country.trim() === ""
  ) {
    return { error: "Country is required for hybrid and on-site jobs." };
  }
  if (skills.length === 0 || skills.some((skill) => skill.trim() === "")) {
    return { error: "At least one valid skill is required." };
  }
  // if (
  //   application_questions.length === 0 ||
  //   application_questions.some((q) => q.trim() === "")
  // ) {
  //   return { error: "At least one valid application question is required." };
  // }

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
    //application_questions,
    start_date,
    //job_type === "hybrid" || job_type === "on-site"?
    location: city + "," + country, //:null,
    //...(job_type === "hybrid" || job_type === "on-site" ? { location: `${city}, ${country}` } : {}),
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
  revalidatePath(`/client/${createJobData.client_id}/jobs`);
  revalidatePath("/admin/jobs");
  return { message: "Candidate successfully referred to the client." };

  // redirect("/admin/clients");
}

export async function referCandidateToClientAction(params) {
  const {
    client_id,
    customer_id,
    job_posting_id,
    hourly_rate,
    candidate_hourly_rate,
  } = params;
  if (!client_id) return { error: "Client id is required" };
  if (!customer_id) return { error: "Candidate id is required" };
  if (!job_posting_id) return { error: "Job is required" };
  //if (!hourly_rate) return { error: "Hourly rate is required" };
  if (!hourly_rate || isNaN(hourly_rate) || hourly_rate <= 0) {
    return { error: "Hourly rate is required and must be a valid number." };
  }
  if (parseInt(candidate_hourly_rate) >= parseInt(hourly_rate)) {
    return {
      error:
        "Your hourly rate can not be less than and/or equal to your proposed hourly rate",
    };
  }

  const { error, data } = await referCandidate({
    client_id,
    customer_id,
    job_posting_id,
    hourly_rate,
  });

  if (error) {
    return { error };
  }

  revalidatePath(`/client/${client_id}`);
  revalidatePath(`/client/${client_id}/recommended`);
  revalidatePath("/admin/candidates");
  return { message: "Candidate successfully referred to the client." };
}

export async function updateCandidateProfileAction(formData) {
  console.log("stuff from action");
  const experience = formData.get("experience");
  const commitment = formData.get("commitment");
  const country = formData.get("country");
  const city = formData.get("city");
  const hourly_rate = formData.get("hourly_rate");
  const specialization = formData.get("specialization");
  const candidateId = formData.get("candidateId");

  // Validations
  if (
    !experience ||
    !["beginner", "intermediate", "expert"].includes(experience)
  ) {
    return { error: "Valid experience level is required." };
  }
  if (!commitment || !["full-time", "part-time"].includes(commitment.trim())) {
    return { error: "Valid commitment is required." };
  }
  if (!specialization || !/^[a-zA-Z\s\-]+$/.test(specialization)) {
    return {
      error:
        "Specialization is required and should contain only letters, spaces, or hyphens, e.g., 'Front-end Developer'.",
    };
  }
  if (!country || !/^[a-zA-Z\s\-]+$/.test(country)) {
    return {
      error: "Country is required.",
    };
  }
  if (!city || !/^[a-zA-Z\s\-]+$/.test(city)) {
    return {
      error: "City is required.",
    };
  }
  if (!hourly_rate || isNaN(hourly_rate))
    return {
      error: "Valid hourly rate is required and it should be a number.",
    };
  if (!candidateId) return { error: "Valid candidate id is required." };

  const updateProfileData = {
    experience,
    commitment,
    hourly_rate,
    specialization,
    country,
    city,
  };

  // Api call
  const { message, error } = await candidateUpdateProfile(
    updateProfileData,
    candidateId,
  );
  console.log("error while updating candidate profile: ", error);

  if (error) {
    return { error };
  }

  revalidatePath(`/client/`);
  revalidatePath(`/candidate/${candidateId}`);
  return { message: "Candidate profile successfully updated." };
}

export async function updateClientProfileAction(formData) {
  console.log("stuff from action");
  const clientId = formData.get("clientId");
  const company_name = formData.get("company_name");
  const company_size = formData.get("company size");
  const country = formData.get("country");
  const city = formData.get("city");

  // Validations
  if (!clientId) return { error: "Valid Client id is required." };

  // if (!company_name || !/^[a-zA-Z\s\-]+$/.test(company_name)) {
  //   return { error: "Valid company name is required." };
  // }
  if (
    !company_size ||
    !["1-10", "11-50", "50+"].includes(company_size.trim())
  ) {
    return { error: "Valid company size is required." };
  }
  if (!country || !/^[a-zA-Z\s\-]+$/.test(country)) {
    return {
      error: "Country is required.",
    };
  }
  if (!city || !/^[a-zA-Z\s\-]+$/.test(city)) {
    return {
      error: "City is required.",
    };
  }

  const updateProfileData = {
    company_name,
    company_size,
    country,
    city,
  };

  console.log("update profile data", updateProfileData);

  // Api call
  const { message, error } = await clientUpdateProfile(
    updateProfileData,
    clientId,
  );
  console.log("error while updating candidate profile: ", error);

  if (error) {
    return { error };
  }

  revalidatePath(`/client/`);
  revalidatePath(`/client/${clientId}`);
  return { message: "Client profile successfully updated." };
}
