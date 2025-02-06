"use client";
import ClientRecommendedTable from "@/components/ClientRecommendedTable";
import EmptyScreen from "@/components/EmptyScreen";
import { getAllRecommendedCandidates } from "@/lib/data-service";
import { useEffect, useState } from "react";

function Page({ params }) {
  const clientId = params.clientId;
  console.log("params: ", clientId);

  const [recommendedCandidatesForJobs, setRecommendedCandidatesForJobs] =
    useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllRecommendedCandidates = async () => {
      try {
        const { data: recCand, err } = await getAllRecommendedCandidates(
          clientId,
          "all",
          "referred",
        );

        if (err) {
          setError("Error: getting recommended Candidates: ", err);
        } else {
          setRecommendedCandidatesForJobs(recCand);
        }
      } catch (error) {
        console.error(
          "Unexpected error fetching recommended candidates:",
          error,
        );
        setError("Unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllRecommendedCandidates();
  }, [clientId]);

  if (isLoading)
    return (
      <div className="flex size-full items-center justify-center">
        <div className="loader2"></div>
      </div>
    );

  if (error)
    return (
      <>
        <h1>Error: getting recommended Candidates</h1> <p> {error} </p>
      </>
    );

  if (recommendedCandidatesForJobs?.length === 0) {
    return <EmptyScreen className={"h-full"} />;
  }

  return (
    <>
      <ClientRecommendedTable
        recommendedCandidates={recommendedCandidatesForJobs}
      />
    </>
  );
}

export default Page;
