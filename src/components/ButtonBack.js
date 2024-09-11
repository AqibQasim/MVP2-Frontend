"use client";
import SvgIconChevronLeft from "@/svgs/SvgIconChevronLeft";
import { useRouter } from "next/navigation";

function ButtonBack() {
  const router = useRouter();
  function handleBack() {
    router.back();
  }
  return (
    <button
      onClick={handleBack}
      className="rounded-full bg-primary-tint-100 p-3 text-neutral-dark"
    >
      {" "}
      <SvgIconChevronLeft className="size-3.5" />{" "}
    </button>
  );
}

export default ButtonBack;
