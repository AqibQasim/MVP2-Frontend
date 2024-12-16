"use client";
import CandidateSettings from "@/components/CandidateSettings";
import { getCandidateById } from "@/lib/data-service";
import { useCallback, useEffect, useMemo, useState } from "react";

function Page({ params }) {
  const candidateId = params.candidateId;
  const [fetchedCandidate, setfetchedCandidate] = useState(null);

  // Fetch client data with useCallback and clientId as dependency
  const fetchCandidate = useCallback(async () => {
    const CandidateData = await getCandidateById(candidateId);
    setfetchedCandidate(CandidateData);
  }, []);

  // Fetch data when component mounts or when clientId changes
  useEffect(() => {
    fetchCandidate();
  }, [fetchCandidate]);

  // Memoize fetchedCandidate to prevent unnecessary re-renders of ClientSettings
  const memoizedCandidate = useMemo(() => fetchedCandidate, [fetchedCandidate]);

  console.log("fetched candidate...............", memoizedCandidate);


  return (
    <>
      <CandidateSettings candidate={memoizedCandidate} />
    </>
  );
}

export default Page;
