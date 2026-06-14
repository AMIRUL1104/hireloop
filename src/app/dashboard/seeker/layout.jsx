import getUserSession, { requireRole } from "@/lib/core/session";

const SeekerLayout = async ({ children }) => {
  const user = await getUserSession();
  await requireRole("seeker");

  return children;
};

export default SeekerLayout;
