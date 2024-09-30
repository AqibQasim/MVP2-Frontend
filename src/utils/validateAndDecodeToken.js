import { jwtVerify } from "jose";

export const validateAndDecodeToken = async (token) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  if (!secret || secret.length === 0) {
    return {
      anyNameForData: null,
      error: "The environment variable JWT_SECRET is not set.",
    };
  }

  if (!token) {
    return { anyNameForData: null, error: "Token is required." };
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    return { anyNameForData: payload, error: null };
  } catch (error) {
    const errorMessage = error.message || "Token verification failed.";
    return { anyNameForData: null, error: errorMessage };
  }
};

export async function verifyJwtToken(token) {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey()),
    );
    return verified.payload;
  } catch (error) {
    throw new Error("Your token is expired");
  }
}
