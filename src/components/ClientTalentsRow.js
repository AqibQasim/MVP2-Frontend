import { formatDate } from "@/utils/utility";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import Capsule from "./Capsule";
import EntityCard from "./EntityCard";
import SkillIconWithBg from "./SkillIconWithBg";
import Table from "./Table";
import CapsuleLink from "./CapsuleLink";

function ClientTalentsRow({ talent }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { client_id, job_posting_id } = talent;
  const { customer: candidate, job_postings: job } = talent;
 


  const handleRowClick = () => {
    router.push(`/client/${client_id}/talents/${candidate.customer_id}?job_posting_id=${job_posting_id}`);
  };

  // console.log("SearchParams", searchParams);

  return (
    // <Table.Row onClick={handleRowClick}>
    <div
        className ="cursor-pointer"
    >
    <Table.Row
    onClick={handleRowClick}
    >
      <EntityCard
        entity={{
          name: candidate?.name,
          profession: candidate?.specialization,
          image: "/avatars/avatar-1.png",
        }}
      />



<div className="skills flex  items-center justify-center gap-1.5 text-center">
         {job.skills.length > 1 ? (
         <div className="flex " >
         <SkillIconWithBg icon={job.skills[0]} skill={job.skills[0]} />
         <div className="text-sm text-gray-500 mt-2">
          +{job.skills.length - 1}  
         </div>
         </div>
         ) : (
      
        <SkillIconWithBg icon={job.skills[0]} skill={job.skills[0]} />
         )}
        </div>

     
      <div className="job-title text-center">{job.position}</div>
      <div className="experience text-center">{candidate.experience}</div>
      <Capsule>{candidate.commitment}</Capsule>
      <div className="date-hired text-nowrap text-center">
        {formatDate(talent?.updatedAt)}
      </div>
      {/* <CapsuleLink className="ml-auto" href={`${talent.id}`}> */}
      {/* <CapsuleLink
        className="ml-auto"
        href={`/client/${client_id}/talents/${candidate.customer_id}?job_posting_id=${job_posting_id}`}
      >
        {" "}
        view talent{" "}
      </CapsuleLink> */}
    </Table.Row>
    </div>
  );
}

export default ClientTalentsRow;
