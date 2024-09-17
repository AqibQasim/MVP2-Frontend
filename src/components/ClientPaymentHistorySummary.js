import React from "react";
import Heading from "./Heading";
import IconWithBg from "./IconWithBg";
import SvgIconClipboard from "@/svgs/SvgIconClipboard";
import Capsule from "./Capsule";
import Hr from "./Hr";

function ClientPaymentHistorySummary({
  client_id,
  client_name,
  total_hires,
  total_payment_by_client,
  next_payment,
  last_payment
}) {
  return (
    <div className="w-full gap-4 rounded-[24px] bg-neutral-white p-6">
      <div className="flex h-14 flex-row justify-between items-center">
        <div>
          <p className="text-sm font-medium text-grey-primary-shade-30">
            {`Recent Payments - ${total_hires} Hires`}
          </p>
          <Heading sm>${total_payment_by_client} USD</Heading>
        </div>

        <Capsule
          className="ml-auto h-auto !bg-primary-tint-100"
          icon={<IconWithBg icon={<SvgIconClipboard />} />}
        >
          View Monthly Report
        </Capsule>
      </div>
      <Hr/>

      <div className="flex h-14 flex-row justify-between items-center">
        <div>
          <p className="text-sm font-medium text-grey-primary-shade-30">
            Next Payment
          </p>
        </div>

        <Capsule
          className="ml-auto h-auto !bg-primary-tint-100"
          icon={<IconWithBg icon={<SvgIconClipboard />} />}
        >
          {next_payment}
        </Capsule>
      </div>

      <div className="flex h-14 flex-row justify-between items-center">
        <div>
          <p className="text-sm font-medium text-grey-primary-shade-30">
            Last Payment
          </p>
        </div>

        <Capsule
          className="ml-auto h-auto !bg-primary-tint-100"
          icon={<IconWithBg icon={<SvgIconClipboard />} />}
        >
          {last_payment}
        </Capsule>
      </div>
    </div>
  );
}

export default ClientPaymentHistorySummary;
