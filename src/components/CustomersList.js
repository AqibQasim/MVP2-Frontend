"use client";

import { useEffect, useState, useRef } from 'react';
import Modal from './AdminJobsFormModal';
import Heading from "./Heading";

function CustomersList() {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [clientCharges, setClientCharges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const paymentElementRef = useRef(null); // Assuming this is used for payment processing

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/api/customers-list');
        const data = await response.json();
        if (response.ok) {
          setCustomers(data.data);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCustomers();
  }, []);

  const handleCustomerClick = async (customer_id) => {
    setLoading(true);
    try {
      const response = await fetch('/api/client-charges-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
        name: charge.billing_details.name || 'Candidate',
        amount: `$${(charge.amount / 100).toFixed(2)}`,
        status: charge.status,
        invoice: charge.id,
      }));

      setClientCharges(transformedCharges);
      setIsModalOpen(true); // Open the modal
    } catch (error) {
      console.error('Error fetching charges:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setClientCharges([]); // Clear the charges data when the modal is closed
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='rounded-3xl bg-neutral-white p-6'>
      <Heading>Clients List</Heading>
      <ul className='flex flex-col gap-3'>
      <li className='grid grid-cols-3  text-start '>
            <div >ID</div> 
            <div> Name</div>  
            <div >Email</div>
          </li>
        {customers.map((customer) => (
          <li className='grid grid-cols-3 text-start cursor-pointer' key={customer.id} onClick={() => handleCustomerClick(customer.id)}>
            <div >{customer.id}</div> 
            <div> {customer.name}</div>  
            <div >{customer.email}</div>
          </li>
        ))}
      </ul>

      {/* Modal for Client Payment History */}
    {/* Modal for Client Payment History */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="w-full gap-4 rounded-[24px] bg-neutral-white p-6">
          {/* <h2>Client Payment History</h2> */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className='flex flex-col gap-3 '>
            <li className='grid grid-cols-4 text-start '>
                <div>Name</div>
                <div>Amount</div>
                <div>Status</div>
                <div>Invoice id</div>
            </li>
              {clientCharges.length > 0 ? (
                clientCharges.map((charge, index) => (
                  <li key={index} className='grid grid-cols-4 text-start '>
                    <div>{charge.name}</div>
                    <div>{charge.amount}</div>
                    <div>{charge.status}</div>
                    <div>{charge.invoice}</div>
                  </li>
                ))
              ) : (
                <li>No Data Found</li>
              )}
            </ul>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default CustomersList;
