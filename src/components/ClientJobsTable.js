"use client";
import { fetchClientJobs, getClientById, getJobs } from "@/lib/data-service";
import ClientJobsRow from "./ClientJobsRow";
import DashboardSection from "./DashboardSection";
import Table from "./Table";
import { useEffect, useState,useCallback } from "react";
import EmptyScreen from "./EmptyScreen";

async function ClientJobsTable({ client_id }) {

  const [jobs, setJobs] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage] = useState(10);

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
  const onNext = useCallback(() => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, jobs?.result?.length),
    );
  }, [jobs?.result?.length, itemsPerPage]);

  const onPrev = useCallback(() => {
    setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  }, [itemsPerPage]);

 
  const paginatedJobs = jobs?.result?.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  console.log("jobs", jobs)

  if(jobs && jobs?.result?.length === 0){
    return <EmptyScreen className={'h-full'}/>
  }
  

  return (
    <DashboardSection
      className="!min-h-full"
      paragraph="View and manage all here."
      heading="Your jobs"
    >
      <Table columns="grid-cols-[1fr_1.7fr_9rem_7rem_9.1rem]">
        <Table.Header>
          <div className="name">Info</div>
          <div className="email text-center">Skills</div>
          <div className="experience text-center">Experience</div>
          <div className="commit text-center">Commit</div>
          <div className="status text-center">Status</div>
        </Table.Header>

        {jobs && jobs?.result.length > 0 ? (
        <Table.Body
          data={paginatedJobs}
          render={(job, i) => <ClientJobsRow job={job} key={i} />}
        />
         ) : (
        <div >
          <p>No data to show at the moment</p>
        </div>
        )}
          <Table.Footer
                             data={jobs?.result}
                             startIndex={startIndex + 1}
                             endIndex={Math.min(startIndex + itemsPerPage, jobs?.result?.length)}
                             onNext={onNext}
                             onPrevious={onPrev}
                           />
      </Table>
    </DashboardSection>
  );
}

export default ClientJobsTable;
