import Image from "next/image";
import React from "react";

function ButtonCapsuleWhite({ children, onBackClick, className }) {
  return (
    <button
      onClick={onBackClick}
      className={`${className} flex items-center rounded-[50%] w-10 h-10 justify-center bg-primary-tint-100 py-1 text-[0.8rem] font-semibold`}
    >
      <div className="mr-2 ml-2">
        <Image
          className="w-5 h-5 md:w-6 md:h-6 lg:w-3 lg:h-3 justify-center items-center"
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
