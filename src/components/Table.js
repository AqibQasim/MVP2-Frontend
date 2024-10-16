"use client";
import { createContext, useContext } from "react";
const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div className="overflow-hidden">{children}</div>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      className={`grid items-center rounded-4xl border border-grey-primary-tint-50 text-sm font-medium capitalize tracking-wider text-grey-primary-shade-20 grid-cols-[${columns}] ${columns} gap-4 px-6 py-4.5`}
    >
      {children}
    </div>
  );
}

function Row({ children, onClick = () => {} }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      onClick={onClick}
      className={`grid items-center capitalize tracking-wider grid-cols-[${columns}] ${columns} group items-center gap-4 px-6 py-3 text-sm font-bold tracking-tight text-grey-primary-shade-60 transition-all duration-200 hover:bg-white`}
    >
      {children}
    </div>
  );
}

function Body({ data, render, error }) {
  if (!data?.length) return <p>{error || 'No data to show at the moment'}</p>;

  return (
    <div className="divide-dashboard-border divide-y-[1px]">
      {data?.map(render)}
    </div>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;

export default Table;
