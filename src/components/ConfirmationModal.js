import Image from "next/image";
import OnBoardingButton from "./OnBoardingButton";

const ConfirmationModal = ({
  imgSrc,
  mainHeading,
  text,
  buttonText,
  onClose,
}) => {
  return (
    <div className="flex h-[100%] w-[100%] flex-col items-center justify-around font-lufga">
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
          <p className="mt-[0.5rem] w-[80%] text-center text-sm">{text}</p>
        </div>
        <OnBoardingButton onClick={onClose}>{buttonText}</OnBoardingButton>
      </div>
    </div>
  );
};

export default ConfirmationModal;
