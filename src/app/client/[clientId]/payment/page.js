"use client";
import React, { useEffect, useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import ClientPaymentHistorySummary from "@/components/ClientPaymentHistorySummary";
import ClientPaymentHistoryTable from "@/components/ClientPaymentHistoryTable";
import { usePathname } from "next/navigation";

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

    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const response = await fetch('/api/setup-intent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ customer_id: 'cus_QsB4xsyQg5MLBe' }), // Replace with actual customer ID
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const { clientSecret } = await response.json();
                setClientSecret(clientSecret);
            } catch (error) {
                console.error('Error fetching client secret:', error);
            }
        };

        const fetchPaymentMethods = async () => {
            try {
                const response = await fetch('/api/payment-methods', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ customer_id: 'cus_QsB4xsyQg5MLBe' }), // Replace with actual customer ID
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const { data } = await response.json();
                setPaymentMethods(data); // Assuming `data` contains the payment methods
            } catch (error) {
                console.error('Error fetching payment methods:', error);
            }
        };

        fetchClientSecret();
        fetchPaymentMethods();
    }, []);

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
            const paymentElement = elementsInstance.create('payment');
            paymentElement.mount(paymentElementRef.current);
        };

        initializeStripe();
    }, [clientSecret]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !clientSecret || !elements) return;

        const result = await stripe.confirmSetup({
            elements: elements,
            confirmParams: {
                return_url: `${window.location.origin}/client/1/setup-complete`,
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
            <div className="w-full gap-4 rounded-[24px] bg-neutral-white p-6">
                <form onSubmit={handleSubmit}>
                    <div id="payment-element" ref={paymentElementRef}></div>
                    <button type="submit" className="mt-2 p-3 bg-primary text-white rounded-full">Save Payment Method</button>
                </form>
            </div>
            <div className="w-full gap-4 rounded-[24px] bg-neutral-white p-6">
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
            </div>
            <ClientPaymentHistoryTable client_id={client_id} paymentHistory={client_payment_history} />
        </div>
    );
}

export default Page;
