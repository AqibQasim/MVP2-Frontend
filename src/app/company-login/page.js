"use client";
import ErrorPopup from "@/components/ErrorPopup";
import ForgotPasswordModal from "@/components/ForgotPasswordModal";
import Input from "@/components/Input";
import Overlay from "@/components/Overlay";
import SignInButton from "@/components/SignInButton";
import LoaderIcon from "@/svgs/LoaderIcon";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function Login() {
  const params = useSearchParams();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const router = useRouter();
  const [alert, setalert] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isForgotPasswordOpened, setIsForgotPasswordOpened] = useState(false);
  const [show, setShow] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setisLoading(true);
    // Basic validation
    if (!form.email || !form.password) {
      setErrors({
        email: !form.email ? "Email is required" : "",
        password: !form.password ? "Password is required" : "",
      });
      setisLoading(false);
      return;
    }
    try {
      //Replace with your actual login API call
      //Example:
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
            user_role: "client",
            method: "login",
          }),
        },
      );
      if (res.ok) {
        console.log(res.body);
        setTimeout(() => {
          setisLoading(false);
          router.push("/client/"); // or your dashboard route
        }, 1000);
      }
      // For now, just simulate success
    } catch (err) {
      setisLoading(false);
      setalert(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handClick = () => {
    setShow((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  const handleCloseOverlay = () => {
    setIsForgotPasswordOpened(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header with logo */}
      <div className="flex items-center justify-between p-6">
        <div>
          <a href="https://www.co-ventech.com/" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
            <Image
              src="/cooventechlogo.png"
              width={135}
              height={35}
              alt="CoVentech Logo"
            />
          </a>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-semibold text-gray-900">
              Company login
            </h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            {/* ...existing code... */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm text-gray-600"
              >
                Enter your work email
              </label>
              <Input
                type="email"
                name="email"
                id="email"
                value={form.email}
                error={errors.email}
                onChange={handleChange}
                placeholder="your.name@company.com"
                className="w-full"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm text-gray-600"
              >
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
                  placeholder="password"
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={handClick}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform"
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
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
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
              type="submit"
              disabled={isLoading}
              className={`w-full rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <LoaderIcon />
                  <span className="ml-2" style={{ fontSize: "18px" }}>
                    Logging in...
                  </span>
                </div>
              ) : (
                "Continue"
              )}
            </button>
            <div className="text-center text-sm text-gray-500">
              <div className="my-4 flex items-center justify-center gap-3">
                <div className="h-px flex-1 bg-gray-300"></div>
                <span>or</span>
                <div className="h-px flex-1 bg-gray-300"></div>
              </div>
            </div>
          </form>
          <SignInButton user_role="client" />
          <div className="mt-6 flex items-center justify-center text-sm text-gray-600">
            <span>Don&apos;t have an account? </span>
            <button
              type="button"
              className="ml-1 cursor-pointer border-none bg-transparent p-0 font-medium text-blue-600 underline hover:text-blue-800"
              style={{ boxShadow: "none" }}
              onClick={() => router.push("/company-signup")}
            >
              Register
            </button>
          </div>
          {/* Talent login link in one line */}
          <div className="mb-2 mt-8 flex items-center justify-center text-sm text-gray-600">
            <span>If you are a talent, click on</span>
            <button
              type="button"
              className="ml-1 cursor-pointer border-none bg-transparent p-0 font-medium text-blue-600 underline hover:text-blue-800"
              style={{ boxShadow: "none" }}
              onClick={() => router.push("/login")}
            >
              Login
            </button>
            <span> </span>
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
            user_role="client"
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
