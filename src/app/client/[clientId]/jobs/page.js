"use client"
import ClientJobsTable from "@/components/ClientJobsTable";
import { usePathname } from "next/navigation";

function Page() {
  const pathname = usePathname();
  
  const client_id= pathname.split('/')[2]

  return (
    <>
      <ClientJobsTable client_id={client_id}/>
    </>
  );
}

export default Page;
