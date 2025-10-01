import { auth } from "@/lib/auth";
import ClientLogout from "./ClientLogout";
import GoogleLogout from "./GoogleLogout";

async function Logout({userRole}) {
  const session = await auth();
  console.log("Session: ", session);
  return session?.user ? <GoogleLogout userRole={userRole}/> : <ClientLogout userRole={userRole} />;
}

export default Logout;
