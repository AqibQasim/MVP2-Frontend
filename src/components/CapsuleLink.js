import ChevronRight from "@/svgs/ChevronRight";
import Link from "next/link";

function CapsuleLink({ href = "/", children, className }) {
  return (
    <Link
      href={href}
      className={`${className} inline-flex w-max items-center justify-center gap-2 text-nowrap rounded-[2.5rem] bg-primary-tint-100 p-1 pl-3 font-satoshi text-sm font-bold capitalize hover:text-primary text-blue-500`}
    >
      {children}
      <span className="rounded-full bg-neutral-white p-1.5">
        <ChevronRight className="h-2.5 w-2.5" />
      </span>
    </Link>
  );
}

export default CapsuleLink;
