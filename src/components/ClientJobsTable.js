"use client";
import { fetchClientJobs, getClientById, getJobs } from "@/lib/data-service";
import ClientJobsRow from "./ClientJobsRow";
import DashboardSection from "./DashboardSection";
import Table from "./Table";

async function ClientJobsTable({client_id}) {
const clientJobs = await fetchClientJobs(client_id);

  return (
    <DashboardSection
      className="!min-h-full"
      paragraph="View and manage all here."
      heading="Your jobs"
    >
      <Table columns="grid-cols-[1fr_1.7fr_6rem_5rem_7.1rem_8.1rem]">
        <Table.Header>
          <div className="name">Info</div>
          <div className="email text-center">Skills</div>
          <div className="experience text-center">Experience</div>
          <div className="commit text-center">Commit</div>
          <div className="status text-center">Status</div>
          <div className="action text-center">Action</div>
        </Table.Header>

        {clientJobs && clientJobs.length > 0 ? (
        <Table.Body
          data={clientJobs.data.result}
          render={(job, i) => <ClientJobsRow job={job} key={i} />}
        />
         ) : (
        <div >
          <p>No data to show at the moment</p>
        </div>
        )}

      </Table>
    </DashboardSection>
  );
}

export default ClientJobsTable;
