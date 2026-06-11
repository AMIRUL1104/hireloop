import { serverFetch } from "@/lib/core/serverFetch";

export const getApplicationByApplicant = async (applicantId) => {
  return serverFetch(`/api/application?applicantId=${applicantId}`);
};
