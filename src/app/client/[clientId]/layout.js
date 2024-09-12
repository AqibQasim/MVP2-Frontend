import ClientDashboardSideNav from "@/components/ClientDashboardSideNav";
import ClientHeader from "@/components/ClientHeader";
import { PAGE_HEIGHT_FIX } from "@/utils/utility";

function layout({ children, params }) {
  const clientId = params.clientId;
  console.log("clientId", clientId);
  return (
    <div
      className={`${PAGE_HEIGHT_FIX} grid grid-cols-[17.0625rem_1fr] grid-rows-[max-content_1fr] gap-[6px] overflow-hidden`}
    >
      <header className="rounded-4xl bg-neutral-white p-4">
        <ClientHeader clientId={clientId} />
      </header>
      <aside className="col-start-1 row-span-2 row-start-1 rounded-4xl bg-neutral-white p-6">
        <ClientDashboardSideNav clientId={clientId} />
      </aside>
      <div className="body-scroll overflow-y-scroll rounded-3xl bg-transparent">
        {" "}
        {children}{" "}
      </div>
    </div>
  );
}

export default layout;
