"use client";
import NotificationAdmin from '@/components/NotificationAdmin';

function Page({ params }) {
  return (
    <NotificationAdmin/>
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