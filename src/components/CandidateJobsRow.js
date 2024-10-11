import SvgIconJobStatus from "@/svgs/SvgIconJobStatus";
import SvgIconWork from "@/svgs/SvgIconWork";
import Capsule from "./Capsule";
import EntityCard from "./EntityCard";
import IconWithBg from "./IconWithBg";
import Skill from "./Skill";
import Table from "./Table";

function CandidateJobsRow({ job }) {
  console.log("job ka data", job);
  return (
    <Table.Row>
      <EntityCard
        icon={<SvgIconWork className="relative -right-[1.3px]" />}
        entity={{
          name: job?.position,
          profession: job?.job?.specialization,
        }}
      />
      <div className="skills flex items-center justify-center gap-1.5 text-center">
        {job?.skills.map((skill, i) => (
          <>
            <Skill key={i} skill={skill} />
          </>
        ))}
      </div>
      <div className="experience text-center">{job?.experience}</div>
      <div className="commitment text-center">{job?.commitment}</div>
      <Capsule
        className="mr-auto w-max !bg-primary-tint-100"
        icon={
          <IconWithBg
            job={job?.job_status}
          />
        }
      >
        {" "}
        {job?.job?.job_status}{" "}
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
