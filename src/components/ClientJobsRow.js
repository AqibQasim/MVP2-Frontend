import SvgIconWork from "@/svgs/SvgIconWork";
import EntityCard from "./EntityCard";
import Skill from "./Skill";
import Table from "./Table";

function ClientJobsRow({ job }) {
  console.log(job);
  return (
    <Table.Row>
      <EntityCard
        icon={<SvgIconWork className="relative -right-[1.3px]" />}
        entity={{
          name: job?.role,
          profession: job?.profession,
        }}
      />
      <div className="skills flex items-center justify-center gap-1.5 text-center">
        {job.skills.map((skill, i) => (
          <Skill key={i} skill={skill} />
        ))}
      </div>
      <div className="experience text-center">{job.experience}</div>
      <div className="status text-center"> {job.status} </div>
    </Table.Row>
  );
}

export default ClientJobsRow;
