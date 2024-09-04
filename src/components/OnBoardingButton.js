import Link from "next/link";
import Image from "next/image";

function OnBoardingButton({ as = "button", href = "/", className, children, ...rest }) {
  const commonClasses =
    "flex justify-between w-full text-start text-md rounded-full border-[1px] border-primary bg-primary px-4 py-2 mt-4 text-white";

  if (as === "link")
    return (
      <Link href={href} className={`${commonClasses} ${className}`}>
        {children}
      </Link>
    );
  return (
    <button {...rest} className={`${commonClasses} ${className}`}>
      {children}
      <Image src="/icons/right_arrow.svg" width={30} height={35} alt="MVP 2 Logo" className="inline-block" />
    </button>
  );
}

export default OnBoardingButton;
