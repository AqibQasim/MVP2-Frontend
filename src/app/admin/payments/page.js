"use client"

import AdminJobsList from "@/components/AdminJobsList";
import { getJobs } from "@/lib/data-service";
import { useState } from "react";
import CustomersList from "@/components/CustomersList";

async function page() {

  return (
    <>
    
      <CustomersList/>
    </>
  );
}

export default page;
