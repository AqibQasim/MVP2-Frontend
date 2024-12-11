"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import SkillIconWithBg from "./SkillIconWithBg";
import Table from "./Table";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import ChangeStatusDropdown from "./ChangeStatusDropdown";
import { useSelector } from "react-redux";
import LoaderIcon from "@/svgs/LoaderIcon";
import Capsule from "./Capsule";
import { useRouter } from "next/navigation";

function AdminCandidatesClientsHiringRow({
  candidate,
  job,
  client,
  daysPassed,
}) {
  console.log("renderrrrrr");

  const [subscriptionId, setSubcriptionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState(null);

  const autoRefresh = useCallback(() => {
    router.refresh();
  }, []);

  //console.log(first)
  const [changeStatus, setChangeStatus] = useState({
    customer_id: null,
    job_posting_id: null,
    client_id: null,
    job_status: job?.job_status, //'open',
    talent_status: null, //'open',
    response_status: null, //'decline'
  });
  const [stripeClientId, setStripeClientId] = useState(null);

  const [selectedMethodId, setSelectedMethodId] = useState("");

  // const selectedMethodId = useSelector(
  //   (state) => state.payment.selectedMethodId,
  // );

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

  if (job?.job_status === "interviewing") {
    options = [
      { value: "open", label: "Open" },
      { value: "trial", label: "Trial" },
      { value: "hired", label: "Hired" },
      { value: "close", label: "Close" },
    ];
  }

  if (job?.job_status === "trial") {
    options = [
      { value: "open", label: "Open" },
      { value: "hired", label: "Hired" },
      { value: "close", label: "Close" },
    ];
  }

  if (job?.job_status === "open") {
    options = [
      { value: "hired", label: "Hired" },
      { value: "trial", label: "Trial" },
      { value: "close", label: "Close" },
    ];
  }

  if (job?.job_status === "hired") {
    options = [
      { value: "open", label: "Open" },
      { value: "trial", label: "Trial" },
      { value: "close", label: "Close" },
    ];
  }

  const payload = useMemo(
    () => ({
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
    }),
    // [
    //   changeStatus.client_id,
    //   changeStatus.customer_id,
    //   changeStatus.job_posting_id,
    //   changeStatus.job_status,
    //   changeStatus.talent_status,
    //   changeStatus.response_status,
    // ],
  );

  const handleChangeStatus = useCallback(async () => {
    const {
      client_id,
      customer_id,
      job_posting_id,
      job_status,
      talent_status,
      response_status,
    } = changeStatus;

    if (
      client_id &&
      customer_id &&
      job_posting_id &&
      talent_status &&
      response_status &&
      job_status
    ) {
      try {
        setIsLoading(true);
        const result = await mvp2ApiHelper(payload);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
      // finally {
      //   setIsLoading(false);
      // }
    }
  }, [payload]);

  const getClientStripe = () => {
    console.log("pASSING TO PAYLOAD ", typeof changeStatus.client_id);
    const payload = {
      endpoint: `get-client-stripe-account?client_id=${changeStatus.client_id}`,
      method: "GET",
    };

    mvp2ApiHelper(payload).then((result) => {
      //  console.log("Stripe API result: ", result.status)
      if (result.status === 200) {
        console.log("TEST 124", changeStatus);
        setStripeClientId(result.data.data.stripe_id);
      }
      console.error(result?.data?.message);
      return null; // Return null or handle the error appropriately
    });
  };

  const handleSubscription = async () => {
    const customPrice = candidate.hourly_rate * 100 * 40 * 2;

    try {
      setIsLoading(true);
      const subscriptionResponse = await fetch("/api/create-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: stripeClientId,
          price: customPrice,
          paymentMethodId: selectedMethodId,
        }),
      });

      if (!subscriptionResponse.ok) {
        setIsLoading(false);
        throw new Error(`HTTP error! status: ${subscriptionResponse.status}`);
      }

      const { subscriptionId } = await subscriptionResponse.json();
      setSubcriptionId(subscriptionId);
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating subscription:", error);
      setIsLoading(false);
    }
  };

  const handleHiring = async () => {
    const customPrice = candidate.hourly_rate * 100 * 40;

    try {
      // Fetch client secret for subscription
      setIsLoading(true);
      const subscriptionResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/create-hiring`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id: changeStatus.client_id,
            subscription_id: subscriptionId,
            stripe_client_id: stripeClientId,
            job_posting_id: changeStatus.job_posting_id,
            customer_id: changeStatus.customer_id,
            amount: customPrice,
          }),
        },
      );

      if (!subscriptionResponse.ok) {
        setIsLoading(false);
        throw new Error(`HTTP error! status: ${subscriptionResponse.status}`);
      }

      const { clientSecret } = await subscriptionResponse.json();
      //setClientSecret(clientSecret);
    } catch (error) {
      setIsLoading(false);
      console.error("Error creating subscription:", error);
    }
  };

  // useEffect(() => {
  //   handleChangeStatus();
  // }, [changeStatus]);

  //  const handleCancelSubscription = async () => {
  //   try {
  //       const subscriptionResponse = await fetch(
  //           `/api/client-subscriptions-list`,
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({ customer_id: stripeClientId }),
  //           }
  //         );

  //         const subscriptionData = await subscriptionResponse.json();

  //         // // You can use subscriptionData as needed, for example:
  //         // customer.subscriptions = subscriptionData.data;

  //         console.log("Subscription Daata is", subscriptionData.data)

  //     if (!subscriptionResponse.ok) {
  //       throw new Error(`HTTP error! status: ${subscriptionResponse.status}`);
  //     }

  //     if (subscriptionData?.data?.length > 0) {
  //           const subscriptionId = subscriptionData.data[0].id;

  //           // Call delete subscription API
  //           const deleteResponse = await fetch(`/api/delete-subscription`, {
  //               method: "DELETE",
  //               headers: {
  //                   "Content-Type": "application/json",
  //               },
  //               body: JSON.stringify({ subscriptionId }),
  //           });

  //           if (!deleteResponse.ok) {
  //               throw new Error(`HTTP error! status: ${deleteResponse.status}`);
  //           }

  //           const deleteResult = await deleteResponse.json();
  //           console.log("Subscription deleted successfully:", deleteResult);
  //       } else {
  //           console.log("No subscriptions found to delete");
  //       }
  //   } catch (error) {
  //     console.error('Error creating subscription:', error);
  //   }
  // };

  const handleCancelSubscription = async () => {
    try {
      setIsLoading(true);
      const subscriptionResponse = await fetch(
        `/api/client-subscriptions-list`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ customer_id: stripeClientId }),
        },
      );

      const subscriptionData = await subscriptionResponse.json();

      // // You can use subscriptionData as needed, for example:
      // customer.subscriptions = subscriptionData.data;

      console.log("Subscription Daata is", subscriptionData.data);

      if (!subscriptionResponse.ok) {
        throw new Error(`HTTP error! status: ${subscriptionResponse.status}`);
      }

      if (subscriptionData?.data?.length > 0) {
        const subscriptionId = subscriptionData.data[0].id;

        // Call delete subscription API
        const deleteResponse = await fetch(`/api/delete-subscription`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subscriptionId }),
        });

        if (!deleteResponse.ok) {
          throw new Error(`HTTP error! status: ${deleteResponse.status}`);
        }

        const deleteResult = await deleteResponse.json();
        console.log("Subscription deleted successfully:", deleteResult);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.log("No subscriptions found to delete");
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleChangeStatus();
  }, [changeStatus]);

  useEffect(() => {
    const fetchData = async () => {
      if (stripeClientId) {
        try {
          // Fetch client secret
          const setupIntentResponse = await fetch("/api/setup-intent", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ customer_id: stripeClientId }), // Replace with actual customer ID
          });

          const { clientSecret } = await setupIntentResponse.json();
          setClientSecret(clientSecret);

          // Fetch payment methods
          const paymentMethodsResponse = await fetch("/api/payment-methods", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ customer_id: stripeClientId }), // Replace with actual customer ID
          });

          const { data } = await paymentMethodsResponse.json();
          console.log("Payment Data is: ", data[0]?.id);
          setSelectedMethodId(data[0]?.id); // Assuming `data` contains the payment methods
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [stripeClientId]);


  useEffect(() => {
    // console.log(changeStatus)
    handleChangeStatus();
    getClientStripe();

    if (changeStatus.job_status === "hired") {
      console.log("JOB STATUS CHANGED TO ", changeStatus.job_status);

      if (stripeClientId && selectedMethodId != "") {
        handleSubscription();
      }
      //stripeClientId
    } else if (
      changeStatus.job_status === "open" ||
      changeStatus.job_status === "trial" ||
      changeStatus.job_status === "close"
    ) {
      if (stripeClientId) {
        handleCancelSubscription();
      }
    }
  }, [changeStatus, stripeClientId, selectedMethodId]);

  useEffect(() => {
    if (subscriptionId) {
      handleHiring();
    }
  }, [subscriptionId, changeStatus]);

    
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
          <div className="experience text-center">
            {job?.job_status?.toLowerCase() === "hired" ? "-" : daysPassed}
          </div>

          <div className="flex flex-col text-center">
            <div className="flex-1">
              {isLoading ? (
                // Loader Icon displayed when loading
                <div className="flex items-center justify-center rounded-5xl bg-blue-800 py-3">
                  <LoaderIcon className="text-5xl" />
                </div>
              ) : (
                // Change Status Dropdown displayed when not loading
                <ChangeStatusDropdown
                  options={options}
                  placeholder="Change Job Status"
                  onPress={(selected_status) => {
                    setIsLoading(true); // Start loader

                    let response_status = null;

                    if (selected_status === "open") {
                      response_status = "decline";
                    } else if (
                      selected_status === "trial" ||
                      selected_status === "hired"
                    ) {
                      response_status = "accept";
                    } else if (selected_status === "close") {
                      response_status = "close";
                    }

                    setChangeStatus({
                      customer_id: candidate?.customer_id,
                      job_posting_id: job?.job_posting_id,
                      client_id: client?.client_id,
                      job_status: selected_status,
                      talent_status: selected_status,
                      response_status,
                    });

                    // // Simulate API call delay (remove after integrating real API)
                    setTimeout(() => {
                      setIsLoading(false);
                      autoRefresh();
                    }, 1000);
                  }}
                  className="text-sm font-bold"
                />
              )}
            </div>
          </div>
        </Table.Row>
      </div>
    </>
  );
}

export default AdminCandidatesClientsHiringRow;
