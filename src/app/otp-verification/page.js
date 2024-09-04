import React from "react";
import bgImg from "../../../public/bg-img.svg";
import Image from "next/image";
import GradientText from "@/component/GradientText";

function OtpVerification() {
  return (
    <>
      <Image src={bgImg} className="h-screen w-screen" />
      <GradientText>Created</GradientText>
    </>
  );
}

export default OtpVerification;
