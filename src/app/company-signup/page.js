// Company signup page, identical to signup
"use client";
import ErrorPopup from "@/components/ErrorPopup";
import PhoneInputEl from "@/components/PhoneInputEl";
import Input from "@/components/Input";
import OnBoardingButton from "@/components/OnBoardingButton";
import Overlay from "@/components/Overlay";
import SignInButton from "@/components/SignInButton";
import SuccessModal from "@/components/SuccessModal";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import { revalidate } from "@/lib/data-service";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState, useEffect } from "react";

function Page() {

  useEffect(() => {
    document.title = "CoVental | Pool of the top talent";
  }, []);

  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    countryCode: "+92",
    country: "",
    confirmPassword: "",
  });
  const [confirmTerms, setConfirmTerms] = useState(false);
  const user_role="client";
  const [errors, setErrors] = useState({});
  const [termsError, setTermsError] = useState("");
  const [otp, setotp] = useState(null);
  const [alert, setAlert] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handClick = () => {
    setShow(!show);
  };
  const handClick2 = () => {
    setShow2(!show2);
  };

  const payload = useMemo(
    () => ({
      endpoint: "signup",
      method: "POST",
      body: {
        email: form.email,
        name: form.firstName + " " + form.lastName,
        password: form.password,
        country: form.country || "Pakistan",
        contact_no: `${form.countryCode}${form.phoneNumber}`,
        user_role,
        method: "signup",
      },
    }),
    [form, user_role],
  );

  const handleSignup = useCallback(
    async (event) => {
      event.preventDefault();
      setisLoading(true);
      if (Object.values(errors).some((err) => err !== "")) {
        return;
      }
      const result = await mvp2ApiHelper(payload);
      try {
        const stripeResponse = await fetch("/api/create-customer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            name: form.firstName + " " + form.lastName,
            metadata:
              user_role == "customer"
                ? { customer: 1, customer_id: result?.data?.customer_id }
                : { customer: 0, client_id: result?.data?.client_id },
          }),
        });
        if (!stripeResponse.ok) throw new Error("Failed to create Stripe customer");
        const stripeData = await stripeResponse.json();
        let createAccountData;
        if (user_role === "client") {
          const createAccountResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/create-client-stripe-account`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                client_id: result.data.client_id,
                stripe_id: stripeData.customer.id,
              }),
            },
          );
          createAccountData = await createAccountResponse.json();
          if (createAccountResponse.status !== 200) throw new Error(createAccountData.error);
        } else {
          const createAccountResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/create-customer-stripe-account`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                customer_id: result.data.customer_id,
                stripe_id: stripeData.customer.id,
              }),
            },
          );
          createAccountData = await createAccountResponse.json();
          if (createAccountResponse.status !== 200) throw new Error(createAccountData.error);
        }
        if (result.data.status === 200) {
          setOverlayVisible(false);
          setisLoading(false);
          const revalidatePathOnSignup = `/admin/${user_role === "client" ? "clients" : "candidates"}`;
          revalidate(revalidatePathOnSignup);
        }
      } catch (error) {
        setisLoading(false);
      }
    },
    [form, errors, user_role],
  );

  const handleOpenOverlay = useCallback(
    async (event) => {
      event.preventDefault();
      let hasError = false;
      if (!form.firstName || form.firstName.trim() === "") {
        setErrors((prev) => ({ ...prev, firstName: "Name is required" }));
        hasError = true;
      }
      if (!confirmTerms) {
        setTermsError("Please accept the terms and conditions");
        hasError = true;
      }
      if (!form.email || !form.phoneNumber || !form.password || !form.confirmPassword) {
        setisLoading(false);
        hasError = true;
      }
      if (form.password !== form.confirmPassword) {
        setisLoading(false);
        hasError = true;
      }
      if (hasError) {
        setisLoading(false);
        return;
      }
      setisLoading(true);
      try {
        let apiUrl = `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/client-by-email?email=${form.email}`;
        const checkUserResponse = await fetch(apiUrl, { method: "GET" });
        if (checkUserResponse.status === 200) {
          setAlert(true);
          setisLoading(false);
          return;
        }
        if (checkUserResponse.status === 404) {
          const emailPayload = {
            to: form.email,
            subject: "Co-Vental Email Verification",
            text: `Your OTP is: `,
            type: "otp"
          };
          const emailResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/send-email`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(emailPayload),
            },
          );
          if (emailResponse.ok) {
            const emailData = await emailResponse.json();
            setotp(emailData?.data?.hash);
            setOverlayVisible(true);
            setisLoading(false);
          } else {
            setisLoading(false);
          }
        } else {
          setisLoading(false);
        }
      } catch (error) {
        setisLoading(false);
      }
    },
    [form, errors, user_role, confirmTerms],
  );

  const handleCloseOverlay = () => {
    setOverlayVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Only validate on change, but don't clear error if field is still empty
    if (name === "firstName" && (!value || value.trim() === "")) {
      setErrors((prev) => ({ ...prev, firstName: "Name is required" }));
    } else {
      validateField(name, value);
    }
  };

  const validateField = (name, value) => {
    let errorMsg = "";
    switch (name) {
      case "firstName":
        if (!value || value.trim() === "") {
          errorMsg = "Name is required";
        } else if (!/^[A-Za-z\s]{2,}$/.test(value)) {
          errorMsg = "First name must be at least 2 characters and contain only letters";
        }
        break;
      case "lastName":
        if (!/^[A-Za-z\s]{2,}$/.test(value)) {
          errorMsg = "Last name must be at least 2 characters and contain only letters";
        }
        break;
      case "email":
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value)) {
          errorMsg = "Invalid email address";
        }
        break;
      case "phoneNumber":
        if (!/^\d{7,15}$/.test(value.replace(/\D/g, ""))) {
          errorMsg = "Invalid phone number";
        }
        break;
      case "password":
        if (!/^.{8,}$/.test(value)) {
          errorMsg = "Password must be at least 8 characters long";
        }
        if (form.confirmPassword && form.confirmPassword !== value) {
          setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "Passwords do not match" }));
        } else if (form.confirmPassword && form.confirmPassword === value) {
          setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
        }
        break;
      case "confirmPassword":
        if (value !== form.password) {
          errorMsg = "Passwords do not match";
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  let mainHeading = (
    <span>
      Please verify your email and start finding amazing talent for{" "}
      <span
        style={{
          background:
            "linear-gradient(90deg, #6366F1 0%, #8B5CF6 32.29%, #EC4899 100%)",
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
      <span className="font-semibold">{form.email}</span>
    </>
  );
  let confirmationtext = (
    <>
      Your account is currently under review. Soon you&apos;ll receive an email on{" "}
      <span className="font-semibold"> {form.email} </span> upon approval
    </>
  );

  return (
  <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with logo */}
      <div className="flex justify-between items-center p-6">
        <div className="absolute left-8 top-6">
          <Image src="/cooventechlogo.png" width={135} height={35} alt="CoVentech Logo" />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="bg-white shadow-lg p-8 w-full max-w-md rounded-2xl">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">Company Register</h1>
          </div>
          <form onSubmit={handleOpenOverlay} className="space-y-3">
            {/* Company Name */}
            <div>
              <Input
                type="text"
                name="companyName"
                id="companyName"
                value={form.companyName || ""}
                onChange={handleChange}
                placeholder="Enter Company Name"
                className="w-full"
              />
            </div>
            {/* First Name and Last Name */}
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={form.firstName}
                  error={errors.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="w-full"
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                )}
              </div>
              <div className="flex-1">
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={form.lastName}
                  error={errors.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className="w-full"
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>
            {/* Email */}
            <div>
              <Input
                type="email"
                name="email"
                id="email"
                value={form.email}
                error={errors.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className="w-full"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>
            {/* Phone Number */}
            <div>
              <div className="flex gap-2">
                <PhoneInputEl
                  className="w-full rounded-full border border-gray-300 px-6 py-4 text-sm leading-tight text-gray-900 focus:border-primary focus:ring-primary bg-white flex items-center"
                  phone={form.phoneNumber}
                  setPhone={(phone) => setForm({ ...form, phoneNumber: phone })}
                  setCountry={(country) => setForm({ ...form, country: country })}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-xs text-red-500 mt-1">{errors.phoneNumber}</p>
              )}
            </div>
            {/* Password */}
            <div>
              <div className="relative">
                <Input
                  type={show ? "text" : "password"}
                  name="password"
                  id="password"
                  value={form.password}
                  onChange={handleChange}
                  error={errors.password}
                  placeholder="Enter password"
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
            {/* Confirm Password */}
            <div>
              <div className="relative">
                <Input
                  type={show2 ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  placeholder="Confirm password"
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={handClick2}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <Image
                    src={show2 ? "/eye-close.svg" : "/eye.svg"}
                    width={20}
                    height={20}
                    alt="toggle password visibility"
                    className="cursor-pointer"
                  />
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
              )}
            </div>
            {/* Terms and Conditions */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="confirmTerms"
                className="mt-1"
                onChange={() => {
                  setTermsError("");
                  setConfirmTerms((checked) => !checked);
                }}
                checked={confirmTerms}
                name="confirmTerms"
              />
              <label htmlFor="confirmTerms" className="text-sm text-gray-600">
                I read and accept the{" "}
                <Link href="#" className="text-blue-600 hover:underline">
                  Terms and Conditions
                </Link>
              </label>
            </div>
            {termsError && (
              <p className="text-xs text-red-500">{termsError}</p>
            )}
            <OnBoardingButton
              type="submit"
              disabled={!confirmTerms || isLoading}
              className={`w-full ${!confirmTerms || isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span className="ml-2">Creating account...</span>
                </div>
              ) : (
                "Create account"
              )}
            </OnBoardingButton>
            <div className="text-center text-gray-500 text-sm">
              <div className="flex items-center justify-center gap-3 my-3">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span>or</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>
            </div>
            <SignInButton user_role={user_role} />
            <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/company-login" className="text-blue-600 hover:underline">
                    Login 
                  </Link>
                </p>
            </div>
          </form>
        </div>
      </div>
      {isOverlayVisible && (
        <Overlay isVisible={isOverlayVisible} closeoverlay={handleCloseOverlay}>
          <SuccessModal
            onClose={handleCloseOverlay}
            email={form.email}
            imgSrc="/Message.png"
            mainHeading={mainHeading}
            text={text}
            confirmationtext={confirmationtext}
            buttonText={"Verify email"}
            onBoarding={true}
            containsOtp={true}
            otp={otp}
            isLoading={isLoading}
            signupHandler={handleSignup}
          />
        </Overlay>
      )}
      {alert && (
        <ErrorPopup
          message="Account Already Exist"
          type="error"
          onClose={() => setAlert(false)}
        />
      )}
    </div>
  );
}

export default Page;
