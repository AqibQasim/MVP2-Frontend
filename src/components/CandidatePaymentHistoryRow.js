import SvgIconDownload from "@/svgs/SvgIconDownload";
import { formatDate } from "@/utils/utility";
import Image from "next/image";
import Capsule from "./Capsule";
import EntityCard from "./EntityCard";
import IconWithBg from "./IconWithBg";
import Table from "./Table";

function CandidatePaymentHistoryRow() {
 
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
          name: "Test"
        }}
      />
      {/* <Capsule>{payment.jobType}</Capsule> */}
      <div className="date text-nowrap text-center">
        12-02-2025
      </div>
      <Capsule  className="status !text-center">
        <p>done</p>
      </Capsule>
      <div className="amount text-center">100000</div>
      <div className="amount text-center">well</div>
      <Capsule
        className="ml-auto !bg-primary-tint-100 cursor-pointer"
        icon={<IconWithBg icon={<SvgIconDownload />} />}
        // onClick={() => handleReceiptClick(payment.receipt_url)}
      >
        view
      </Capsule>
    </Table.Row>
  );
}

export default CandidatePaymentHistoryRow;
