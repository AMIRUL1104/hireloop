"use server";

import { serverMutation } from "@/lib/core/server";

export async function AddCompany(formData) {
  return serverMutation("/api/companies", formData);
}
