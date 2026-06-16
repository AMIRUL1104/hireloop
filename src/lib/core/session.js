import { headers } from "next/headers";

import { auth } from "../auth";
import { redirect } from "next/navigation";

const getUserSession = async () => {
  const sessionData = await auth.api.getSession({ headers: await headers() });
  return sessionData?.user || null;
};
export default getUserSession;

export const getUserToken = async () => {
  const sessionData = await auth.api.getSession({ headers: await headers() });
  return sessionData?.session?.token || null;
};

export const requireRole = async (role) => {
  const user = await getUserSession();
  if (user.role !== role) {
    return redirect("/unauthorized");
  }
};
