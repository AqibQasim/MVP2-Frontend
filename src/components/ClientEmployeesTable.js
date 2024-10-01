"use client";
import ClientEmployeesRow from "./ClientEmployeesRow";
import DashboardSection from "./DashboardSection";
import Table from "./Table";

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

function ClientEmployeesTable({ hiredCandidates }) {
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
          data={hiredCandidates}
          render={(hiredCandidate, i) => (
            <ClientEmployeesRow hiredCandidate={hiredCandidate} key={i} />
          )}
        />
      </Table>
    </DashboardSection>
  );
}

export default ClientEmployeesTable;
