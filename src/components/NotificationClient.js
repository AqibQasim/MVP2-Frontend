"use client";
import ClientAlertMessage from "@/components/ClientAlertMessage";
import Heading from "@/components/Heading";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import { useEffect, useState } from "react";
import { getClientStripe } from "@/app/client/[clientId]/payment/page";
import { useRouter } from "next/navigation";

function NotificationClient({ client_id }) {
  const [notifications, setNotifications] = useState(null);
   const [clientSecret, setClientSecret] = useState(null);
  const [clientCustomerIDs, setclientCustomerID] = useState("");
   const router = useRouter();
  const [cardsAvailable, setCardsAvailable] = useState(false)
  const [buttonType, setButtonType] = useState({
    notification_id: null,
    type: null,
  });
  const fetchClientNotifications = () => {
    const today_date = new Date().toISOString();
    const payload = {
      endpoint: `get-client-notification?client_id=${client_id}&&today_date=${today_date}`,
      method: "GET",
    };

    mvp2ApiHelper(payload).then((result) => {
      console.log(result);
      setNotifications(result?.data?.data);
    });
  };

  useEffect(() => {
    fetchClientNotifications();
  }, [client_id]);

  const handleAcceptClientResponse = (
    customer_id,
    job_posting_id,
    notification_id,
  ) => {

    if(cardsAvailable){
    const payload = {
      endpoint: "client/client-response",
      method: "POST",
      body: {
        client_id: client_id,
        customer_id: customer_id,
        job_posting_id: job_posting_id,
        job_status: "trial",
        talent_status: "trial",
        response_status: "accept",
      },
    };

    mvp2ApiHelper(payload).then((result) => {
      if (result.status === 200) {
        setButtonType({
          notification_id,
          type: "accept",
        });
      }
    });
  }else{
    alert("Please add a card first");
     router.push(`/client/${client_id}/payment`);
  }

  };

  const handleRejectClientResponse = (
    customer_id,
    job_posting_id,
    notification_id,
  ) => {
    const payload = {
      endpoint: "client/client-response",
      method: "POST",
      body: {
        client_id: client_id,
        customer_id: customer_id,
        job_posting_id: job_posting_id,
        job_status: "open",
        talent_status: "open",
        response_status: "decline",
      },
    };

    console.log(payload);

    mvp2ApiHelper(payload).then((result) => {
      if (result.status === 200) {
        // buttonType= 'reject'
        setButtonType({
          notification_id,
          type: "reject",
        });
      }
    });
  };




    useEffect(() => {
    const fetchClientStripe = async () => {
      const clientCustomerID = await getClientStripe(client_id);
      setclientCustomerID(clientCustomerID);

      if(clientCustomerIDs){

        console.log("RESULT FROM BK API", clientCustomerIDs);
      }
    };

    fetchClientStripe();
  }, [client_id]);


  useEffect(() => {
    const fetchData = async () => {
      if (clientCustomerIDs) {
        try {

          // Fetch payment methods
          const paymentMethodsResponse = await fetch("/api/payment-methods", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ customer_id: clientCustomerIDs }), // Replace with actual customer ID
          });

          if (!paymentMethodsResponse.ok) {
            throw new Error(
              `HTTP error! status: ${paymentMethodsResponse.status}`,
            );
          }

          const { data } = await paymentMethodsResponse.json();
          console.log("Payment Data is: ", data.length);


          if(data.length > 0){
            setCardsAvailable(true)
          }
          
          setPaymentMethods(data); // Assuming `data` contains the payment methods
          // dispatch(setSelectedMethodId(data[0].id));

          // Create payment intent
          // const paymentIntentResponse = await fetch('/api/create-payment-intent', {
          //     method: 'POST',
          //     headers: {
          //         'Content-Type': 'application/json',
          //     },
          //     body: JSON.stringify({ amount: 100, customer: clientCustomerID }), // Replace with actual amount
          // });

          // if (!paymentIntentResponse.ok) {
          //     throw new Error(`HTTP error! status: ${paymentIntentResponse.status}`);
          
          // }


          // console.log("len is ", data)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [clientCustomerIDs]); // Empty dep

  return (
    <div className="h-auto w-full bg-white">
      <div className="space-y-2">
        <p className="pl-4 pt-10 text-sm font-medium text-grey-primary-shade-30">
          These are your
        </p>
        <Heading className="ml-5">Notifications</Heading>
      </div>
      {notifications && notifications?.length > 0 ? (
        notifications?.map((notification) => (
          <ClientAlertMessage
          notification_type={notification?.notification_type}
            key={notification?.notification_id} // Add key here using a unique identifier
            is_accepted={notification?.is_accepted}
            notification_id={notification?.notification_id}
            buttonType={buttonType}
            showResponseMessage={true}
            onAccept={() =>
              handleAcceptClientResponse(
                notification?.customer_id,
                notification?.job_posting_id,
                notification?.notification_id,
              )
            }
            onReject={() =>
              handleRejectClientResponse(
                notification?.customer_id,
                notification?.job_posting_id,
                notification?.notification_id,
              )
            }
            msgText={notification?.message}
            className="p-5"
          />
        ))
      ) : (
        <div className="p-5" >No notifications yet</div>
      )}
    </div>
  );
}

export default NotificationClient;

//const [showResponseMessage,setShowResponseMessage]=useState(true);

//

//   {true && (
//     <ClientAlertMessage showResponseMessage= {true}//{showResponseMessage}
//     //onAccept={handleAcceptClientResponse}
//     msgText={"Your Interview with the client has ended. Do you want to accept this client for trial?"} />
//   )}
