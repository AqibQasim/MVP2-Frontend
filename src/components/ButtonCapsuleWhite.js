import Image from "next/image";
import React from "react";

function ButtonCapsuleWhite({ children, onBackClick, className }) {
  return (
    <button
      onClick={onBackClick}
      className={`${className} flex w-auto pr-6 items-center gap-3 rounded-full bg-primary-tint-100 py-1 text-[0.8rem] font-semibold`}
    >
      <div className="px-1">
        <Image
          className="h-9 w-11 rounded-full bg-white p-3"
          src="/icons/left-arrow.svg"
          width={10}
          height={10}
        />
      </div>
      <span>{children}</span>
    </button>
  );
}

export default ButtonCapsuleWhite;
