"use client";
import DashboardSection from "@/components/DashboardSection";
import Table from "@/components/Table";
import AdminCreateAJobModal from "./AdminCreateAJobModal";
import CapsuleLink from "./CapsuleLink";
import { useEffect, useState } from "react";

function AdminClientsTable({ clients, totalClients }) {
  const path = window.location.href;

  const [jobStatus, setJobStatus] = useState("");

  const handleJobStatusChange = (event) => {
    setJobStatus(event.target.value);
  };

  const filteredClients = jobStatus
    ? clients.filter((client) =>
        jobStatus === "jobs"
          ? client.job_postings.length >= 1
          : client.job_postings.length === 0,
      )
    : clients;

  return (
    <>
      <DashboardSection
        className="!min-h-full"
        paragraph="These are all"
        heading="Clients"
        href={!path.includes("/admin/clients") ? `/admin/clients` : null}
        info={`Total Clients: ${totalClients || 0}`}
      >
        <div className="mb-4 flex justify-end">
          <label htmlFor="options" className="mr-2 mt-2">
            Choose an option:
          </label>
          <select
            id="options"
            value={jobStatus}
            onChange={handleJobStatusChange}
            className="rounded border border-gray-300 p-2"
          >
            <option value="">Select an job status</option>
            <option value="nojobs">No Jobs</option>
            <option value="jobs">Jobs</option>
          </select>
        </div>

        <Table columns="grid-cols-[12rem_12rem_10rem_8rem_8rem]">
          <Table.Header>
            <div className="info">Name</div>
            <div className="info text-center">Email</div>
            <div className="info text-center">Total Jobs</div>
            <div className="info text-center">Total Candidates</div>
            <div className="info text-end">Clients-Info</div>
          </Table.Header>
          <Table.Body
            data={filteredClients}
            render={(client) => (
              <Table.Row key={client.client_id}>
                {/* <div>{client.client_id}</div> */}
                <div>{client.name}</div>
                <div>{client.email}</div>
                <div className="text-center">
                  {client?.job_postings?.length}
                </div>
                <div className="text-center">
                  {client?.assigned_customers?.length ?? 0}
                </div>
                <CapsuleLink
                  className="ml-auto"
                  href={`/admin/clients/${client?.client_id}`}
                  // href={window.location.href + `/${client?.client_id}`}
                >
                  {" "}
                  view details{" "}
                </CapsuleLink>
                {/* <AdminCreateAJobModal clientId={client.client_id} /> */}
              </Table.Row>
            )}
          />
        </Table>
      </DashboardSection>
    </>
  );
}

export default AdminClientsTable;
