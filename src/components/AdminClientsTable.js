"use client";
import DashboardSection from "@/components/DashboardSection";
import Table from "@/components/Table";

function AdminClientsTable({ clients }) {
  return (
    <>
      <DashboardSection
        className="!min-h-full"
        paragraph="These are all"
        heading="Clients"
      >
        <Table columns="grid-cols-[1fr_1fr_1fr]">
          <Table.Header>
            <div className="info">ID</div>
            <div className="info">Name</div>
            <div className="info">Email</div>
          </Table.Header>
          <Table.Body
            data={clients}
            render={(client) => (
              <Table.Row key={client.id}>
                <div>{client.id}</div>
                <div>{client.name}</div>
                <div>{client.email}</div>
              </Table.Row>
            )}
          />
        </Table>
      </DashboardSection>
    </>
  );
}

export default AdminClientsTable;
