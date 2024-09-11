import Image from "next/image";
import React from "react";

function TagCard({ icon, title, answer }) {
  return (
    <div className="my-1 grid grid-cols-2 items-center gap-2">
      <div className="flex h-auto flex-row items-center sm:w-20 md:w-24 lg:w-[7.8rem]">
        <Image
          alt="Talent's detail name"
          className="h-auto w-auto self-center px-1 py-1"
          src={icon}
        />
        <div className="font-bold text-grey-primary-shade-20 sm:w-20 sm:text-[10px] md:w-24 md:text-[12px] lg:w-36 lg:text-[13px]">
          {title}
        </div>
      </div>
      <div className="h-auto px-2 py-1 pl-5 font-bold text-grey-primary-shade-60 sm:text-[10px] md:text-[12px] lg:text-[13px]">
        {answer}
      </div>
    </div>
  );
}

export default TagCard;
