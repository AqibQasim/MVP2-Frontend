import SvgIconWork from "@/svgs/SvgIconWork";
import { useParams } from "next/navigation";
import Capsule from "./Capsule";
import CapsuleLink from "./CapsuleLink";
import EntityCard from "./EntityCard";
import SkillIconWithBg from "./SkillIconWithBg";
import Table from "./Table";

function ClientJobsOverviewRow({ job }) {
  const params = useParams();
  const clientId = params?.clientId;
  return (
    <Table.Row>
      <EntityCard
        icon={<SvgIconWork className="relative -right-[1.3px]" />}
        entity={{
          name: job?.position,
          profession: job?.profession,
        }}
      />
      <div className="skills flex items-center justify-center gap-1.5 text-center">
        {job.skills.map((skill, i) => (
          <SkillIconWithBg key={i} icon={skill} />
        ))}
      </div>
      <div className="experience text-center">{job?.experience}</div>
      <div className="commit text-center"> {job.commitment} </div>
      <Capsule className="status mx-auto w-max" status={job.status}>
        {job.status}
      </Capsule>
      <CapsuleLink
        className="action ml-auto"
        href={`/client/${clientId}/jobs/${job.job_posting_id}`}
      >
        {" "}
        view details{" "}
      </CapsuleLink>
    </Table.Row>
  );
}

export default ClientJobsOverviewRow;
