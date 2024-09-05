import Image from "next/image";
import React from "react";

function TagCard({ icon, title, answer }) {
  return (
    <div className="my-1 flex-row items-center flex gap-2">
      <Image className="self-center px-1 py-1 w-auto h-auto" src={icon}/>
      <div className="font-bold text-grey-primary-shade-20 text-sm">{title}</div>
      <div className="w-auto px-2 h-auto rounded-[16px] text-sm bg-primary-tint-100 py-1 font-bold text-primary-tint-20">
        {answer}
      </div>
    </div>
  );
}

export default TagCard;
