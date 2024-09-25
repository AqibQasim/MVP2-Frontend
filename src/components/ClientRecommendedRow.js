import SvgIconJobStatus from "@/svgs/SvgIconJobStatus";
import Capsule from "./Capsule";
import EntityCard from "./EntityCard";
import IconWithBg from "./IconWithBg";
import SkillIconWithBg from "./SkillIconWithBg";
import Table from "./Table";
import SvgIconRequestInterview from "@/svgs/SvgIconRequestInterview";

function ClientRecommendedRow({ recommended }) {
  console.log(recommended);
  const { customer: candidate, job_postings: job } = recommended;

  return (
    <Table.Row>
      <EntityCard
        entity={{
          name: candidate?.name,
          profession: candidate?.specialization,
          image: "/avatars/avatar-1.png",
        }}
      />
      <div className="skills flex items-center justify-center gap-1.5 text-center">
        {job.skills.map((skill, i) => (
          <SkillIconWithBg key={i} icon={skill} />
        ))}
      </div>
      <div className="job-title text-center">{job.position}</div>
      <div className="experience text-center">{candidate.experience}</div>
      <Capsule>{candidate.commitment}</Capsule>
      <Capsule
        className="ml-auto !bg-primary-tint-100"
        icon={<IconWithBg icon={<SvgIconRequestInterview />} />}
      >
        Request `Interview
      </Capsule>
    </Table.Row>
  );
}

export default ClientRecommendedRow;
