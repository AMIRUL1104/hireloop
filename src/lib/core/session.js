import { headers } from "next/headers";

import { auth } from "../auth";

const getUserSession = async () => {
  const sessionData = await auth.api.getSession({ headers: await headers() });
  return sessionData?.user || null;
};

export default getUserSession;
