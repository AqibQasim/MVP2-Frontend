
"use client";
import CandidateAddPayment from "@/components/CandidateAddPayment";
import CandidateReportCard from "@/components/CandidateReportCard";
import ReportOverlay from "@/components/ReportOverlay";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import CandidatePaymentHistorySummary from "@/components/ClientPaymentHistorySummary";
import { useEffect, useState } from "react";
import CandidatePaymentHistoryTable from "@/components/CandidatePaymentHistoryTable";
import ClientPaymentMethod from "@/components/ClientPaymentMethod";
import Heading from "@/components/Heading";
import SvgIconPayment from "@/svgs/SvgIconPayment";
import PaymentMethodBank from "@/components/PaymentMethodBank";

export default function CandidateIdPage({ candidate, candidateId }) {

  const [candidateReport, setCandidateReport] = useState(null);
  const [isReportOverlayOpened, setIsReportOverlayOpened] = useState(false);

  console.log("overlayyyyy: ", isReportOverlayOpened);

  const getCandidateResult = () => {
    const payload = {
      endpoint: `get-customer-result?customer_id=${candidateId}`,
      method: "GET",
    };
    mvp2ApiHelper(payload).then((result) => {
      if (result) setCandidateReport(result?.data?.data);
    });
  };

  useEffect(() => {
    getCandidateResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidate?.customer_id]);

  // Function to handle opening the overlay
  const handleOpenOverlay = () => {
    setIsReportOverlayOpened(true);
  };

  // Function to handle closing the overlay
  const handleCloseOverlay = () => {
    setIsReportOverlayOpened(false);
  };
  const nextPaymentDate = 20
  const candidateCharges =20

  return (
    <>
      {/* {!candidateReport ? (
        <CandidateAddPayment candidate={candidate}/>
      ) : ( */}
        <div className="space-y-2" >
  
        <CandidatePaymentHistorySummary
          // client_id={client_id}
          // total_payment_by_client={`${totalPaymentsByClient}`}
          total_hires={9}
          next_payment={`${nextPaymentDate} - 0:00`}
          last_payment={`${candidateCharges}  - 00:00`}
        />
 
         <div className="  flex-grow gap-8 rounded-4xl bg-neutral-white px-8 py-10" 
 >
             <Heading sm> Transaction Details</Heading>
          <p className=" text-grey-primary-shade-30" > To change which method is preferred, edit your transaction method </p>
       
        
          <div className="payment-method-wrapper grid w-full my-5 justify-items-start gap-x-1.5 gap-y-2">
                {/* {paymentMethods.map((method) => ( */}
                    <PaymentMethodBank
                        // key={method.id}
                        // last4={method.card.last4}
                        // name={method.billing_details.name}
                        // date={`${method.card.exp_month}/${method.card.exp_year}`}
                        // selected={method.id === selectedMethodId}
                        //  onSelect={() => {
                        // handleSelectMethod(method.id);
                        // onSelect(method.id); // Call onSelect to update the state in the parent
                    // }}
                    />
                {/* ))} */}
       </div>

         </div>
       

    
          < CandidatePaymentHistoryTable />
        </div>
      {/* )} */}

          
      
   
       

    </>
  );
}

