import SvgIconPayment from "@/svgs/SvgIconPayment";
import SvgIconPlus from "@/svgs/SvgIconPlus";
import Image from "next/image";
import DashboardSection from "./DashboardSection";
import PaymentMethodCard from "./PaymentMethodCard";

function ClientPaymentMethod({paymentMethods}) {
  return (
    <DashboardSection paragraph="Below is your" heading="Payment method">
      <div className="payment-method-wrapper grid !w-full grid-cols-[repeat(auto-fill,minmax(420px,1fr))] justify-items-start gap-x-1.5 gap-y-2">
        {paymentMethods.map((method) => (
          <PaymentMethodCard
            key={method.id}
            last4={method.card.last4}
            name={"test"}
            date={`${method.card.exp_month}/${method.card.exp_year}`}
          />
        ))}

        {/* Button add */}
        <div
          onClick={() => console.log("clicked")}
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
    </DashboardSection>
  );
}

export default ClientPaymentMethod;
