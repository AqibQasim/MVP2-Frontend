"use client";
import SvgIconChevronLeft from "@/svgs/SvgIconChevronLeft";
import { useRouter } from "next/navigation";

function ButtonBack({children, className}) {
  const router = useRouter();
  function handleBack() {
    router.back();
  }
  return (
    <button
      onClick={handleBack}
      className={`${className} rounded-full flex-row bg-primary-tint-100 p-3 text-neutral-dark`}
    >
      {" "}
      <SvgIconChevronLeft className="size-3.5" />{children}{" "}
    </button>
  );
}

export default ButtonBack;
