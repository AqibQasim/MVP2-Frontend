"use client";
import { getAllRecommendedCandidates } from "@/lib/data-service";
import ClientEmployeesRow from "./ClientEmployeesRow";
import DashboardSection from "./DashboardSection";
import Table from "./Table";
import { useEffect, useState } from "react";

// const employees = [
//   {
//     name: "Richard Feynman",
//     image: "/avatars/avatar-1.png",
//     profession: "Software Developer",
//     skills: ["react", "python", "javascript"],
//     experience: "expert",
//     commitment: "part-time",
//     status: "hired",
//   },
//   {
//     name: "John Doe",
//     image: "/avatars/avatar-1.png",
//     profession: "Back-end Developer",
//     skills: ["react", "python", "javascript"],
//     experience: "expert",
//     commitment: "full-time",
//     status: "trial",
//   },
// ];

async function ClientEmployeesTable({ client_id }) {

  const [candidates,setCandidates]= useState(null);

  const fetchCandidatesOfClientsJob= async()=>{
    const hiredCandidates= await getAllRecommendedCandidates(client_id, "all", "hired-and-trial");
    if(hiredCandidates.status===200){
      setCandidates(hiredCandidates)
    }
  }

  useEffect(()=>{
    fetchCandidatesOfClientsJob();
  },[])

  if(candidates?.data?.length===0){
    return null;
  }
  
  return (
    <DashboardSection paragraph="Employees you’ve" heading="Recently hired">
      <Table columns="grid-cols-[1fr_1fr_0.7fr_0.7fr_0.7fr_0.7fr]">
        <Table.Header>
          <div className="name">Info</div>
          <div className="email text-center">Skills</div>
          <div className="experience text-center">Experience</div>
          <div className="commit text-center">Commit</div>
          <div className="status text-center">Status</div>
          <div className="action text-center">Action</div>
        </Table.Header>

        <Table.Body
          data={candidates?.data}
          render={(hiredCandidate, i) => (
            <ClientEmployeesRow hiredCandidate={hiredCandidate} key={i} />
          )}
        />
      </Table>
    </DashboardSection>
  );
}

export default ClientEmployeesTable;
