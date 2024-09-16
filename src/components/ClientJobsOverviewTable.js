"use client";
import { fetchClientJobs } from "@/lib/data-service";
import ClientJobsRow from "./ClientJobsOverviewRow";
import DashboardSection from "./DashboardSection";
import Table from "./Table";

// const jobs = [
//   {
//     id: 1,
//     role: "some role",
//     profession: "some profession",
//     skills: ["react", "python", "javascript"],
//     experience: "expert",
//     status: "fulfilled",
//   },
//   {
//     id: 2,
//     role: "some role",
//     profession: "some profession",
//     skills: ["react", "python", "javascript"],
//     experience: "expert",
//     status: "open",
//   },
//   {
//     id: 3,
//     role: "some role",
//     profession: "some profession",
//     skills: ["react", "python", "javascript"],
//     experience: "expert",
//     status: "fulfilled",
//   },
// ];

async function ClientJobsOverviewTable({client_id}) {
  const clientJobs= await fetchClientJobs(client_id);
  console.log(clientJobs)
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
          data={clientJobs?.data?.result}
          render={(job, i) => <ClientJobsRow job={job} key={i} />}
        />
      </Table>
    </DashboardSection>
  );
}

export default ClientJobsOverviewTable;
