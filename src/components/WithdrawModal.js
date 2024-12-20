import { createActionCreatorInvariantMiddleware } from "@reduxjs/toolkit";
import React, { useState } from "react";
import Modal from "react-modal";
import { useEffect } from "react";


const WithdrawModal = ({
  isOpen,
  onClose,
  onWithdraw,
  walletBalance,
  customerId,
  customer
}) => {

  const [accountDetails, setAccountDetails] = useState({
    email: "",
    accountHolderName: "",
    accountHolderType: "individual", // or 'company'
    accountNumber: "",
    routingNumber: "",
    representativeDetails: {
      firstName: "",
      lastName: "",
    },
  });
  const [amount, setAmount] = useState("");

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "40%",
    },
  };

  useEffect(() => {
    if (customer?.email) {
      setAccountDetails((prevState) => ({
        ...prevState,
        email: customer?.email,
      }));
    }
  }, [customer]);


  const getIPAddress = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Failed to fetch IP address:", error);
      return "127.0.0.1"; // Fallback IP
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRepresentativeChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails((prevState) => ({
      ...prevState,
      representativeDetails: {
        ...prevState.representativeDetails,
        [name]: value,
      },
    }));
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     const ipAddress = await getIPAddress();
     console.log("IpAddress is ", ipAddress);

    try {

      // Step 1: Create the connected account
      const createAccountResponse = await fetch(
        "/api/create-connected-account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...accountDetails,
            ipAddress,
          }),
        },
      );

      const createAccountData = await createAccountResponse.json();

      if (createAccountData.success) {
        const accountId = createAccountData.accountId;

        // Step 2: Call the payout API
        const payoutResponse = await fetch("/api/payout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accountId,
            amount: -walletBalance * 100, // Convert to cents
          }),
        });

        const payoutData = await payoutResponse.json();

        if (payoutData.success) {
          // Step 3: Add balance to the customer's wallet
          const walletBalanceResponse = await fetch("/api/add-wallet-balance", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              customer_id: customerId,
              amount: -walletBalance * 100, // Convert to cents
            }),
          });

          const walletBalanceData = await walletBalanceResponse.json();

          if (walletBalanceData.data) {
            console.log("Wallet balance updated:", walletBalanceData.data);
            onWithdraw();
             window.location.reload();
          } else {
            console.error("Wallet Balance Error:", walletBalanceData.error);
          }
        } else {
          console.error("Payout Error:", payoutData.error);
        }
      } else {
        console.error("Account Creation Error:", createAccountData.error);
      }
    } catch (error) {
      console.error("Request failed:", error.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      style={customStyles}
    >
      <div onClick={onClose} className="cursor-pointer text-right text-xl">
        &times;
      </div>
      <h2 className="text-center text-xl font-bold">Withdraw Funds</h2>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={customer?.email}
          className="border-2 p-1 rounded-xl"
          onChange={handleInputChange}
          required
          disabled
        />
        <input
          type="text"
          name="accountHolderName"
          placeholder="Account Holder Name"
          value={accountDetails.accountHolderName}
          onChange={handleInputChange}
          className="border-2 p-1 rounded-xl"
          required
        />
        <select
          name="accountHolderType"
          value={accountDetails.accountHolderType}
          onChange={handleInputChange}
          className="border-2 p-1 rounded-xl"
          required
        >
          <option value="individual">Individual</option>
          <option value="company">Company</option>
        </select>
        <input
          type="text"
          name="accountNumber"
          placeholder="Account Number"
          value={accountDetails.accountNumber}
          className="border-2 p-1 rounded-xl"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="routingNumber"
          placeholder="Routing Number"
          value={accountDetails.routingNumber}
          className="border-2 p-1 rounded-xl"
          onChange={handleInputChange}
          required
        />
        {/* <input
          type="url"
          name="businessWebsite"
          placeholder="Business Website"
          value={accountDetails.businessWebsite}
          onChange={handleInputChange}
          required
        /> */}
        <input
          type="text"
          name="firstName"
          placeholder="Representative First Name"
          value={accountDetails.representativeDetails.firstName}
          className="border-2 p-1 rounded-xl"
          onChange={handleRepresentativeChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Representative Last Name"
          value={accountDetails.representativeDetails.lastName}
          className="border-2 p-1 rounded-xl"
          onChange={handleRepresentativeChange}
          required
        />
        <div className="flex gap-2">
          <span>Amount: (USD)</span>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            className="border-2 p-1 rounded-xl"
            value={-walletBalance}
            onChange={handleAmountChange}
            width={1}
            disabled
          />
        </div>
        <button
          className="my-2 me-2 rounded-lg !bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit"
        >
          Withdraw
        </button>
      </form>
    </Modal>
  );
  
};

export default WithdrawModal;
