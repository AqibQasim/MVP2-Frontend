import Image from "next/image";

function DetailTag({
  icon = "/icons/note-add.svg",
  name = "Est. length",
  content = "2 weeks",
}) {
  return (
    <div className="flex flex-col text-sm font-bold text-grey-primary-shade-20 xl:flex-row">
      <p className="inline-flex flex-1 items-center justify-start gap-1 text-nowrap">
        {" "}
        <Image
          src={icon}
          height={24}
          width={24}
          alt="Talent's detail name"
        />{" "}
        {name}
      </p>{" "}
      <p className="flex-1 text-nowrap pl-7 text-grey-primary-shade-60 xl:pl-[unset]">
        {" "}
        {content}{" "}
      </p>
    </div>
  );
}

export default DetailTag;
