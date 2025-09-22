import Heading from "./Heading";
import Image from "next/image";

function Logo() {
  return (
    <div className="flex items-center justify-between w-full">
      {/* CoVentech logo on the left */}
      <Image 
        src="/co-ventech-logo.png" 
        width={140} 
        height={35} 
        alt="CoVentech Logo" 
        className="mx-7 mt-6 mb-2 z-20"
      />
      
      {/* CoVental logo on the right */}
      <div className="flex justify-start">
        <Image src="/logo.svg" width={140} height={40} alt="CoVental Logo" />
      </div>
    </div>
  );
}

export default Logo;
