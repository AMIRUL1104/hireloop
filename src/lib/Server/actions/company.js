"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { serverMutation } from "@/lib/core/server";

export async function AddCompany(formData) {
  return serverMutation("/api/my/companies", formData);
}

// update company status
// update company status
export const companyStatusUpdate = async (companyId, status) => {
  try {
    const response = await fetch(`${baseUrl}/api/companies/${companyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    const result = await response.json();

    console.log("API Result:", result);

    return result;
  } catch (error) {
    console.error(error);

    return {
      error: "Something went wrong!",
    };
  }
};
