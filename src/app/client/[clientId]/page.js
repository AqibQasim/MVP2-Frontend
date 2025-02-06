"use client";
import ClientEmployeesTable from "@/components/ClientEmployeesTable";
import ClientEmptyScreen from "@/components/ClientEmptyScreen";
import ClientJobsOverviewTable from "@/components/ClientJobsOverviewTable";
import ClientProfileInfo from "@/components/ClientProfileInfo";
import ClientRecommendationCard from "@/components/ClientRecommendationCard";
import DashboardSection from "@/components/DashboardSection";
import {
  getClientById,
  getClientJobs,
  getRecommendedCandidateOfClient,
} from "@/lib/data-service";
import { sendNotification } from "@/utils/notification";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const router = useRouter();
  const filter = "accept";
  const [client, setClient] = useState(null);
  const [recommendedCandidates, setRecommendedCandidates] = useState(null);
  const [jobs, setJobs] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const clientData = await getClientById(params.clientId);
        setClient(clientData);

        const recommendedData = await getRecommendedCandidateOfClient(
          params.clientId,
        );
        setRecommendedCandidates(recommendedData);

        const jobsData = await getClientJobs(params.clientId);
        setJobs(jobsData?.slice(0, 3));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(
      "recommended Candidates are this:",
      recommendedCandidates?.client_response,
    );
  }, [recommendedCandidates]);

  if (isLoading)
    return (
      <div className="flex size-full items-center justify-center">
        <div class="loader2"></div>
      </div>
    );

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

  console.log("this loader", isLoading);

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
