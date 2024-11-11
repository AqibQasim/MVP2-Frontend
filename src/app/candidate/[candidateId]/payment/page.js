// "use client"
// import React, { useEffect, useRef, useState, useMemo } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import ClientPaymentHistorySummary from "@/components/ClientPaymentHistorySummary";
// import ClientPaymentHistoryTable from "@/components/ClientPaymentHistoryTable";
// import ClientPaymentMethod from "@/components/ClientPaymentMethod";
// import { usePathname } from "next/navigation";
// import ClientSideModal from "@/components/ClientSideModal";
// import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
// import { setSelectedMethodId } from "@/store/paymentSlice";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";

// const stripePromise = loadStripe(
//   "pk_test_51OfPQBCtLGKA7fQGNEt4t2Nn4S9RxfXQxl4nqi8TK5vWM87A8AZPmdgEZyHHSi3OcpKx8uOGPLnyYSbwbimbSAbF00vZRmnYK1",
// );

// const candidate_payment_history = [
//   {
//     name: "Richard Feynman",
//     amount: "$4000",
//     status: "paid",
//     invoice: "10A3011F-0020",
//   },
//   {
//     name: "Richard Feynman",
//     amount: "$4000",
//     status: "paid",
//     invoice: "10A3011F-0020",
//   },
//   // ... other payment history entries
// ];

// // const client_payment_history = [
// // {
// //     name: 'Richard Feynman',
// //     amount: clientCharges[0].data.amount,
// //     status: 'paid',
// //     invoice: '10A3011F-0020',
// // }

// // ]

// export async function getCandidateStripe(clientId) {
//   const payload = {
//     endpoint: `get-candidate-stripe-account?candidate_id=${candidateId}`,
//     method: "GET",
//   };
//   const result = await mvp2ApiHelper(payload);
//   if (result.status === 200) {
//     return result.data.data.stripe_id;
//   }
//   console.error(result?.data?.message);
//   return null; // Return null or handle the error appropriately
// }

// function Page() {
//   const pathname = usePathname();
//   const candidate_id = pathname.split("/")[2];
//   const paymentElementRef = useRef(null);
//   const [clientSecret, setClientSecret] = useState(null);
//   const [stripe, setStripe] = useState(null);
//   const [elements, setElements] = useState(null);
//   const [paymentMethods, setPaymentMethods] = useState([]);
//   const [cardholderName, setCardholderName] = useState("");
//   const [clientCharges, setClientCharges] = useState([]);
//   const [candidateCustomerIDs, setCandidateCustomerID] = useState("");
//   const [totalPayments, setTotalPayments] = useState(0);
//   const [selectedMethodId, setSelectedMethodId2] = useState("");

//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchClientStripe = async () => {
//       const candidateCustomerID = await getClientStripe(candidate_id);
//       setclientCustomerID(candidateCustomerID);

//       console.log("RESULT FROM BK API", candidateCustomerIDs);
//     };

//     fetchClientStripe();
//   }, [candidate_id]);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (candidateCustomerIDs) {
//         try {
//           // Fetch candidate secret
//           const setupIntentResponse = await fetch("/api/setup-intent", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ customer_id: candidateCustomerIDs }), 
//           });

//           if (!setupIntentResponse.ok) {
//             throw new Error(
//               `HTTP error! status: ${setupIntentResponse.status}`,
//             );
//           }

//           const { clientSecret } = await setupIntentResponse.json();
//           setClientSecret(clientSecret);

//           // Fetch payment methods
//           const paymentMethodsResponse = await fetch("/api/payment-methods", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ customer_id: clientCustomerIDs }), // Replace with actual customer ID
//           });

//           if (!paymentMethodsResponse.ok) {
//             throw new Error(
//               `HTTP error! status: ${paymentMethodsResponse.status}`,
//             );
//           }

//           const { data } = await paymentMethodsResponse.json();
//           console.log("Payment Data is: ", data);
//           setPaymentMethods(data); // Assuming `data` contains the payment methods
//           dispatch(setSelectedMethodId(data[0].id));

//           // Create payment intent
//           // const paymentIntentResponse = await fetch('/api/create-payment-intent', {
//           //     method: 'POST',
//           //     headers: {
//           //         'Content-Type': 'application/json',
//           //     },
//           //     body: JSON.stringify({ amount: 100, customer: clientCustomerID }), // Replace with actual amount
//           // });

//           // if (!paymentIntentResponse.ok) {
//           //     throw new Error(`HTTP error! status: ${paymentIntentResponse.status}`);
//           // }
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       }
//     };
//     fetchData();
//   }, [candidateCustomerIDs]); // Empty dep

//   //    const handleSubscription = async () => {
//   //     const customPrice = 10000;

//   //     try {
//   //         // Fetch candidate secret for subscription
//   //         const subscriptionResponse = await fetch('/api/create-subscription', {
//   //             method: 'POST',
//   //             headers: {
//   //                 'Content-Type': 'application/json',
  
//   //             },
//   //             body: JSON.stringify({ customerId: clientCustomerID, price: customPrice, paymentMethodId: selectedMethodId  }),
//   //         });

//   //         if (!subscriptionResponse.ok) {
//   //             throw new Error(`HTTP error! status: ${subscriptionResponse.status}`);
//   //         }

//   //         const { clientSecret } = await subscriptionResponse.json();
//   //         setClientSecret(clientSecret);
//   //     } catch (error) {
//   //         console.error('Error creating subscription:', error);
//   //     }
//   // };

//   useEffect(() => {
//     const initializeStripe = async () => {
//       const stripeInstance = await stripePromise;
//       setStripe(stripeInstance);

//       if (!clientSecret) return; // Wait until clientSecret is available

//       const appearance = {
//         /* appearance configuration */
//         layout: {
//           type: "tabs",
//           defaultCollapsed: false,
//         },
//       };
//       const options = {
//         clientSecret,
//         appearance,
//       };

//       const elementsInstance = stripeInstance.elements(options);
//       setElements(elementsInstance);
//       // const paymentElement = elementsInstance.create('payment');
//       // paymentElement.mount(paymentElementRef.current);
//     };

//     initializeStripe();
//   }, [clientSecret]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !clientSecret || !elements) return;

//     const result = await stripe.confirmSetup({
//       elements: elements,
//       confirmParams: {
//         payment_method_data: {
//           billing_details: {
//             name: cardholderName, // Cardholder name
//           },
//         },
//         return_url: `${window.location.origin}/candidate/${client_id}`,
//       },
//     });

//     if (result.error) {
//       console.error(result.error.message);
//     } else {
//       console.log("Payment method setup complete");
//     }
//   };
//   useEffect(() => {
//     const fetchData = async () => {
//       if (clientCustomerIDs) {
//         try {
//           const chargesResponse = await fetch("/api/candidate-charges-list", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ customer_id: clientCustomerIDs }), // Replace with actual customer ID
//           });

//           if (!chargesResponse.ok) {
//             throw new Error(`HTTP error! status: ${chargesResponse.status}`);
//           }

//           const { data } = await chargesResponse.json(); // Access the data property directly
//           console.log("Charges Data is: ", data); // Inspect the charges data

//           // Check if data is an array
//           if (!Array.isArray(data)) {
//             console.error("Expected an array but got:", data);
//             return;
//           }

//           // Transform charges data into client_payment_history format
//           const transformedCharges = data.map((charge) => ({
//             name: charge.billing_details.name || "Candidate ", // Fallback if no name is available
//             amount: `$${(charge.amount / 100).toFixed(2)}`, // Convert from cents to dollars
//             status: charge.status, // 'paid', 'pending', etc.
//             invoice: charge.id, // Assuming invoice refers to the charge id
//             receipt_url: charge.receipt_url,
//             date: convertUnixToDate(charge.created),
//           }));

//           setClientCharges(transformedCharges);
//         } catch (error) {
//           console.error("Error fetching charges:", error);
//         }
//       }
//     };

//     fetchData();
//   }, [candidateCustomerIDs]); // Ensure `useEffect` is properly configured to run only once on mount

//   const totalPaymentsByClient = useMemo(() => {
//     return clientCharges.reduce((total, charge) => {
//       const amount = parseFloat(charge.amount.replace("$", "")) || 0;
//       return total + amount;
//     }, 0);
//   }, [clientCharges]);

//   function convertUnixToDate(unixTimestamp) {
//     const milliseconds = unixTimestamp * 1000; // Convert seconds to milliseconds
//     const dateObject = new Date(milliseconds);

//     // Define options for toLocaleDateString
//     const options = { day: "numeric", month: "long", year: "numeric" };

//     return dateObject.toLocaleDateString("en-GB", options); // Format as a human-readable date string
//   }

//   useEffect(() => {
//     // if(paymentMethods){
//     //     console.log("testttttt", paymentMethods[0]?.id)
//     // }
//     if (selectedMethodId != "") {
//       dispatch(setSelectedMethodId(selectedMethodId));
//     }
//   }, [selectedMethodId, dispatch]);

//  function addThirtyDaysToDate(date) {
//   const originalDate = new Date(date);
//   originalDate.setDate(originalDate.getDate() + 30);
//   return originalDate.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
// }

//    // Calculate next payment date based on last payment date
//   const nextPaymentDate = clientCharges.length > 0 
//     ? addThirtyDaysToDate(clientCharges[0].date)
//     : "No payment history available";
//   return (
//     <div className="max-w-full space-y-2">
//       {clientCharges.length > 0 ? (
//         <ClientPaymentHistorySummary
//           client_id={candidate_id}
//           total_payment_by_client={`${totalPaymentsByClient}`}
//           total_hires={9}
//           next_payment={`${nextPaymentDate} - 0:00`}
//           last_payment={`${clientCharges[0].amount} - ${clientCharges[0].date} - 00:00`}
//         />
//       ) : null}
//       {/* <div className="w-full gap-4 rounded-[24px] bg-neutral-white p-6">
//                 <form onSubmit={handleSubmit}>
//                      <label>
//                         Cardholder Name
//                         <input
//                             type="text"
//                             value={cardholderName}
//                             onChange={(e) => setCardholderName(e.target.value)}
//                             className="p-2 rounded-md border-2 ms-2"
//                             required
//                         />
//                     </label>
//                     <div id="payment-element" ref={paymentElementRef}></div>
//                     <button type="submit" className="mt-2 p-3 bg-primary text-white rounded-full">Save Payment Method</button>
//                 </form>
//             </div> */}
//       {/* <div className="w-full gap-4 rounded-[24px] bg-neutral-white p-6">
//                 <h2 className="text-xl font-semibold">Existing Payment Methods</h2>
//                 {paymentMethods.length > 0 ? (
//                     paymentMethods.map((method) => (
//                         <div key={method.id} className="p-4 border rounded mb-2">
//                             <p>Card: **** **** **** {method.card.last4}</p>
//                             <p>Expiry: {method.card.exp_month}/{method.card.exp_year}</p>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No payment methods available.</p>
//                 )}
//             </div> */}

//       <ClientPaymentMethod
//         paymentMethods={paymentMethods}
//         handleSubmit={handleSubmit}
//         paymentElementRef={paymentElementRef}
//         stripe={stripe}
//         elements={elements}
//         clientSecret={clientSecret}
//         onSelect={setSelectedMethodId2}
//       />

//       {/* ) :
//             (
//                 <div className="w-full gap-4 rounded-[24px] bg-neutral-white p-6">
//                     <h2 className="text-xl font-semibold">Existing Payment Methods</h2>
//                     <p>No payment methods available.</p>
//                 </div>
//                 )
//              */}
//       {/* <button onClick={handleSubscription}>Create Subscription</button> */}
//       <ClientPaymentHistoryTable
//         candidate_id={candidate_id}
//         paymentHistory={clientCharges}
//       />
//     </div>
//   );
// }

// export default Page;


"use client";
import CandidateAddPayment from "@/components/CandidateAddPayment";
import CandidateReportCard from "@/components/CandidateReportCard";
import ReportOverlay from "@/components/ReportOverlay";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import { useEffect, useState } from "react";
import CandidatePaymentHistoryTable from "@/components/CandidatePaymentHistoryTable"

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

  return (
    <>
      {!candidateReport ? (
        <CandidateAddPayment candidate={candidate}/>
      ) : (
        <div>
           <div className="bg-neutral-white min-h-full w-auto gap-8 rounded-4xl px-8 py-10">
     
      
     <div className="flex-wrap space-x-4">
       {/* Step 1 */}

           <div>Total Payments Success</div>
           <div> $36000 </div>
           <div>$1600 USD</div> 
         

        <div className="my-5" >
         <p>Next Payment</p>
        </div>
        <hr/>
        <div className="my-5" >
         <p>Pending Payment </p>
        </div>
        <div>
         <hr/>
         <div>
         <p  > Transaction Details </p>
         <p> To change which method is preferred, edit your transaction method </p>
         </div>
        
         
        </div>
      
    </div>

    </div>
     
    
    < CandidatePaymentHistoryTable />
        </div>
      )}

          
      
   
       

    </>
  );
}
