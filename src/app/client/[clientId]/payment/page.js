"use client";
import ClientPaymentHistorySummary from "@/components/ClientPaymentHistorySummary";
import ClientPaymentHistoryTable from "@/components/ClientPaymentHistoryTable";
import ClientPaymentMethod from "@/components/ClientPaymentMethod";
import { usePathname } from "next/navigation";
import React from "react";

const client_payment_history = [
  {
    name: "Richard Feyman",
    amount: "$4000",
    status: "paid",
    invoice: "10A3011F-0020",
  },
  {
    name: "Richard Feyman",
    amount: "$4000",
    status: "paid",
    invoice: "10A3011F-0020",
  },
  {
    name: "Richard Feyman",
    amount: "$4000",
    status: "paid",
    invoice: "10A3011F-0020",
  },
];

function page() {
  const client_id = usePathname()[2];
  return (
    <div className="max-w-full space-y-2">
      <ClientPaymentHistorySummary
        client_id={client_id}
        total_payment_by_client={3600}
        total_hires={9}
        next_payment={"15 July 2024 - 0.00"}
        last_payment={`${"$16,000 - 1st july 2024 - 00.00"}`}
      />
      <ClientPaymentMethod />
      <ClientPaymentHistoryTable
        client_id={client_id}
        paymentHistory={client_payment_history}
      />
    </div>
  );
}

export default page;
