import Image from "next/image";
import React from "react";

function TagCard({ icon, title, answer }) {
  return (
    <div className="my-1 grid grid-cols-2 items-center gap-2">
      <div className="flex flex-row items-center h-auto lg:w-[7.8rem] md:w-24 sm:w-20">
        <Image className="h-auto w-auto self-center px-1 py-1" src={icon} />
        <div className=" font-bold text-grey-primary-shade-20 lg:text-[13px] lg:w-36 md:w-24 sm:w-20 sm:text-[10px] md:text-[12px]">
          {title}
        </div>
      </div>
      <div className="h-auto pl-5 lg:w-40 md:w-24 sm:w-20 rounded-[16px] lg:text-[13px] sm:text-[10px] md:text-[12px] px-2 py-1 font-bold text-grey-primary-shade-60">
        {answer}
      </div>
    </div>
  );
}

export default TagCard;
