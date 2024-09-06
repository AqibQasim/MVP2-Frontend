import ChevronRight from "@/svgs/ChevronRight";
import Link from "next/link";

function CapsuleLink({ href = "/", children, className }) {
  return (
    <Link
      href={href}
      className={`${className} inline-flex w-max items-center justify-center gap-2 text-nowrap rounded-[2.5rem] bg-primary-tint-100 p-1 pl-3 font-satoshi text-sm font-bold capitalize text-primary-tint-20`}
    >
      {children}
      <span className="rounded-full bg-neutral-white p-3">
        <ChevronRight className="h-[15px] w-4" />
      </span>
    </Link>
  );
}

export default CapsuleLink;
