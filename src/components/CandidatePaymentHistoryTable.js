"use client";
import CandidatePaymentHistoryRow from "./CandidatePaymentHistoryRow";
import DashboardSection from "./DashboardSection";
import Table from "./Table";

function CandidatePaymentHistoryTable({paymentHistory }) {

 
  
  return (
    <DashboardSection
    paragraph={`Hey , below is your payment history`}
    heading="Payment history"
   >  
      <Table columns="grid-cols-[1fr_1.8fr_0.5fr_0.5fr]">
        <Table.Header>
          <div className="info">Info</div>
          <div className="date text-center">Date</div>
          <div className="status text-center">Status</div>
          <div className="amount text-center">Amount</div>
        </Table.Header>

        {paymentHistory && paymentHistory.length > 0 ? (
        <Table.Body
          data={paymentHistory}
          render={(payment, i) => <CandidatePaymentHistoryRow  payment={payment} />}
        />
      ) : (
        <div >
          <p>No data to show at the moment</p>
        </div>
      )}
          
    
      </Table>
    </DashboardSection>
  );
}

export default CandidatePaymentHistoryTable;
