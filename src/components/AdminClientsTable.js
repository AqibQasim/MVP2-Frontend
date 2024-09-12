"use client";
import DashboardSection from "@/components/DashboardSection";
import Table from "@/components/Table";
import AdminCreateAJobModal from "./AdminCreateAJobModal";

function AdminClientsTable({ clients }) {
  return (
    <>
      <DashboardSection
        className="!min-h-full"
        paragraph="These are all"
        heading="Clients"
      >
        <Table columns="grid-cols-[1fr_1fr_1fr_8rem]">
          <Table.Header>
            <div className="info">ID</div>
            <div className="info">Name</div>
            <div className="info">Email</div>
          </Table.Header>
          <Table.Body
            data={clients}
            render={(client) => (
              <Table.Row key={client.client_id}>
                <div>{client.client_id}</div>
                <div>{client.name}</div>
                <div>{client.email}</div>
                <AdminCreateAJobModal clientId={client.client_id} />
              </Table.Row>
            )}
          />
        </Table>
      </DashboardSection>
    </>
  );
}

export default AdminClientsTable;
