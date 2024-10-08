"use client";
import ClientAlertMessage from '@/components/ClientAlertMessage'
import Heading from '@/components/Heading';
import { mvp2ApiHelper } from '@/Helpers/mvp2ApiHelper';
import React from 'react'

function Page({ params }) {

  const handleAcceptClientResponse = () => {
    const payload = {
      endpoint: 'client/client-response',
      method: 'POST',
      body: {
        client_id: params?.clientId,
        customer_id: 'a0f92f65-121c-449d-b199-93eb52a1bb90',
        job_posting_id: '4b91db71-854b-44cc-882e-fff4dee10be8',
        job_status: 'trial',
        talent_status: 'trial',
        response_status: 'accept'
      }
    }

    mvp2ApiHelper(payload).then(result => {
      console.log(result)
    })
  }

  const handleRejectClientResponse = () => {
    const payload = {
      endpoint: 'client/client-response',
      method: 'POST',
      body: {
        client_id: params?.clientId,
        customer_id: 'a0f92f65-121c-449d-b199-93eb52a1bb90',
        job_posting_id: '8d99fa98-4f49-4696-8086-e6e415da3963',
        job_status: 'open',
        talent_status: 'open',
        response_status: 'decline'
      }
    }

    mvp2ApiHelper(payload).then(result => {
      console.log(result)
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
      <ClientAlertMessage showResponseMessage={true}//{showResponseMessage}
        onAccept={handleAcceptClientResponse}
        onReject={handleRejectClientResponse}
        msgText={"Your Interview with the candidate [candidate name with hyperlink] for job [job name with hyperlink] has ended. Do you want to accept this candidate for trial?"} />
    </div>
  )
}

export default Page

//const [showResponseMessage,setShowResponseMessage]=useState(true);

//

//   {true && (
//     <ClientAlertMessage showResponseMessage= {true}//{showResponseMessage}
//     //onAccept={handleAcceptClientResponse}
//     msgText={"Your Interview with the client has ended. Do you want to accept this client for trial?"} />
//   )}