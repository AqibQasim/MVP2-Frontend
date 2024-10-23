"use client";
import ClientSettings from "@/components/ClientSettings";
import { getClientById } from "@/lib/data-service";
import { useCallback, useEffect, useState, useMemo } from "react";

async function Page({ params }) {
  const clientId = params.clientId;
  const [fetchedClient, setFetchedClient] = useState(null);

  // Fetch client data with useCallback and clientId as dependency
  const fetchClient = useCallback(async () => {
    const clientData = await getClientById(clientId);
    setFetchedClient(clientData);
  }, [clientId]);

  // Fetch data when component mounts or when clientId changes
  useEffect(() => {
    fetchClient();
  }, [fetchClient]);

  // Memoize fetchedClient to prevent unnecessary re-renders of ClientSettings
  const memoizedClient = useMemo(() => fetchedClient, [fetchedClient]);

  console.log("fetched client...............");

  // Only render ClientSettings if fetchedClient is not null
  return (
    <>
      {memoizedClient && <ClientSettings client={memoizedClient} />}
    </>
  );
}

export default Page;
