"use client";

import JobViewById from "@/components/JobViewById";
import { getCandidateById, getJobs } from "@/lib/data-service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const params = useParams();
  //const candidateId = params.candidateId; // Ensure this is correctly being received
  const jobPostingId = params.jobId; // Ensure this is correctly being received
  const customer_id = params.candidateId;
  console.log(jobPostingId);
  const [fetchedJob, setFetchedJob] = useState(null);
  const [candidate, setCandidate] = useState(null);

  console.log("CANDIDATE HERE?", candidate?.city);

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

  useEffect(() => {
    if (!customer_id || candidate?.customer_id) return;

    async function fetchCandidate() {
      try {
        const { data: candidate } = await getCandidateById(customer_id);

        console.log("candidate??", candidate);

        if (candidate) {
          setCandidate(candidate);
        } else {
          console.error("Candidate not found");
        }
      } catch (error) {
        console.error("Failed to fetch candidate data", error);
      }
    }
    fetchCandidate();
  }, []);

  if (!fetchedJob) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <JobViewById
        candidateCity={candidate?.city}
        user_role={"customer"}
        job={fetchedJob}
      />
    </div>
  );
}

export default Page;
