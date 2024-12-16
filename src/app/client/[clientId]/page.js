"use client";
import ClientEmployeesTable from "@/components/ClientEmployeesTable";
import ClientEmptyScreen from "@/components/ClientEmptyScreen";
import ClientJobsOverviewTable from "@/components/ClientJobsOverviewTable";
import ClientRecommendationCard from "@/components/ClientRecommendationCard";
import DashboardSection from "@/components/DashboardSection";
import EmptyScreen from "@/components/EmptyScreen";
import {
  getAllRecommendedCandidates,
  getClientById,
  getClientJobs,
  getRecommendedCandidateOfClient,
} from "@/lib/data-service";
import urlBase64ToUint8Array from "@/utils/urlBase64ToUint8Array";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default async function Page({ params }) {
  const router = useRouter();
  const filter = "accept";
  const [client, setClient] = useState(null);
  const [recommendedCandidates, setRecommendedCandidates] = useState(null);
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    // console.log("Requesting notification permission...");
    requestNotificationPermission();
  }, []);

  const sendNotification = () => {
    // if ("Notification" in window) {
    //   console.log("Sending notification...");
    //   new Notification("Hello!", {
    //     body: "This is your notification.",
    //     //icon: "/icon.png", // Optional: Add an icon
    //   });
    // } else {
    //   console.error("Notifications are not supported in this browser.");
    // }
    if (
      "serviceWorker" in navigator &&
      "PushManager" in window
    ) {
      navigator.serviceWorker
        .register("/sw.js", {
          scope: "/",
        })
        .then(async (swRegistration) => {
          const existingSubscription =
            await swRegistration.pushManager.getSubscription();
          if (existingSubscription) {
            // Unsubscribe if the applicationServerKey is different
            console.log("Unsubscribing existing subscription...");
            await existingSubscription.unsubscribe();
          }
          const subscription = await swRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
            ),
          });
          console.log("Push subscription:", subscription);
          // Send the subscription object to your backend
          fetch(`${process.env.NEXT_PUBLIC_API_REMOTE_URL}/subscribe`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              subscription,
              user_id: params.clientId,
              user_role: "client"
            }),
          }).then(async (res) => {
            console.log(await res.json());
          });
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  };

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const isAcceptedNotification = await Notification.requestPermission();
      if (isAcceptedNotification === "granted") {
        sendNotification();
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
      setJobs(v);
    });
  }, []);

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
      {recommendedCandidates?.customer &&
        recommendedCandidates?.job_postings && (
          <ClientRecommendationCard
            admin_hourly_rate={recommendedCandidates?.hourly_rate}
            client={client}
            recommendedCandidate={recommendedCandidates?.customer}
            recommendedForJob={recommendedCandidates?.job_postings}
          />
        )}
      {jobs && <ClientJobsOverviewTable jobs={jobs} />}
      {<ClientEmployeesTable client_id={params?.clientId} />}
    </div>
  );
}
