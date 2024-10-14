import { referCandidateToClientAction } from "@/lib/actions";
import { fetchClientJobs, getClients } from "@/lib/data-service";
import SvgIconRequestInterview from "@/svgs/SvgIconRequestInterview";
import { useCallback, useEffect, useState } from "react";
import Modal from "./AdminJobsFormModal";
import Capsule from "./Capsule";
import EntityCard from "./EntityCard";
import IconWithBg from "./IconWithBg";
import SkillIconWithBg from "./SkillIconWithBg";
import Table from "./Table";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import ChangeStatusDropdown from "./ChangeStatusDropdown";

function AdminCandidatesClientsHiringRow({ candidate, job, client, daysPassed }) {
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
  const [stripeClientId, setStripeClientId] = useState(null);

  // const filteredClients = clients?.filter((client) =>
  //   client.name.toLowerCase().includes(searchClient.toLowerCase()),
  // );

  // const filteredJobs = jobs?.filter((job) =>
  //   job.position.toLowerCase().includes(searchJob.toLowerCase()),
  // );

  // const fetchClients = useCallback(async () => {
  //   const f = await getClients();
  //   if (f.status === 200) {
  //     setClients(f.data);
  //   }
  // }, []);

  // const fetchJobs = useCallback(async () => {
  //   if (selectedClientId) {
  //     const f = await fetchClientJobs(selectedClientId);
  //     if (f.status === 200) {
  //       setFetchedJobs(f.data.result);
  //     }
  //   }
  // }, [selectedClientId]);

  // useEffect(() => {
  //   fetchClients();
  // }, [showForm]);

  // useEffect(() => {
  //   fetchJobs();
  // }, [searchJob]);

  // const handleReferCandidate = async (formData) => {
  //   // e.preventDefault();

  //   const referClientBody = {
  //     client_id: selectedClientId,
  //     customer_id: candidate.customer_id,
  //     job_posting_id: selectedJobId,
  //     hourly_rate: hourlyRate,
  //   };

  //   const { error, message } =
  //     await referCandidateToClientAction(referClientBody);
  //   if (error) {
  //     console.log({ Error: error });
  //     return setError(error);
  //   }
  //   if (message) {
  //     console.log("Refer Message: ", message);
  //     return setShowForm(false);
  //   }
  // };

  let options = null;

  if (job?.job_status === 'trial') {
    options = [{ value: "open", label: "Open" }, { value: "hired", label: "Hired" }]
  }

  if (job?.job_status === 'open') {
    options = [{ value: "hired", label: "Hired" }, { value: "trial", label: "Trial" }]
  }

  if (job?.job_status === 'hired') {
    options = [{ value: "open", label: "Open" }, { value: "trial", label: "Trial" }]
  }

  const handleChangeStatus = () => {
    const payload = {
      endpoint: 'client/client-response',
      method: 'POST',
      body: {
        client_id: changeStatus.client_id,
        customer_id: changeStatus.customer_id,
        job_posting_id: changeStatus.job_posting_id,
        job_status: changeStatus.job_status,
        talent_status: changeStatus.talent_status,
        response_status: changeStatus.response_status
      }
    }

    mvp2ApiHelper(payload).then(result => {
      console.log(result)
    })
  }

  
const getClientStripe = () =>  {
  console.log("pASSING TO PAYLOAD ", typeof changeStatus.client_id)
  const payload = {
    endpoint: `get-client-stripe-account?client_id=${changeStatus.client_id}`,
    method: "GET",
  };
  
  mvp2ApiHelper(payload).then(result => {
      //  console.log("Stripe API result: ", result.status)
      if (result.status === 200) {
         console.log("TEST 124", result.data.data.stripe_id)
         setStripeClientId(result.data.data.stripe_id)
      }
      console.error(result?.data?.message);
      return null; // Return null or handle the error appropriately
  });
 

}

const handleSubscription = async () => {
        const customPrice = 9898; 

        try {
            // Fetch client secret for subscription
            const subscriptionResponse = await fetch('/api/create-subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ customerId: stripeClientId, price: customPrice, paymentMethodId: 'pm_1Q3FZYCtLGKA7fQGahUXrWXT'  }),
            });

            if (!subscriptionResponse.ok) {
                throw new Error(`HTTP error! status: ${subscriptionResponse.status}`);
            }

            const { clientSecret } = await subscriptionResponse.json();
            setClientSecret(clientSecret);
        } catch (error) {
            console.error('Error creating subscription:', error);
        }
    };


  useEffect(() => {
    // console.log(changeStatus)
    handleChangeStatus()

    

    if(changeStatus.job_status === "hired"){
      console.log("JOB STATUS CHANGED TO ", changeStatus.job_status)
      getClientStripe()

      if(stripeClientId){
        handleSubscription()
      }
      
      stripeClientId
    }

  }, [changeStatus, stripeClientId])

  return (
    <>
      <Table.Row>
        {/* <EntityCard
          entity={{
            name: candidate?.name,
            //profession: candidate?.specialization,
            image: "/avatars/avatar-1.png",
          }}
        /> */}

        <div className="skills flex items-center justify-start gap-1 text-center">
          {/* {candidate?.skills?.length > 0 ? (
            candidate.skills.map((skill, i) => (
              <SkillIconWithBg key={i} icon={skill} />
            ))
          ) : (
            <span>No skills available</span>
          )} */}
          {candidate?.name}
        </div>

        <div className="skills flex items-center justify-start gap-1.5 text-center">
          {/* {candidate?.skills?.length > 0 ? (
            candidate.skills.map((skill, i) => (
              <SkillIconWithBg key={i} icon={skill} />
            ))
          ) : (
            <span>No skills available</span>
          )} */}
          {client?.name}
        </div>

        <div className="experience text-center">
          {job?.position || "No postiton"}
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
            console.log(selected_status)

            if (selected_status === 'open') {
              response_status = 'decline'
            } else {
              response_status = 'accept'
            }
            setChangeStatus({
              customer_id: candidate?.customer_id,
              job_posting_id: job?.job_posting_id,
              client_id: client?.client_id,
              job_status: selected_status, //'open',
              talent_status: selected_status, //'open',
              response_status, //'decline'
            })
          }}
          //value={selectedValue}
          //onChange={handleChange}
          className="text-sm font-bold"
        />
        {/* <button onClick={() => setShowForm(true)}>
          <Capsule
            className="ml-auto !bg-primary-tint-100"
            icon={<IconWithBg icon={<SvgIconRequestInterview />} />}
          >
            Update Status
          </Capsule>
        </button> */}
      </Table.Row>
    </>
  );
}

export default AdminCandidatesClientsHiringRow;


// {/* Modal for the referral form */}
// <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
//   <h3 className="mb-4 text-xl font-semibold">
//     Refer {candidate?.role} to Client
//   </h3>
//   <form action={handleReferCandidate}>
//     <label className="block">Hourly Rate</label>
//     <input
//       type="number"
//       name="hourlyRate"
//       id="hourlyRate"
//       value={hourlyRate}
//       onChange={(e) => setHourlyRate(e.target.value)}
//       required
//       className="mt-2 block w-full border px-2 py-1"
//     />

//     <label className="mt-4 block">Assign to Client</label>
//     <input
//       type="text"
//       value={searchClient}
//       onChange={(e) => {
//         setIsClientShow(true);
//         setSearchClient(e.target.value);
//       }}
//       placeholder="Search client by name"
//       className="mb-2 block w-full border px-2 py-1"
//     />

//     {/* <select
//       value={selectedClient}
//       onChange={(e) => setSelectedClient(e.target.value)}
//       required
//       className="mt-2 block w-full border px-2 py-1"
//     > */}
//     {/* <option value="">Select a client</option> */}
//     {isClientsShow &&
//       filteredClients?.map((client) => (
//         <option
//           onClick={() => {
//             setIsClientShow(false);
//             setSearchClient(client.name);
//             setSelectedClient(client.name);
//             setSelectedClientId(client.client_id);
//           }}
//           key={client.client_id}
//           value={client.client_id}
//           className="cursor-pointer"
//         >
//           {client.name}
//         </option>
//       ))}

//     <label className="mt-4 block">Select Job</label>
//     <input
//       type="text"
//       value={searchJob}
//       onChange={(e) => {
//         setIsJobsShow(true);
//         setSearchJob(e.target.value);
//       }}
//       placeholder="Search Job"
//       className="mb-2 block w-full border px-2 py-1"
//     />

//     {isJobsShow &&
//       filteredJobs?.map((job) => (
//         <option
//           onClick={() => {
//             setIsJobsShow(false);
//             setSearchJob(job.position);
//             setSelectedJob(job.position);
//             setSelectedJobId(job.job_posting_id);
//           }}
//           key={job.job_posting_id}
//           value={job.job_posting_id}
//           className="cursor-pointer"
//         >
//           {job.position}
//         </option>
//       ))}
//     {/* </select> */}
//     {/* Error Temp */}
//     {error ? <div className="error text-red-500"> {error} </div> : null}

//     <div className="mt-4">
//       <button
//         type="submit"
//         className="mr-2 bg-blue-500 px-4 py-2 text-white"
//       >
//         Confirm Referral
//       </button>
//       <button
//         type="submit"
//         onClick={() => setShowForm(false)}
//         className="bg-gray-300 px-4 py-2"
//       >
//         Cancel
//       </button>
//     </div>
//   </form>
// </Modal>