import { useCallback, useState } from "react";
import Image from "next/image";
import OnBoardingButton from "./OnBoardingButton";
import Input from "./Input";
import ConfirmationModal from "./ConfirmationModal"; // Import the new component
import Overlay from "./Overlay";
import { generateOtp } from "@/utils/generateOtp";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import OTPInput from "react-otp-input";
import ButtonCapsule from "./ButtonCapsule";
import { candidateUpdateProfile } from "@/lib/data-service";
import { useRouter } from "next/navigation";
const ForgotPasswordModal = ({
  imgSrc,
  //mainHeading,
  //text,
  //buttonText,
  user_role,
  //onBoarding,
  onClose,
  //containsOtp,
  signupHandler,
  //confirmationtext,
}) => {
  const router = useRouter();
  const [isSecondPopupVisible, setIsSecondPopupVisible] = useState(false);
  const [email, setEmail] = useState(null);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [popupState, setPopupState] = useState("email");
  const [otp, setotp] = useState(null);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const handlePasswordReset = async () => {
    const body = {
      new_password: password,
      email,
      user_role,
    };

    const payload = {
      method: "POST",
      endpoint: "password-reset",
      body,
    };

    const response = await mvp2ApiHelper(payload);
    if (response.status === 200) {
      console.log(response.data);
      onClose();
    } else {
      console.log(response.data);
      setErrors((prevErrors) => ({
        ...prevErrors,
        ["passwordResetError"]: response.data?.message,
      }));
    }
  };

  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "password":
        if (!/^.{8,}$/.test(value)) {
          errorMsg = "Password must be at least 8 characters";
        }
        break;
      case "confirmPassword":
        if (value !== password) {
          errorMsg = "Passwords do not match";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const validateUser = async () => {
    let endpoint = null;

    if (user_role === "client") {
      endpoint = `client-by-email?email=${email}`;
    }

    if (user_role === "customer") {
      endpoint = `customer-by-email?email=${email}`;
    }
    const userPayload = {
      endpoint,
      method: "GET",
    };

    const result = await mvp2ApiHelper(userPayload);

    if (result.status !== 200) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ["passwordResetError"]: result?.data?.message,
      }));
      console.log(result?.data?.message);
      //setOverlayVisible(true);
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ["passwordResetError"]: null,
      }));
    }
  };

  const handleOtpVerification = () => {
    if (enteredOtp.toString() === otp.toString()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ["passwordResetError"]: null,
      }));
      console.log("OTP verified successfully");
      setPopupState("reset-password");
      onClose;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ["passwordResetError"]: "Incorrect OTP",
      }));
    }
  };

  const sendOtp = useCallback(
    async (event) => {
      event.preventDefault();

      if (Object.values(error).every((err) => err === "")) {
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

  const mainHeading = (heading, gradientText) => (
    <span>
      {heading}{" "}
      {gradientText && (
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
      )}
    </span>
  );
  let text = (t) => <>{t}</>;
  let confirmationtext = (
    <>
      Your account is currently under review. Soon you’ll receive an email on{" "}
      <span className="font-semibold"> {email} </span> upon approval
    </>
  );

  const buttonText = (t) => <>{t}</>;

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
            {popupState === "email" && mainHeading("Forgot Password?")}
            {popupState === "otp" && mainHeading("Enter your", "code")}
            {popupState === "reset-password" && mainHeading(`Set new password`)}
          </h2>
          <p className="mt-[0.5rem] w-[100%] text-center text-sm">
            {popupState === "email" && text("Enter email for instructions")}
            {popupState === "otp" && text(`We have sent code to ${email}`)}
            {popupState === "reset-password" &&
              text(`Must be at least 8 characters`)}
          </p>
          {popupState === "email" && (
            <Input
              type="email"
              name="email"
              placeholder={"Enter your email"}
              className="mt-5 py-3 text-center"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          )}
          {popupState === "otp" && (
            <div className="flex flex-col items-center justify-center">
              <OTPInput
                value={enteredOtp}
                onPaste={(e) => {
                  const pastedData = e.clipboardData.getData("text");
                  // Check if the pasted data contains exactly the right number of digits
                  if (pastedData.length === 6) {
                    setEnteredOtp(pastedData); // Set the OTP value if the length matches
                  }
                }}
                onChange={setEnteredOtp}
                containerStyle={
                  "w-full h-[4.5rem] gap-[0.625rem] justify-center"
                }
                numInputs={6}
                inputStyle={
                  "rounded-lg text-[24px] border border-gray-300 focus:border-primary"
                }
                //renderSeparator={<span className="w-1" />}
                renderInput={(props) => (
                  <input
                    {...props}
                    style={{
                      width: "3rem",
                      height: "4.13rem",
                      textAlign: "center",
                    }}
                    type="number"
                  />
                )}
              />
              <div className="flex gap-1">
                Did not get the code?
                <div onClick={(e) => sendOtp(e)} className="text-primary">
                  Click to resend
                </div>
              </div>
            </div>
          )}

          {popupState === "reset-password" && (
            <div>
              <Input
                type="password"
                name="password"
                placeholder={"Password"}
                className="mt-5 py-3 text-start"
                onChange={(e) => {
                  const { name, value } = e.target;
                  setPassword(value);
                  validateField(name, value);
                }}
              />
              <div>
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password}</p>
                )}
              </div>
              <Input
                type="password"
                name="confirmPassword"
                placeholder={"Confirm Password"}
                className="mt-5 py-3 text-start"
                onChange={(e) => {
                  const { name, value } = e.target;
                  setConfirmPassword(value);
                  validateField(name, value);
                }}
              />
              <div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div>
          {errors.passwordResetError && (
            <p className="text-xs text-red-500">{errors.passwordResetError}</p>
          )}
        </div>

        <ButtonCapsule
          className="mt-3 w-full justify-between"
          onPress={async (e) => {
            if (popupState === "email" && email) {
              await validateUser();
              if (
                errors?.passwordResetError === null //||
                //errors?.passwordResetError === undefined
              ) {
                sendOtp(e);
                setPopupState("otp");
              }
            }

            if (popupState === "otp") {
              if (enteredOtp) handleOtpVerification(e);
            }

            if (popupState === "reset-password") {
              await handlePasswordReset();
            }
          }}
        >
          {popupState === "email" && buttonText("Send 4-digit code")}
          {popupState === "otp" && buttonText("Continue")}
          {popupState === "reset-password" && buttonText("Set password")}
        </ButtonCapsule>
        {/* ) : (
          <OnBoardingButton onClick={onClose}>
            Okay I understand
          </OnBoardingButton>
        )} */}
      </div>

      {/* {!onBoarding && (
        <div className="mt-[3rem] flex w-auto justify-center rounded-full border-[1px] border-primary bg-primary-tint-90 px-[0.2rem] py-[0.3rem]">
          <span className="font-lufga text-[0.6rem] text-primary">
            <span className="font-semibold">Note:</span> Do not refresh, close,
            or click the back button on this Page. Your data might be lost.
          </span>
        </div>
      )} */}

      {isSecondPopupVisible && (
        <Overlay isVisible={isSecondPopupVisible} closeoverlay={onClose}>
          <ConfirmationModal
            imgSrc="/Tick.png"
            mainHeading="Your account is successfully created"
            text="Your account is currently under review. Soon you will receive an email on janedoe@gmail.com upon approval"
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
