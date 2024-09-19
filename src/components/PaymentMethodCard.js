import Image from "next/image";
import Dot from "./Dot";

function PaymentMethodCard({
  last4 = "7460",
  name = "Richard Feymman",
  date = "12/2050",
}) {
  return (
    <div className="relative flex w-full items-center justify-start gap-8 rounded-xl bg-grey-primary-tint-90 p-4">
      <div className="flex items-center justify-center gap-2">
        <div className="image overflow-hidden rounded-xl bg-neutral-white p-2">
          <Image src="/icons/visa.svg" height={32} width={32} alt="Card icon" />
        </div>
        <div className="details">
          <div className="flex items-center justify-start gap-1 font-lufga text-[15px] font-medium">
            {" "}
            <span className="flex items-center justify-center gap-1">
              {" "}
              {Array(4)
                .fill()
                .map((_, index) => (
                  <Dot key={index} className="!bg-neutral-dark" />
                ))}{" "}
            </span>{" "}
            {last4}
          </div>
          <p className="text-[14px] text-sm font-medium text-grey-primary-shade-30">
            {name}
          </p>
        </div>
      </div>
      <div className="expiry-date mb-0.5 mt-auto">
        <p className="text-[14px] font-medium text-grey-primary-shade-70">
          Expiry date:
          <span className="font-normal text-grey-primary-shade-30">
            {" "}
            {date}
          </span>
        </p>
      </div>
      <div className="settings? ml-auto mr-0.5">
        <div className="dot block h-4 w-4 rounded-full border-4 border-primary-tint-80 bg-primary"></div>
      </div>
      <div className="settings absolute right-4 top-4 flex items-center justify-center gap-[2px]">
        {Array(3)
          .fill()
          .map((_, index) => (
            <Dot key={index} className="" />
          ))}
      </div>
    </div>
  );
}

export default PaymentMethodCard;
