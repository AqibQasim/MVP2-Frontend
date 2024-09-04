import Image from "next/image";
import OnBoardingButton from "./OnBoardingButton";
import Input from "./Input";

const SuccessModal = ({
  imgSrc,
  mainHeading,
  text,
  buttonText,
  onBoarding,
  onClose,
  containsOtp,
  // handleOpenOverlay2, // Pass the function here
}) => {
  const handleOpenOverlay2 = () => {
    console.log("cickiinngggg");
  };
  return (
    <div className="flex h-[85vh] w-[100%] flex-col items-center justify-around font-lufga">
      <div className="flex flex-col items-center">
        <Image
          className="mb-[1rem]"
          src={imgSrc}
          width={100}
          height={100}
          alt="Success"
        />
        <div className="flex flex-col items-center justify-center">
          <h2 className="w-[90%] text-center text-xl font-semibold">
            {mainHeading}
          </h2>
          <p className="tes mt-[0.5rem] w-[80%] text-center text-sm">{text}</p>
          {onBoarding && containsOtp && (
            <Input type="number" placeholder="000000" className="mt-5" />
          )}
        </div>
        {!onBoarding && (
          <Image
            src="/line.svg"
            className="m-4 w-[80%]"
            width={20}
            height={20}
            alt="Line"
          />
        )}
        {onBoarding && containsOtp ? (
          <OnBoardingButton onClick={handleOpenOverlay2}>
            {buttonText}
          </OnBoardingButton>
        ) : (
          <OnBoardingButton onClick={onClose}>{buttonText}</OnBoardingButton>
        )}
      </div>

      {!onBoarding && (
        <div className="mt-[3rem] flex w-auto justify-center rounded-full border-[1px] border-primary bg-primary-tint-90 px-[0.2rem] py-[0.3rem]">
          <span className="font-lufga text-[0.6rem] text-primary">
            <span className="font-semibold">Note:</span> Do not refresh, close,
            or click back button on this page. Your data might be lost.
          </span>
        </div>
      )}
    </div>
  );
};

export default SuccessModal;
