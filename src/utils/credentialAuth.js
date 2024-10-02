import { validateAndDecodeToken } from "@/utils/validateAndDecodeToken";
import { cookies } from "next/headers";

export const credentialAuth = async () => {
  const token = cookies().get("credentialLoginToken")?.value;

  if (!token) {
    return { user: null, error: "Token is missing." };
  }

  const { anyNameForData: credentialUser, error } =
    await validateAndDecodeToken(token);

  if (error) {
    return { user: null, error };
  }

  return { user: credentialUser, error: null };
};
