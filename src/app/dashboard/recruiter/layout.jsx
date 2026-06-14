import getUserSession, { requireRole } from "@/lib/core/session";

const RecruiterLayout = async ({ children }) => {
  const user = await getUserSession();
  await requireRole("recruiter");

  return children;
};

export default RecruiterLayout;
