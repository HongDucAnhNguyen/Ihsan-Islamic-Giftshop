import { headers } from "next/headers";

export const verifyAsAdmin = () => {
  const isAdmin = headers().get("x-is-admin") === "true";

  return isAdmin;
};
