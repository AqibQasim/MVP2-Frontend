import SvgIconNotification from "@/svgs/SvgIconNotification";
import SvgIconSettings from "@/svgs/SvgIconSettings";
import { formatDate } from "@/utils/utility";
import ButtonRounded from "./ButtonRounded";
import EntityCard from "./EntityCard";
import ScheduleCallModal from "./ScheduleCallModal";

function ClientHeader() {
  return (
    <div className="flex">
      <EntityCard
        lg
        entity={{
          image: "/avatars/avatar-2.png",
          name: "Richard Feynman",
          profession: "Richardfeynman@gmail.com",
        }}
      />
      <div className="info ml-auto space-y-4">
        <div className="buttons flex items-start justify-end gap-2">
          <EntityCard
            sm
            entity={{
              image: "/avatars/avatar-3.svg",
              name: "Esther Howard",
              profession: "Account Executive - AE",
            }}
          />
          <ButtonRounded>
            <SvgIconNotification />
          </ButtonRounded>
          <ButtonRounded>
            <SvgIconSettings />
          </ButtonRounded>
          {/* schedule-call */}
          <ScheduleCallModal />
        </div>
        <div className="joing-date float-right">
          <p className="capitalize text-grey-primary-shade-10">
            Joined date:{" "}
            <span className="font-semibold">
              {" "}
              {formatDate(new Date("2024-04-27"))}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ClientHeader;
