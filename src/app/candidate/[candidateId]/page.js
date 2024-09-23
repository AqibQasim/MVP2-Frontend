"use client";
import CandidateEvaluateYourselfCard from "@/components/CandidateEvaluateYourselfCard";
import CandidatePage from "@/components/CandidatePage";
import { getDummyClientById, getDummyClients } from "@/lib/tempData";

// export async function generateMetadata({ params }) {
//   const {
//     company: { name },
//   } = await getDummyClientById(params.candidateId);
//   return { title: `Company ${name}` };
// }

// export async function generateStaticParams() {
//   const candidates = await getDummyClients();
//   const ids = candidates.map((candidate) => ({ cabinId: String(candidate.id) }));
//   return ids;
// }

export default async function Page({ params }) {
  return (
    <>
    <CandidateEvaluateYourselfCard/>
      {/* <CandidatePage params={params} /> */}
    </>
  );
}
