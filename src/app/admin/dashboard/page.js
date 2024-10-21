"use client";

import AdminCandidatesClientsHiringTable from "@/components/AdminCandidatesClientsHiringTable";
import EmptyScreen from "@/components/EmptyScreen";
import WithAdminAuth from "@/components/withAdminAuth";
import { fetchCandidatesJobStatus } from "@/lib/data-service";
import React, { useEffect, useState } from "react";

async function Page() {
  const [candidateJobStatus, setCandidateJobStatus] = useState(null);
  const [dataError, setDataError] = useState(null);
  //let candidateJobStatus = [];

  const fetchStatus = async () => {
    const { data, error } = await fetchCandidatesJobStatus("hired-and-trial");
    if (error) {
      setDataError(error.message);
    }
    setCandidateJobStatus(data);
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  if (dataError || candidateJobStatus?.data?.length === 0) {
    return <EmptyScreen className={"h-[32.188rem]"} />;
  }

  return (
    <AdminCandidatesClientsHiringTable
      candidateJobStatus={candidateJobStatus}
    />
  );
}

export default WithAdminAuth(Page);
