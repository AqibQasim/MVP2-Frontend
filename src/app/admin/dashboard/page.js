
"use client";

import AdminCandidatesClientsHiringTable from "@/components/AdminCandidatesClientsHiringTable";
import EmptyScreen from "@/components/EmptyScreen";
import WithAdminAuth from "@/components/WithAdminAuth";
import { fetchCandidatesJobStatus, getJobs,  getClients, fetchRecommendedCandidates } from "@/lib/data-service";
import React, { useEffect, useState } from "react";
import AdminJobsList from "@/components/AdminJobsList";
import AdminClientsTable from "@/components/AdminClientsTable";
import AdminCandidatesTable from "@/components/AdminCandidatesTable";


async function Page() {
  const [candidateJobStatus, setCandidateJobStatus] = useState(null);
  const [dataError, setDataError] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [clients, setClients] = useState([]);
  const [candidates, setCandidates] = useState([]);

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
  const fetchClients = async () => {
    try {
      const { data, error } = await  getClients ();
      if (error) throw new Error(error);

      // Filter only 'open' jobs and take the first three
      const showClients = data?.slice(0, 3);
      setClients(showClients);
    } catch (err) {
      setDataError(`Failed to load jobs: ${err.message}`);
    }
  };
  
  const fetchCandidates = async () => {
    try {
      const { data, error } = await fetchRecommendedCandidates();
      if (error) throw new Error(error);
      const showCandidates = data?.slice(0, 3); // Ensure this is the intended logic
      setCandidates(showCandidates);
    } catch (err) {
      setDataError(`Failed to load candidates: ${err.message}`);
    }
  };


  useEffect(() => {
    fetchStatus();
    fetchJobs();
    fetchClients();
    fetchCandidates();
  }, []);

  // Error or empty data case
  // if (dataError || (candidateJobStatus?.data?.length === 0 && jobs.length === 0 && clients.length === 0)) {
  //   return <EmptyScreen className={"h-[32.188rem]"} />;
  // }

  return (
    <div className='h-fit space-y-3' >
      <AdminJobsList jobs={jobs} />
      <AdminClientsTable clients={clients} />
      <AdminCandidatesTable candidates={candidates} />
      <AdminCandidatesClientsHiringTable candidateJobStatus={candidateJobStatus}  />
    
    </div>
  );
}

export default WithAdminAuth(Page);
