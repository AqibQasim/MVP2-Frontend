"use client";
import { useCallback, useEffect, useState } from "react";
import SkillIconWithBg from "./SkillIconWithBg";
import Table from "./Table";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import ChangeStatusDropdown from "./ChangeStatusDropdown";
import { useSelector } from 'react-redux';

function AdminCandidatesClientsHiringRow({
  candidate,
  job,
  client,
  daysPassed,
}) {
  const [changeStatus, setChangeStatus] = useState({
    customer_id: null,
    job_posting_id: null,
    client_id: null,
    job_status: job?.job_status, //'open',
    talent_status: null, //'open',
    response_status: null, //'decline'
  });
  const [stripeClientId, setStripeClientId] = useState(null);






  
   const selectedMethodId = useSelector((state) => state.payment.selectedMethodId);
  


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
    const {client_id, customer_id, job_posting_id, job_status, talent_status, response_status}= changeStatus;
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

    console.log(payload)

    if(client_id&&customer_id&&job_posting_id&&talent_status&&response_status&&job_status){
      mvp2ApiHelper(payload).then(result => {
        console.log(result)
      })
    }
  }


  const getClientStripe = () => {
    console.log("pASSING TO PAYLOAD ", typeof changeStatus.client_id)
    const payload = {
      endpoint: `get-client-stripe-account?client_id=${changeStatus.client_id}`,
      method: "GET",
    };

    mvp2ApiHelper(payload).then(result => {
      //  console.log("Stripe API result: ", result.status)
      if (result.status === 200) {
         console.log("TEST 124", changeStatus)
         setStripeClientId(result.data.data.stripe_id)
      }
      console.error(result?.data?.message);
      return null; // Return null or handle the error appropriately
  });
}
const handleSubscription = async () => {
        const customPrice = (candidate.hourly_rate * 100) * 40; 

         
    try {
      // Fetch client secret for subscription
      const subscriptionResponse = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerId: stripeClientId, price: customPrice, paymentMethodId: selectedMethodId }),
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

  useEffect(()=>{
    handleChangeStatus();
  },[changeStatus]);


  useEffect(() => {
    // console.log(changeStatus)
    handleChangeStatus()

    if(changeStatus.job_status === "hired"){
      console.log("JOB STATUS CHANGED TO ", changeStatus.job_status)
      getClientStripe()

      if (stripeClientId) {
        handleSubscription()
      }

      stripeClientId
    }

  }, [changeStatus, stripeClientId])

  const rowClassName =
    job?.job_status === "trial" && daysPassed > 14
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
