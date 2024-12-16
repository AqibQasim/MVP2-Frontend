"use client";
import CandidateIdPage from "@/components/CandidateIdPage";
import CandidateProfileInfo from "@/components/CandidateProfileInfo";
import { getCandidateById, getCandidates } from "@/lib/data-service";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { sendNotification } from "@/utils/notification";

async function Page({ params }) {
  const router = useRouter();
  useEffect(() => {
    // console.log("Requesting notification permission...");
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("MVP_CLIENT_LOGGEDIN") === "true";

    if (!isLoggedIn && router.pathname !== "/login") {
      router.replace("/login");
    }
  }, [router]);
  //const candidates = await getCandidates();
  const candidate = await getCandidateById(params.candidateId);
  //console.log("Candidates on Page", candidates);

  console.log("candidates are :", candidate);


  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const isAcceptedNotification = await Notification.requestPermission();
      if (isAcceptedNotification === "granted") {
        sendNotification(params?.candidateId, "candidate");
      } else {
        console.warn("notification permission denied");
      }
    } else {
      console.error("This browser does not support notifications.");
    }
  };

  return (
    <>
      <CandidateIdPage candidate={candidate} candidateId={params.candidateId} />
    </>
  );
}

export default Page;
