import ClientHeader from "@/components/ClientHeader";
import { DataProvider } from "@/contexts/DataContext";
import { PAGE_HEIGHT_FIX } from "@/utils/utility";
// src/context/DataContext.js
// import React, { createContext, useContext, useState } from 'react';


function layout({ children }) {

  return (
    <div
      className={`${PAGE_HEIGHT_FIX} grid grid-cols-[17.0625rem_1fr] grid-rows-[max-content_1fr] gap-[6px]`}
    >
      <header className="rounded-4xl bg-neutral-white p-4">
        {/* <DataProvider> */}
          <ClientHeader   />
        {/* </DataProvider> */}
      </header>
      <aside className="col-start-1 row-span-2 row-start-1 rounded-4xl bg-neutral-white p-4">
        ASIDE
      </aside>
      <div className="bg-transparent"> {children} </div>
    </div>
  );
}

export default layout;
