"use client";
import { useParams } from "next/navigation";
import ClientRecommendedRow from "./ClientRecommendedRow";
import DashboardSection from "./DashboardSection";
import Table from "./Table";

const recommendedTalents = [
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

function ClientRecommendedTable({ recommendedCandidates }) {
  const params = useParams();
  const clientId = params?.clientId;

  return (
    <DashboardSection
      className="!min-h-full"
      paragraph="These are all"
      heading="Recommended"
      href={`/client/${clientId}/recommended`}
    >
      <Table columns="grid-cols-[1fr_0.7fr_1fr_5.7rem_6.5rem_12rem]">
        <Table.Header>
          <div className="info">Info</div>
          <div className="skills text-center">Skills</div>
          <div className="job-title text-center">Job title</div>
          <div className="experience text-center">Experience</div>
          <div className="job-type text-center">Job type</div>
          <div className="actions text-right">Actions</div>
        </Table.Header>
        <Table.Body
          data={recommendedCandidates}
          //   data={[]}
          render={(recommended, i) => (
            <ClientRecommendedRow recommended={recommended} key={i} />
          )}
        />
      </Table>
    </DashboardSection>
  );
}

export default ClientRecommendedTable;
