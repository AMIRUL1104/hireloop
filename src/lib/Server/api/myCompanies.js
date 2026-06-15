const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function getReqruiterCompanies(recruiterId) {
  const response = await fetch(
    `${baseUrl}/api/my/companies?recruiterId=${recruiterId}`,
  );

  return await response.json();
}

// ========== all companies for admin =====================
import { serverFetch } from "@/lib/core/serverFetch";

export const getAllCompanies = async (status) => {
  return serverFetch(`/api/companies?status=${status}`);
};
