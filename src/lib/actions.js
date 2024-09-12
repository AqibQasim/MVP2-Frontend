"use server";

// Server Actions
export async function createAJobAction(formData) {
  // For testing
  await new Promise((res) => setTimeout(res, 5000));
  const clientId = formData.get("clientId");
  const jobTitle = formData.get("jobTitle");
  const description = formData.get("description");
  const experience = formData.get("experience");
  const commitment = formData.get("commitment");
  const estLength = formData.get("estLength");
  const jobType = formData.get("jobType");
  const desiredStartDate = formData.get("startDate");
  const workdayOverlap = formData.get("workdayOverlap");
  const skills = formData.getAll("skills");
  console.log("Client ID is correct?: ", clientId);

  if (!clientId || clientId.trim() === "") {
    throw new Error("Client Id is required.");
  }

  if (!jobTitle || jobTitle.trim() === "") {
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

  if (!commitment || !["full time", "part time"].includes(commitment)) {
    throw new Error("Valid commitment is required.");
  }

  if (!estLength || isNaN(estLength) || estLength <= 0) {
    throw new Error("Estimated length must be a valid number.");
  }

  if (!jobType || !["remote", "on site", "hybrid"].includes(jobType)) {
    throw new Error("Valid job type is required.");
  }

  if (!desiredStartDate || isNaN(new Date(desiredStartDate))) {
    throw new Error("A valid desired start date is required.");
  }

  if (!workdayOverlap || isNaN(workdayOverlap) || workdayOverlap <= 0) {
    throw new Error("Workday overlap must be a valid number.");
  }

  if (skills.length === 0 || skills.some((skill) => skill.trim() === "")) {
    throw new Error("At least one valid skill is required.");
  }

  console.log("Job Data", {
    clientId,
    jobTitle,
    description,
    experience,
    commitment,
    estLength,
    jobType,
    desiredStartDate,
    workdayOverlap,
    skills,
  });

  //   api call here
  //
}
