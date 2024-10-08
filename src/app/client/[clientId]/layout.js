import ClientDashboardSideNav from "@/components/ClientDashboardSideNav";
import ClientHeader from "@/components/ClientHeader";
import { getClientById } from "@/lib/data-service";
import { PAGE_HEIGHT_FIX } from "@/utils/utility";

import { auth } from "@/lib/auth";
import ClientAlertMessage from "@/components/ClientAlertMessage";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";

async function layout({ children, params }) {
  const clientId = params.clientId;
  console.log("clientId", clientId);
  const session = await auth();

  //const [showResponseMessage,setShowResponseMessage]=useState(true);
  // const router = useRouter();

  // useEffect(() => {
  //   // Check if user is logged in
  //   const isLoggedIn = localStorage.getItem("MVP_CLIENT_LOGGEDIN");

  //   // If not logged in, redirect to login Page
  //   if (!isLoggedIn) {
  //     // router.push("/login");
  //     window.location.href("/login");
  //   }
  // }, [router]);

  const client = await getClientById(clientId);

  // const handleAcceptClientResponse=()=>{
  //   const payload={
  //     endpoint: 'client/client-response',
  //     method:'POST',
  //     body:{
  //       client_id: params?.clientId,
  //       customer_id: '22c58f17-d88e-414a-8414-88fa0daeb99e',
  //       job_posting_id: '8d99fa98-4f49-4696-8086-e6e415da3963',
  //       job_status:'trial',
  //       talent_status:'trial',
  //       response_status:'accept'
  //     }
  //   }

  //   mvp2ApiHelper(payload).then(result=>{
  //     console.log(result)
  //   })
  // }

  return (
    <div
      className={`${PAGE_HEIGHT_FIX} grid !h-[calc(100dvh-2.25rem)] grid-cols-[17.0625rem_1fr] grid-rows-[max-content_1fr] gap-[6px] overflow-hidden`}
    >
      {/* {true && (
        <ClientAlertMessage showResponseMessage= {true}//{showResponseMessage} 
        //onAccept={handleAcceptClientResponse}
        msgText={"Your Interview with the client has ended. Do you want to accept this client for trial?"} />
      )} */}
      <header className="rounded-4xl bg-neutral-white p-4">
        <ClientHeader client_id={clientId} client={client} />
      </header>
      <aside className="col-start-1 row-span-2 row-start-1 rounded-4xl bg-neutral-white p-6">
        <ClientDashboardSideNav clientId={clientId} />
      </aside>
      <div className="body-scroll overflow-y-scroll rounded-3xl bg-transparent">
        {" "}
        {children}{" "}
      </div>
    </div>
  );
}

export default layout;
