
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
  // const [paymentDetails, setPaymentDetails] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState(null);
  const [customerId, setStripeAccId] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0)
  const [customer, setCustomer] = useState(null);


useEffect(() => {
  if (!params?.candidateId) {
    console.log("Candidate ID is not defined");
    return;
  }

  const fetchData = async () => {
    try {
      if (params?.candidateId) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/customers?customer_id=${params?.candidateId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log("customer dATA", result?.data?.email);
        setCustomer(result?.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, [params?.candidateId]);

  

  // // Fetch payment details and payment history
  // const getPaymentDetails = () => {
  //   const payload = {
  //     endpoint: `get-candidate-bank-account?customer_id=${params?.candidateId}`,
  //     method: "GET",
  //   };
  //   mvp2ApiHelper(payload)
  //     .then((result) => {
  //       setPaymentDetails(result?.data?.data || {});
  //     })
  //     .catch((error) => console.error("Error fetching payment details:", error));
  // };

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
    // getPaymentDetails();
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


    useEffect(() => {
      if (!params?.candidateId) {
        console.log("Candidate ID is not defined");
        return;
      }

      const fetchData = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/get-customer-stripe-account?customer_id=${params.candidateId}`,
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();
          console.log("THE DATA I GOT IS", result?.data?.stripe_id);
          setStripeAccId(result?.data?.stripe_id);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }, [params?.candidateId]);


     useEffect(() => {
       if (!params?.candidateId) {
         console.log("Candidate ID is not defined");
         return;
       }

       const fetchData = async () => {
         try {
        
          if(customerId){
           const response = await fetch("/api/get-customer-balance", {
             method: "POST",
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify({ customerId }),
           });
          if (!response.ok) {
             throw new Error("Network response was not ok");
           }
           const result = await response.json();
           console.log("customer balanceee", result?.data[0]?.ending_balance);
           setWalletBalance(result?.data[0]?.ending_balance / 100);

          }
         } catch (error) {
           console.error("Error fetching data:", error);
         }
       };

       fetchData();
     }, [customerId]);

    return (
      <>
        {/* {(!paymentDetails || Object.keys(paymentDetails).length === 0) ? (
          <CandidateAddPayment />
        ) : ( */}
        <div className="space-y-2">
          <CandidatePaymentHistorySummary
            total_payment_by_candidate={walletBalance ? -walletBalance : 0}
            walletBalance={walletBalance}
            customerId={customerId}
            customer={customer}
            // total_hires={uniqueJobPostings}
            // last_payment={lastPaymentDate}
            // next_payment={`${nextPaymentDate} - 0:00`}
          />

          {/* <div className="flex-grow gap-8 rounded-4xl bg-neutral-white px-8 py-10">
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
            </div> */}

          <CandidatePaymentHistoryTable paymentHistory={paymentHistory} />
        </div>
        {/* )} */}
      </>
    );
  }

  