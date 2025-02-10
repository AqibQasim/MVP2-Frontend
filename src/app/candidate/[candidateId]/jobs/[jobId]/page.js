"use client";

import JobViewById from "@/components/JobViewById";
import { getJobs } from "@/lib/data-service";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

function Page() {
  const params = useParams();
  //const candidateId = params.candidateId; // Ensure this is correctly being received
  const jobPostingId = params.jobId; // Ensure this is correctly being received
  console.log(jobPostingId)
  const [fetchedJob, setFetchedJob] = useState(null);

  useEffect(() => {
    async function fetchJobData() {
      try {
        // Fetch job details
        const { data: jobs } = await getJobs();

        // Find the specific job based on jobPostingId
        const job = jobs?.find((j) => j.job_posting_id === jobPostingId);

        if (job) {
          setFetchedJob(job);
        } else {
          console.error("Job not found with the specified jobPostingId");
        }
      } catch (error) {
        console.error("Failed to fetch job data", error);
      }
    }

    if (jobPostingId) {
      fetchJobData();
    } else {
      console.error("Missing candidateId or jobPostingId in params");
    }
  }, [jobPostingId]);

  if (!fetchedJob) {
    return <div className="flex size-full items-center justify-center">
           <div class="loader2"></div>
           </div>;
  }

  return (
    <div>
      <JobViewById user_role={'customer'} job={fetchedJob} />
    </div>
  );
}

export default Page;
