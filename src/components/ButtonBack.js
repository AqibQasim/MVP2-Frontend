"use client";
import SvgIconChevronLeft from "@/svgs/SvgIconChevronLeft";
import { useRouter } from "next/navigation";

function ButtonBack({ children, className, onClick }) {
  const router = useRouter();
  function handleBack() {
    if (onClick) return onClick?.();
    router.back();
  }
  return (
    <button
      onClick={handleBack}
      className={`${className} flex items-center justify-center gap-2 rounded-full bg-primary-tint-100 p-3 text-neutral-dark`}
    >
      {" "}
      <SvgIconChevronLeft className="size-3.5" /> <span>{children}</span>
    </button>
  );
}

export default ButtonBack;
