import { useCallback, useEffect, useState } from "react";
import SkillIconWithBg from "./SkillIconWithBg";
import Table from "./Table";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import ChangeStatusDropdown from "./ChangeStatusDropdown";

function AdminCandidatesClientsHiringRow({
  candidate,
  job,
  client,
  daysPassed,
}) {
  const [showForm, setShowForm] = useState(false);
  const [hourlyRate, setHourlyRate] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [clients, setClients] = useState(null);
  const [searchClient, setSearchClient] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [searchJob, setSearchJob] = useState("");
  const [jobs, setFetchedJobs] = useState(null);
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedJobId, setSelectedJobId] = useState("");
  const [error, setError] = useState(null);
  const [isClientsShow, setIsClientShow] = useState(false);
  const [isJobsShow, setIsJobsShow] = useState(false);
  const [changeStatus, setChangeStatus] = useState({
    customer_id: null,
    job_posting_id: null,
    client_id: null,
    job_status: job?.job_status, //'open',
    talent_status: null, //'open',
    response_status: null, //'decline'
  });

  let options = null;

  if (job?.job_status === "trial") {
    options = [
      { value: "open", label: "Open" },
      { value: "hired", label: "Hired" },
    ];
  }

  if (job?.job_status === "open") {
    options = [
      { value: "hired", label: "Hired" },
      { value: "trial", label: "Trial" },
    ];
  }

  if (job?.job_status === "hired") {
    options = [
      { value: "open", label: "Open" },
      { value: "trial", label: "Trial" },
    ];
  }

  const handleChangeStatus = () => {
    const payload = {
      endpoint: "client/client-response",
      method: "POST",
      body: {
        client_id: changeStatus.client_id,
        customer_id: changeStatus.customer_id,
        job_posting_id: changeStatus.job_posting_id,
        job_status: changeStatus.job_status,
        talent_status: changeStatus.talent_status,
        response_status: changeStatus.response_status,
      },
    };

    mvp2ApiHelper(payload).then((result) => {
      console.log(result);
    });
  };

  useEffect(() => {
    handleChangeStatus();
  }, [changeStatus]);

  console.log("job ka status", job?.job_status);

  const rowClassName =
    job?.job_status === "trial" && daysPassed > 3
      ? "bg-red-600 rounded-lg"
      : "";

  return (
    <>
      <div className={rowClassName}>
        <Table.Row>
          <div className="skills flex items-center justify-start gap-1 text-center">
            {candidate?.name}
          </div>

          <div className="skills flex items-center justify-start gap-1.5 text-center">
            {client?.name}
          </div>

          <div className="experience text-center">
            {job?.position || "No position"}
          </div>

          <div className="experience text-center">
            {job?.job_status || "No job status"}
          </div>
          <div className="experience text-center">{daysPassed}</div>

          {/* Button to open form */}
          <ChangeStatusDropdown
            options={options}
            placeholder="Change Job Status"
            onPress={(selected_status) => {
              let response_status = null;
              console.log(selected_status);

              if (selected_status === "open") {
                response_status = "decline";
              } else {
                response_status = "accept";
              }
              setChangeStatus({
                customer_id: candidate?.customer_id,
                job_posting_id: job?.job_posting_id,
                client_id: client?.client_id,
                job_status: selected_status,
                talent_status: selected_status,
                response_status,
              });
            }}
            className="text-sm font-bold"
          />
        </Table.Row>
      </div>
    </>
  );
}

export default AdminCandidatesClientsHiringRow;
