import SvgIconDownload from "@/svgs/SvgIconDownload";
import { formatDate } from "@/utils/utility";
import Image from "next/image";
import Capsule from "./Capsule";
import EntityCard from "./EntityCard";
import IconWithBg from "./IconWithBg";
import Table from "./Table";

function ClientPaymentHistoryRow({ payment }) {
  const handleReceiptClick = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };
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
          name: payment?.name,
        }}
      />
      {/* <Capsule>{payment.jobType}</Capsule> */}
      <div className="date text-nowrap text-center">
        {payment.date}
      </div>
      <Capsule status={payment?.status} className="status !text-center">
        <p>{payment.status}</p>
      </Capsule>
      <div className="amount text-center">{payment.amount}</div>
      <div className="amount text-center">{payment.invoice}</div>
      <Capsule
        className="ml-auto !bg-primary-tint-100 cursor-pointer"
        icon={<IconWithBg icon={<SvgIconDownload />} />}
        onClick={() => handleReceiptClick(payment.receipt_url)}
      >
        view
      </Capsule>
    </Table.Row>
  );
}

export default ClientPaymentHistoryRow;
