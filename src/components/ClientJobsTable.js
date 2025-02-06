"use client";
import { fetchClientJobs } from "@/lib/data-service";
import { useCallback, useEffect, useState } from "react";
import ClientJobsRow from "./ClientJobsRow";
import DashboardSection from "./DashboardSection";
import EmptyScreen from "./EmptyScreen";
import Table from "./Table";

function ClientJobsTable({ client_id }) {
  const [jobs, setJobs] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const clientJobs = await fetchClientJobs(client_id);
        if (clientJobs?.status === 200) {
          setJobs(clientJobs.data);
        }
      } catch (error) {
        console.error("Error fetching client jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (client_id) {
      fetchJobs();
    }
  }, [client_id]);

  const onNext = useCallback(() => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, jobs?.result?.length || 0),
    );
  }, [jobs?.result?.length, itemsPerPage]);

  const onPrev = useCallback(() => {
    setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  }, [itemsPerPage]);

  const paginatedJobs = jobs?.result?.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  if (isLoading) {
    return (
      <div className="flex size-full items-center justify-center">
        <div className="loader2"></div>
      </div>
    );
  }

  if (jobs?.result?.length === 0) {
    return <EmptyScreen className="h-full" />;
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

        {paginatedJobs?.length > 0 ? (
          <Table.Body
            data={paginatedJobs}
            render={(job, i) => <ClientJobsRow job={job} key={i} />}
          />
        ) : (
          <div>
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
