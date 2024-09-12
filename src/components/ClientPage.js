"use client"

import { getDummyClientById, getDummyClients } from "@/lib/tempData";
import ClientRecommendationCard from "@/components/ClientRecommendationCard";
import ClientJobsTable from "./ClientJobsTable";
import Overlay from "@/components/Overlay";
import { useEffect, useState } from "react";
// import InterViewScheduler from "./CallScheduler";
import SuccessModal from "./SuccessModal";
import CallScheduler from "./CallScheduler";
import { useData } from "@/contexts/DataContext";
import InterViewScheduler from "./InterviewSchedule";

const ClientPage = async ({ params }) => {

  // const { isOverlayVisible, setOverlayVisible, isCallClick, setIsCallClick } = useData();
  const { isOverlayVisible, setOverlayVisible, overlayType, setOverlayType } = useData();



  // const [client, setClient] = useState(null);
  const [successAcknowledge, setSuccessAcknowledge] = useState(false);
  const [isCallScheduling, setIsCallScheduling] = useState(false);

  const [client, setClient] = useState(null);


  const handleOpenInterviewScheduler = () => {
    setOverlayType('interviewScheduler');
    setOverlayVisible(true);
  };

  const handleSuccessAcknowledge = () => {
    setSuccessAcknowledge(!successAcknowledge);
  }

  const handleInterviewOverlay = () => {
    setOverlayVisible(true);
    setIsCallScheduling(true);
  };

  const handleInterviewOverlayClose = () => {
    setOverlayVisible(false);
    setSuccessAcknowledge(false);
  };

  const handleOpenOverlay = () => {
    setIsCallClick(false);
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
    console.log("[DATA IN CLIENT PAGE]:", isOverlayVisible, "[OVERLAY TYPE]:",overlayType);
  }, [isOverlayVisible, overlayType]);

  if (!client) return <div>Loading...</div>;
  const mainHeading = <span>Your call & job request successfully <span style={{
    backgroundImage: 'linear-gradient(to right, #4624E0, white)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline'

  }}>sent.</span></span>;

  let text = <>Our representor will soon contact you. You’ll receive an email on <span className="font-semibold">janedoe@gmail.com</span></>;

  return (
    <>
      <div className="space-y-2">
        <ClientRecommendationCard
          handleInterviewOverlay={handleOpenInterviewScheduler} handleInterviewOverlayClose={handleInterviewOverlay} handleOpenOverlay={handleOpenInterviewScheduler} client={client} />
        <ClientJobsTable />
      </div>
      {
        isOverlayVisible && <Overlay>
          {
            successAcknowledge ? (
              <>
                <SuccessModal
                  mainHeading={mainHeading}
                  text={text}
                  onClose={handleCloseOverlay} />
              </>
            ) : (overlayType === 'callScheduler' ? <CallScheduler onClose={() => setOverlayVisible(false)} />
              : overlayType === 'interviewScheduler' && <InterViewScheduler onClose={() => setOverlayVisible(false)} />
            )
          }
        </Overlay>
      }
    </>
  );
}
export default ClientPage;