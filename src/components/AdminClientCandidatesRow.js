import { referCandidateToClientAction } from "@/lib/actions";
import { fetchClientJobs, getClients } from "@/lib/data-service";
import SvgIconRequestInterview from "@/svgs/SvgIconRequestInterview";
import { useCallback, useEffect, useState } from "react";
import Modal from "./AdminJobsFormModal";
import Capsule from "./Capsule";
import EntityCard from "./EntityCard";
import IconWithBg from "./IconWithBg";
import SkillIconWithBg from "./SkillIconWithBg";
import Table from "./Table";
import CapsuleLink from "./CapsuleLink";

function AdminClientCandidatesRow({ candidate, score, onClick, jobName }) {
  return (
    <>
      <Table.Row>
        <div onClick={onClick} className="cursor-pointer text-start">
          <EntityCard
            entity={{
              name: candidate?.name,
              profession: candidate?.specialization,
              image: "/avatars/avatar-1.png",
            }}
          />
        </div>
        <div className="experience flex justify-center text-center">
          {jobName}
        </div>

        <div
         className= "flex-col  skills flex items-center justify-center gap-1 text-center">
            {candidate?.expertise?.length > 1 ? (
              <>
             <SkillIconWithBg icon={candidate.expertise[0].skill} skill={candidate.expertise[0].skill} />
             <div className="text-sm text-gray-500">
              +{candidate.expertise.length - 1}
              </div>
              </>
            )
          : (
          <span> <SkillIconWithBg icon={candidate.expertise[0].skill} skill={candidate.expertise[0].skill}/></span>
        )}
       </div>
       

        {/* <div className="experience flex justify-center text-center">
          {candidate?.hourly_rate || 0}
        </div> */}

        {/* <div className="experience text-center">
          {candidate?.experience || "No experience"}
        </div>
        <Capsule>{candidate?.commitment || "No job type"}</Capsule> */}

        {/* <div className="experience text-center">{score}/10</div> */}

        <Capsule
          className="status mx-auto w-max"
          status={candidate?.talent_status}
        >
          {candidate?.talent_status}
        </Capsule>

        <CapsuleLink
          className="ml-auto"
          href={`/admin/candidates/${candidate?.customer_id}`}
          // href={window.location.href + `/${candidate?.customer_id}`}
        >
          {" "}
          view talent{" "}
        </CapsuleLink>
      </Table.Row>

      
    </>
  );
}

export default AdminClientCandidatesRow;
