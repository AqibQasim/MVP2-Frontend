"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

function AddSearchParams({ name, value }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <button
      onClick={() => {
        router.push(pathname + "?" + createQueryString(name, value));
      }}
    >
      view talent
    </button>
  );
}

export default AddSearchParams;
