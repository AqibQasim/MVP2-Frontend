import Image from "next/image";
import OnBoardingButton from "./OnBoardingButton";
import LoaderIcon from "@/svgs/LoaderIcon";

const ConfirmationModal = ({
  imgSrc,
  mainHeading,
  text,
  buttonText,
  onClose,
  confirmationtext,
  isLoading,
  signupHandler,
}) => {
  return (
    <div className="flex h-[60%] w-[100%] flex-col items-center justify-around font-lufga">
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
          <p className="mt-[0.5rem] w-[80%] text-center text-sm">
            {confirmationtext}
          </p>
        </div>
        {isLoading}
        <OnBoardingButton onClick={signupHandler}>
          {isLoading ? (
            <div className="flex items-center">
              <LoaderIcon />
              <span className="ml-2">Signing in...</span>
            </div>
          ) : (
            "Okay I underStand"
          )}
        </OnBoardingButton>
      </div>
    </div>
  );
};

export default ConfirmationModal;
