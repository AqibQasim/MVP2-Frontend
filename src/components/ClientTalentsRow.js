import { formatDate } from "@/utils/utility";
import Capsule from "./Capsule";
import CapsuleLink from "./CapsuleLink";
import EntityCard from "./EntityCard";
import SkillIconWithBg from "./SkillIconWithBg";
import Table from "./Table";

function ClientTalentsRow({ talent }) {
  console.log(talent);
  return (
    <Table.Row>
      <EntityCard
        entity={{
          name: talent?.role,
          profession: talent?.profession,
          image: "/avatars/avatar-1.png",
        }}
      />
      <div className="skills flex items-center justify-center gap-1.5 text-center">
        {talent.skills.map((skill, i) => (
          <SkillIconWithBg key={i} icon={skill} />
        ))}
      </div>
      <div className="job-title text-center">{talent.jobTitle}</div>
      <div className="experience text-center">{talent.experience}</div>
      <Capsule>{talent.jobType}</Capsule>
      <div className="date-hired text-nowrap text-center">
        {formatDate(new Date("2024-09-20"))}
      </div>
      <CapsuleLink className="ml-auto" href="/client/talents">
        {" "}
        view talent{" "}
      </CapsuleLink>
    </Table.Row>
  );
}

export default ClientTalentsRow;
