import AdminDashboardSideNav from "@/components/AdminDashboardSideNav"
import Heading from "@/components/Heading";
// import CandidateHeader from "@/components/CandidateHeader";
import { PAGE_HEIGHT_FIX } from "@/utils/utility";

function layout({ children, params }) {
  return (
    <div
      className={`${PAGE_HEIGHT_FIX} grid !h-[calc(100dvh-2.25rem)] grid-cols-[17.0625rem_1fr] grid-rows-[max-content_1fr] gap-[6px] overflow-hidden`}
    >
      <aside className="col-start-1 row-span-2 row-start-1 rounded-4xl bg-neutral-white p-6">
        <AdminDashboardSideNav />
      </aside>
      <div className="body-scroll overflow-y-scroll rounded-3xl bg-transparent">
        {" "}
        {children}{" "}
      </div>
    </div>
  );
}

export default layout;
