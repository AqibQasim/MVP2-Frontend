import { useCallback, useState } from "react";
import Image from "next/image";
import OnBoardingButton from "./OnBoardingButton";
import Input from "./Input";
import ConfirmationModal from "./ConfirmationModal"; // Import the new component
import Overlay from "./Overlay";
import { generateOtp } from "@/utils/generateOtp";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
const ForgotPasswordModal = ({
  imgSrc,
  //mainHeading,
  //text,
  //buttonText,
  onBoarding,
  onClose,
  containsOtp,
  signupHandler,
  //confirmationtext,
}) => {
  const [isSecondPopupVisible, setIsSecondPopupVisible] = useState(false);
  const [email, setEmail]= useState(null);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [popupState,setPopupState]=useState("email");
  const [otp, setotp] = useState(null);
  const [textInputType,setTextInputType]=useState("email");
  const [errors, setError] = useState(false);


  const handleOtpChange = (event) => {
    setEnteredOtp(event.target.value);
  };

  const handleOtpVerification = () => {
    if (enteredOtp === otp.toString()) {
      console.log("OTP verified successfully");
      setIsSecondPopupVisible(true);
      onClose;
    } else {
      console.log("Incorrect OTP");
    }
  };

  const sendOtp = useCallback(
    async (event) => {
      event.preventDefault();

      if (Object.values(errors).every((err) => err === "")) {
        const generatedotp = generateOtp();
        setotp(generatedotp);
        console.log(generatedotp);

        const payload = {
          endpoint: "send-email",
          method: "POST",
          body: {
            to: email, // Using form.email for the recipient
            subject: "OTP",
            text: `Your OTP code is: ${generatedotp}`, // Include the generated OTP
          },
        };

        try {
          const result = await mvp2ApiHelper(payload);

          if (result.status === 200) {
            console.log("Email sent successfully");
            setOverlayVisible(true);
          } else {
            console.log("Failed to send email");
          }
        } catch (error) {
          console.error("Error sending email: ", error);
        }
      }
    },
    [email], // dependencies
  );

  // const handleVerifyEmailClick = () => {
  //   setIsSecondPopupVisible(true);
  //   onClose; // Close the first popup
  // };

  const mainHeading = (heading)=>(
    <span>
      {heading}{" "}
      {/* <span
        style={{
          backgroundImage: "linear-gradient(to right, #4624E0, white)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline",
        }}
      >
        Code.
      </span> */}
    </span>
  );
  let text = (t)=>(
    <>
      {t}
    </>
  );
  let confirmationtext = (
    <>
      Your account is currently under review. Soon you’ll receive an email on{" "}
      <span className="font-semibold"> {email} </span> upon approval
    </>
  );

  const buttonText=(t)=>(
    <>
      {t}
    </>
  )

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
            {mainHeading("Forgot Password?")}
          </h2>
          <p className="mt-[0.5rem] w-[100%] text-center text-sm">{text("Enter email for instructions")}</p>
          {popupState==="email" && (
            <Input
              type='email'
              placeholder={"Enter your email"}
              className="mt-5 py-3 text-center"
              onChange={(e)=>{
                setEmail(e.target.value);
              }}
            />
          )}
        </div>
        
          <OnBoardingButton onClick={(e)=>{
            if(popupState==="email" && email){
                setPopupState("otp");
                sendOtp(e);
            }

            if(popupState==="otp"){
                if(enteredOtp) handleOtpVerification(e);
            }
          }}>
            {(popupState==="email")&&buttonText("Send 4-digit code")}
            {(popupState==="otp")&&buttonText("Continue")}
          </OnBoardingButton>
        {/* ) : (
          <OnBoardingButton onClick={onClose}>
            Okay I understand
          </OnBoardingButton>
        )} */}
      </div>

      {!onBoarding && (
        <div className="mt-[3rem] flex w-auto justify-center rounded-full border-[1px] border-primary bg-primary-tint-90 px-[0.2rem] py-[0.3rem]">
          <span className="font-lufga text-[0.6rem] text-primary">
            <span className="font-semibold">Note:</span> Do not refresh, close,
            or click the back button on this Page. Your data might be lost.
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
            signupHandler={signupHandler}
            confirmationtext={confirmationtext}
            // onClose={onClose}
          />
        </Overlay>
      )}
    </div>
  );
};

export default ForgotPasswordModal;
