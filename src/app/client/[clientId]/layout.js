import ClientDashboardSideNav from "@/components/ClientDashboardSideNav";
import ClientHeader from "@/components/ClientHeader";
import { PAGE_HEIGHT_FIX } from "@/utils/utility";
import Link from "next/link";
import SvgIconLogout from "@/svgs/SvgIconLogout";

function layout({ children, params }) {
  const clientId = params.clientId;
  console.log("clientId", clientId);

  function handleLogout() {
    localStorage.removeItem("MVP_CLIENT_LOGGEDIN");
    window.location.href("/login");
  }

  return (
    <div
      className={`${PAGE_HEIGHT_FIX} grid grid-cols-[17.0625rem_1fr] grid-rows-[max-content_1fr] gap-[6px] overflow-hidden`}
    >
      <header className="rounded-4xl bg-neutral-white p-4">
        <ClientHeader clientId={clientId} />
      </header>
      <aside className="col-start-1 row-span-2 row-start-1 rounded-4xl bg-neutral-white p-6">
        <ClientDashboardSideNav clientId={clientId} />
        <div className="p-4">
          <Link
            className="group flex items-center justify-start gap-3 rounded-[0.625rem] bg-transparent px-4 py-3 font-lufga text-sm font-medium text-grey-primary-shade-20 transition-colors duration-200 hover:bg-primary-tint-100 hover:text-primary-tint-20"
            href="/logout"
          >
            <SvgIconLogout className="size-6" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>
      <div className="body-scroll overflow-y-scroll rounded-3xl bg-transparent">
        {" "}
        {children}{" "}
      </div>
    </div>
  );
}

export default layout;
