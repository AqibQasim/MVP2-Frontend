"use client"

import AdminJobsList from "@/components/AdminJobsList";
import { getJobs } from "@/lib/data-service";
import { useState } from "react";
import CustomersList from "@/components/CustomersList";

async function Page() {

  return (
    <>
    
      <CustomersList/>
    </>
  );
}

export default Page;
