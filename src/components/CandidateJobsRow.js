import Link from "next/link";
import SvgIconJobStatus from "@/svgs/SvgIconJobStatus";
import SvgIconWork from "@/svgs/SvgIconWork";
import Capsule from "./Capsule";
import EntityCard from "./EntityCard";
import IconWithBg from "./IconWithBg";
import Skill from "./Skill";
import Table from "./Table";
import { useParams } from "next/navigation";

function CandidateJobsRow({ job }) {
  const params = useParams();
  const candidateId = params?.candidateId;

  // Log job data for debugging
  console.log("Job data received in CandidateJobsRow:", job);

  // Early return if job or job properties are missing
  if (!job || !job.job || !job.job.job_posting_id) {
    console.warn("Job or job_posting_id is undefined");
    return null;
  }

  return (
    <Table.Row>
      <EntityCard
        icon={<SvgIconWork className="relative -right-[1.3px]" />}
        entity={{
          name: job.job.position,
          profession: job.job.specialization,
        }}
      />
      <div className="skills flex items-center justify-center gap-1.5 text-center">
        {job.job.skills?.map((skill) => (
          <Skill key={skill.id || skill.name} skill={skill} />
        ))}
      </div>
      <div className="experience text-center">{job.job.experience}</div>
      <div className="commitment text-center">{job.job.commitment}</div>
      <Capsule
        className="mr-auto w-max !bg-primary-tint-100"
        icon={<IconWithBg job={job.job_status} />}
      >
        {job.job.job_status}
      </Capsule>
      <Link href={`/candidate/${candidateId}/jobs/${job.job.job_posting_id}`}>
        <Capsule
          className="mx-auto w-max cursor-pointer !bg-primary-tint-100"
          icon={<IconWithBg icon={<SvgIconJobStatus status="hired" />} />}
        >
          View Details
        </Capsule>
      </Link>
    </Table.Row>
  );
}

export default CandidateJobsRow;
