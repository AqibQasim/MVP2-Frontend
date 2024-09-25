import { useState, useEffect, useRef } from "react";
import SvgIconPayment from "@/svgs/SvgIconPayment";
import SvgIconPlus from "@/svgs/SvgIconPlus";
import Image from "next/image";
import DashboardSection from "./DashboardSection";
import PaymentMethodCard from "./PaymentMethodCard";
import Modal from "./AdminJobsFormModal";

function ClientPaymentMethod({ paymentMethods, stripe, clientSecret, stripePromise }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const paymentElementRef = useRef(null);
    const [cardholderName, setCardholderName] = useState('');
    const [elements, setElements] = useState(null);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        // Clean up the payment element when modal closes
        if (elements) {
            elements.getElement('payment')?.unmount();
            setElements(null);
        }
    };

    useEffect(() => {
        const initializeElements = async () => {
            if (isModalOpen && stripe && clientSecret) {
                const appearance = {
                    /* appearance configuration */
                    layout: {
                        type: 'tabs',
                        defaultCollapsed: false,
                    },
                };
                const options = {
                    clientSecret,
                    appearance,
                };
                const elementsInstance = stripe.elements(options);
                setElements(elementsInstance);

                const paymentElement = elementsInstance.create('payment');
                paymentElement.mount(paymentElementRef.current);
            }
        };

        initializeElements();
    }, [isModalOpen, stripe, clientSecret]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !clientSecret || !elements) return;

        const result = await stripe.confirmSetup({
            elements: elements,
            confirmParams: {
                payment_method_data: {
                    billing_details: {
                        name: cardholderName,
                    },
                },
                return_url: `${window.location.origin}/client/655ca164-e37f-433e-b8f3-1149aacafdf3/payment`,
            },
        });

        if (result.error) {
            console.error(result.error.message);
        } else {
            console.log("Payment method setup complete");
            // Optionally refresh payment methods list here
            handleCloseModal();
        }
    };

    return (
        <DashboardSection paragraph="Below is your" heading="Payment method">
            <div className="payment-method-wrapper grid !w-full grid-cols-[repeat(auto-fill,minmax(420px,1fr))] justify-items-start gap-x-1.5 gap-y-2">
                {paymentMethods.map((method) => (
                    <PaymentMethodCard
                        key={method.id}
                        last4={method.card.last4}
                        name={method.billing_details.name}
                        date={`${method.card.exp_month}/${method.card.exp_year}`}
                    />
                ))}

                {/* Button add */}
                <div
                    onClick={handleOpenModal}
                    className="button flex w-full items-center justify-start gap-8 rounded-xl border border-dashed border-primary-tint-80 p-4"
                >
                    {/* Entity */}
                    <div className="flex items-center justify-center gap-2">
                        <div className="image overflow-hidden rounded-xl bg-grey-primary-tint-80 p-3 text-grey-primary-shade-30">
                            <SvgIconPayment className="!size-6" />
                        </div>
                        <div className="details">
                            <p className="flex items-center justify-start gap-1 font-lufga text-[15px] font-medium">
                                Add another method
                            </p>
                            <div className="cards flex items-center justify-start gap-1">
                                <Image
                                    src="/icons/mastercard.svg"
                                    alt="Mastercard icon"
                                    height={22}
                                    width={22}
                                />
                                <Image
                                    src="/icons/visa-card.svg"
                                    alt="Visa card icon"
                                    height={22}
                                    width={22}
                                />
                                <div className="paypal flex items-center justify-center">
                                    <Image
                                        src="/icons/pay.svg"
                                        alt="PayPal icon"
                                        height={22}
                                        width={22}
                                    />
                                    <Image
                                        src="/icons/pal.svg"
                                        alt="PayPal icon"
                                        height={20}
                                        width={19}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="add ml-auto rounded-full bg-grey-primary-tint-80 p-1.5">
                        <SvgIconPlus className="!size-4.5" />
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <div className="w-full gap-4 rounded-[24px] bg-neutral-white p-6">
                    <form onSubmit={handleSubmit}>
                        <label>
                            Cardholder Name
                            <input
                                type="text"
                                value={cardholderName}
                                onChange={(e) => setCardholderName(e.target.value)}
                                className="p-2 rounded-md border-2 ms-2"
                                placeholder="John Doe"
                                required
                            />
                        </label>
                        <div id="payment-element" ref={paymentElementRef}></div>
                        <button type="submit" className="mt-2 p-3 bg-primary text-white rounded-full">
                            Save Payment Method
                        </button>
                    </form>
                </div>
            </Modal>
        </DashboardSection>
    );
}

export default ClientPaymentMethod;
