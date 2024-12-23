"use client";
import ClientRecommendedTable from "@/components/ClientRecommendedTable";
import EmptyScreen from "@/components/EmptyScreen";
import { getAllRecommendedCandidates } from "@/lib/data-service";
import { useEffect, useState } from "react";

async function Page({ params }) {
  const clientId = params.clientId;
  console.log("params: ", clientId);
  const [recommendedCandidatesForJobs, setRecommendedCandidatesForJobs] = useState(null)
  const [error,setError] = useState(null);

  const fetchAllRecommendedCandidates = async () => {
    const { data: recCand, err } =
    await getAllRecommendedCandidates(clientId, "all", "referred");
    //if (error) console.log("Error: getting recommeneded Candidates: ", error);
    if (err)
      setError ('Error: getting recommeneded Candidates: ', err);
    else setRecommendedCandidatesForJobs(recCand);
  }

  useEffect(()=>{
    fetchAllRecommendedCandidates();
  },[clientId])

  // const { data: recommendedCandidatesForJobs, error } =
  //   await getAllRecommendedCandidates(clientId, "all", "referred");

  //if (error) console.log("Error: getting recommeneded Candidates: ", error);
  if (error)
    return (
      <>
        <h1>Error: getting recommeneded Candidates</h1> <p> {error} </p>
      </>
    );

  if(recommendedCandidatesForJobs && recommendedCandidatesForJobs?.length===0){
      return <EmptyScreen className={'h-full'}/>
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
