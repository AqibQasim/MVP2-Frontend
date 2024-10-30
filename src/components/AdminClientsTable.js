"use client";
import DashboardSection from "@/components/DashboardSection";
import Table from "@/components/Table";
import AdminCreateAJobModal from "./AdminCreateAJobModal";
import CapsuleLink from "./CapsuleLink";

function AdminClientsTable({ clients, totalClients }) {

  const path= window.location.href;

  return (
    <>
      <DashboardSection
        className="!min-h-full"
        paragraph="These are all"
        heading="Clients"
        href={!path.includes('/admin/clients')? `/admin/clients`:null}
        info={`Total Clients: ${totalClients || 0}`}

      >
        <Table columns="grid-cols-[12rem_12rem_10rem_8rem_8rem]">
          <Table.Header>
            <div className="info">Name</div>
            <div className="info text-center">Email</div>
            <div className="info text-center">Total Jobs</div>
            <div className="info text-center">Total Candidates</div>
            <div className="info text-end">Clients-Info</div>
          </Table.Header>
          <Table.Body
            data={clients}
            render={(client) => (
              <Table.Row key={client.client_id}>
                {/* <div>{client.client_id}</div> */}
                <div>{client.name}</div>
                <div>{client.email}</div>
                <div className="text-center">{client?.job_postings?.length}</div>
                <div className="text-center">{client?.assigned_customers?.length ?? 0}</div>
                <CapsuleLink
                  className="ml-auto"
                //  href={`/client/${clientId}/jobs/${job.job_posting_id}`}
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
