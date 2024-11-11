"use client";
import CandidatePaymentHistoryRow from "./CandidatePaymentHistoryRow";
import DashboardSection from "./DashboardSection";
import Table from "./Table";

function CandidatePaymentHistoryTable() {

 
  
  return (
    <DashboardSection
      paragraph="Hey Richard Feynman, below is your"
      heading="Payment history"
     
    >
      <Table columns="grid-cols-[0fr_0.8fr_0.5fr_0.5fr_0.7fr_1fr]">
        <Table.Header>
          <div className="info">Info</div>
          <div className="date text-center">Date</div>
          <div className="status text-center">Status</div>
          <div className="amount text-center">Amount</div>
          <div className="invoice text-center">Invoice</div>
          <div className="actions text-right">Action</div>
        </Table.Header>
        <Table.Body>
           <CandidatePaymentHistoryRow />
        </Table.Body>
          
      
      </Table>
    </DashboardSection>
  );
}

export default CandidatePaymentHistoryTable;
