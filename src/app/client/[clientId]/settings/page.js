import ClientSettings from "@/components/ClientSettings";
import { getClientById } from "@/lib/data-service";

async function Page({ params }) {
  const clientId = params.clientId;
  const client = await getClientById(clientId);

  console.log("client is :", { client });

  return (
    <>
      <ClientSettings client={client} />
    </>
  );
}

export default Page;
