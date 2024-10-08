"use client";
import CandidateJobsRow from "./CandidateJobsRow";
import DashboardSection from "./DashboardSection";
import Table from "./Table";

const jobs = [
  {
    role: "Front-End Developer",
    profession: "some profession",
    skills: ["react", "python", "javascript"],
    experience: "expert",
    commit: "full time",
    status: "fulfilled",
  },
  {
    role: "Front-End Developer",
    profession: "some profession",
    skills: ["react", "python", "javascript"],
    experience: "expert",
    commit: "full time",
    status: "open",
  },
  {
    role: "Front-End Developer",
    profession: "some profession",
    skills: ["react", "python", "javascript"],
    experience: "expert",
    commit: "full time",
    status: "hired",
  },
  {
    role: "Front-End Developer",
    profession: "some profession",
    skills: ["react", "python", "javascript"],
    experience: "expert",
    commit: "full time",
    status: "fulfilled",
  },
  {
    role: "Front-End Developer",
    profession: "some profession",
    skills: ["react", "python", "javascript"],
    experience: "expert",
    commit: "full time",
    status: "open",
  },
  {
    role: "Front-End Developer",
    profession: "some profession",
    skills: ["react", "python", "javascript"],
    experience: "expert",
    commit: "full time",
    status: "hired",
  },
];

function CandidateJobsTable() {
  return (
    <DashboardSection
      className="!min-h-full overflow-auto"
      paragraph="These are all"
      heading="Your jobs"
    >
      <Table columns="grid-cols-[1fr_1.7fr_6rem_5rem_7.1rem_8.1rem]  "     >
        <Table.Header>
          <div className="name">Info</div>
          <div className="email text-center">Skills</div>
          <div className="experience text-center">Experience</div>
          <div className="commit text-center">Commit</div>
          <div className="status text-center">Status</div>
          <div className="action text-center">Action</div>
        </Table.Header>
        <Table.Body
          data={jobs}
          render={(job, i) => <CandidateJobsRow job={job} key={i}    />}
        />
      </Table>
    </DashboardSection>
  );
}

export default CandidateJobsTable;
