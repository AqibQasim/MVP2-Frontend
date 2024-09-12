"use client";
import { useParams } from "next/navigation";
import AdminCandidateRecommendedRow from "./AdminCandidateRecommendedRow";
import DashboardSection from "./DashboardSection";
import Table from "./Table";
import { useCallback, useEffect } from "react";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import { recruitinnApiHelper } from "@/Helpers/recruitinnApiHelper";

const recommendedTalents = [
  {
    id: 1,
    role: "Front-End Developer",
    profession: "some profession",
    skills: ["javascript", "react", "python"],
    experience: "Intermediate",
    jobType: "full time",
    dateHired: "20-Sep-2024",
  },
  {
    id: 2,
    role: "Front-End Developer",
    profession: "some profession",
    skills: ["javascript", "react", "python"],
    experience: "Intermediate",
    jobType: "full time",
    dateHired: "20-Sep-2024",
  },
  {
    id: 3,
    role: "Front-End Developer",
    profession: "some profession",
    skills: ["javascript", "react", "python"],
    experience: "Intermediate",
    jobType: "full time",
    dateHired: "20-Sep-2024",
  },
  {
    id: 4,
    role: "Front-End Developer",
    profession: "some profession",
    skills: ["javascript", "react", "python"],
    experience: "Intermediate",
    jobType: "full time",
    dateHired: "20-Sep-2024",
  },
  {
    id: 5,
    role: "Front-End Developer",
    profession: "some profession",
    skills: ["javascript", "react", "python"],

    experience: "Intermediate",
    jobType: "full time",
    dateHired: "20-Sep-2024",
  },
  {
    id: 6,
    role: "Front-End Developer",
    profession: "some profession",
    skills: ["javascript", "react", "python"],
    experience: "Intermediate",
    jobType: "full time",
    dateHired: "20-Sep-2024",
  },
];

function AdminCandidatesTable() {
  const params = useParams();
  const clientId = params?.clientId;

  const fetchCandidates= useCallback(async()=>{
    const payload={
      endpoint:''
    }
    const result= await recruitinnApiHelper(payload)
  },[])

  useEffect(()=>{
    fetchCandidates()
  },[])


  return (
    <DashboardSection
      className="!min-h-full"
      paragraph="These are all"
      heading="Candidates"
    >
      <Table columns="grid-cols-[1fr_0.7fr_1fr_1fr_1fr]">
        <Table.Header>
          <div className="info">Info</div>
          <div className="skills text-center">Skills</div>
          <div className="experience text-center">Experience</div>
          <div className="job-type text-center">Job type</div>
          <div className="actions text-right">Actions</div>
        </Table.Header>
        <Table.Body
          data={recommendedTalents}
          //   data={[]}
          render={(recommended, i) => (
            <AdminCandidateRecommendedRow recommended={recommended} key={i} />
          )}
        />
      </Table>
    </DashboardSection>
  );
}

export default AdminCandidatesTable;
