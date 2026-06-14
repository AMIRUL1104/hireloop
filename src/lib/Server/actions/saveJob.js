"use server";

import { serverMutation } from "@/lib/core/server";

export async function SaveJobApplication(formData) {
  return serverMutation("/api/savejobs", formData);
}
