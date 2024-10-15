"use client";
import AdminCandidatesClientsHiringTable from "@/components/AdminCandidatesClientsHiringTable";
import { fetchCandidatesJobStatus } from "@/lib/data-service";
import React, { useEffect, useState } from "react";

async function Page() {
  const [candidateJobStatus,setCandidateJobStatus]=useState(null)
  const [dataError,setDataError]= useState(null)
  //let candidateJobStatus = [];

  const fetchStatus=async()=>{
    const { data, error } = await fetchCandidatesJobStatus("hired-and-trial");
    if(error) {
      setDataError(error.message)
    };
    setCandidateJobStatus(data)
  }

  useEffect(()=>{
    fetchStatus();
  },[])

  // try {
  //   if (error) throw new Error(error);
  //   candidateJobStatus = data;
  // } catch (err) {
  //   return <div>Failed to load candidate job status: {err.message}</div>;
  // }

  if(dataError){
    return <div>Failed to load candidate job status: {dataError}</div>
  }

  

  return (
    <AdminCandidatesClientsHiringTable
      candidateJobStatus={candidateJobStatus}
    />
  );
}

export default Page;
