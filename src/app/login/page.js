"use client";
import ErrorPopup from "@/components/ErrorPopup";
import ForgotPasswordModal from "@/components/ForgotPasswordModal";
import Heading from "@/components/Heading";
import Input from "@/components/Input";
import OnBoardingButton from "@/components/OnBoardingButton";
import Overlay from "@/components/Overlay";
import SignInButton from "@/components/SignInButton";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import LoaderIcon from "@/svgs/LoaderIcon";
import { PAGE_HEIGHT_FIX } from "@/utils/utility";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useMemo, useCallback, useEffect } from "react";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const router = useRouter();
  const [alert, setalert] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [user_role, setUserRole] = useState("client");
  const [isForgotPasswordOpened, setIsForgotPasswordOpened] = useState(false);
  const [show, setShow] = useState(false);

  const handleCloseOverlay = () => {
    setIsForgotPasswordOpened(false);
  };

  const handClick = () => {
    setShow(!show)
  }

  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "email":
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value)) {
          errorMsg = "Invalid email address";
        }
        break;
      case "password":
        if (!/^.{8,}$/.test(value)) {
          errorMsg = "Password must be at least 8 characters long";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const isFormInvalid = useMemo(() => {
    return (
      Object.values(errors).some((err) => err !== "") ||
      !form.email ||
      !form.password
    );
  }, [errors, form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    validateField(name, value);
  };

  const payload = useMemo(
    () => ({
      endpoint: "login",
      method: "POST",
      body: {
        email: form.email,
        password: form.password,
        user_role,
        method: "login",
      },
    }),
    [form, user_role],
  );

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();

      setisLoading(true); // Start loading

      // Validate all fields before submission
      if (!form.email || !form.password || errors.email || errors.password) {
        setisLoading(false); // Stop loading if validation fails
        return;
      }

      console.log(payload);
      const result = await mvp2ApiHelper(payload);
      console.log(result);

      if (result.status === 200) {
        const Authenticated = true;
        if (Authenticated) {
          localStorage.setItem("MVP_CLIENT_LOGGEDIN", true);

          const now = new Date();
          now.setTime(now.getTime() + 60 * 60 * 60 * 10 + 36000000); // 36000000 ms = 10 hours
          const expires = now.toUTCString();

          const token = result.data.token;
          document.cookie = `credentialLoginToken=${token}; expires=${expires}; path=/;`;

          // Handle navigation loading
          const handleRouteChangeComplete = () => {
            setisLoading(false); // Stop loading when navigation is complete
            router.events.off("routeChangeComplete", handleRouteChangeComplete);
          };

          router?.events?.on("routeChangeComplete", handleRouteChangeComplete);

          if (user_role === "customer") {
            router.push(`/candidate/${result.data.id}`);
          } else {
            router.push(`/client/${result.data.id}`);
          }
        }
      } else {
        setisLoading(false);
        setalert(true);
      }
    },
    [form, errors, user_role],
  );

  return (
    <>
      <div className={`flex ${PAGE_HEIGHT_FIX} gap-2`}>
        <div className="flex flex-[1.4] flex-col items-center justify-center rounded-[36px] bg-white">
          <Heading className="text-5xl font-extrabold text-primary">
            Interactive <span className="gradient-text">Illustration</span>
          </Heading>
        </div>
        <div className="flex w-[33rem] flex-col items-start justify-start overflow-y-auto rounded-[36px] bg-white">
          <div className="flex w-full justify-between space-y-2 p-5">
            <Image src="/logo.svg" width={100} height={25} alt="MVP 2 Logo" />
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  //e.preventDefault();
                  setUserRole("client");
                }}
                className={`rounded-full border-[1px] ${user_role === "client" ? "border-primary bg-primary-tint-100 px-7 py-2 text-[#070416]" : "bg-primary-tint-100 px-7 py-2 text-[#ACA6C8]"}`}
              >
                Client
              </button>
              <button
                onClick={(e) => {
                  //e.preventDefault();
                  setUserRole("customer");
                }}
                className={`rounded-full border-[1px] ${user_role === "customer" ? "border-primary bg-primary-tint-100 px-7 py-2 text-[#070416]" : "bg-primary-tint-100 px-7 py-2 text-[#ACA6C8]"}`}
              >
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

            <Input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-5"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
             <div className="flex"  >
               <Input
               type= {show ? "text" :"password" }
               name="password"
               value={form.password}
               onChange={handleChange}
               placeholder="Enter your password"
               className="mt-3"
               /> 
               <p className=" ml-[-37px] " > 
                  {show ?
                   <Image
                  src="eye-close.svg"
                  width={20}
                  height={20}
                  alt="line"
                  onClick={handClick}
                  className="inline-block mt-[24px] cursor-pointer "
                  />:
                  <Image
                  src="eye.svg"
                  width={20}
                  height={20}
                  alt="line"
                  onClick={handClick}
                  className="inline-block mt-[24px] cursor-pointer "
                  />}
                
                </p>
              </div>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}

            <div className="mt-2 w-full text-right">
              <button
                onClick={() => setIsForgotPasswordOpened(true)}
                className="text-sm text-primary"
              >
                Forgot Password?
              </button>
            </div>
            <OnBoardingButton
              onClick={handleLogin}
              disabled={isFormInvalid}
              className={`${
                isFormInvalid ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <LoaderIcon />
                  <span className="ml-2">Logging in...</span>
                </div>
              ) : (
                "Login to proceed"
              )}
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
            {/* Google signin */}
            <SignInButton user_role={user_role} />
            {/* ---- */}
            <div className="mt-2">
              <p className="me-1 inline-block text-xs text-grey-primary">
                Don’t have an account?
              </p>
              <Link href={"/signup"} className="text-xs text-primary underline">
                Sign up now
              </Link>
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
              You’re registering as client, but you can also switch to
              freelancer later from settings.
            </p>
          </div>
        </div>
      </div>
      {isForgotPasswordOpened && (
        <Overlay
          width={"27.813rem"}
          height={"30.813rem"}
          isVisible={isForgotPasswordOpened}
          closeoverlay={handleCloseOverlay}
        >
          <ForgotPasswordModal
            user_role={user_role}
            onClose={handleCloseOverlay}
            imgSrc="/Message.png"
            // mainHeading={mainHeading}
            // text={text}
            // confirmationtext={confirmationtext}
            //buttonText={"Verify email"}
            onBoarding={true}
            containsOtp={true}
            //signupHandler={handleSignup}
          />
        </Overlay>
      )}
      {alert && (
        <ErrorPopup
          message="Incorrect email or password"
          type="error" // Can be 'success', 'error', 'warning', 'info'
          onClose={() => setalert(false)}
        />
      )}
    </>
  );
}
export default Login;
