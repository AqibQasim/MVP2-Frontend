import SvgIconJobStatus from "@/svgs/SvgIconJobStatus";
import SvgIconWork from "@/svgs/SvgIconWork";
import Capsule from "./Capsule";
import EntityCard from "./EntityCard";
import IconWithBg from "./IconWithBg";
import Skill from "./Skill";
import Table from "./Table";

function CandidateJobsRow({ job }) {
  console.log(job);
  return (
    <Table.Row>
      <EntityCard
        icon={<SvgIconWork className="relative -right-[1.3px]" />}
        entity={
          {
            name: job?.job?.position,
            profession: job?.job?.specialization,
          }
        }
      />
      <div className="skills flex items-center justify-center gap-1.5 text-center">
        {job?.job?.skills.map((skill, i) => (
          <>
          <Skill key={i} skill={skill} />
            {skill}
          </>
        ))}
      </div>
      <div className="experience text-center">{job?.job?.experience}</div>
      <div className="commitment text-center">{job?.job?.commitment}</div>
      <Capsule
        className="mr-auto w-max !bg-primary-tint-100"
        icon={<IconWithBg icon={<SvgIconJobStatus status={job?.job?.job_status} />} />}
      >
        {" "}
        {job.status}{" "}
      </Capsule>
      <Capsule
        className="mx-auto w-max !bg-primary-tint-100"
        icon={<IconWithBg icon={<SvgIconJobStatus status="hired" />} />}
      >
        view talent
      </Capsule>
    </Table.Row>
  );
}

export default CandidateJobsRow;
