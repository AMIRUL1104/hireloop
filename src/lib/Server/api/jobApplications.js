import { protectedFetch, serverFetch } from "@/lib/core/serverFetch";

export const getApplicationByApplicant = async (applicantId) => {
  return protectedFetch(`/api/application?applicantId=${applicantId}`);
};
