"use server";

import { serverMutation } from "@/lib/core/server";

export async function createSubscriptions(subInfo) {
  return serverMutation("/api/subscriptions", subInfo);
}
