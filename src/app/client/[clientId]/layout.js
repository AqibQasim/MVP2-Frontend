import ClientHeader from "@/components/ClientHeader";
import { PAGE_HEIGHT_FIX } from "@/utils/utility";

function layout({ children }) {
  return (
    <div
      className={`${PAGE_HEIGHT_FIX} grid grid-cols-[17.0625rem_1fr] grid-rows-[max-content_1fr] gap-[6px]`}
    >
      <header className="rounded-4xl bg-neutral-white p-4">
        <ClientHeader />
      </header>
      <aside className="col-start-1 row-span-2 row-start-1 rounded-4xl bg-neutral-white p-4">
        ASIDE
      </aside>
      <div className="bg-transparent"> {children} </div>
    </div>
  );
}

export default layout;
