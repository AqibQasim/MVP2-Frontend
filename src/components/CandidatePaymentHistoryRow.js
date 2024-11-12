import SvgIconDownload from "@/svgs/SvgIconDownload";
import { formatDate } from "@/utils/utility";
import Image from "next/image";
import Capsule from "./Capsule";
import EntityCard from "./EntityCard";
import IconWithBg from "./IconWithBg";
import Table from "./Table";

function CandidatePaymentHistoryRow({payment}) {
 
  return (
    <Table.Row>
      <EntityCard
        icon={
          <Image
            src={"/avatars/avatar-1.png"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            alt="Avatar image"
          />
        }
        entity={{
          name:  payment?.customer?.name
        }}
      />
      {/* <Capsule>{payment.jobType}</Capsule> */}
      <div className="date text-nowrap text-center">
        {payment.createdAt}
      </div>
      <Capsule  className="status !text-center">
        <p>paid</p>
      </Capsule>
      <div className="amount text-center">{payment.amount}</div>
      
      {/* <Capsule
        className="ml-auto !bg-primary-tint-100 cursor-pointer"
        icon={<IconWithBg icon={<SvgIconDownload />} />}
        // onClick={() => handleReceiptClick(payment.receipt_url)}
      >
        view
      </Capsule> */}
    </Table.Row>
  );
}

export default CandidatePaymentHistoryRow;
