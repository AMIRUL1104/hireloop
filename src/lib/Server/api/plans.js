import { serverFetch } from "@/lib/core/serverFetch";

export const getPlanById = async (planId) => {
  return serverFetch(`/api/plans?plan_id=${planId}`);
};
