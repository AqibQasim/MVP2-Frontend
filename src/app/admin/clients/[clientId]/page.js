"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
//import ButtonBack from "./ButtonBack";
import Capsule from "@/components/Capsule";
import ClientPaymentHistoryTable from "@/components/ClientPaymentHistoryTable";
import DetailTag from "@/components/DetailTag";
import EntityCard from "@/components/EntityCard";
import Heading from "@/components/Heading";
import Hr from "@/components/Hr";
import IconWithBg from "@/components/IconWithBg";
//import TalentDescription from "./TalentDescription";
import EmailSvg from "../../../../../public/icons/email.svg";
import phone from "../../../../../public/icons/Call.png";

import { cityTimezoneOffset } from "@/utils/cityTimezoneOffset";
import { formatDate } from "@/utils/utility";
import ButtonCapsuleWhite from "@/components/ButtonCapsuleWhite";
import Image from "next/image";
import Skill from "@/components/Skill";
import AdminJobsList from "@/components/AdminJobsList";
import AdminCreateAJobModal from "@/components/AdminCreateAJobModal";
import { fetchCandidatesJobStatus } from "@/lib/data-service";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import AdminClientCandidatesTable from "@/components/AdminClientCandidatesTable";

function Page({ params }) {
  const [client, setClient] = useState(null);
  const client_id = params?.clientId;
  const [candidates, setCandidates] = useState(null);
  const [clientCharges, setClientCharges] = useState([]);
  const [clientCustomerIDs, setclientCustomerID] = useState("");

  const fetchCandidates = async () => {
    const payload = {
      endpoint: `get-job-candidates?job_status=hired-trial-interviewing&client_id=${client_id}`,
      method: "GET",
    };
    const result = await mvp2ApiHelper(payload);
    if (result?.status === 200) {
      setCandidates(result.data);
    }
  };

  useEffect(() => {
    console.log(candidates);
  }, [candidates]);

  useEffect(() => {
    let isMounted = true;
    const route = `clients`;

    async function fetchClient() {
      try {
        let res = await fetch(
          `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/${route}?client_id=${client_id}`,
        );
        const result = await res.json();
        console.log(result);
        if (result.status !== 200) throw new Error(`Error: ${result.err}`);
        if (isMounted) setClient(result.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchClient();
    fetchCandidates();

    return () => {
      isMounted = false;
    };
  }, [client_id]);

  function convertUnixToDate(unixTimestamp) {
    const milliseconds = unixTimestamp * 1000; // Convert seconds to milliseconds
    const dateObject = new Date(milliseconds);

    // Define options for toLocaleDateString
    const options = { day: "numeric", month: "long", year: "numeric" };

    return dateObject.toLocaleDateString("en-GB", options); // Format as a human-readable date string
  }

  async function getClientStripe(clientId) {
    const payload = {
      endpoint: `get-client-stripe-account?client_id=${clientId}`,
      method: "GET",
    };
    const result = await mvp2ApiHelper(payload);
    if (result.status === 200) {
      return result.data.data.stripe_id;
    }
    console.error(result?.data?.message);
    return null; // Return null or handle the error appropriately
  }

  useEffect(() => {
    const fetchClientStripe = async () => {
      const clientCustomerID = await getClientStripe(client_id);
      setclientCustomerID(clientCustomerID);

      console.log("RESULT FROM BK API", clientCustomerIDs);
    };

    fetchClientStripe();
  }, [client_id]);

  useEffect(() => {
    const fetchData = async () => {
      if (clientCustomerIDs) {
        try {
          const chargesResponse = await fetch("/api/client-charges-list", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ customer_id: clientCustomerIDs }), // Replace with actual customer ID
          });

          if (!chargesResponse.ok) {
            throw new Error(`HTTP error! status: ${chargesResponse.status}`);
          }

          const { data } = await chargesResponse.json(); // Access the data property directly
          console.log("Charges Data is: ", data); // Inspect the charges data

          // Check if data is an array
          if (!Array.isArray(data)) {
            console.error("Expected an array but got:", data);
            return;
          }

          // Transform charges data into client_payment_history format
          const transformedCharges = data.map((charge) => ({
            name: charge.billing_details.name || "Candidate ", // Fallback if no name is available
            amount: `$${(charge.amount / 100).toFixed(2)}`, // Convert from cents to dollars
            status: charge.status, // 'paid', 'pending', etc.
            invoice: charge.id, // Assuming invoice refers to the charge id
            receipt_url: charge.receipt_url,
            date: convertUnixToDate(charge.created),
          }));

          setClientCharges(transformedCharges);
        } catch (error) {
          console.error("Error fetching charges:", error);
        }
      }
    };

    fetchData();
  }, [clientCustomerIDs]); // Ensure `useEffect` is properly configured to run only once on mount

  if (!client) return <div>Loading...</div>;

  return (
    <>
      <div
        className={`"min-h-auto mb-2" : "min-h-full"} space-y-4 rounded-3xl bg-neutral-white p-6`}
      >
        <div className="top flex items-center justify-between gap-3">
          {/* <ButtonBack /> */}
          <div>
            <ButtonCapsuleWhite />
            <Heading sm>Client Profile</Heading>
          </div>
          {/* <Capsule className="ml-auto !bg-grey-primary-tint-90 !text-primary-tint-10">
            {talent?.talent_status} {formatDate(talent?.updatedAt)} -{" "}
            {newEndTrialDate}
          </Capsule> */}
        </div>
        <Hr />
        <div className="mini-profile flex items-center justify-start">
          <EntityCard
            entity={{
              image: "/avatars/avatar-2.png",
              name: client?.name,
              //   profession: talent?.specialization,
            }}
          />
          {/* <Capsule className="ml-auto mt-auto" icon={<IconWithBg icon="$" />}>
            ${talent?.hourly_rate}hr
          </Capsule> */}
        </div>

        {/* <TalentDescription
          description={talent?.job_postings?.description}
          skills={talent?.job_postings?.skills}
        /> */}

        <div className="flex h-auto justify-between space-y-5">
          <div className="flex-1">
            <div>
              <Heading xm>About</Heading>
              <Capsule
                className="flex w-fit flex-wrap items-center gap-2"
                style={{ textTransform: "lowercase" }}
              >
                <Image src={EmailSvg} />
                {client?.email}
              </Capsule>
              <Capsule className="mt-5 flex w-fit flex-wrap items-center gap-2">
                <Image src={phone} />
                {client?.contact_no || "No Contact number given"}
              </Capsule>
            </div>

            <div className="mt-3">
              <Heading xm className="mb-3">
                Company Details
              </Heading>
              <DetailTag
                icon="/icons/routing.svg"
                name="Company Name: "
                content={client?.company_name || "No Company Name given"}
              />
              <br />
              <DetailTag
                icon="/icons/address.svg"
                name="Company Size: "
                content={client?.company_size || "No comapany Size given"}
              />
            </div>
          </div>
          <div className="flex-1">
            <Heading xm>Address</Heading>
            <div className="flex items-start gap-1.5">
              <div className="space-y-3">
                <DetailTag
                  icon="/icons/address.svg"
                  name="Address: "
                  content={client?.customer_location || "No address"}
                />
                <DetailTag
                  icon="/icons/routing.svg"
                  name="City State: "
                  content={
                    client?.city + client?.province || "No city/state given"
                  }
                />
                <DetailTag
                  icon="/icons/location.svg"
                  name="Address: "
                  content={client?.area_code || "No area code given"}
                />
              </div>
            </div>
          </div>
          <div />
        </div>

        <div className="mt-12 flex justify-center">
          <Capsule className="mt-20 w-[16rem]">
            <AdminCreateAJobModal clientId={client.client_id} />
          </Capsule>
        </div>
        <div>
          <div className="mt-6 space-y-4">
            {client.job_postings && (
              <div
                //key={job.job_posting_id}
                className="job-posting-card h-fit rounded-lg border border-gray-300 p-4"
              >
                <AdminJobsList
                  jobs={client.job_postings}
                  totalJobs={client.job_postings?.length}
                />
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div className="job-posting-card mt-4 h-fit rounded-lg border border-gray-300 p-4">
              <AdminClientCandidatesTable
                candidates={candidates?.data}
                totalCandidates={candidates?.data?.length}
              />
            </div>
          </div>
          <div className="space-y-4">
            <ClientPaymentHistoryTable
              client_id={client_id}
              paymentHistory={clientCharges}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
