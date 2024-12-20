import TalentIdPage from "@/components/TalentIdPage";
import { getCandidateById, getClientById } from "@/lib/data-service";

async function Page({ params }) {
  const client_id = params.clientId;
  const customer_id = params.talentId;

  const [client, customer] = await Promise.all([
    getClientById(client_id),
    getCandidateById(customer_id),
  ]);

  console.log("CLI:", client_id);
  console.log("CUS:", customer_id);

  return (
    <>
      <TalentIdPage
        clientCity={client?.city}
        client_id={client_id}
        customer_id={customer_id}
      />
    </>
  );
}

export default Page;
