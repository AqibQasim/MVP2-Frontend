import SvgIconJobStatus from "@/svgs/SvgIconJobStatus";
import SvgIconWork from "@/svgs/SvgIconWork";
import Capsule from "./Capsule";
import EntityCard from "./EntityCard";
import IconWithBg from "./IconWithBg";
import Skill from "./Skill";
import Table from "./Table";
import CapsuleLink from "./CapsuleLink";
import { useParams } from "next/navigation";

function AdminJobsRow({ job }) {
  console.log("job ka data", job);

  return (
    <Table.Row>
      {job?.client && (
        <div className="w-max text-center">{job?.client?.name}</div>
      )}
      <EntityCard
        icon={<SvgIconWork className="relative -right-[1.3px]" />}
        entity={{
          name: job?.position,
          profession: job?.specialization,
        }}
      />
      <div className="skills flex items-center justify-center gap-1.5 text-center">
        {job?.skills?.length > 1 ? (
          <>
            <Skill skill={job.skills[0]} />
            <div className="text-sm text-gray-500">
              +{job.skills.length - 1}
            </div>
          </>
        ) : (
          <Skill skill={job.skills[0]} />
        )}
      </div>

      <div className="experience text-center">{job?.experience}</div>
      <div className="commitment text-center">{job?.commitment}</div>
      <Capsule
        className="!mx-auto mr-auto w-max !bg-primary-tint-100"
        icon={<IconWithBg job={job?.job_status} className="pl-4" />}
      ></Capsule>

      <CapsuleLink
        className="ml-auto"
        href={`/admin/jobs/${job?.job_posting_id}?client_id=${job?.client_id}`}
      >
        {" "}
        view details{" "}
      </CapsuleLink>
      {/* <Capsule
        className="mx-auto w-max !bg-primary-tint-100"
        icon={<IconWithBg icon={<SvgIconJobStatus status="hired" />} />}
      >
        view talent
      </Capsule> */}
    </Table.Row>
  );
}

export default AdminJobsRow;
