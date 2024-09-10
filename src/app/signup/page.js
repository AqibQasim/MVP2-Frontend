"use client";
import Heading from "@/components/Heading";
import Input from "@/components/Input";
import OnBoardingButton from "@/components/OnBoardingButton";
import Overlay from "@/components/Overlay";
import SuccessModal from "@/components/SuccessModal";
import { PAGE_HEIGHT_FIX } from "@/utils/utility";
import Image from "next/image";
import { useEffect, useState } from "react";

function SignUp() {
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const handleOpenOverlay = () => {
    setOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setOverlayVisible(false);
    console.log(isOverlayVisible);
  };
  useEffect(() => {
    console.log("[isOverlayVisible]:", isOverlayVisible);
  }, [isOverlayVisible]);

  const mainHeading = (
    <span>
      Enter verification{" "}
      <span
        style={{
          backgroundImage: "linear-gradient(to right, #4624E0, white)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline",
        }}
      >
        Code.
      </span>
    </span>
  );

  let text = (
    <>
      We&apos;ve sent a code to{" "}
      <span className="font-semibold">janedoe@gmail.com</span>
    </>
  );

  return (
    <>
      <div className={`flex ${PAGE_HEIGHT_FIX} gap-2`}>
        <div className="flex flex-[1.4] flex-col items-center justify-center rounded-[36px] bg-white">
          <Heading className="text-5xl font-extrabold text-primary">
            Interactive <span className="gradient-text">Illustration</span>
          </Heading>
        </div>

        <div className="flex w-[33rem] flex-col items-start justify-start rounded-[36px] bg-white">
          <div className="flex w-full justify-between space-y-2 p-5">
            <Image src="/logo.svg" width={100} height={25} alt="MVP 2 Logo" />
            <div className="flex gap-2">
              <button className="rounded-full border-[1px] border-primary bg-primary-tint-100 px-7 py-2 text-[#070416]">
                Client
              </button>
              <button className="rounded-full bg-primary-tint-100 px-7 py-2 text-[#ACA6C8]">
                Freelancer
              </button>
            </div>
          </div>
          <div className="mx-auto mt-3 w-8/12 flex-grow">
            <h2 className="text-start font-lufga text-2xl">
              A sentence of perks and encouragement for{" "}
              <span className="gradient-text">freelancer.</span>
              <Image
                src="/icons/clients_emoji.png"
                width={100}
                height={100}
                alt="Clients Emoji"
                className="inline-block"
              />
            </h2>

            <div className="mt-5 flex gap-2">
              <Input type="text" placeholder="First name" className="mt-3" />
              <Input type="text" placeholder="Last name" className="mt-3" />
            </div>

            <Input type="text" placeholder="Enter email" className="mt-3" />
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="Enter password"
                className="mt-3"
              />
              <Input
                type="password"
                placeholder="Confirm password"
                className="mt-3"
              />
            </div>
            <div className="mt-2 w-full text-start">
              <input type="checkbox" className="border-none outline-none" />
              <span className="ms-2 text-sm text-grey-primary">
                I read and accept the{" "}
              </span>
              <button className="text-sm text-primary">
                Terms and Conditions
              </button>
            </div>
            <OnBoardingButton onClick={handleOpenOverlay}>
              Create account
            </OnBoardingButton>
            <div className="my-1 w-full text-center text-grey-primary-tint-30">
              <div className="flex items-center justify-center gap-2">
                <Image
                  src="line.svg"
                  width={20}
                  height={20}
                  alt="line"
                  className="inline-block"
                />
                <span>Or</span>
                <Image
                  src="line.svg"
                  width={20}
                  height={20}
                  alt="line"
                  className="inline-block"
                />
              </div>
            </div>
            <button className="text-md w-full rounded-full border-[1px] bg-white px-4 py-2 text-center text-primary-tint-20">
              {" "}
              <Image
                src="google.svg"
                width={23}
                height={20}
                alt="google Logo"
                className="inline-block"
              />{" "}
              Sign in with Google
            </button>
            <div className="mt-2">
              <p className="me-1 inline-block text-xs text-grey-primary">
                Already have an account?
              </p>
              <button className="text-xs text-primary underline">
                Login now
              </button>
            </div>
          </div>
          <div className="align-end mt-auto px-7 py-5 text-start text-xs text-grey-primary">
            <Image
              src="icons/info_icon.svg"
              width={14}
              height={14}
              alt="info icon"
              className="inline-block"
            />
            <p className="ms-1 inline-block">
              You’re registering as a client, but you can also switch to
              freelancer later from settings.
            </p>
          </div>
        </div>
      </div>
      {isOverlayVisible && (
        <Overlay isVisible={isOverlayVisible} closeoverlay={handleCloseOverlay}>
          <SuccessModal
            // onClose={handleCloseOverlay}
            imgSrc="/Message.png"
            mainHeading={mainHeading}
            text={text}
            buttonText={"Verify email"}
            onBoarding={true}
            containsOtp={true}
          />
        </Overlay>
      )}
    </>
  );
}
export default SignUp;
