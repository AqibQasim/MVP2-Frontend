import SvgIconWork from "@/svgs/SvgIconWork";
import { useParams } from "next/navigation";
import Capsule from "./Capsule";
import CapsuleLink from "./CapsuleLink";
import EntityCard from "./EntityCard";
import SkillIconWithBg from "./SkillIconWithBg";
import Table from "./Table";

function ClientJobsRow({ job }) {
  console.log(job)
  const params = useParams();
  const clientId = params?.clientId;
  return (
    <Table.Row>
      <EntityCard
        icon={<SvgIconWork className="relative -right-[1.3px]" />}
        entity={{
          name: job?.position,
          profession: job?.specialization || 'No specialization'
        }}
      />
      <div className="skills flex items-center justify-center gap-1.5 text-center">
        {job.skills.map((skill, i) => (
          <SkillIconWithBg key={i} icon={skill} />
        ))}
      </div>
      <div className="experience text-center">{job.experience}</div>
      <div className="commitment text-center">{job.commitment}</div>
      <Capsule
        status={job.status.toLowerCase()}
        className="!mx-auto mr-auto w-max"
      >
        <p>{job.status}</p>
      </Capsule>
      {/* <Capsule
        className="mx-auto w-max !bg-primary-tint-100"
        icon={<IconWithBg icon={<SvgIconJobStatus status="hired" />} />}
      >
        view talent
      </Capsule> */}
      {/* <CapsuleLink className="ml-auto" href={`${job.id}`}> */}
      <CapsuleLink
        className="ml-auto"
        href={`/client/${clientId}/jobs/${job.job_posting_id}`}
      >
        {" "}
        view details{" "}
      </CapsuleLink>
    </Table.Row>
  );
}

export default ClientJobsRow;
