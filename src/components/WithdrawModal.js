import React, { useState } from "react";
import Modal from "react-modal";
import { useEffect } from "react";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";


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
  const [fetchedAccountDetails, setFetchedAccountDetails] = useState(null);

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

              if(!fetchedAccountDetails){
                // Step 3: Add balance to the customer's wallet
                const addPaymentDetailsResponse = await fetch(
                  `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/add-candidate-account-details`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      customer_id: customer.customer_id,
                      account_holder_name: accountDetails.accountHolderName,
                      account_type: accountDetails.accountHolderType,
                      account_number: accountDetails.accountNumber,
                      routing_number: accountDetails.routingNumber,
                      representative_first_name:
                        accountDetails.representativeDetails.firstName,
                      representative_last_name:
                        accountDetails.representativeDetails.lastName,
                    }),
                  },
                );

                if(addPaymentDetailsResponse.success){
                  console.log("payment details added to dbb")
                }
              }

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

  // Fetch payment details and payment history
  const getPaymentDetails = () => {
    const payload = {
      endpoint: `get-candidate-account-details?customer_id=${customer?.customer_id}`,
      method: "GET",
    };
    mvp2ApiHelper(payload)
      .then((result) => {
        setFetchedAccountDetails(result?.data?.data || null);
      })
      .catch((error) =>
        console.error("Error fetching payment details:", error),
      );
  };

  useEffect(() => {
    getPaymentDetails();
    console.log("DETAILLS FROM DB", fetchedAccountDetails);

   
  }, [customer?.customer_id]);


  useEffect(() => {
     if (fetchedAccountDetails) {
       setAccountDetails((prevState) => ({
         ...prevState,
         email: customer?.email,
         accountHolderName: fetchedAccountDetails.account_holder_name,
         accountHolderType: fetchedAccountDetails.account_type, 
         accountNumber: fetchedAccountDetails.account_number,
         routingNumber: fetchedAccountDetails.routing_number,
         representativeDetails: {
           firstName: fetchedAccountDetails.representative_first_name,
           lastName: fetchedAccountDetails.representative_last_name,
         },
       }));
     }
  }, [fetchedAccountDetails])

  return !fetchedAccountDetails ? (
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
          className="rounded-xl border-2 p-1"
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
          className="rounded-xl border-2 p-1"
          required
        />
        <select
          name="accountHolderType"
          value={accountDetails.accountHolderType}
          onChange={handleInputChange}
          className="rounded-xl border-2 p-1"
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
          className="rounded-xl border-2 p-1"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="routingNumber"
          placeholder="Routing Number"
          value={accountDetails.routingNumber}
          className="rounded-xl border-2 p-1"
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
          className="rounded-xl border-2 p-1"
          onChange={handleRepresentativeChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Representative Last Name"
          value={accountDetails.representativeDetails.lastName}
          className="rounded-xl border-2 p-1"
          onChange={handleRepresentativeChange}
          required
        />
        <div className="flex gap-2">
          <span>Amount: (USD)</span>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            className="rounded-xl border-2 p-1"
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
  ) : (
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
        {/* <input
          type="email"
          name="email"
          placeholder="Email"
          value={customer?.email}
          className="rounded-xl border-2 p-1"
          onChange={handleInputChange}
          required
          disabled
        />
        <input
          type="text"
          name="accountHolderName"
          placeholder="Account Holder Name"
          value={fetchedAccountDetails.account_holder_name}
          onChange={handleInputChange}
          className="rounded-xl border-2 p-1"
          required
          disabled
        />
        <select
          name="accountHolderType"
          value={fetchedAccountDetails.account_type}
          onChange={handleInputChange}
          className="rounded-xl border-2 p-1"
          required
          disabled
        >
          <option value="individual">Individual</option>
          <option value="company">Company</option>
        </select>
        <input
          type="text"
          name="accountNumber"
          placeholder="Account Number"
          value={fetchedAccountDetails.account_number}
          className="rounded-xl border-2 p-1"
          onChange={handleInputChange}
          required
          disabled
        />
        <input
          type="text"
          name="routingNumber"
          placeholder="Routing Number"
          value={fetchedAccountDetails.routing_number}
          className="rounded-xl border-2 p-1"
          onChange={handleInputChange}
          required
          disabled
        /> */}
        {/* <input
          type="url"
          name="businessWebsite"
          placeholder="Business Website"
          value={accountDetails.businessWebsite}
          onChange={handleInputChange}
          required
        /> */}
        {/* <input
          type="text"
          name="firstName"
          placeholder="Representative First Name"
          value={fetchedAccountDetails.representative_first_name}
          className="rounded-xl border-2 p-1"
          onChange={handleRepresentativeChange}
          required
          disabled
        />
        <input
          type="text"
          name="lastName"
          placeholder="Representative Last Name"
          value={fetchedAccountDetails.representative_first_name}
          className="rounded-xl border-2 p-1"
          onChange={handleRepresentativeChange}
          required
          disabled
        /> */}
        <div className="flex gap-2 my-4">
          <span className="text-lg font-bold">Amount:</span>
          
          <span className="text-2xl text-green-700 font-bold">{-walletBalance}$</span>
          {/* <input
            type="number"
            name="amount"
            placeholder="Amount"
            className="rounded-xl border-2 p-1"
            value={-walletBalance}
            onChange={handleAmountChange}
            width={1}
            disabled
          /> */}
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
