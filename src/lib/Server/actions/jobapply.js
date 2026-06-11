"use server";

import { serverMutation } from "@/lib/core/server";

export async function JobApplication(formData) {
  return serverMutation("/api/application", formData);
}
