"use client";

import AdminCandidatesClientsHiringTable from "@/components/AdminCandidatesClientsHiringTable";
import EmptyScreen from "@/components/EmptyScreen";
import WithAdminAuth from "@/components/WithAdminAuth";
import {
  fetchCandidatesJobStatus,
  getJobs,
  getClients,
  fetchRecommendedCandidates,
} from "@/lib/data-service";
import React, { useEffect, useMemo, useState } from "react";
import AdminJobsList from "@/components/AdminJobsList";
import AdminClientsTable from "@/components/AdminClientsTable";
import AdminCandidatesTable from "@/components/AdminCandidatesTable";
import ReportOverlay from "@/components/ReportOverlay";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import AdminStates from "@/components/AdminStates";

async function Page() {
  const [candidateJobStatus, setCandidateJobStatus] = useState(null);
  const [dataError, setDataError] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [clients, setClients] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [isReportOverlayOpened, setIsReportOverlayOpened] = useState(false);
  const [selected_candidate_id, setSelectedCandidateId] = useState(null);
  const [candidateReport, setCandidateReport] = useState(null);
  const [candidateLength, setCandidateLength] = useState(null);
  const [clientLength, setClientLength] = useState(null);
  const [jobsLength, setJobsLength] = useState(null);
  const [clientCandidateHiringLength, setClientCandidateHiringLength] =
    useState(null);

  const handleCloseOverlay = () => {
    setIsReportOverlayOpened(false);
    //setSuccessAcknowledge(false);
  };

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
      setJobsLength(data?.length);
      const openJobs = data
        ?.filter((job) => job.job_status === "open")
        .slice(0, 3);
      setJobs(openJobs);
    } catch (err) {
      setDataError(`Failed to load jobs: ${err.message}`);
    }
  };
  const fetchClients = async () => {
    try {
      const { data, error } = await getClients();
      if (error) throw new Error(error);

      setClientLength(data?.length);
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
      if (error) {
        console.error("API error:", error); // Check if the error originates here
        throw new Error(error);
      }
      setCandidateLength(data?.data?.length);
      console.log("Data from API:", data);
      const showCandidates = data?.data?.slice(0, 3);
      console.log("Filtered candidates:", showCandidates);
      setCandidates(showCandidates);
    } catch (err) {
      console.error("Failed to load candidates:", err);
      setDataError(`Failed to load candidates: ${err.message}`);
    }
  };

  const getCandidateResult = () => {
    const payload = {
      endpoint: `get-customer-result?customer_id=${selected_candidate_id}`,
      method: "GET",
    };
    mvp2ApiHelper(payload).then((result) => {
      if (result) setCandidateReport(result?.data?.data);
    });
  };

  useEffect(() => {
    getCandidateResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected_candidate_id]);

  useEffect(() => {
    async function loadData() {
      await fetchStatus();
      await fetchJobs();
      await fetchClients();
      await fetchCandidates();
    }
    loadData();
  }, []);

  console.log(candidates);

  // Error or empty data case
  // if (dataError || (candidateJobStatus?.data?.length === 0 && jobs.length === 0 && clients.length === 0)) {
  //   return <EmptyScreen className={"h-[32.188rem]"} />;
  // }

  return (
    <div className="h-fit space-y-3">
      <AdminStates />
      <AdminJobsList jobs={jobs} totalJobs={jobsLength} />
      <AdminClientsTable clients={clients} totalClients={clientLength} />
      <div className="overflow-y-hidden">
        <AdminCandidatesTable
          totalCandidates={candidateLength}
          isReportOverlayOpened={isReportOverlayOpened}
          setIsReportOverlayOpened={setIsReportOverlayOpened}
          setSelectedCandidateId={setSelectedCandidateId}
          onClick={() => {
            setIsReportOverlayOpened(true);
          }}
          candidates={candidates?.filter(
            (c) => c?.customer?.talent_status === "open",
          )}
        />

        {isReportOverlayOpened && (
          <ReportOverlay
            reportOverlay={isReportOverlayOpened}
            onClose={handleCloseOverlay}
            selectedCandidate={candidateReport}
          />
        )}
      </div>
      <AdminCandidatesClientsHiringTable
        totalHirings={clientCandidateHiringLength}
        candidateJobStatus={candidateJobStatus}
      />
    </div>
  );
}

export default WithAdminAuth(Page);
