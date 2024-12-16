"use client";
import CandidateIdPage from "@/components/CandidateIdPage";
import CandidateProfileInfo from "@/components/CandidateProfileInfo";
import { getCandidateById, getCandidates } from "@/lib/data-service";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

async function Page({ params }) {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("MVP_CLIENT_LOGGEDIN") === "true";

    if (!isLoggedIn && router.pathname !== "/login") {
      router.replace("/login");
    }
  }, [router]);
  //const candidates = await getCandidates();
  const candidate = await getCandidateById(params.candidateId);
  //console.log("Candidates on Page", candidates);

  console.log("candidates are :", candidate);

  return (
    <>
      <CandidateIdPage candidate={candidate} candidateId={params.candidateId} />
    </>
  );
}

export default Page;