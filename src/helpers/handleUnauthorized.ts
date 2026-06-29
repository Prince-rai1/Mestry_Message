import { signOut } from "next-auth/react";

const handleUnauthorized = async () => {
  await signOut({
    callbackUrl: "/sign-in",
  });
};

export default handleUnauthorized;