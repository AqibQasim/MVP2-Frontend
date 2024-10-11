import AdminCandidatesClientsHiringTable from "@/components/AdminCandidatesClientsHiringTable";
import { fetchCandidatesJobStatus } from "@/lib/data-service";
import React from "react";

async function Page() {
  let candidateJobStatus = [];
  try {
    const { data, error } = await fetchCandidatesJobStatus("hired-and-trial");
    if (error) throw new Error(error);
    candidateJobStatus = data;
  } catch (err) {
    return <div>Failed to load candidate job status: {err.message}</div>;
  }

  return (
    <AdminCandidatesClientsHiringTable
      candidateJobStatus={candidateJobStatus}
    />
  );
}

export default Page;
