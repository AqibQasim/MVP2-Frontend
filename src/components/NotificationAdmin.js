"use client";
import Heading from "@/components/Heading";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CandidateAlertMessage from "./CandidateAlertMessage";

function NotificationAdmin() {
  const [notifications, setNotifications] = useState(null);
  const [buttonType, setButtonType] = useState({
    notification_id: null,
    type: null,
  });
  const fetchAdminNotifications = () => {
    const today_date = new Date().toISOString();
    const payload = {
      endpoint: `get-admin-notification`,
      method: "GET",
    };

    mvp2ApiHelper(payload).then((result) => {
      console.log(result);
      setNotifications(result?.data?.data);
    });
  };

  useEffect(() => {
    fetchAdminNotifications();
  }, []);

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
          <CandidateAlertMessage
            notification_type={notification?.notification_type}
            key={notification?.notification_id} // Add key here using a unique identifier
            is_accepted={notification?.is_accepted}
            notification_id={notification?.notification_id}
            buttonType={buttonType}
            showResponseMessage={true}
            msgText={notification?.message}
            className="p-5"
          />
        ))
      ) : (
        <div className="p-5">No notifications yet</div>
      )}
    </div>
  );
}

export default NotificationAdmin;

//const [showResponseMessage,setShowResponseMessage]=useState(true);

//

//   {true && (
//     <ClientAlertMessage showResponseMessage= {true}//{showResponseMessage}
//     //onAccept={handleAcceptClientResponse}
//     msgText={"Your Interview with the client has ended. Do you want to accept this client for trial?"} />
//   )}
