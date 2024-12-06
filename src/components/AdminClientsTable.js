"use client";
import DashboardSection from "@/components/DashboardSection";
import Table from "@/components/Table";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function AdminClientsTable({ clients, totalClients, role }) {
  const path = window.location.href;

  const [jobStatus, setJobStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage] = useState(2); // Number of items per page

  const handleJobStatusChange = (event) => {
    setJobStatus(event.target.value);
  };

  const router = useRouter();

  const onNext = useCallback(() => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, clients.length),
    );
  }, [clients.length, itemsPerPage]);

  const onPrev = useCallback(() => {
    setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  }, [itemsPerPage]);

  const filteredClients = clients
    .filter((client) => {
      if (jobStatus === "" || jobStatus === "All Jobs") {
        return true;
      } else if (jobStatus === "jobs") {
        return client.job_postings.length > 0;
      } else if (jobStatus === "nojobs") {
        return client.job_postings.length === 0;
      }
      return true;
    })
    .filter(
      (client) =>
        !searchTerm ||
        (typeof client?.name === "string" &&
          client?.name.toLowerCase().includes(searchTerm.toLowerCase())),
    );

  // const paginatedClients = filteredClients.slice(
  //   startIndex,
  //   startIndex + itemsPerPage,
  // );

  return (
    <>
      <DashboardSection
        className="!min-h-full"
        paragraph="These are all"
        heading="Clients"
        href={!path.includes("/admin/clients") ? `/admin/clients` : null}
        info={`Total Clients: ${totalClients || 0}`}
      >
        {role !== "dashboard" && (
          <div className="mb-4 flex justify-between">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name"
                className="mb-4 cursor-pointer rounded border border-gray-300 p-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select
                id="options"
                value={jobStatus}
                onChange={handleJobStatusChange}
                className="rounded border border-gray-300 p-2"
              >
                <option value="">List of Jobs </option>
                <option value="nojobs">No Jobs Posted </option>
                <option value="jobs"> Posted Jobs </option>
              </select>
            </div>
          </div>
        )}

        <Table columns="grid-cols-[1fr_1.5fr_12rem_12rem]">
          <Table.Header>
            <div className="info">Client-Name</div>
            <div className="info text-center">Email</div>
            <div className="info text-center">Total Jobs</div>
            <div className="info text-center">Total Candidates</div>
          </Table.Header>
          <Table.Body
            data={filteredClients}
            render={(client) => (
              <Table.Row
                key={client.client_id}
                onClick={() =>
                  router.push(`/admin/clients/${client.client_id}`)
                }
              >
                <div className="cursor-pointer">{client.name}</div>
                <div className="cursor-pointer break-words text-center">
                  {client.email}
                </div>
                <div className="cursor-pointer text-center">
                  {client?.job_postings?.length}
                </div>
                <div className="cursor-pointer text-center">
                  {client?.assigned_customers?.length ?? 0}
                </div>
              </Table.Row>
            )}
          />
          <Table.Footer
            data={filteredClients}
            startIndex={startIndex + 1}
            endIndex={Math.min(
              startIndex + itemsPerPage,
              clients.length,
            )}
            onNext={onNext}
            onPrevious={onPrev}
          />
        </Table>
      </DashboardSection>
    </>
  );
}

export default AdminClientsTable;
