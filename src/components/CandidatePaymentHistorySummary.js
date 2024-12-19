import React from "react";
import Heading from "./Heading";
import IconWithBg from "./IconWithBg";
import SvgIconClipboard from "@/svgs/SvgIconClipboard";
import Capsule from "./Capsule";
import Hr from "./Hr";
import Button from "./Button";
import WithdrawModal from "./WithdrawModal";
import { useState } from "react";

const nextPaymentDate = "20-0:00";
function CandidatePaymentHistorySummary({
  total_hires,
  total_payment_by_candidate,
  last_payment,
  next_payment,
  customer,
  walletBalance,
  customerId,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => setModalIsOpen(true);
  const handleCloseModal = () => setModalIsOpen(false);
  const handleWithdraw = () => {
    // Handle post-withdraw actions (e.g., show success message)
    handleCloseModal();
  };
  return (
    <div className="w-full gap-4 rounded-[24px] bg-neutral-white p-6">
      <div className="flex h-14 flex-row items-center justify-between">
        <div>
          <p className="text-sm font-medium text-grey-primary-shade-30">
            {`Wallet`}
          </p>
          <Heading sm>${total_payment_by_candidate} USD</Heading>
        </div>
        <div>
          {total_payment_by_candidate > 0 ? (
            <button
              onClick={handleOpenModal}
              className="mb-2 me-2 rounded-lg !bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Withdraw{" "}
            </button>
          ) : null}
          <WithdrawModal
            isOpen={modalIsOpen}
            onClose={handleCloseModal}
            onWithdraw={handleWithdraw}
            walletBalance={walletBalance}
            customerId={customerId}
            customer={customer}
          />
        </div>

        {/* <Capsule
          className="ml-auto h-auto !bg-primary-tint-100"
          icon={<IconWithBg icon={<SvgIconClipboard />} />}
        >
          View Monthly Report
        </Capsule> */}
      </div>
      {/* <Hr/> */}

      {/* <div className="flex h-14 flex-row justify-between items-center">
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
      </div> */}

      {/* <div className="flex h-14 flex-row justify-between items-center">
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
      </div> */}
    </div>
  );
}

export default CandidatePaymentHistorySummary;

