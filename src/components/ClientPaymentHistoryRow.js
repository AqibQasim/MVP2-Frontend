import SvgIconDownload from "@/svgs/SvgIconDownload";
import { formatDate } from "@/utils/utility";
import Image from "next/image";
import Capsule from "./Capsule";
import EntityCard from "./EntityCard";
import IconWithBg from "./IconWithBg";
import Table from "./Table";

function ClientPaymentHistoryRow({ payment }) {
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
          name: payment?.role,
        }}
      />
      {/* <Capsule>{payment.jobType}</Capsule> */}
      <div className="date text-nowrap text-center">
        {formatDate(new Date("2024-09-20"))}
      </div>
      <div className="status text-center">{payment.status}</div>
      <div className="amount text-center">{payment.amount}</div>
      <div className="invoice text-center">{payment.invoice}</div>
      <Capsule
        className="ml-auto !bg-primary-tint-100"
        icon={<IconWithBg icon={<SvgIconDownload />} />}
      >
        Download
      </Capsule>
    </Table.Row>
  );
}

export default ClientPaymentHistoryRow;
