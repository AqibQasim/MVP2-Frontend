"use client";
import { getAllRecommendedCandidates } from "@/lib/data-service";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ClientTalentsRow from "./ClientTalentsRow";
import DashboardSection from "./DashboardSection";
import EmptyScreen from "./EmptyScreen";
import Table from "./Table";

function ClientTalentsTable({ hiredTalents }) {
  const params = useParams();
  const clientId = params?.clientId;

  const filter = "accept";

  const [hiredCandidates, setHiredCandidates] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsPerPage] = useState(10);

  const fetchHiredCandidates = async () => {
    try {
      const candidates = await getAllRecommendedCandidates(clientId, filter);
      if (candidates?.status === 200) {
        const hired = candidates?.data?.filter(
          (v) =>
            v.customer.talent_status === "hired" ||
            v.customer.talent_status === "trial",
        );
        setHiredCandidates(hired);
      }
    } catch (error) {
      console.error("Error fetching hired candidates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHiredCandidates();
  }, [clientId]);

  const onNext = useCallback(() => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, hiredCandidates?.length),
    );
  }, [hiredCandidates?.length, itemsPerPage]);

  const onPrev = useCallback(() => {
    setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  }, [itemsPerPage]);

  const paginatedCandidates = hiredCandidates?.slice(
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

  if (hiredCandidates && hiredCandidates.length === 0) {
    return <EmptyScreen className={"h-full"} />;
  }

  return (
    <DashboardSection
      className="!min-h-full"
      paragraph="These are the people"
      heading="Talents"
      href={`/client/${clientId}/talents`}
    >
      <Table columns="grid-cols-[1.2fr_1fr_1fr_5.7rem_6.5rem_6.5rem]">
        <Table.Header>
          <div className="info">Info</div>
          <div className="skills text-center">Skills</div>
          <div className="job-title text-center">Job title</div>
          <div className="experience text-center">Experience</div>
          <div className="job-type text-center">Job type</div>
          <div className="date-hire text-center">Date hire</div>
        </Table.Header>

        {hiredCandidates && hiredCandidates.length > 0 ? (
          <Table.Body
            data={paginatedCandidates}
            render={(talent, i) => <ClientTalentsRow talent={talent} key={i} />}
          />
        ) : (
          <div>
            <p>No data to show at the moment</p>
          </div>
        )}

        <Table.Footer
          data={hiredCandidates}
          startIndex={startIndex + 1}
          endIndex={Math.min(
            startIndex + itemsPerPage,
            hiredCandidates?.length,
          )}
          onNext={onNext}
          onPrevious={onPrev}
        />
      </Table>
    </DashboardSection>
  );
}

export default ClientTalentsTable;
