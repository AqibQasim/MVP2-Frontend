"use client";

import CustomersList from "@/components/CustomersList";
import WithAdminAuth from "@/components/withAdminAuth";

async function Page() {
  return (
    <>
      <CustomersList />
    </>
  );
}

export default WithAdminAuth(Page);
