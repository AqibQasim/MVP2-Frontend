"use client";
import Notificationandidate from '@/components/NotificationCandidate';

function Page({ params }) {
  return (
    <Notificationandidate candidate_id={params?.candidateId}/>
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