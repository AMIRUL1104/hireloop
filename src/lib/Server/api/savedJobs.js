import { protectedFetch, serverFetch } from "@/lib/core/serverFetch";

export const getSavedJobsBySeekerId = async (userId) => {
  return protectedFetch(`/api/savejobs?seekerId=${userId}`);
};
