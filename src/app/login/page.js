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
import urlBase64ToUint8Array from "@/utils/urlBase64ToUint8Array";
import { PAGE_HEIGHT_FIX } from "@/utils/utility";
import Image from "next/image";
import Link from "next/link";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo, useCallback, useEffect } from "react";

function Login() {

  const params = useSearchParams();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const router = useRouter();
  const [alert, setalert] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [user_role, setUserRole] = useState("client");
  const [isForgotPasswordOpened, setIsForgotPasswordOpened] = useState(false);
  const [show, setShow] = useState(false);

  // Set page title
  useEffect(() => {
    document.title = "CoVental | Pool of the top talent";
  }, []);

  const handleCloseOverlay = () => {
    setIsForgotPasswordOpened(false);
  };

  const handClick = () => {
    setShow(!show);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleLogin(e); // Trigger login on Enter key press
    }
  };

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

          const isLoggedIn =
            localStorage.getItem("MVP_CLIENT_LOGGEDIN") === "true";

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with logo */}
      <div className="flex justify-between items-center p-6">
        {/* CoVentech logo in top left corner */}
        <div>
          <Image src="/cooventechlogo.png" width={135} height={35} alt="CoVentech Logo" />
        </div>
      </div>

      {/* Login Form Container - Centered */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="bg-white shadow-lg p-8 w-full max-w-md rounded-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Login</h1>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-600 mb-2">
                Enter email address
              </label>
              <Input
                type="email"
                name="email"
                id="email"
                value={form.email}
                error={errors.email}
                onChange={handleChange}
                placeholder="Email address"
                className="w-full"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-gray-600 mb-2">
                Enter your password
              </label>
              <div className="relative">
                <Input
                  type={show ? "text" : "password"}
                  name="password"
                  id="password"
                  value={form.password}
                  onKeyDown={handleKeyDown}
                  onChange={handleChange}
                  error={errors.password}
                  placeholder="Your password"
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={handClick}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <Image
                    src={show ? "/eye-close.svg" : "/eye.svg"}
                    width={20}
                    height={20}
                    alt="toggle password visibility"
                    className="cursor-pointer"
                  />
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => setIsForgotPasswordOpened(true)}
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors py-3 px-6 text-base font-semibold ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <LoaderIcon />
                  <span className="ml-2" style={{ fontSize: '18px' }}>Logging in...</span>
                </div>
              ) : (
                "Continue"
              )}
            </button>

            <div className="text-center text-gray-500 text-sm">
              <div className="flex items-center justify-center gap-3 my-4">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span>or</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>
            </div>

            {/* Google signin */}
            <SignInButton user_role={user_role} />
            <div className="text-center mt-6">
              <span className="block mb-2 text-gray-600 text-sm">Don&apos;t have an account?</span>
              <button
                type="button"
                className="inline-block rounded-lg border border-blue-600 text-blue-600 px-6 py-2 font-medium hover:bg-blue-50 transition-colors"
                onClick={() => router.push('/signup?role=' + user_role)}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
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
            onBoarding={true}
            containsOtp={true}
          />
        </Overlay>
      )}
      {alert && (
        <ErrorPopup
          message="Incorrect email or password"
          type="error"
          onClose={() => setalert(false)}
        />
      )}
    </div>
  );
}
export default Login;