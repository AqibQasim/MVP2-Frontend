"use client";
import ClientAlertMessage from '@/components/ClientAlertMessage'
import Heading from '@/components/Heading';
import NotificationClient from '@/components/NotificationClient';
import { mvp2ApiHelper } from '@/Helpers/mvp2ApiHelper';


function Page({ params }) {
  return (
    <NotificationClient client_id={params?.clientId}/>
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