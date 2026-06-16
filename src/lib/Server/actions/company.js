"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { serverMutation } from "@/lib/core/server";
import { authHeader } from "@/lib/core/serverFetch";
import { revalidatePath } from "next/cache";

export async function AddCompany(formData) {
  return serverMutation("/api/my/companies", formData);
}

// update company status
// update company status
export const companyStatusUpdate = async (companyId, status) => {
  const newStatus = { status };
  const result = await serverMutation(
    `/api/companies/${companyId}`,
    newStatus,
    "PATCH",
  );

  if (result.modifiedCount > 0) {
    revalidatePath("/dashboard/admin/companies");
  }
  // console.log("API Result:", result);
  return result;
};
// try {
//   const response = await fetch(`${baseUrl}/api/companies/${companyId}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ status }),
//   });

//   const result = await response.json();
//   if (result.modifiedCount > 0) {
//     revalidatePath("/dashboard/admin/companies");
//   }

//   // console.log("API Result:", result);

//   return result;
// } catch (error) {
//   // console.error(error);

//   return {
//     error: "Something went wrong!",
//   };
// }
