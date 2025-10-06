"use client";
import ErrorPopup from "@/components/ErrorPopup";
import Heading from "@/components/Heading";
import PhoneInputEl from "@/components/PhoneInputEl";
import Input from "@/components/Input";
import OnBoardingButton from "@/components/OnBoardingButton";
import Overlay from "@/components/Overlay";
import SignInButton from "@/components/SignInButton";
import SuccessModal from "@/components/SuccessModal";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import { revalidate } from "@/lib/data-service";
import { PAGE_HEIGHT_FIX } from "@/utils/utility";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState, useEffect } from "react";
import { generateOtp } from "@/utils/generateOtp";

function Page() {
  const router = useRouter();
  const params = useSearchParams();

  // Set page title
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

  const [user_role, setUserRole] = useState(params?.get("role") || "client");
  const [errors, setErrors] = useState({});
  const [termsError, setTermsError] = useState("");
  const [otp, setotp] = useState(null);
  const [alert, setAlert] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const allowedDomains = ["company.com", "company.org"];

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
        country: form.country || "Pakistan", // Default country
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

      // Validate all fields
      if (Object.values(errors).some((err) => err !== "")) {
        return; // Do not proceed with signup if there are validation errors
      }

      // Proceed with the rest of the signup process
      const result = await mvp2ApiHelper(payload);
      console.log("RESULT from signup: ", result?.data?.customer_id);

      try {
        // Call the Stripe customer creation API
        const stripeResponse = await fetch("/api/create-customer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            name: form.firstName + " " + form.lastName,
            metadata:
              user_role == "customer"
                ? { customer: 1, customer_id: result?.data?.customer_id }
                : { customer: 0, client_id: result?.data?.client_id },
          }),
        });

        if (!stripeResponse.ok) {
          throw new Error("Failed to create Stripe customer");
        }

        const stripeData = await stripeResponse.json();
        console.log("Stripe customer created successfully:", stripeData);

        let createAccountData;
        if (user_role === "client") {
          const createAccountResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/create-client-stripe-account`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                client_id: result.data.client_id,
                stripe_id: stripeData.customer.id,
              }),
            },
          );
          createAccountData = await createAccountResponse.json();

          if (createAccountResponse.status !== 200) {
            throw new Error(createAccountData.error);
          }
          console.log(
            "Stripe account created successfully:",
            createAccountData,
          );
        } else {
          const createAccountResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/create-customer-stripe-account`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                customer_id: result.data.customer_id,
                stripe_id: stripeData.customer.id,
              }),
            },
          );
          createAccountData = await createAccountResponse.json();

          if (createAccountResponse.status !== 200) {
            throw new Error(createAccountData.error);
          }
          console.log(
            "Stripe account created successfully:",
            createAccountData,
          );
        }
        if (result.data.status === 200) {
          console.log("Signed up successfully");
          setOverlayVisible(false);
          setisLoading(false);
          const revalidatePathOnSignup = `/admin/${user_role === "client" ? "clients" : "candidates"}`;
          revalidate(revalidatePathOnSignup);
          console.log("revalidating: ", revalidatePathOnSignup);
        }
      } catch (error) {
        console.error("Error during signup process:", error);
        setisLoading(false);
      }
    },
    [form, errors, user_role],
  );


  const handleOpenOverlay = useCallback(
    async (event) => {
      event.preventDefault();
      console.log("Signup form submitted!");
      console.log("Form data:", form);
      console.log("Confirm terms:", confirmTerms);

      if (!confirmTerms) {
        setTermsError("Please accept the terms and conditions");
        return;
      }

      setisLoading(true);

      // Check if all required fields are filled
      if (
        !form.firstName ||
        !form.lastName ||
        !form.email ||
        !form.phoneNumber ||
        !form.password ||
        !form.confirmPassword
      ) {
        console.log("Missing required fields");
        setisLoading(false);
        return;
      }

      // Check password match
      if (form.password !== form.confirmPassword) {
        console.log("Passwords don&apos;t match");
        setisLoading(false);
        return;
      }

      try {
        // Determine the correct API based on user_role
        let apiUrl = "";
        if (user_role === "client") {
          apiUrl = `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/client-by-email?email=${form.email}`;
        } else if (user_role === "customer") {
          apiUrl = `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/customer-by-email?email=${form.email}`;
        } else {
          console.error("Unknown user role");
          setisLoading(false);
          return;
        }

        console.log("Checking if user exists at:", apiUrl);
        const checkUserResponse = await fetch(apiUrl, { method: "GET" });

        if (checkUserResponse.status === 200) {
          console.log("User exists, not sending OTP");
          setAlert(true);
          setisLoading(false);
          return;
        }

        if (checkUserResponse.status === 404) {
          // User not found, proceed to send email
          console.log("User not found, proceed to send email");

          const generatedotp = generateOtp();
          setotp(generatedotp);

          const emailPayload = {
            to: form.email,
            subject: "Email Verification",
            text: `Your OTP code is: ${generatedotp}`, // Include the generated OTP
          };

          console.log("Sending email with payload:", emailPayload);
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
            console.log("Email sent successfully:", emailData);
            setotp(emailData.otp);
            setOverlayVisible(true);
            setisLoading(false);
          } else {
            console.error("Failed to send email");
            setisLoading(false);
          }
        } else {
          console.error("Unexpected response:", checkUserResponse.status);
          setisLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
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

    // Real-time validation
    validateField(name, value);
  };

  const isFormInvalid = useMemo(() => {
    return (
      Object.values(errors).some((err) => err !== "") ||
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phoneNumber ||
      !form.password ||
      !form.confirmPassword
    );
  }, [errors, form]);

  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "firstName":
        if (!/^[A-Za-z\s]{2,}$/.test(value)) {
          errorMsg =
            "First name must be at least 2 characters and contain only letters";
        }
        break;
      case "lastName":
        if (!/^[A-Za-z\s]{2,}$/.test(value)) {
          errorMsg =
            "Last name must be at least 2 characters and contain only letters";
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
        // Also revalidate confirm password if password changes
        if (form.confirmPassword && form.confirmPassword !== value) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            confirmPassword: "Passwords do not match",
          }));
        } else if (form.confirmPassword && form.confirmPassword === value) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            confirmPassword: "",
          }));
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
      Your account is currently under review. Soon you&apos;ll receive an email
      on <span className="font-semibold"> {form.email} </span> upon approval
    </>
  );

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header with logo and role buttons */}
      <div className="flex items-center justify-between p-6">
        {/* CoVentech logo in top left corner, slightly up */}
        <div className="absolute left-8 top-6">
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

      {/* Signup Form Container - Centered */}
      <div className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-6 text-center">
            <h1 className="mb-2 text-3xl font-semibold text-gray-900">
              Talent Register
            </h1>
          </div>

          <form onSubmit={handleOpenOverlay} className="space-y-3">
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
                  <p className="mt-1 text-xs text-red-500">
                    {errors.firstName}
                  </p>
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
                  <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
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
                placeholder="Enter email"
                className="w-full"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <div className="flex gap-2">
                <PhoneInputEl
                  className="flex w-full items-center rounded-full border border-gray-300 bg-white px-6 py-4 text-sm leading-tight text-gray-900 focus:border-primary focus:ring-primary"
                  phone={form.phoneNumber}
                  setPhone={(phone) => setForm({ ...form, phoneNumber: phone })}
                  setCountry={(country) =>
                    setForm({ ...form, country: country })
                  }
                />
              </div>
              {errors.phoneNumber && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.phoneNumber}
                </p>
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform"
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
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword}
                </p>
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
            {termsError && <p className="text-xs text-red-500">{termsError}</p>}

            <OnBoardingButton
              type="submit"
              disabled={!confirmTerms || isLoading}
              className={`w-full ${!confirmTerms || isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                  <span className="ml-2">Creating account...</span>
                </div>
              ) : (
                "Create account"
              )}
            </OnBoardingButton>

            <div className="text-center text-sm text-gray-500">
              <div className="my-3 flex items-center justify-center gap-3">
                <div className="h-px flex-1 bg-gray-300"></div>
                <span>or</span>
                <div className="h-px flex-1 bg-gray-300"></div>
              </div>
            </div>

          </form>
          {/* Google signin */}
          <SignInButton user_role={user_role} />

          {/* Already have an account */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href={`/login?role=${user_role}`}
                className="text-blue-600 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isOverlayVisible && (
        <Overlay isVisible={isOverlayVisible} closeoverlay={handleCloseOverlay}>
          <SuccessModal
            onClose={handleCloseOverlay}
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
