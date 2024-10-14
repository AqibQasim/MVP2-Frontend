"use client";
import { fetchClientJobs, getClientById, getJobs } from "@/lib/data-service";
import ClientJobsRow from "./ClientJobsRow";
import DashboardSection from "./DashboardSection";
import Table from "./Table";
import { useEffect, useState } from "react";

async function ClientJobsTable({ client_id }) {

  const [jobs, setJobs] = useState(null);

  const fetchJobs = async () => {
    const clientJobs = await fetchClientJobs(client_id);

    //console.log(candidates)

    if (clientJobs?.status === 200) {
      setJobs(clientJobs?.data)
    }
  }
  //const clientJobs = await fetchClientJobs(client_id);

  useEffect(() => {
    fetchJobs();
  }, [])

  console.log("jobs", jobs)
  

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

        {jobs && jobs?.result.length > 0 ? (
        <Table.Body
          data={jobs?.result}
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
