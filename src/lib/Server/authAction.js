"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function handleSignOutRedirect() {
  revalidatePath("/"); // হোম পেজের ক্যাশ ডিলিট করবে
  redirect("/"); // হোম পেজে পাঠাবে
}
