
"use client";
import CandidateAddPayment from "@/components/CandidateAddPayment";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import CandidatePaymentHistorySummary from "@/components/CandidatePaymentHistorySummary";
import { useEffect, useState } from "react";
import CandidatePaymentHistoryTable from "@/components/CandidatePaymentHistoryTable";
import Heading from "@/components/Heading";
import PaymentMethodBank from "@/components/PaymentMethodBank";
const nextPaymentDate = "20-0:00";

export default function CandidateIdPaymentPage({ params }) {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState(null);

  // Fetch payment details and payment history
  const getPaymentDetails = () => {
    const payload = {
      endpoint: `get-candidate-bank-account?customer_id=${params?.candidateId}`,
      method: "GET",
    };
    mvp2ApiHelper(payload)
      .then((result) => {
        setPaymentDetails(result?.data?.data || {});
      })
      .catch((error) => console.error("Error fetching payment details:", error));
  };

  const getPaymentHistory = () => {
    const payload = {
      endpoint: `get-hiring-payments?customer_id=${params?.candidateId}`,
      method: "GET",
    };
    mvp2ApiHelper(payload)
      .then((result) => {
        setPaymentHistory(result?.data?.data || []);
      })
      .catch((error) => console.error("Error fetching payment history:", error));
  };

  // Fetch data when component mounts or candidateId changes
  useEffect(() => {
    getPaymentDetails();
    getPaymentHistory();
  }, [params?.candidateId]);

    
 
    const totalPaymentsByCandidate = paymentHistory
    ? paymentHistory.reduce((acc, payment) => acc + (payment.amount || 0), 0) / 100
    : 0;


  const uniqueJobPostings = paymentHistory
    ? new Set(paymentHistory.map((payment) => payment.job_posting_id)).size
    : 0;



  const lastPaymentDate = paymentHistory && paymentHistory.length > 0
    ? new Date(
        Math.min(...paymentHistory.map((payment) => new Date(payment.createdAt).getTime()))
      ).toLocaleDateString("en-GB")
    : "N/A";

    return (
      <>
        {(!paymentDetails || Object.keys(paymentDetails).length === 0) ? (
          <CandidateAddPayment />
        ) : (
          <div className="space-y-2">
            <CandidatePaymentHistorySummary
              total_payment_by_candidate={totalPaymentsByCandidate}
              total_hires={uniqueJobPostings}
              last_payment={lastPaymentDate}
              next_payment={`${nextPaymentDate} - 0:00`}
            />
    
            <div className="flex-grow gap-8 rounded-4xl bg-neutral-white px-8 py-10">
              <Heading sm>Transaction Details</Heading>
              <p className="text-grey-primary-shade-30">
                To change which method is preferred, edit your transaction method.
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

  