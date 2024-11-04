"use client";

import { useEffect, useState, useRef } from "react";
import Modal from "./AdminJobsFormModal";
import Heading from "./Heading";
import Capsule from "./Capsule";
import IconWithBg from "./IconWithBg";
import SvgIconDownload from "@/svgs/SvgIconDownload";

function CustomersList() {
  const handleReceiptClick = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [clientCharges, setClientCharges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState({
    amount: "",
    description: "",
  });
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [balance, setBalance] = useState({ available: [], pending: [] });
  const [lastCustomerId, setLastCustomerId] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const paymentElementRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPrevBtn, setShowPrevButton] = useState(false);

  useEffect(() => {
    if (currentPage == 1) {
      setShowPrevButton(false);
    } else {
      setShowPrevButton(true);
    }
  }, [currentPage]);
  useEffect(() => {
    fetchCustomers();
    fetchBalance();
  }, []);

  const fetchCustomers = async (startingAfter = null) => {
    try {
      const baseUrl = "/api/customers-list";
      const url = new URL(baseUrl, window.location.origin);
      url.searchParams.append("limit", 100);

      if (startingAfter) {
        url.searchParams.append("starting_after", startingAfter);
      }

      const response = await fetch(url.toString());
      const data = await response.json();

      if (response.ok) {
        setCustomers(data.data);
        setHasMore(data.has_more);
        setLastCustomerId(
          data.data.length > 0 ? data.data[data.data.length - 1].id : null,
        );
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchBalance = async () => {
    try {
      const response = await fetch("/api/get-balance");
      const data = await response.json();
      if (response.ok) {
        setBalance(data);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleNextPage = () => {
    if (hasMore) {
      fetchCustomers(lastCustomerId);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    // For simplicity, refresh the data or maintain a list of previous page results if needed
    fetchCustomers();
    setCurrentPage(currentPage - 1);
  };

  const handleCustomerClick = async (customer_id) => {
    setLoading(true);
    try {
      const response = await fetch("/api/client-charges-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customer_id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { data } = await response.json();
      console.log("Charges Data is: ", data);

      if (!Array.isArray(data)) {
        console.error("Expected an array but got:", data);
        return;
      }

      const transformedCharges = data.map((charge) => ({
        name: charge.billing_details.name || "Candidate",
        amount: `$${(charge.amount / 100).toFixed(2)}`,
        status: charge.status,
        invoice: charge.id,
        created: new Date(charge.created * 1000).toLocaleString(),
        receipt_url: charge.receipt_url,
      }));

      setClientCharges(transformedCharges);
      setIsModalOpen(true); // Open the modal
    } catch (error) {
      console.error("Error fetching charges:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setClientCharges([]);
  };

  const handleCreateInvoice = async () => {
  if (!selectedCustomer) return;

  try {
    const response = await fetch("/api/create-invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId: selectedCustomer.id,
        amount: invoiceDetails.amount,
        description: invoiceDetails.description,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "Failed to create invoice");
    }
  } catch (error) {
    setError(error.message);
  } finally {
    setIsInvoiceModalOpen(false);
    setInvoiceDetails({ amount: "", description: "" });
    setSelectedCustomer(null);
  }
};

  const openInvoiceModal = (customer) => {
    setSelectedCustomer(customer);
    setIsInvoiceModalOpen(true);
  };

  const handleCloseInvoiceModal = () => {
    setIsInvoiceModalOpen(false);
    setInvoiceDetails({ amount: "", description: "" });
    setSelectedCustomer(null);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="rounded-3xl bg-neutral-white p-6">
      <div className="flex justify-between">
        <Heading>Clients List</Heading>
        <div>
          <Heading>Balance</Heading>
          <h1 className="text-lg">
            Available:{" "}
            <span className="font-semibold">
              {balance.available
                .map((avail) => `${(avail.amount / 100).toFixed(2)} $`)
                .join(", ")}
            </span>
          </h1>
          <h1 className="text-lg">
            Pending:{" "}
            <span className="font-semibold">
              {balance.pending
                .map((pend) => `${(pend.amount / 100).toFixed(2)} $`)
                .join(", ")}
            </span>
          </h1>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search by email"
        className="mb-4 w-full rounded border border-gray-300 p-2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="h-[90vh] overflow-y-auto p-5">
        <ul className="flex flex-col flex-wrap gap-3">
          <li className="grid grid-cols-5 text-start">
            <div>ID</div>
            <div>Name</div>
            <div>Email</div>
            <div>Invoice</div>
            <div>Payment History</div>
          </li>
          <hr></hr>
          {filteredCustomers.map((customer) => (
            <>
              <li
                className="grid grid-cols-5 text-wrap text-start"
                key={customer.id}
              >
                <div className="break-words">{customer.id}</div>
                <div className="break-words">{customer.name}</div>
                <div className="break-words">{customer.email}</div>
                <button
                  onClick={() => openInvoiceModal(customer)}
                  className="btn-primary"
                >
                  Create Invoice
                </button>
                <Capsule
                  onClick={() => handleCustomerClick(customer.id)}
                  className="mx-auto w-max cursor-pointer !bg-primary-tint-100"
                >
                  View History
                </Capsule>
              </li>
              <hr></hr>
            </>
          ))}
        </ul>
        <div className="mt-4 flex justify-between">
          {showPrevBtn && (
            <button
              onClick={handlePrevPage}
              disabled={!lastCustomerId}
              className="btn-primary"
            >
              Previous
            </button>
          )}
          <div>Current Page: {currentPage}</div>
          <button
            onClick={handleNextPage}
            disabled={!hasMore}
            className="btn-primary"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal for Client Payment History */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="w-full gap-4 rounded-[24px] bg-neutral-white p-6">
          {/* <h2>Client Payment History</h2> */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className="flex flex-col gap-3">
              <li className="grid grid-cols-6 text-start">
                <div>Name</div>
                <div>Amount</div>
                <div>Status</div>
                <div>Invoice id</div>
                <div>Created</div>
                <div>Receipt</div>
              </li>
              {clientCharges.length > 0 ? (
                clientCharges.map((charge, index) => (
                  <li key={index} className="grid grid-cols-6 text-start">
                    <div>{charge.name}</div>
                    <div>{charge.amount}</div>
                    <div>{charge.status}</div>
                    <div>{charge.invoice}</div>
                    <div>{charge.created}</div>
                    <Capsule
                      className="ml-auto cursor-pointer !bg-primary-tint-100"
                      icon={<IconWithBg icon={<SvgIconDownload />} />}
                      onClick={() => handleReceiptClick(charge.receipt_url)}
                    >
                      view receipt
                    </Capsule>
                  </li>
                ))
              ) : (
                <li>No Data Found</li>
              )}
            </ul>
          )}
        </div>
      </Modal>

      <Modal isOpen={isInvoiceModalOpen} onClose={handleCloseInvoiceModal}>
        <div className="p-6">
          <h2>Create Invoice for {selectedCustomer?.name}</h2>
          <input
            type="number"
            placeholder="Amount (in dollars)"
            value={invoiceDetails.amount}
            onChange={(e) =>
              setInvoiceDetails({ ...invoiceDetails, amount: e.target.value })
            }
            className="mb-4 w-full rounded border border-gray-300 p-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={invoiceDetails.description}
            onChange={(e) =>
              setInvoiceDetails({
                ...invoiceDetails,
                description: e.target.value,
              })
            }
            className="mb-4 w-full rounded border border-gray-300 p-2"
          />
          <button onClick={handleCreateInvoice} className="btn-primary">
            Send
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default CustomersList;
