"use client"

import { getDummyClientById, getDummyClients } from "@/lib/tempData";
import ClientRecommendationCard from "@/components/ClientRecommendationCard";

import Overlay from "@/components/Overlay";
import { useEffect, useState } from "react";
import InterViewScheduler from "./InterviewScheduler";

const ClientPage = async  ({params}) => {
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [client, setClient] = useState(null);

    const handleOpenOverlay = () => {
      setOverlayVisible(true);
    };
  
    const handleCloseOverlay = () => {
      setOverlayVisible(false);
    };

    useEffect(() => {
      const fetchClient = async () => {
        const fetchedClient = await getDummyClientById(params.clientId);
        setClient(fetchedClient);
      };
  
      fetchClient();
    }, [params.clientId]);
  
    useEffect(() => {
      console.log('[isOverlayVisible]:', isOverlayVisible);
    }, [isOverlayVisible]);
  
    // if (!client) return <div>Loading...</div>;
  
    // const client = await getDummyClientById(params.clientId);
    
    // useEffect(() => {
    //   console.log('[isOverlayVisible]:', isOverlayVisible);
    // }, [isOverlayVisible]);
  
    if (!client) return <div>Loading...</div>;

    return (
      <>
        <ClientRecommendationCard handleOpenOverlay={handleOpenOverlay} client={client} />
        <Overlay isVisible={isOverlayVisible} onClose={handleCloseOverlay}>
          <InterViewScheduler />
        </Overlay>
      </>
    );
}
export default ClientPage;