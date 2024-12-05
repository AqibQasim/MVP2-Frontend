"use client";
import DashboardSection from "@/components/DashboardSection";
import Table from "@/components/Table";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function AdminClientsTable({ clients, totalClients, role }) {
  const path = window.location.href;

  const [jobStatus, setJobStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleJobStatusChange = (event) => {
    setJobStatus(event.target.value);
  };

  const router = useRouter();

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
          client?.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

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
            <div className="info">Name</div>
            <div className="info text-center">Email</div>
            <div className="info text-center">Total Jobs</div>
            <div className="info text-center">Total Candidates</div>
            
          </Table.Header>
          <Table.Body
            data={filteredClients}
            render={(client) => (
              <Table.Row
                key={client.client_id}
                onClick={() => router.push(`/admin/clients/${client.client_id}`)}
                
              >
           
                <div  className="cursor-pointer" >{client.name}</div>
                <div className="break-words text-center cursor-pointer">{client.email}</div>
                <div className="text-center cursor-pointer">
                        {client?.job_postings?.length}
                </div>
                <div className="text-center cursor-pointer">
                  {client?.assigned_customers?.length ?? 0}
                </div>
                {/* Removed CapsuleLink */}
              </Table.Row>
            )}
          />
        </Table>
      </DashboardSection>
    </>
  );
}

export default AdminClientsTable;
