import Image from "next/image";
import React from "react";

function TagCard({ icon, title, answer }) {
  return (
    <div className="my-1 grid grid-cols-2 items-center gap-2">
      <div className="flex flex-row items-center w-fit">
        <Image className="h-auto w-auto self-center px-1 py-1" src={icon} />
        <div className=" font-bold text-grey-primary-shade-20 text-sm">
          {title}
        </div>
      </div>
      <div className="h-auto w-auto rounded-[16px] text-sm px-2 py-1 font-bold text-grey-primary-shade-60">
        {answer}
      </div>
    </div>
  );
}

export default TagCard;
