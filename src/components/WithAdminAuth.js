"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const WithAdminAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const isAuthenticated = localStorage.getItem("adminAuth");
      if (!isAuthenticated) {
        router.push("/admin/login");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default WithAdminAuth;
