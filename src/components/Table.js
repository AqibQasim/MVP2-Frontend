"use client";
import { createContext, useContext } from "react";
import Capsule from "./Capsule";
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
  if (!data?.length) return <p>{error || "No data to show at the moment"}</p>;

  return (
    <div className="divide-dashboard-border divide-y-[1px]">
      {data?.map(render)}
    </div>
  );
}


function Footer({ data, startIndex, endIndex, onNext, onPrevious }) {
  const isFirstPage = startIndex === 1; // If on the first page
  const isLastPage = endIndex >= data.length; // If on the last page

  return (
    <div className="flex justify-between items-center mt-4">
      <div>
        Showing {startIndex} - {endIndex} of {data.length}
      </div>
      <div className="flex gap-2">
        <button
          onClick={onPrevious}
          className={`cursor-pointer px-4 py-2 rounded-full  ${
            isFirstPage ? "bg-grey-primary-tint-90 text-grey-primary-shade-30 cursor-not-allowed" : "bg-primary text-white"
          }`}
          disabled={isFirstPage}
        >
          Previous
        </button>
        <button
          onClick={onNext}
          className={`cursor-pointer px-4 py-2 rounded-full w-[100px] ${
            isLastPage ? "bg-grey-primary-tint-90 text-primary-tint-30 cursor-not-allowed" : "bg-primary text-white"
          }`}
          disabled={isLastPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}


// function Footer({ data, startIndex, endIndex, onNext, onPrevious }) {
//   const isFirstPage = startIndex === 1; // If on the first page
//   const isLastPage = endIndex >= data.length; // If on the last page
//   return (
//     <div className="flex justify-between">
//       <div>
//         Showing {startIndex} - {endIndex} of{" "}
//         {data.length}
//       </div>
//       <div className="flex gap-2">
//         <Capsule
//          onClick={onPrevious}
//          className={` ${
//            isFirstPage ? " cursor-not-allowed" : ""
//          }`}
//          disabled={isFirstPage}
        
//         >
//           Previous
//         </Capsule>
//         <Capsule
//           onClick={onNext}
//           className={` w-[100px]${
//             isLastPage ? " cursor-not-allowed" : ""
//           }`}
//           disabled={isLastPage}
//         >
//           Next
//         </Capsule>
//       </div>
//     </div>
//   );
// }

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
