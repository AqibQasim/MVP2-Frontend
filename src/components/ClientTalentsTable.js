"use client";
import { useParams } from "next/navigation";
import ClientTalentsRow from "./ClientTalentsRow";
import DashboardSection from "./DashboardSection";
import Table from "./Table";

const talents = [
  {
    id: 1,
    role: "Front-End Developer",
    profession: "some profession",
    skills: ["javascript", "react", "python"],
    jobTitle: "Front-end developer",
    experience: "Intermediate",
    jobType: "full time",
    dateHired: "20-Sep-2024",
  },
  {
    id: 2,
    role: "Front-End Developer",
    profession: "some profession",
    skills: ["javascript", "react", "python"],
    jobTitle: "Front-end developer",
    experience: "Intermediate",
    jobType: "full time",
    dateHired: "20-Sep-2024",
  },
  {
    id: 3,
    role: "Front-End Developer",
    profession: "some profession",
    skills: ["javascript", "react", "python"],
    jobTitle: "Front-end developer",
    experience: "Intermediate",
    jobType: "full time",
    dateHired: "20-Sep-2024",
  },
  {
    id: 4,
    role: "Front-End Developer",
    profession: "some profession",
    skills: ["javascript", "react", "python"],
    jobTitle: "Front-end developer",
    experience: "Intermediate",
    jobType: "full time",
    dateHired: "20-Sep-2024",
  },
  {
    id: 5,
    role: "Front-End Developer",
    profession: "some profession",
    skills: ["javascript", "react", "python"],
    jobTitle: "Front-end developer",
    experience: "Intermediate",
    jobType: "full time",
    dateHired: "20-Sep-2024",
  },
  {
    id: 6,
    role: "Front-End Developer",
    profession: "some profession",
    skills: ["javascript", "react", "python"],
    jobTitle: "Front-end developer",
    experience: "Intermediate",
    jobType: "full time",
    dateHired: "20-Sep-2024",
  },
];

function ClientTalentsTable() {
  const params = useParams();
  const clientId = params?.clientId;

  return (
    <DashboardSection
      className="!min-h-full"
      paragraph="These are the people"
      heading="Talents"
      href={`/client/${clientId}/talents`}
    >
      <Table columns="grid-cols-[1.2fr_0.7fr_0.8fr_5.7rem_6.5rem_6.5rem_9.5rem]">
        <Table.Header>
          <div className="info">Info</div>
          <div className="skills text-center">Skills</div>
          <div className="job-title text-center">Job title</div>
          <div className="experience text-center">Experience</div>
          <div className="job-type text-center">Job type</div>
          <div className="date-hire text-center">Date hire</div>
          <div className="actions text-right">Actions</div>
        </Table.Header>
        <Table.Body
          data={talents}
          render={(talents, i) => <ClientTalentsRow talent={talents} key={i} />}
        />
      </Table>
    </DashboardSection>
  );
}

export default ClientTalentsTable;
