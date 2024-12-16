"use client";

import { useEffect, useState, useRef } from "react";
import Modal from "./AdminJobsFormModal";
import Heading from "./Heading";
import Capsule from "./Capsule";
import IconWithBg from "./IconWithBg";
import SvgIconDownload from "@/svgs/SvgIconDownload";
import { useRouter } from "next/navigation";

function CustomersList() {
  const router = useRouter();
  const handleReceiptClick = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const [loadingMore, setLoadingMore] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [clientCharges, setClientCharges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setDetailsIsModalOpen] = useState(false);
  const [isHiringDetailsModalOpen, setIsHiringDetailsModalOpen] =
    useState(false);

  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState({
    amount: "",
    description: "",
  });
  const [BalanceDetails, setBalanceDetails] = useState({
    amount: "",
  });
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [balance, setBalance] = useState({ available: [], pending: [] });
  const [lastCustomerId, setLastCustomerId] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [totalPaymentsDue, setTotalPaymentsDue] = useState(0);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [customerHiringDetails, setCustomerHiringDetails] = useState(null);
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState("");
  const observer = useRef();

  useEffect(() => {
    fetchCustomers();
    fetchBalance();
  }, []);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !loadingMore) {
      setLoadingMore(true); // Set loading state when fetching more data
      fetchCustomers(lastCustomerId);
    }
  };

  const calculateTotalPaymentsDue = () => {
    const total = customers.reduce((acc, customer) => {
      if (customer.subscriptions && customer.subscriptions.length > 0) {
        return (
          acc + customer?.subscriptions[0]?.items.data[0]?.plan.amount / 100
        );
      }
      return acc;
    }, 0);
    setTotalPaymentsDue(total);
  };

  // Adjust the IntersectionObserver useEffect
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observerInstance = new IntersectionObserver(handleObserver, options);
    if (observer.current) observer.current = observerInstance;

    const loadMoreElement = document.querySelector("#load-more");
    if (loadMoreElement) observerInstance.observe(loadMoreElement);

    return () => {
      if (observerInstance && observerInstance.disconnect) {
        observerInstance.disconnect();
      }
    };
  }, [hasMore, loadingMore]); // Adjust dependencies to avoid reinitializing observer

  const fetchCustomers = async (startingAfter = null) => {
    try {
      setLoadingMore(true);
      const baseUrl = "/api/customers-list";
      const url = new URL(baseUrl, window.location.origin);
      url.searchParams.append("limit", 100);

      if (startingAfter) {
        url.searchParams.append("starting_after", startingAfter);
      }

      const response = await fetch(url.toString());
      const data = await response.json();

      if (response.ok) {
        const filteredCustomers = data?.data?.map((customer) => {
            if(customer?.metadata?.customer == 1){
                return customer;
            }else{
                return null;
            }
        })
        //await Promise.all(
        //   data.data.map(async (customer) => {
        //     const chargesResponse = await fetch("/api/client-charges-list", {
        //       method: "POST",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       body: JSON.stringify({ customer_id: customer.id }),
        //     });
        //     const chargesData = await chargesResponse.json();

        //     if (chargesData.data.length > 0) {
        //       // Fetch subscriptions if charges exist
        //       const subscriptionResponse = await fetch(
        //         `/api/client-subscriptions-list`,
        //         {
        //           method: "POST",
        //           headers: {
        //             "Content-Type": "application/json",
        //           },
        //           body: JSON.stringify({ customer_id: customer.id }),
        //         },
        //       );

        //       const subscriptionData = await subscriptionResponse.json();

        //       // You can use subscriptionData as needed, for example:
        //       customer.subscriptions = subscriptionData.data;

        //       customer.latestInvoiceId =
        //         customer.subscriptions[0]?.latest_invoice;

        //       customer.last_invoice_det = await fetchInvoiceDetails(
        //         customer.subscriptions[0]?.latest_invoice,
        //       );

        //       return customer;
        //     } else {
        //       return null;
        //     }
        //   }),
        // );
        // setCustomers(data.data)
        setCustomers((prevCustomers) => [
          ...prevCustomers,
          ...filteredCustomers.filter((customer) => customer !== null),
        ]);
        setHasMore(data.has_more);
        setLastCustomerId(
          data.data.length > 0 ? data.data[data.data.length - 1].id : null,
        );
        console.log("Last Cus id ", data.data[data.data.length - 1].id);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingMore(false); // Reset loading state
    }
  };

  const fetchInvoiceDetails = async (invoiceId) => {
    try {
      const response = await fetch("/api/stripe-invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ invoiceId }),
      });
      const data = await response.json();
      return data; // Return invoice data to be used
    } catch (error) {
      console.error("Error fetching invoice details:", error);
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

  const handleCustomerHiringClick = async (customer_id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/get-hiring-payments?customer_id=${customer_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { data } = await response.json();
      console.log("Subscription Data is: ", data);

      setCustomerHiringDetails(data);
      setIsHiringDetailsModalOpen(true); // Open the modal
    } catch (error) {
      console.error("Error fetching subscription details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerDetailsClick = async (customer_id) => {
    setLoading(true);
    try {
      const response = await fetch("/api/client-subscriptions-list", {
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
      console.log("Subscription Data is: ", data);

      setCustomerDetails(data);
      setDetailsIsModalOpen(true); // Open the modal
    } catch (error) {
      console.error("Error fetching subscription details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsCloseModal = () => {
    setDetailsIsModalOpen(false);
    setCustomerDetails(null);
  };

  const handleHiringDetailsCloseModal = () => {
    setIsHiringDetailsModalOpen(false);
    setCustomerHiringDetails(null);
  };

  const handleAddBalance = async () => {
    if (!selectedCustomer) return;

    try{
        const response = await fetch("/api/add-wallet-balance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer_id: selectedCustomer.id,
            amount: parseInt(-(BalanceDetails.amount * 100)),
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          setError(data.error || "Failed to add balance");
        }

    }catch(error){
        setError(error.message);
    } finally {
      setIsBalanceModalOpen(false);
      setBalanceDetails({ amount: ""});
      setSelectedCustomer(null);
      router.refresh()
    }
  }

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

  useEffect(() => {
    calculateTotalPaymentsDue();
  }, [customers]);

  const openInvoiceModal = (customer) => {
    setSelectedCustomer(customer);
    setIsInvoiceModalOpen(true);
  };
  const openBalanceModal = (customer) => {
    setSelectedCustomer(customer);
    setIsBalanceModalOpen(true);
  };


  const handleCloseInvoiceModal = () => {
    setIsInvoiceModalOpen(false);
    setInvoiceDetails({ amount: "", description: "" });
    setSelectedCustomer(null);
  };

  const handleCloseBalanceModal = () => {
    setIsBalanceModalOpen(false);
    setBalanceDetails({ amount: ""});
    setSelectedCustomer(null);
  };

  const filteredCustomers = customers.filter((customer) => {
    const emailMatch = customer.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    // const statusMatch = invoiceStatusFilter
    //   ? customer.last_invoice_det?.status === invoiceStatusFilter
    //   : true;
    return emailMatch; //&& statusMatch;
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="rounded-3xl bg-neutral-white p-6 text-sm">
      <div className="flex justify-between">
        <Heading>Candidate Payments</Heading>
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

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search by email"
          className="mb-4 w-full rounded border border-gray-300 p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <select
          value={invoiceStatusFilter}
          onChange={(e) => setInvoiceStatusFilter(e.target.value)}
          className="w-52 rounded-lg border border-gray-300 py-4"
        >
          <option value="">Last Invoice Status</option>
          <option value="paid">Paid</option>
          <option value="open">Open</option>
        </select> */}
      </div>
      <div className="h-[90vh] overflow-y-auto p-5">
        <ul className="flex flex-col flex-wrap gap-3">
          <li className="grid grid-cols-6 text-start">
            {/* <div>ID</div> */}
            <div>Name</div>
            <div>Email</div>
            <div>Wallet Balance</div>
            <div>Top Up Wallet</div>
            <div>Invoice</div>
            <div>Hiring History</div>
            {/* <div>Last Payment Date</div>
            <div>Amount</div>
            <div>Next Payment Date</div>
            <div>Last Invoice Status</div>
            <div>Payment History</div>
            <div>Details</div>
            <div>Client History</div> */}
          </li>
          <hr></hr>
          {filteredCustomers.map((customer) => (
            <>
              <li
                className="grid grid-cols-6 text-wrap text-start"
                key={customer.id}
              >
                {/* <div className="break-words">{customer.id}</div> */}
                <div className="break-words">{customer?.name}</div>
                <div className="break-words">{customer?.email}</div>
                <div className="break-words">{-customer?.balance / 100}$</div>
                <Capsule
                  onClick={() => openBalanceModal(customer)}
                  className="mx-auto h-auto w-auto cursor-pointer !bg-primary-tint-100 text-xs"
                >
                  add Balance +/-
                </Capsule>
                <Capsule
                  onClick={() => openInvoiceModal(customer)}
                  className="mx-auto h-auto w-auto cursor-pointer !bg-primary-tint-100 text-xs"
                >
                  Create Invoice
                </Capsule>

                <Capsule
                  onClick={() =>
                    handleCustomerHiringClick(customer?.metadata?.customer_id)
                  }
                  className="mx-auto h-auto w-auto cursor-pointer !bg-primary-tint-100 text-xs"
                >
                  View Hiring Details
                </Capsule>

                {/* <div>
                  {customer?.subscriptions[0]
                    ? new Date(
                        customer?.subscriptions[0]?.current_period_start * 1000,
                      ).toLocaleDateString()
                    : "-"}
                </div>
                <div>
                  {customer.subscriptions[0]?.items
                    ? customer.subscriptions[0]?.items?.data[0].plan.amount /
                        100 +
                      "$"
                    : "-"}
                </div>
                <div>
                  {customer?.subscriptions[0]?.current_period_end
                    ? new Date(
                        customer?.subscriptions[0]?.current_period_end * 1000,
                      ).toLocaleDateString()
                    : "-"}
                </div>
                <div>
                  {customer?.last_invoice_det.status
                    ? customer?.last_invoice_det?.status
                    : "-"}
                </div>
                <Capsule
                  onClick={() => openInvoiceModal(customer)}
                  className="mx-auto h-auto w-auto cursor-pointer !bg-primary-tint-100 text-xs"
                >
                  Create Invoice
                </Capsule>
                <Capsule
                  onClick={() => handleCustomerClick(customer.id)}
                  className="mx-auto h-auto w-auto cursor-pointer !bg-primary-tint-100 text-xs"
                >
                  View History
                </Capsule>
                <Capsule
                  onClick={() => handleCustomerDetailsClick(customer.id)}
                  className="mx-auto h-auto w-auto cursor-pointer !bg-primary-tint-100 text-xs"
                >
                  View Details
                </Capsule>
                <Capsule
                  onClick={() => handleCustomerHiringClick(customer.id)}
                  className="mx-auto h-auto w-auto cursor-pointer !bg-primary-tint-100 text-xs"
                >
                  View Hiring Details
                </Capsule> */}
              </li>
              <hr></hr>
            </>
          ))}
          <li>{loadingMore && <p>Loading candidates...</p>}</li>
        </ul>
        {/* <div>Total Amount: {totalPaymentsDue}$</div> */}
        {loading && <p>Loading...</p>}
        <div id="load-more"></div>
      </div>

      {/* Modal for Client Payment History */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="max-h-[80vh] w-full gap-4 overflow-y-auto rounded-[24px] bg-neutral-white p-6">
          {/* <h2>Client Payment History</h2> */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className="flex flex-col gap-3">
              <li className="grid grid-cols-6 text-start">
                <div>Card Name</div>
                <div>Amount</div>
                <div>Status</div>
                {/* <div>Invoice id</div> */}
                <div>Created</div>
                <div>Receipt</div>
              </li>
              {clientCharges.length > 0 ? (
                clientCharges.map((charge, index) => (
                  <li key={index} className="grid grid-cols-6 text-start">
                    <div>{charge?.name}</div>
                    <div>{charge?.amount}</div>
                    <div>{charge?.status}</div>
                    {/* <div>{charge.invoice}</div> */}
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
      {/* Modal for creating invoice */}
      {selectedCustomer && (
        <Modal isOpen={isInvoiceModalOpen} onClose={handleCloseInvoiceModal}>
          <div className="p-6">
            <h2>Create Invoice for {selectedCustomer?.name}</h2>
            <input
              type="number"
              placeholder="Amount (in dollars)"
              value={invoiceDetails.amount}
              required
              onChange={(e) =>
                setInvoiceDetails({ ...invoiceDetails, amount: e.target.value })
              }
              className="mb-4 w-full rounded border border-gray-300 p-2"
            />
            <input
              type="text"
              placeholder="Description"
              value={invoiceDetails.description}
              required
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
      )}

      {/* Modal for adding balance */}
      {selectedCustomer && (
        <Modal isOpen={isBalanceModalOpen} onClose={handleCloseBalanceModal}>
          <div className="p-6">
            <h2>Add Wallet Balance for {selectedCustomer?.name}</h2>
            <input
              type="number"
              placeholder="Amount (in dollars)"
              value={BalanceDetails.amount}
              required
              onChange={(e) =>
                setBalanceDetails({ ...invoiceDetails, amount: e.target.value })
              }
              className="mb-4 w-full rounded border border-gray-300 p-2"
            />

            <button
              onClick={handleAddBalance}
              className="btn-primary rounded-lg bg-purple-950 p-2 text-white"
            >
              add
            </button>
          </div>
        </Modal>
      )}

      {/* Modal for Client details */}
      <Modal isOpen={isDetailsModalOpen} onClose={handleDetailsCloseModal}>
        <div className="w-96 p-4">
          <h2 className="mb-4 text-xl font-semibold">Client Payment Details</h2>
          {customerDetails ? (
            <div>
              <p>
                <strong>Customer ID:</strong> {customerDetails[0]?.customer}
              </p>
              <p>
                <strong>First Payment:</strong>{" "}
                {new Date(
                  customerDetails[0]?.created * 1000,
                ).toLocaleDateString()}{" "}
              </p>
              <p>
                <strong>Currency:</strong> {customerDetails[0]?.currency}
              </p>
              <p>
                <strong>Payment Amount:</strong>{" "}
                {customerDetails[0]?.items?.data[0]?.plan.amount / 100}
              </p>
              <p>
                <strong>Previous Payment:</strong>{" "}
                {new Date(
                  customerDetails[0]?.current_period_start * 1000,
                ).toLocaleDateString()}
              </p>
              <p>
                <strong>Next Payment:</strong>{" "}
                {new Date(
                  customerDetails[0]?.current_period_end * 1000,
                ).toLocaleDateString()}
              </p>
              <p>
                <strong>Payment Interval:</strong>{" "}
                {customerDetails[0]?.items?.data[0]?.plan?.interval}
              </p>
              <p>
                <strong>Number of payments:</strong>{" "}
                {customerDetails[0]?.items?.data[0]?.plan?.interval_count}
              </p>
              <p>
                <strong>Total payment amount:</strong>{" "}
                {customerDetails[0]?.items?.data[0]?.plan?.interval_count *
                  (customerDetails[0]?.items?.data[0]?.plan?.amount / 100)}
              </p>

              {/* <p>Plan: {customerDetails[0].items.data[0].plan.nickname}</p>
            <p>Amount: ${customerDetails[0].items.data[0].plan.amount / 100}</p>
            <p>Status: {customerDetails[0].status}</p>*/}
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </Modal>

      {/* Modal for Client details */}
      <Modal
        isOpen={isHiringDetailsModalOpen}
        onClose={handleHiringDetailsCloseModal}
      >
        <div className="p-4">
          <h2 className="mb-4 text-xl font-semibold">Client Hiring Details</h2>
          {customerHiringDetails ? (
            customerHiringDetails.length > 0 ? (
              <ul className="flex flex-col gap-3">
                <li className="grid grid-cols-8 text-start">
                  <div className="font-bold">Customer Name</div>
                  <div className="font-bold">Customer Email</div>
                  <div className="font-bold">Client Name</div>
                  <div className="font-bold">Client Email</div>
                  <div className="font-bold">Customer Hourly Rate</div>
                  <div className="font-bold">Job</div>
                  <div className="font-bold">Job Hourly Rate</div>
                  <div className="font-bold">Amount</div>
                </li>
                {customerHiringDetails.map((detail, index) => (
                  <li key={index} className="grid grid-cols-8 text-start">
                    <div>{detail?.customer?.name}</div>
                    <div className="break-words">{detail?.customer?.email}</div>
                    <div>{detail?.client?.name}</div>
                    <div className="break-words">{detail?.client?.email}</div>
                    <div>{detail?.customer?.hourly_rate}</div>
                    <div>{detail?.job_posting?.position}</div>
                    <div>{detail?.job_posting?.hourly_rate}</div>
                    <div>{detail?.amount / 100}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <div>No data Found...</div>
            )
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default CustomersList;
