import { useState } from "react";
import Image from "next/image";
import OnBoardingButton from "./OnBoardingButton";
import Input from "./Input";
import ConfirmationModal from "./ConfirmationModal"; // Import the new component
import Overlay from "./Overlay";
const SuccessModal = ({
  imgSrc,
  mainHeading,
  text,
  buttonText,
  onBoarding,
  onClose,
  containsOtp,
}) => {
  const [isSecondPopupVisible, setIsSecondPopupVisible] = useState(false);

  const handleVerifyEmailClick = () => {
    setIsSecondPopupVisible(true);
    onClose; // Close the first popup
  };

  return (
    <div className="pt flex h-[100%] w-[100%] flex-col items-center justify-around font-lufga">
      <div className="flex flex-col items-center">
        <Image
          className="mb-[1rem]"
          src={imgSrc}
          width={100}
          height={100}
          alt="Success"
        />
        <div className="flex flex-col items-center justify-center">
          <h2 className="w-[100%] text-center text-xl font-semibold">
            {mainHeading}
          </h2>
          <p className="mt-[0.5rem] w-[100%] text-center text-sm">{text}</p>
          {onBoarding && containsOtp && (
            <Input
              type="number"
              placeholder="000000"
              className="mt-5 py-3 text-center"
            />
          )}
        </div>
        {onBoarding && containsOtp ? (
          <OnBoardingButton onClick={handleVerifyEmailClick}>
            {buttonText}
          </OnBoardingButton>
        ) : (
          <OnBoardingButton onClick={onClose}>
            Okay I understand
          </OnBoardingButton>
        )}
      </div>

      {!onBoarding && (
        <div className="mt-[3rem] flex w-auto justify-center rounded-full border-[1px] border-primary bg-primary-tint-90 px-[0.2rem] py-[0.3rem]">
          <span className="font-lufga text-[0.6rem] text-primary">
            <span className="font-semibold">Note:</span> Do not refresh, close,
            or click the back button on this page. Your data might be lost.
          </span>
        </div>
      )}

      {isSecondPopupVisible && (
        <Overlay isVisible={isSecondPopupVisible} closeoverlay={onClose}>
          <ConfirmationModal
            imgSrc="/Tick.png"
            mainHeading="Your account is successfully created"
            text="Your account is currently under review. Soon you’ll receive an email on janedoe@gmail.com upon approval"
            buttonText={"Okay I understand"}
            onClose={onClose}
          />
        </Overlay>
      )}
    </div>
  );
};

export default SuccessModal;
