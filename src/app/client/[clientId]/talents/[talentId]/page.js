import TalentIdPage from "@/components/TalentIdPage";

function Page({ params }) {
  const client_id = params.clientId;
  const customer_id = params.talentId;

  console.log("CLI:", client_id);
  console.log("CUS:", customer_id);

  return (
    <>
      <TalentIdPage client_id={client_id} customer_id={customer_id} />
    </>
  );
}

export default Page;
