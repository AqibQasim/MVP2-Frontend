import { useState } from "react";
import SvgIconJobStatus from "@/svgs/SvgIconJobStatus";
import Capsule from "./Capsule";
import EntityCard from "./EntityCard";
import IconWithBg from "./IconWithBg";
import SkillIconWithBg from "./SkillIconWithBg";
import Table from "./Table";
import SvgIconRequestInterview from "@/svgs/SvgIconRequestInterview";
import Modal from "./AdminJobsFormModal"; // Import your Modal component

function AdminCandidateRecommendedRow({ recommended }) {
  const [showForm, setShowForm] = useState(false);
  const [hourlyRate, setHourlyRate] = useState("");
  const [selectedClient, setSelectedClient] = useState("");

  // Static list of clients
  const clients = [
    { id: 1, name: "Client A" },
    { id: 2, name: "Client B" },
    { id: 3, name: "Client C" },
  ];

  // Function to handle form submission
  const handleReferCandidate = (e) => {
    e.preventDefault();
    console.log("Hourly Rate:", hourlyRate);
    console.log("Assigned to Client:", selectedClient);

    // Reset form and close modal
    setHourlyRate("");
    setSelectedClient("");
    setShowForm(false);
  };

  return (
    <>
      <Table.Row>
        <EntityCard
          entity={{
            name: recommended?.role,
            profession: recommended?.profession,
            image: "/avatars/avatar-1.png",
          }}
        />
        <div className="skills flex items-center justify-center gap-1.5 text-center">
          {recommended?.skills?.length > 0 ? (
            recommended.skills.map((skill, i) => (
              <SkillIconWithBg key={i} icon={skill} />
            ))
          ) : (
            <span>No skills available</span>
          )}
        </div>

        <div className="experience text-center">
          {recommended?.experience || "No experience"}
        </div>
        <Capsule>{recommended?.jobType || "No job type"}</Capsule>

        {/* Button to open form */}
        <button onClick={() => setShowForm(true)}>
          <Capsule
            className="ml-auto !bg-primary-tint-100"
            icon={<IconWithBg icon={<SvgIconRequestInterview />} />}
          >
            Refer to Client
          </Capsule>
        </button>
      </Table.Row>

      {/* Modal for the referral form */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <h3 className="mb-4 text-xl font-semibold">
          Refer {recommended?.role} to Client
        </h3>
        <form onSubmit={handleReferCandidate}>
          <label className="block">Hourly Rate</label>
          <input
            type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            required
            className="mt-2 block w-full border px-2 py-1"
          />

          <label className="mt-4 block">Assign to Client</label>
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            required
            className="mt-2 block w-full border px-2 py-1"
          >
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>

          <div className="mt-4">
            <button
              type="submit"
              className="mr-2 bg-blue-500 px-4 py-2 text-white"
            >
              Confirm Referral
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-300 px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default AdminCandidateRecommendedRow;
