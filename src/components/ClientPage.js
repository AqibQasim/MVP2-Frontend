"use client";

import ClientRecommendationCard from "@/components/ClientRecommendationCard";
import Overlay from "@/components/Overlay";
import { getDummyClientById } from "@/lib/tempData";
import { useEffect, useState } from "react";
import ClientJobsTable from "./ClientJobsTable";
import InterViewScheduler from "./InterviewScheduler";
import SuccessModal from "./SuccessModal";

const ClientPage = async ({ params }) => {
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [client, setClient] = useState(null);
  const [successAcknowledge, setSuccessAcknowledge] = useState(false);

  const handleSuccessAcknowledge = () => {
    setSuccessAcknowledge(!successAcknowledge);
  };

  const handleOpenOverlay = () => {
    setOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setOverlayVisible(false);
    setSuccessAcknowledge(false);
  };

  useEffect(() => {
    const fetchClient = async () => {
      const fetchedClient = await getDummyClientById(params.clientId);
      setClient(fetchedClient);
    };

    fetchClient();
  }, [params.clientId]);

  useEffect(() => {
    console.log("[isOverlayVisible]:", isOverlayVisible);
  }, [isOverlayVisible]);

  if (!client) return <div>Loading...</div>;

  // ALL THE CONTENT FOR THE PROPS.z

  const mainHeading = (
    <span>
      Your call & job request successfully{" "}
      <span
        style={{
          backgroundImage: "linear-gradient(to right, #4624E0, white)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline",
        }}
      >
        sent.
      </span>
    </span>
  );

  let text = (
    <>
      Our representor will soon contact you. You’ll receive an email on{" "}
      <span className="font-semibold">janedoe@gmail.com</span>
    </>
  );

  return (
    <>
      <div className="space-y-2">
        <ClientRecommendationCard
          handleOpenOverlay={handleOpenOverlay}
          client={client}
        />
        <ClientJobsTable />
      </div>
      <Overlay isVisible={isOverlayVisible}>
        {successAcknowledge ? (
          <>
            <SuccessModal
              mainHeading={mainHeading}
              text={text}
              onClose={handleCloseOverlay}
            />
          </>
        ) : (
          <>
            <InterViewScheduler
              onSuccessAck={handleSuccessAcknowledge}
              onClose={handleCloseOverlay}
            />
          </>
        )}
      </Overlay>
    </>
  );
};
export default ClientPage;
