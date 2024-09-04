"use client";
import ClientEmployeesRow from "./ClientEmployeesRow";
import DashboardSection from "./DashboardSection";
import Table from "./Table";

const employees = [
  {
    name: "Richard Feynman",
    image: "/avatars/avatar-1.png",
    profession: "Software Developer",
    skills: ["react", "python", "javascript"],
    experience: "expert",
    status: "hired",
  },
  {
    name: "Richard Feynman",
    image: "/avatars/avatar-1.png",
    profession: "Software Developer",
    skills: ["react", "python", "javascript"],
    experience: "expert",
    status: "trial",
  },
];

function ClientEmployeesTable() {
  return (
    <DashboardSection paragraph="Employees you’ve" heading="Recently hired">
      <Table columns="grid-cols-[1fr_1.7fr_0.4fr_0.4fr]">
        <Table.Header>
          <div className="name">Info</div>
          <div className="email text-center">Skills</div>
          <div className="experience text-center">Experience</div>
          <div className="status text-center">Status</div>
        </Table.Header>
        <Table.Body
          data={employees}
          render={(employee, i) => (
            <ClientEmployeesRow employee={employee} key={i} />
          )}
        />
      </Table>
    </DashboardSection>
  );
}

export default ClientEmployeesTable;
