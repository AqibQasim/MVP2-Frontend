"use client";
import React, { useEffect, useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import ClientPaymentHistorySummary from "@/components/ClientPaymentHistorySummary";
import ClientPaymentHistoryTable from "@/components/ClientPaymentHistoryTable";
import ClientPaymentMethod from "@/components/ClientPaymentMethod";
import { usePathname } from "next/navigation";
import ClientSideModal from "@/components/ClientSideModal";

const stripePromise = loadStripe('pk_test_51OfPQBCtLGKA7fQGNEt4t2Nn4S9RxfXQxl4nqi8TK5vWM87A8AZPmdgEZyHHSi3OcpKx8uOGPLnyYSbwbimbSAbF00vZRmnYK1');

const client_payment_history = [
    {
        name: 'Richard Feynman',
        amount: '$4000',
        status: 'paid',
        invoice: '10A3011F-0020'
    },
    // ... other payment history entries
];

function Page() {
    const pathname = usePathname();
    const client_id = pathname.split('/')[2];
    const paymentElementRef = useRef(null);
    const [clientSecret, setClientSecret] = useState(null);
    const [stripe, setStripe] = useState(null);
    const [elements, setElements] = useState(null);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [cardholderName, setCardholderName] = useState('');
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch client secret
                const setupIntentResponse = await fetch('/api/setup-intent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ customer_id: 'cus_QsTUOnWq3fWwlo' }), // Replace with actual customer ID
                });

                if (!setupIntentResponse.ok) {
                    throw new Error(`HTTP error! status: ${setupIntentResponse.status}`);
                }

                const { clientSecret } = await setupIntentResponse.json();
                setClientSecret(clientSecret);

                // Fetch payment methods
                const paymentMethodsResponse = await fetch('/api/payment-methods', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ customer_id: 'cus_QsTUOnWq3fWwlo' }), // Replace with actual customer ID
                });

                if (!paymentMethodsResponse.ok) {
                    throw new Error(`HTTP error! status: ${paymentMethodsResponse.status}`);
                }

                const { data } = await paymentMethodsResponse.json();
                console.log("Payment Data is: ", data)
                setPaymentMethods(data); // Assuming `data` contains the payment methods

                // Create payment intent
                const paymentIntentResponse = await fetch('/api/create-payment-intent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ amount: 69696969 }), // Replace with actual amount
                });

                if (!paymentIntentResponse.ok) {
                    throw new Error(`HTTP error! status: ${paymentIntentResponse.status}`);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dep

    useEffect(() => {
        const initializeStripe = async () => {
            const stripeInstance = await stripePromise;
            setStripe(stripeInstance);

            if (!clientSecret) return; // Wait until clientSecret is available

            const appearance = {
                /* appearance configuration */
                layout: {
                    type: 'tabs',
                    defaultCollapsed: false,
                }
            };
            const options = {
                clientSecret,
                appearance
            };

            const elementsInstance = stripeInstance.elements(options);
            setElements(elementsInstance);
            // const paymentElement = elementsInstance.create('payment');
            // paymentElement.mount(paymentElementRef.current);
        };

        initializeStripe();
    }, [clientSecret]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !clientSecret || !elements) return;

        const result = await stripe.confirmSetup({
            elements: elements,
            confirmParams: {
                payment_method_data: {
                    billing_details: {
                        name: cardholderName, // Cardholder name
                    },},
                return_url: `${window.location.origin}/client/655ca164-e37f-433e-b8f3-1149aacafdf3`,
            },
        });

        if (result.error) {
            console.error(result.error.message);
        } else {
            console.log('Payment method setup complete');
        }
    };

    return (
        <div className="max-w-full space-y-2">
            <ClientPaymentHistorySummary
                client_id={client_id}
                total_payment_by_client={3600}
                total_hires={9}
                next_payment={'15 July 2024 - 0.00'}
                last_payment={'$16,000 - 1st July 2024 - 00.00'}
            />
            {/* <div className="w-full gap-4 rounded-[24px] bg-neutral-white p-6">
                <form onSubmit={handleSubmit}>
                     <label>
                        Cardholder Name
                        <input
                            type="text"
                            value={cardholderName}
                            onChange={(e) => setCardholderName(e.target.value)}
                            className="p-2 rounded-md border-2 ms-2"
                            required
                        />
                    </label>
                    <div id="payment-element" ref={paymentElementRef}></div>
                    <button type="submit" className="mt-2 p-3 bg-primary text-white rounded-full">Save Payment Method</button>
                </form>
            </div> */}
            {/* <div className="w-full gap-4 rounded-[24px] bg-neutral-white p-6">
                <h2 className="text-xl font-semibold">Existing Payment Methods</h2>
                {paymentMethods.length > 0 ? (
                    paymentMethods.map((method) => (
                        <div key={method.id} className="p-4 border rounded mb-2">
                            <p>Card: **** **** **** {method.card.last4}</p>
                            <p>Expiry: {method.card.exp_month}/{method.card.exp_year}</p>
                        </div>
                    ))
                ) : (
                    <p>No payment methods available.</p>
                )}
            </div> */}
             {paymentMethods.length > 0 ? (
                <ClientPaymentMethod paymentMethods={paymentMethods} handleSubmit={handleSubmit} paymentElementRef={paymentElementRef} stripe={stripe}
    elements={elements}
    clientSecret={clientSecret}/>
            ) :
            (
                <div className="w-full gap-4 rounded-[24px] bg-neutral-white p-6">
                    <h2 className="text-xl font-semibold">Existing Payment Methods</h2>
                    <p>No payment methods available.</p>
                </div>
                )
            }
            <ClientPaymentHistoryTable client_id={client_id} paymentHistory={client_payment_history} />
        </div>
    );
}

export default Page;
