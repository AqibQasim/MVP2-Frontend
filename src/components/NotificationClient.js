"use client";
import ClientAlertMessage from '@/components/ClientAlertMessage'
import Heading from '@/components/Heading';
import { mvp2ApiHelper } from '@/Helpers/mvp2ApiHelper';
import { useEffect, useState } from 'react'


function NotificationClient({ client_id }) {
  const [notifications, setNotifications] = useState(null);
  const [buttonType, setButtonType]= useState({
    notification_id: null,
    type: null
  });
  const fetchClientNotifications = () => {
    const today_date= new Date().toISOString()
    const payload = {
      endpoint: `get-client-notification?client_id=${client_id}&&today_date=${today_date}`,
      method: 'GET',
    }

    mvp2ApiHelper(payload).then(result => {
      console.log(result)
      setNotifications(result?.data?.data)
    })
  }

  useEffect(() => {
    fetchClientNotifications();
  }, [client_id])

  const handleAcceptClientResponse = (customer_id, job_posting_id, notification_id) => {
    const payload = {
      endpoint: 'client/client-response',
      method: 'POST',
      body: {
        client_id: client_id,
        customer_id: customer_id,
        job_posting_id: job_posting_id,
        job_status: 'trial',
        talent_status: 'trial',
        response_status: 'accept'
      }
    }

    mvp2ApiHelper(payload).then(result => {
      if(result.status===200){
        setButtonType({
          notification_id,
          type:'accept'
        })
      }
    })
  }

  const handleRejectClientResponse = (customer_id, job_posting_id, notification_id) => {
    const payload = {
      endpoint: 'client/client-response',
      method: 'POST',
      body: {
        client_id: client_id,
        customer_id: customer_id,
        job_posting_id: job_posting_id,
        job_status: 'open',
        talent_status: 'open',
        response_status: 'decline'
      }
    }

    console.log(payload)

    mvp2ApiHelper(payload).then(result => {
      if(result.status===200){
        // buttonType= 'reject'
        setButtonType({
          notification_id,
          type:'reject'
        })
      }
    })
  }


  return (
    <div className='w-full h-full bg-white'>
      <div className="space-y-2">
        <p className="text-sm pt-10 pl-4 font-medium text-grey-primary-shade-30">
          These are your
        </p>
        <Heading className='ml-5' >Notifications</Heading>
      </div>
      {
        (notifications && notifications?.length > 0) ?
          notifications?.map((notification, index) => (
            <ClientAlertMessage is_accepted={notification?.is_accepted} notification_id={notification?.notification_id} buttonType={buttonType} showResponseMessage={true}//{showResponseMessage}
              onAccept={() => handleAcceptClientResponse(notification?.customer_id, notification?.job_posting_id, notification?.notification_id)}
              onReject={() => handleRejectClientResponse(notification?.customer_id, notification?.job_posting_id, notification?.notification_id)}
              msgText={notification?.message} />)
          )
          : <div>No notifications yet</div>
      }
    </div>
  )
}

export default NotificationClient

//const [showResponseMessage,setShowResponseMessage]=useState(true);

//

//   {true && (
//     <ClientAlertMessage showResponseMessage= {true}//{showResponseMessage}
//     //onAccept={handleAcceptClientResponse}
//     msgText={"Your Interview with the client has ended. Do you want to accept this client for trial?"} />
//   )}