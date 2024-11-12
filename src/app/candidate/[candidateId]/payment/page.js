"use client";
import CandidateAddPayment from "@/components/CandidateAddPayment";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import CandidatePaymentHistorySummary from "@/components/ClientPaymentHistorySummary";
import { useEffect, useState } from "react";
import CandidatePaymentHistoryTable from "@/components/CandidatePaymentHistoryTable";
import Heading from "@/components/Heading";
import PaymentMethodBank from "@/components/PaymentMethodBank";

export default function CandidateIdPaymentPage({ params }) {
  console.log("Candidate ID:", params?.candidateId);

  const nextPaymentDate = "20-0:00";
  const candidateCharges = "20-00:00";
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState(null);

  const getPaymentDetails = () => {
    const payload = {
      endpoint: `get-candidate-bank-account?customer_id=${params?.candidateId}`,
      method: "GET",
    };
    mvp2ApiHelper(payload)
      .then((result) => {
        if (result) {
          setPaymentDetails(result?.data?.data);
          const data = result?.data?.data;
          console.log("Payment Details fetched:", result?.data?.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching payment details:", error);
      });
  };

  const getPaymentHistory = () => {
    const payload = {
      endpoint: `get-hiring-payments?customer_id=${params?.candidateId}`,
      method: "GET",
    };
    mvp2ApiHelper(payload)
      .then((result) => {
        if (result) {
          console.log("Payment History fetched:", result?.data?.data || []);
          setPaymentHistory(result?.data?.data || []);
        }
      })
      .catch((error) => {
        console.error("Error fetching payment details:", error);
      });
  };

  useEffect(() => {
    getPaymentDetails();
    getPaymentHistory();
  }, [params?.candidateId]);

  useEffect(() => {
    console.log(`///////////${paymentDetails}`);
    console.log(`///////////${paymentHistory}`);
  }, [paymentDetails, paymentHistory]);

  return (
    <>
      {!paymentDetails ? (
        <CandidateAddPayment />
      ) : (
        <div className="space-y-2">
          <CandidatePaymentHistorySummary
            // client_id={client_id}
            // total_payment_by_client={`${totalPaymentsByClient}`}
            total_hires={9}
            next_payment={`${nextPaymentDate} - 0:00`}
            last_payment={`${candidateCharges}  - 00:00`}
          />

          <div className="flex-grow gap-8 rounded-4xl bg-neutral-white px-8 py-10">
            <Heading sm> Transaction Details</Heading>
            <p className="text-grey-primary-shade-30">
              {" "}
              To change which method is preferred, edit your transaction method{" "}
            </p>

            <div className="payment-method-wrapper my-5 grid w-full justify-items-start gap-x-1.5 gap-y-2">
              <PaymentMethodBank
                last4={paymentDetails.account_no}
                bankName={paymentDetails.bank_name}
                selected={true} // Set selected status if applicable
                onSelect={() => console.log("Selected Payment Method")}
              />
            </div>
          </div>

          <CandidatePaymentHistoryTable paymentHistory={paymentHistory} />
        </div>
      )}
    </>
  );
}
