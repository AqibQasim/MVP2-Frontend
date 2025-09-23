import Heading from "./Heading";
import Image from "next/image";

function Logo() {
  return (
    <div className="flex items-center justify-start gap-2">
      <Image src="/logo.svg" width={140} height={40} alt="CoVental Logo" />
    </div>
  );
}

export default Logo;
