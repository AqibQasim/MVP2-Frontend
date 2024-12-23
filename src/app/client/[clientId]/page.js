"use client";
import ClientEmployeesTable from "@/components/ClientEmployeesTable";
import ClientEmptyScreen from "@/components/ClientEmptyScreen";
import ClientJobsOverviewTable from "@/components/ClientJobsOverviewTable";
import ClientProfileInfo from "@/components/ClientProfileInfo";
import ClientRecommendationCard from "@/components/ClientRecommendationCard";
import DashboardSection from "@/components/DashboardSection";
import EmptyScreen from "@/components/EmptyScreen";
import {
  getAllRecommendedCandidates,
  getClientById,
  getClientJobs,
  getRecommendedCandidateOfClient,
} from "@/lib/data-service";
import { sendNotification } from "@/utils/notification";
import urlBase64ToUint8Array from "@/utils/urlBase64ToUint8Array";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const router = useRouter();
  const filter = "accept";
  const [client, setClient] = useState(null);
  const [recommendedCandidates, setRecommendedCandidates] = useState(null);
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    // console.log("Requesting notification permission...");
    requestNotificationPermission();
  }, []);

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const isAcceptedNotification = await Notification.requestPermission();
      if (isAcceptedNotification === "granted") {
        sendNotification(params?.clientId, "client");
      } else {
        console.warn("notification permission denied");
      }
    } else {
      console.error("This browser does not support notifications.");
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("MVP_CLIENT_LOGGEDIN") === "true";

    if (!isLoggedIn && router.pathname !== "/login") {
      router.replace("/login");
    } else if (isLoggedIn && router.pathname === "/login") {
      router.replace(`/client/${params.clientId}`);
    }
  }, [router]);

  useEffect(() => {
    getClientById(params.clientId).then((v) => {
      setClient(v);
    });
    getRecommendedCandidateOfClient(params.clientId).then((v) => {
      setRecommendedCandidates(v);
    });
    getClientJobs(params.clientId).then((v) => {
      setJobs(v?.slice(0, 3));
    });
  }, []);

  useEffect(() => {
    console.log(
      "recommended Candidates are this:",
      recommendedCandidates?.client_response,
    );
  }, [recommendedCandidates]);

  if (
    (client && !client?.company_name) ||
    !client?.company_size ||
    !client?.country ||
    !client?.city
  ) {
    return (
      <ClientProfileInfo
        clientName={client?.name}
        clientEmail={client?.email}
      />
    );
  }

  if (
    !recommendedCandidates?.customer &&
    !recommendedCandidates?.job_postings &&
    jobs &&
    jobs?.length === 0
  ) {
    // return <EmptyScreen className={'h-full'}/>
    return (
      <DashboardSection paragraph="" heading="">
        {" "}
        <ClientEmptyScreen />{" "}
      </DashboardSection>
    );
  }

  return (
    <div className="space-y-2">
      {recommendedCandidates?.customer && (
        <ClientRecommendationCard
          admin_hourly_rate={recommendedCandidates?.hourly_rate}
          client={client}
          scheduleInterview={recommendedCandidates?.client_response}
          recommendedCandidate={recommendedCandidates?.customer}
          recommendedForJob={recommendedCandidates?.job_postings}
        />
      )}
      {jobs && <ClientJobsOverviewTable jobs={jobs} />}
      {<ClientEmployeesTable client_id={params?.clientId} />}
    </div>
  );
}
