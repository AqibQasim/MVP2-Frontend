"use client";
import ClientJobsRow from "./ClientJobsOverviewRow";
import DashboardSection from "./DashboardSection";
import Table from "./Table";

const jobs = [
  {
    role: "some role",
    profession: "some profession",
    skills: ["react", "python", "javascript"],
    experience: "expert",
    status: "fulfilled",
  },
  {
    role: "some role",
    profession: "some profession",
    skills: ["react", "python", "javascript"],
    experience: "expert",
    status: "open",
  },
  {
    role: "some role",
    profession: "some profession",
    skills: ["react", "python", "javascript"],
    experience: "expert",
    status: "fulfilled",
  },
];

function ClientJobsOverviewTable() {
  return (
    <DashboardSection paragraph="These are all" heading="Your job">
      <Table columns="grid-cols-[1fr_1.7fr_0.4fr_0.4fr]">
        <Table.Header>
          <div className="name">Info</div>
          <div className="email text-center">Skills</div>
          <div className="experience text-center">Experience</div>
          <div className="status text-center">Status</div>
        </Table.Header>
        <Table.Body
          data={jobs}
          render={(job, i) => <ClientJobsRow job={job} key={i} />}
        />
      </Table>
    </DashboardSection>
  );
}

export default ClientJobsOverviewTable;
