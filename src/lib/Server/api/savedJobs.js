import { serverFetch } from "@/lib/core/serverFetch";

export const getSavedJobsBySeekerId = async (userId) => {
  return serverFetch(`/api/savejobs?seekerId=${userId}`);
};
