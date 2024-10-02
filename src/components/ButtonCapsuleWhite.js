import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function ButtonCapsuleWhite({ children, onBackClick, className }) {
  const router = useRouter();
  function handleBack() {
    if (onBackClick) return onBackClick?.();
    router.back();
  }
  return (
    <button
      onClick={handleBack}
      className={`${className} flex h-10 w-10 items-center justify-center rounded-[50%] bg-primary-tint-100 py-1 text-[0.8rem] font-semibold`}
    >
      <div className="ml-2 mr-2">
        <Image
          className="h-5 w-5 items-center justify-center md:h-6 md:w-6 lg:h-3 lg:w-3"
          src="/icons/left-arrow.svg"
          width={10} // adjust this to the desired default size
          height={10} // adjust this to the desired default size
          alt="Left Arrow"
        />
      </div>
      <span>{children}</span>
    </button>
  );
}

export default ButtonCapsuleWhite;
