"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthCheck = ({ children }) => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("MVP_CLIENT_LOGGEDIN");

    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsAuth(true); // Only render children if authenticated
    }
  }, [router]);

  // Don't render anything until authenticated
  if (!isAuth) return null;

  return <>{children}</>;
};

export default AuthCheck;
