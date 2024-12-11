"use client";
import briefcase_tick from "@/../public/icons/briefcase-tick.svg";
import calendar from "@/../public/icons/calendar.svg";
import clipboard_text from "@/../public/icons/clipboard-text.svg";
import commitment from "@/../public/icons/commitment.svg";
import copy_success from "@/../public/icons/copy-success.svg";
import dropdown from "@/../public/icons/drop-down.svg";
import note_add from "@/../public/icons/note-add.svg";
import tag from "@/../public/icons/tag-user.svg";
import timer_start from "@/../public/icons/timer-start.svg";
import ButtonCapsuleWhite from "@/components/ButtonCapsuleWhite";
import EntityCard from "@/components/EntityCard";
import Heading from "@/components/Heading";
import Hr from "@/components/Hr";
import Skill from "@/components/Skill";
import TagCard from "@/components/TagCard";
import TalentDescription from "@/components/TalentDescription";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import { cityTimezoneOffset } from "@/utils/cityTimezoneOffset";
import { formatDate } from "@/utils/utility";
import { fetchRecommendedCandidates, getClientById } from "@/lib/data-service";
import Image from "next/image";
import CapsuleLink from "./CapsuleLink";
//
import { useCallback, useEffect, useMemo, useState } from "react";
import SkillIconWithBg from "./SkillIconWithBg";
import Table from "./Table";
import ChangeStatusDropdown from "./ChangeStatusDropdown";
import { useSelector } from "react-redux";
import LoaderIcon from "@/svgs/LoaderIcon";
import Capsule from "./Capsule";
import { useRouter } from "next/navigation";
import Modal from "./Modal";

function AdminJobViewById({ job, setShowForm }) {
  const [isShowMoreEnabled, setIsShowMoreEnabled] = useState(false);
  const [isReadMoreEnabled, setIsReadMoreEnabled] = useState(false);
  const [jobQuestionLength, setJobQuestionLength] = useState(1);
  const [assignedCandidates, setassignedCandidates] = useState(null);
  const [client, setClient] = useState(null);

  const [selectedMethodId, setSelectedMethodId] = useState("");
  const [subscriptionId, setSubcriptionId] = useState("");
  const [clientSecret, setClientSecret] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const autoRefresh = () => {
    router.refresh();
  };

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

  // const selectedMethodId = useSelector(
  //   (state) => state.payment.selectedMethodId,
  // );

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
    [
      changeStatus.client_id,
      changeStatus.customer_id,
      changeStatus.job_posting_id,
      changeStatus.job_status,
      changeStatus.talent_status,
      changeStatus.response_status,
    ],
  );

  const handleChangeStatus = //useCallback(
    async () => {
      console.log(changeStatus);
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
          console.log(changeStatus);
          const result = await mvp2ApiHelper(payload);
          console.log(result);
        } catch (error) {
          console.error(error);
        }
        // finally {
        //   setIsLoading(false);
        // }
      }
    }; //, [payload]);

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
    const customPrice = assignedCandidates.hourly_rate * 100 * 40;

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
    const customPrice = assignedCandidates.hourly_rate * 100 * 40;

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
    job?.job_status === "trial" ? "bg-red-600 rounded-lg" : "";

  useEffect(() => {
    if (!job?.client_id) return;

    let isMounted = true;
    getClientById(job.client_id)
      .then((data) => {
        if (isMounted) setClient(data);
      })
      .catch((error) => console.error("Error fetching client details:", error));

    return () => {
      isMounted = false;
    };
  }, [job?.client_id]);

  const fetchAssignedCustomerForJob = useCallback(async () => {
    if (job?.assigned_customer && Array.isArray(job?.assigned_customer)) {
      const payload = {
        endpoint: `customers?customer_id=${job?.assigned_customer[0].customer_id}`,
        method: "GET",
      };
      mvp2ApiHelper(payload).then((value) => {
        //console.log(value)
        if (value.status === 200) {
          setassignedCandidates(value?.data?.data);
        }
      });
    }
  }, [job?.assigned_customer]);

  //   const fetchJob = () => {
  //     const payload = {
  //       endpoint: `get-jobs?job_posting_id=${job?.job_posting_id}&talent_status=hired`,
  //       method: 'GET'
  //     }
  //     mvp2ApiHelper(payload).then(value => {
  //       //console.log(value)
  //       if (value.status === 200) {
  //         setassignedCandidates(value?.data?.data)
  //       }
  //     })
  //   }

  useEffect(() => {
    fetchAssignedCustomerForJob();
  }, []);

  useEffect(() => {
    console.log(assignedCandidates);
  }, [assignedCandidates]);

  const handleShowMore = () => {
    setIsShowMoreEnabled((value) => !value);
  };

  const handleReadMore = () => {
    setIsReadMoreEnabled((value) => !value);
    if (isReadMoreEnabled) {
      setJobQuestionLength(job.application_questions.length);
    } else {
      setJobQuestionLength(1);
    }
  };

  //   const createApplicationQuestions = useCallback(
  //     ({ job_questions, length }) => {
  //       const questions = [];

  //       for (let i = 0; i < length; i++) {
  //         console.log(i);
  //         questions.push(
  //           <div
  //             key={i}
  //             className="flex flex-row gap-1"
  //             style={{ color: "#A3A3A3" }}
  //           >
  //             <div className="w-4">
  //               <div>{i + 1}. </div>
  //             </div>
  //             <div className="w-auto">{job_questions[i]}</div>
  //           </div>,
  //         );
  //       }

  //       return questions;
  //     },
  //     [jobQuestionLength],
  //   );



  return (
    <>
      <div className="flex flex-row gap-2">
        <div className="flex-1 rounded-3xl bg-white p-4">
          <div className="w-auto">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center gap-3">
                <ButtonCapsuleWhite />
                <Heading sm>{job?.position}</Heading>
                <div>
                  {isLoading ? (
                    // Loader Icon displayed when loading
                    <div className="flex items-center justify-center rounded-5xl bg-blue-800 py-3">
                      <LoaderIcon className="text-5xl" />
                    </div>
                  ) : assignedCandidates &&
                    assignedCandidates?.talent_status !== "open" ? (
                    // Change Status Dropdown displayed when not loading
                    <ChangeStatusDropdown
                      options={options}
                      placeholder="Change Job Status"
                      className="mr-6"
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

                        setChangeStatus((prev) => ({
                          ...prev,
                          customer_id: assignedCandidates?.customer_id,
                          job_posting_id: job?.job_posting_id,
                          client_id: job?.client_id,
                          job_status: selected_status,
                          talent_status: selected_status,
                          response_status,
                        }));

                        setIsLoading(false);
                        autoRefresh();
                      }}
                    />
                  ) : null}
                </div>
                <Heading toxm>
                  <div>Job Status :</div>
                  <div>{job?.job_status}</div>
                </Heading>
              </div>
            </div>
            <Hr />
            <div className="mx-5 mb-6 flex justify-between">
              <Heading className="font-semibold !text-[#8992A3]" toxm>
                Client : {client ? client.name : "Loading..."}
              </Heading>
              <CapsuleLink
                className="ml-auto"
                href={`/admin/clients/${job?.client_id}`}
                // href={window.location.href + `/${client?.client_id}`}
              >
                {" "}
                view details{" "}
              </CapsuleLink>
            </div>
            <TalentDescription
              description={job.description}
              isShowMoreEnabled={isShowMoreEnabled}
              skills={job.skills}
            />
            {job.description.length > 300 && (
              <div className="m-3">
                <button
                  className="weigh flex w-36 flex-row items-center justify-around rounded-3xl border-[1px] px-4 py-3 text-[14px] text-primary"
                  onClick={handleShowMore}
                >
                  {isShowMoreEnabled ? "Show Less" : "Show More"}
                  <Image alt="dropdown" src={dropdown} />
                </button>
              </div>
            )}

            <div className="gap-8">
              <div className="flex flex-row flex-wrap">
                <div className="h-auto">
                  <TagCard
                    icon={note_add}
                    title={"Est. Length"}
                    answer={job.project_length}
                  />

                  <TagCard
                    icon={clipboard_text}
                    title={"Job Posted"}
                    answer={formatDate(job.createdAt)}
                  />

                  <TagCard
                    icon={briefcase_tick}
                    title={"Job Type"}
                    answer={job.job_type}
                  />
                  <TagCard
                    icon={copy_success}
                    title={"Workday Overlap"}
                    answer={job.workday_overlap}
                  />
                </div>

                <div className="h-auto">
                  <TagCard
                    icon={tag}
                    title={"Specialization"}
                    answer={job?.position ?? "[job specialization]"}
                  />

                  <TagCard
                    icon={commitment}
                    title={"Commitment"}
                    answer={job.commitment}
                  />

                  <TagCard
                    icon={calendar}
                    title={"Desired Start Date"}
                    answer={formatDate(job.start_date)}
                  />

                  <TagCard
                    icon={timer_start}
                    title={"Time zone"}
                    answer={cityTimezoneOffset(job.location)}
                  />
                </div>
              </div>
            </div>

            <Hr />
          </div>
        </div>
        <div className="w-[23.375rem] items-center justify-center rounded-[36px] bg-white p-3">
          <div className="flex h-auto w-auto flex-row items-center justify-between">
            <Heading className="text-[24px]">Assigned Candidate</Heading>
          </div>
          <Hr />
          {assignedCandidates ? (
            <div className="mb-3 w-full gap-3 rounded-xl">
              <div className="flex flex-row">
                <div className="flex flex-1 items-center justify-between border-[1px] border-[#F9F8FC]">
                  <EntityCard
                    entity={{
                      name: assignedCandidates?.name,
                      profession: assignedCandidates?.specialization,
                      image: "/avatars/avatar-1.png",
                    }}
                  />
                </div>
                <div className="skills flex items-center gap-1.5 text-center">
                  {assignedCandidates?.expertise?.map((skill, i) => (
                    <>
                      <Skill key={i} skill={skill?.skill} />
                    </>
                  ))}
                </div>
              </div>

              <CapsuleLink
                className="mx-3 mt-5"
                href={`/admin/candidates/${assignedCandidates?.customer_id}`}
                // href={`/client/${clientId}/jobs/${job.job_posting_id}`}
                //  href={`/client/${clientId}/jobs/${job.job_posting_id}`}
              >
                {" "}
                view details{" "}
              </CapsuleLink>
              {assignedCandidates?.talent_status !== "open" ? (
                <div className="mx-3 mt-5">
                  Status : {assignedCandidates?.talent_status}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="align-center flex w-full flex-col justify-center">
              <div>There&apos;s no assigned candidates yet</div>
              <div
                onClick={() => setShowForm(true)}
                className="cursor-pointer text-primary"
              >
                Click here to Assign
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminJobViewById;
