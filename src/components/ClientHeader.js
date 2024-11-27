"use client";
import { useState, useRef, useEffect } from "react";
import SvgIconNotification from "@/svgs/SvgIconNotification";
import SvgIconSettings from "@/svgs/SvgIconSettings";
import { formatDate } from "@/utils/utility";
import ButtonRounded from "./ButtonRounded";
import EntityCard from "./EntityCard";
import ScheduleCallModal from "./ScheduleCallModal";
import { PopupModal, useCalendlyEventListener } from "react-calendly";
import Modal from "./AdminJobsFormModal";
import ButtonCapsule from "./ButtonCapsule";
import { useRouter  } from "next/navigation";

function ClientHeader({ client, client_id }) {
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [notificationCount, setNotificationCount] = useState('0');
  const [isLoading, setIsLoading] = useState(false);


  console.log("client information : ", client);
  console.log("client information : ", client_id);

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString("en-CA");
  };
  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_REMOTE_URL}/count-notification?client_id=${client_id}`,{
          method:'GET'
        });
        // if (!response.ok) {
        //   throw new Error("Network response was not ok");
        // } 
        
        const data = await response.json();
        console.log(data)
        console.log(data?.count)
         let countData = null;
          countData = data?.count;
       
        setNotificationCount(countData); 
       
      } catch (err) {
        console.error("Error fetching notification count:", err);
      } 
    };

     fetchNotificationCount();
  }, [client_id]);
 

//   useEffect(() => {
//     const fetchNotificationCount = async () => {
//         setIsLoading(true); // Optional: Show a loading state if desired
//         try {
//             const payload = {
//                 endpoint: `count-notification?client_id=${client_id}`,
//                 method: "GET",
//             };
//             const result = await mvp2ApiHelper(payload); 
//             if (result?.count !== undefined) {
//                 setNotificationCount(result.count);
//             } else {
//                 console.warn("Unexpected response format:", result);
//             }
//         } catch (error) {
//             console.error("Error fetching notification count:", error);
//         } finally {
//             setIsLoading(false); // Optional: Hide the loading state
//         }
//     };

//     fetchNotificationCount();
// }, [client_id]);

        
 



  const getEventDetails = async (eventUri) => {
    try {
      const response = await fetch(eventUri, {
        headers: {
          Authorization: `Bearer ${processs.env.NEXT_PUBLIC_CALENDLY_TOKEN}`, // Replace with your actual API key
        },
      });
      const data = await response.json();
      console.log("Event Details:", data);
      // Access the date and time from the response, e.g., data.start_time
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  useCalendlyEventListener({
    onEventScheduled: (e) => {
      console.log("Fetching event details from:", e.data.payload.event.uri);
      getEventDetails(e.data.payload.event.uri);
    },
  });

  useEffect(() => {
    setIsClient(true);
   
  }, []);

  useEffect(() => {
    setIsMounted(true);
    console.log("mounted");
  }, []);
  if (!isMounted) return null;

  return (
    <>
      <div className="flex" id="scheduleCallBtn">
        <EntityCard
          lg
          entity={{
            image: "/avatars/avatar-2.png",
            name: client.name,
            profession: client.email,
          }}
        />
        <div className="info ml-auto space-y-4">
          <div className="buttons flex items-start justify-end gap-2">
            <EntityCard
              sm
              entity={{
                image: "/avatars/avatar-3.svg",
                name: "Taha Khan",
                profession: "Account Executive - AE",
              }}
            />
            {/* schedule-call */}
            {/* <ScheduleCallModal /> */}
            <ButtonRounded
              onClick={() => {
                //open notification screen
                //console.log("notification pressed")
                router.push(`/client/${client_id}/notifications`);
              }}
            >
              <SvgIconNotification className="h-[1.4rem] w-[1.4rem] "  />
            if ({notificationCount>0})
               <span
                   className={`absolute top-6 left-5 inline-flex  px-3 py-3  h-[1.2rem] w-[1.2rem] text-sm items-center justify-center rounded-5xl bg-red-500 text-white  `}
                 >
                   {notificationCount > 9 ? "9+" : notificationCount} 
                  
                 </span>
              
            </ButtonRounded>
            <ButtonRounded
              onClick={() => {
                //open notification screen
                //console.log("notification pressed")
                router.push(`/client/${client_id}/settings`);
              }}
            >
              <SvgIconSettings />
            </ButtonRounded>

            {isClient && (
              <div>
                <ButtonCapsule
                  ref={buttonRef}
                  onPress={() => setIsOpen(true)}
                  //id="scheduleCallBtn"
                >
                  Schedule a Call
                </ButtonCapsule>
              </div>
            )}
          </div>
          <div className="join-date float-right">
            <p className="capitalize text-grey-primary-shade-10">
              Joined date:{" "}
              <span className="font-semibold">
                {formatDate(client?.createdAt)}
              </span>
            </p>
          </div>
        </div>
      </div>
      <PopupModal
        url="https://calendly.com/co-ventech01/30min"
        rootElement={document.getElementById("scheduleCallBtn")}
        text="Schedule Call"
        textColor="#fff"
        color="#000"
        height="200px"
        overflow="hidden"
        onModalClose={() => setIsOpen(false)}
        open={isOpen}
        // styles={{
        //   height: '10px'
        // }}
        prefill={{
          name: client?.name,
          email: [client?.email],
        }}
      />
    </>
  );
}

export default ClientHeader;
