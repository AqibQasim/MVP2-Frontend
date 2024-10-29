
"use client";

import AdminCandidatesClientsHiringTable from "@/components/AdminCandidatesClientsHiringTable";
import EmptyScreen from "@/components/EmptyScreen";
import WithAdminAuth from "@/components/WithAdminAuth";
import { fetchCandidatesJobStatus, getJobs } from "@/lib/data-service";
import React, { useEffect, useState } from "react";
import AdminJobsList from "@/components/AdminJobsList";

async function Page() {
  const [candidateJobStatus, setCandidateJobStatus] = useState(null);
  const [dataError, setDataError] = useState(null);
  const [jobs, setJobs] = useState([]);

  // Fetching candidate job status
  const fetchStatus = async () => {
    const { data, error } = await fetchCandidatesJobStatus("hired-and-trial");
    if (error) {
      setDataError(error.message);
    }
    setCandidateJobStatus(data);
  };

  // Fetching jobs and filtering them
  const fetchJobs = async () => {
    try {
      const { data, error } = await getJobs();
      if (error) throw new Error(error);

      // Filter only 'open' jobs and take the first three
      const openJobs = data?.filter(job => job.job_status === "open").slice(0, 3);
      setJobs(openJobs);
    } catch (err) {
      setDataError(`Failed to load jobs: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchStatus();
    fetchJobs();
  }, []);

  // Error or empty data case
  if (dataError || (candidateJobStatus?.data?.length === 0 && jobs.length === 0)) {
    return <EmptyScreen className={"h-[32.188rem]"} />;
  }

  return (
    <div className='h-fit space-y-3' >
      <AdminJobsList jobs={jobs} />
      <AdminCandidatesClientsHiringTable candidateJobStatus={candidateJobStatus}  />
    </div>
  );
}

export default WithAdminAuth(Page);
