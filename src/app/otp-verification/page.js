import GradientText from "@/components/GradientText";
import Image from "next/image";
import bgImg from "../../../public/bg-img.svg";

function OtpVerification() {
  return (
    <>
      <Image src={bgImg} className="h-screen w-screen" />
      <GradientText>Created</GradientText>
    </>
  );
}

export default OtpVerification;
