"use client"; // This makes it a client component
import SvgIconLogout from "@/svgs/SvgIconLogout";
import { useRouter } from "next/navigation";

export default function ClientLogout({ className }) {
  const router = useRouter();

  const handleLogout = () => {
    // Clear localStorage and redirect to login
    localStorage.removeItem("MVP_CLIENT_LOGGEDIN");
    localStorage.removeItem("");
    // remove cookie
    document.cookie =
      "credentialLoginToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    router.push("/login");
  };

  return (
    <div
      className={`${className} group flex cursor-pointer items-center justify-start gap-3 rounded-[0.625rem] bg-transparent px-4 py-3 font-lufga text-sm font-medium text-grey-primary-shade-20 transition-colors duration-200 hover:bg-primary-tint-100 hover:text-primary-tint-20`}
      onClick={handleLogout}
    >
      <SvgIconLogout className="size-6" />
      <span>Logout</span>
    </div>
  );
}
