import SvgIconJobStatus from "@/svgs/SvgIconJobStatus";
import Capsule from "./Capsule";
import EntityCard from "./EntityCard";
import IconWithBg from "./IconWithBg";
import SkillIconWithBg from "./SkillIconWithBg";
import Table from "./Table";
import SvgIconRequestInterview from "@/svgs/SvgIconRequestInterview";

function ClientRecommendedRow({ recommended }) {
  console.log(recommended);
  return (
    <Table.Row>
      <EntityCard
        entity={{
          name: recommended?.role,
          profession: recommended?.profession,
          image: "/avatars/avatar-1.png",
        }}
      />
      <div className="skills flex items-center justify-center gap-1.5 text-center">
        {recommended.skills.map((skill, i) => (
          <SkillIconWithBg key={i} icon={skill} />
        ))}
      </div>
      <div className="job-title text-center">{recommended.jobTitle}</div>
      <div className="experience text-center">{recommended.experience}</div>
      <Capsule>{recommended.jobType}</Capsule>
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
