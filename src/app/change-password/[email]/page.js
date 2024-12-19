"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Page({ params }) {
  const router = useRouter();
  const { email } = params;
  const decodedEmail = decodeURIComponent(email);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/password-reset`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: decodedEmail,
            new_password: password,
            user_role: "client",
          }),
        },
      );

      if (res.ok) {
        setSuccess("Password reset successful! Redirecting to login...");
        setTimeout(() => router.push("/login"), 3000);
      } else {
        const data = await res.json();
        setError(data.message || "Failed to reset password");
      }
    } catch (err) {
      setError("Something went wrong, please try again");
    }
  };

  return (
    <div className="reset-password-container">
      <h1>Change Password</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      <style jsx>{`
        .reset-password-container {
          max-width: 400px;
          margin: 50px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          text-align: center;
        }
        .error {
          color: red;
        }
        .success {
          color: green;
        }
        label {
          display: block;
          margin-bottom: 5px;
        }
        input {
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
}
export default Page;
