"use client";
import DashboardSection from "@/components/DashboardSection";
import Table from "@/components/Table";

const recommendedTalents = [
  {
    id: 1,
    name: "John Doe",
    email: "john@gmail.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@gmail.com",
  },
  {
    id: 3,
    name: "Emily Johnson",
    email: "emily@gmail.com",
  },
  {
    id: 4,
    name: "Michael Brown",
    email: "michael@gmail.com",
  },
  {
    id: 5,
    name: "Sarah Davis",
    email: "sarah@gmail.com",
  },
];

function AdminClientsTable() {
  return (
    <>
      <DashboardSection
        className="!min-h-full"
        paragraph="These are all"
        heading="Clients"
      >
        <Table columns="grid-cols-[1fr_1fr_1fr_5.7rem_6.5rem_12rem]">
          <Table.Header>
            <div className="info">ID</div>
            <div className="info">Name</div>
            <div className="info">Email</div>
          </Table.Header>
          <Table.Body
            data={recommendedTalents}
            render={(talent) => (
              <Table.Row key={talent.id}>
                <div>{talent.id}</div>
                <div>{talent.name}</div>
                <div>{talent.email}</div>
              </Table.Row>
            )}
          />
        </Table>
      </DashboardSection>
    </>
  );
}

export default AdminClientsTable;
