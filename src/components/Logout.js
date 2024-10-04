import { auth } from "@/lib/auth";
import ClientLogout from "./ClientLogout";
import GoogleLogout from "./GoogleLogout";

async function Logout() {
  const session = await auth();
  console.log("Session: ", session);
  return session?.user ? <GoogleLogout /> : <ClientLogout />;
}

export default Logout;
